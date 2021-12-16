import http from './http'
import {message} from 'ant-design-vue'
import {ref, toRaw} from 'vue'
import {
  Util,
  IPackageDefinition,
  IConnectorDefinition,
  ITableDefinition,
  IColumnDefinition,
  IChartDefinition,
  IRelationshipDefinition,
  DataContext,
  ITablePosition,
  FilterType,
  DataMergeType,
  FilterExpression,
  PackageHelper,
  ControlType
} from '@datahu/core'
export class PackageManager {
  static emptyPkg() {
    var definition = {
      id: Util.uniqueId(),
      theme: 'default',
      filters: [],
      chart: {
        id: Util.uniqueId(),
        type: 'PageLayoutComponent',
        filters: [],
        option: {
          title: {show: false, name: ''},
          body: {
            style: {
              borderTopWidth: '0px',
              borderRightWidth: '0px',
              borderBottomWidth: '0px',
              borderLeftWidth: '0px'
            }
          },
          disableResize: true,
          disableDrag: true
        },
        children: []
      },
      connectors: [],
      tables: [],
      relationships: []
    } as IPackageDefinition
    return new PackageManager(definition, '未命名报表1.datahu')
  }

  definition: IPackageDefinition = null
  dataContext: DataContext = null
  path: string = null
  actions: Array<any> = []
  lastSaved = new Date()
  // useRef = ref(null)
  constructor(definition: IPackageDefinition, path: string) {
    this.definition = definition
    this.path = path
    if (!this.definition.chart) {
      this.definition.chart = {
        id: Util.uniqueId(),
        type: 'PageLayoutComponent',
        filters: [],
        option: {
          title: {show: false, name: ''},
          disableResize: true,
          disableDrag: true
        },
        children: []
      }
    }
    this.dataContext = new DataContext({}, this.definition)
  }

  init() {
    this.dataContext.init()
  }

  static async load(
    path: string,
    disabledError?: boolean
  ): Promise<PackageManager> {
    let definition = await http.request(
      'PackageManager/load',
      {path},
      disabledError
    )
    return new PackageManager(definition as IPackageDefinition, path)
  }

  static async loadFrom(): Promise<PackageManager> {
    let result = (await http.request('PackageManager/loadFrom', {})) as any
    if (result && result.path) {
      return new PackageManager(result.data, result.path)
    }
    throw new Error('未能成功加载')
  }

  static async loadFromServer(params: any): Promise<PackageManager> {
    let result = (await http.request(
      'PackageManager/loadFromServer',
      params
    )) as any
    if (result) {
      return new PackageManager(result.data, result.path)
    }
    throw new Error('未能成功加载')
  }

  getConnector(id: any): IConnectorDefinition {
    for (let ds of this.definition.connectors) {
      if (ds.id == id) {
        return ds
      }
    }
    throw new Error('未能找到数据源连接' + id)
  }

  getChart(): IChartDefinition {
    return this.definition.chart
  }

  getTables(): Array<ITableDefinition> {
    return this.definition.tables
  }

  async loadData(language: string, force: boolean): Promise<void> {
    let loadTables: any = {}
    for (let t of this.definition.tables) {
      // temp 用于赋值loading
      const temp: any = t
      temp.loading = {
        // null 等待查询
        value: null
      }
      if (!t.formula && (!t.rows || force)) {
        if (!loadTables[t.connectorId]) {
          let connector = this.getConnector(t.connectorId)
          loadTables[t.connectorId] = {
            args: {
              language: language,
              connector: connector,
              tables: []
            },
            tables: [],
            loading: temp.loading
          }
        }
        loadTables[t.connectorId].tables.push(t)
        loadTables[t.connectorId].args.tables.push({
          name: t.name,
          columns: t.columns,
          useSourceCode: t.useSourceCode,
          sourceCode: t.sourceCode
        })
      }
    }

    for (let connectorId in loadTables) {
      if (connectorId) {
        try {
          let loadArg = loadTables[connectorId]
          // true 开始查询
          loadTables[connectorId].loading.value = true
          let requestData = (await http.request(
            'DataSource/getData',
            loadArg.args
          )) as any
          // false 查询完成
          loadTables[connectorId].loading.value = false
          for (let i = 0; i < requestData.length; i++) {
            loadArg.tables[i].rows = requestData[i]
            this.dataContext.setTableData(loadArg.tables[i])
          }
        } catch (e: any) {
          console.error('reload data error', e)
        }
      }
    }
    this.dataContext.resetFormulaTables()
    this.addAction('reload_data', {})
  }

  resetData() {
    this.dataContext.resetData()
  }

  getName(): string {
    let splitPathChar = '/'
    if (this.path.lastIndexOf('\\') >= 0) {
      splitPathChar = '\\'
    }
    return this.path.substring(
      this.path.lastIndexOf(splitPathChar) + 1,
      this.path.length - '.datahu'.length
    )
  }

  hasPath(): boolean {
    return this.path.lastIndexOf('/') >= 0 || this.path.lastIndexOf('\\') >= 0
  }

  async save(showMessage = true): Promise<void> {
    await http.request('PackageManager/save', {
      path: this.path,
      pkg: this.definition
    })
    this.lastSaved = new Date()
    if (showMessage) {
      message.success('保存成功')
    }
  }

  async saveAs(showMessage = true): Promise<void> {
    let path = await http.request('PackageManager/saveAs', {
      path: this.path,
      pkg: this.definition
    })
    if (path) {
      this.path = path as string
      this.lastSaved = new Date()
      if (showMessage) {
        message.success('保存成功')
      }
    }
  }

  setPreviewImage(url: string, type: string) {
    if (type == 'auto') {
      this.definition.autoPreviewImage = url
    } else {
      this.definition.manualPreviewImage = url
    }
    this.addAction('set_preview_image', this.definition)
  }

  getTheme() {
    if (this.definition.theme) {
      return this.definition.theme
    }
    return 'default'
  }
  setTheme(name: string) {
    this.definition.theme = name
    this.addAction('set_theme', name)
  }

  removeConnector(connector: IConnectorDefinition): void {
    this.definition.connectors.splice(
      this.definition.connectors.indexOf(connector),
      1
    )
    for (let table of this.definition.tables) {
      if (table.connectorId == connector.id) {
        this.removeTable(table)
      }
    }
    this.addAction('remove_connector', connector)
  }

  removeTable(table: ITableDefinition): void {
    let removeRenationships = []
    for (let r of this.definition.relationships) {
      if (r.from[0] == table.id || r.to[0] == table.id) {
        removeRenationships.push(r)
      }
    }
    for (let r of removeRenationships) {
      this.definition.relationships.splice(
        this.definition.relationships.indexOf(r),
        1
      )
      this.addAction('remove_relationship', r)
    }

    // 删除数据和过滤相关的栏目
    PackageHelper.eachChart(
      this.definition.chart,
      (chart: IChartDefinition) => {
        if (chart.option && chart.option.fields) {
          for (let fieldKey in chart.option.fields) {
            let removed = []
            let fields = chart.option.fields[fieldKey]
            for (let field of fields) {
              if (field.tableId == table.id) {
                removed.push(field)
              }
            }
            for (let removeItem of removed) {
              fields.splice(fields.indexOf(removeItem, 1))
            }
          }
        }
        if (chart.filters) {
          let removed = []
          for (let f of chart.filters) {
            if (f.field.tableId == table.id) {
              removed.push(f)
            }
          }
          for (let removeItem of removed) {
            chart.filters.splice(chart.filters.indexOf(removeItem, 1))
          }
        }
      }
    )

    this.definition.tables.splice(this.definition.tables.indexOf(table), 1)
    this.dataContext.removeTable(table)
    this.addAction('remove_table', table)
  }

  addTable(table: ITableDefinition): void {
    table.id = Util.uniqueId()
    for (let col of table.columns) {
      if (!col.id) {
        col.id = Util.uniqueId()
      }
    }
    this.definition.tables.push(table)
    this.dataContext.addTable(table)
    this.addAction('add_table', table)
  }

  addColumn(table: ITableDefinition, column: IColumnDefinition): void {
    column.id = Util.uniqueId()
    table.columns.push(column)
    this.dataContext.addColumn(table)
    this.addAction('add_column', column)
  }

  /**
   * 检查关系连接冲突
   * @param relations
   * @returns 有冲突的关系
   */
  checkRelations(
    relations: Array<IRelationshipDefinition>
  ): IRelationshipDefinition | null {
    let copySet = (linkedTableIds: Array<string>): Array<string> => {
      let newLinked: Array<string> = []
      for (let t of linkedTableIds) {
        newLinked.push(t)
      }
      return newLinked
    }
    let checkTable = (
      line: IRelationshipDefinition,
      linkedTableIds: Array<string>
    ): IRelationshipDefinition | null => {
      for (let relation of relations) {
        if (line != relation) {
          if (relation.from[0] == linkedTableIds[linkedTableIds.length - 1]) {
            if (linkedTableIds.indexOf(relation.to[0]) >= 0) {
              return relation
            } else {
              let newLinked = copySet(linkedTableIds)
              newLinked.push(relation.to[0])
              let r = checkTable(relation, newLinked)
              if (r) {
                return r
              }
            }
          }

          if (relation.to[0] == linkedTableIds[linkedTableIds.length - 1]) {
            if (linkedTableIds.indexOf(relation.from[0]) >= 0) {
              return relation
            } else {
              let newLinked = copySet(linkedTableIds)
              newLinked.push(relation.from[0])
              let r = checkTable(relation, newLinked)
              if (r) {
                return r
              }
            }
          }
        }
      }
      return null
    }
    for (let table of this.definition.tables) {
      let newLinked: Array<string> = []
      newLinked.push(table.id)
      let r = checkTable(null, newLinked)
      if (r) {
        return r
      }
    }
    return null
  }

  updateRelations(relations: Array<IRelationshipDefinition>) {
    this.definition.relationships = relations
    this.dataContext.updateRelations()
    this.addAction('update_ralationships', relations)
  }

  editColumn(
    table: ITableDefinition,
    column: IColumnDefinition,
    editColumn: IColumnDefinition
  ): void {
    column.alias = editColumn.alias
    column.formula = editColumn.formula
    this.dataContext.editColumn(table)
    this.addAction('edit_column', column)
  }

  renameColumn(
    table: ITableDefinition,
    column: IColumnDefinition,
    alias: string
  ) {
    column.alias = alias
    this.dataContext.renameColumn(table)
    this.addAction('rename_column', column)
  }

  editColumnWithoutUpdateData(
    table: ITableDefinition,
    column: IColumnDefinition,
    action: string
  ) {
    this.addAction(action, column)
  }

  editColumnFilter(table: ITableDefinition, column: IColumnDefinition) {
    this.dataContext.editColumnFilter(table)
    this.addAction('edit_column_filter', column)
  }

  editColumnType(table: ITableDefinition, column: IColumnDefinition) {
    this.dataContext.editColumnType(table)
    this.addAction('edit_column_type', column)
  }

  editColumnOrderBy(table: ITableDefinition, column: IColumnDefinition) {
    this.dataContext.editColumnOrderBy(table)
    this.addAction('edit_column_orderBy', column)
  }

  editColumnFormula(table: ITableDefinition, column: IColumnDefinition) {
    this.dataContext.editColumnFormula(table)
    this.addAction('edit_column_formula', column)
  }

  getTableData(table: ITableDefinition): Array<any> {
    return this.dataContext.getTableData(table)
  }

  removeColumn(table: ITableDefinition, column: IColumnDefinition): void {
    table.columns.splice(table.columns.indexOf(column), 1)
    this.dataContext.removeColumn(table)
    this.addAction('remove_column', column)
  }

  downColumn(table: ITableDefinition, column: IColumnDefinition): void {
    let index = table.columns.indexOf(column)
    if (index == table.columns.length - 1) {
      return
    }
    table.columns.splice(index, 1)
    table.columns.splice(index + 1, 0, column)
    this.addAction('down_column', column)
  }

  renameTable(table: ITableDefinition, alias: string): void {
    this.dataContext.renameTable(table, alias)
    this.addAction('rename_table', table)
  }

  changeTableCacheType(table: ITableDefinition) {
    this.addAction('change_table_cache_type', table)
  }

  editTableFormula(table: ITableDefinition) {
    this.dataContext.editTableFormula(table)
    this.addAction('edit_table_formula', table)
  }

  removeChart(parent: IChartDefinition, chart: IChartDefinition) {
    parent.children.splice(parent.children.indexOf(chart), 1)
    this.dataContext.removeChart(chart)
    this.addAction('remove_chart', chart)
  }

  addChart(parent: IChartDefinition, chart: IChartDefinition) {
    PackageHelper.eachChart(chart, (item: IChartDefinition) => {
      item.id = Util.uniqueId()
    })
    parent.children.push(chart)
    this.dataContext.addChart(chart)
    this.addAction('add_chart', chart)
  }

  addAction(action: string, target: any): void {
    this.actions.push({
      created: new Date(),
      action: action,
      target: target
    })
  }

  /**
   * 切换图表的显示层次
   * @param parent
   * @param chart
   * @param level
   */
  switchLevel(
    parent: IChartDefinition,
    chart: IChartDefinition,
    level: number
  ) {
    this.addAction('switchLevel', {chart, level})
  }

  updateTablePosition(table: ITablePosition) {
    this.addAction('update_table_position', table)
  }

  updateTableProperties(table: ITablePosition) {
    this.addAction('update_table_properties', table)
  }

  updateOption(chart: IChartDefinition, arg: any) {
    if (arg && arg.type == ControlType.chartScope) {
      this.resetData()
    }
    this.addAction('update_option', chart)
  }

  updateFields(chart: IChartDefinition) {
    this.dataContext.updateFields(chart)
    this.addAction('update_option', chart)
  }

  updateFilter(chart: IChartDefinition) {
    this.dataContext.updateFilter(chart)
    this.addAction('update_filter', chart)
  }

  updateGlobalFilter() {
    this.dataContext.updateGlobalFilter()
    this.addAction('update_global_filter', this.definition.chart)
  }

  /**
   * 数据行级权限控制，更新角色设置
   * @param item
   */
  updateRole(item: any) {
    if (item.roles && item.roles.length > 0) {
      this.definition.mockRoles = item.roles
    } else {
      this.definition.mockRoles = null
    }
    for (let table of this.definition.tables) {
      for (let col of table.columns) {
        let roleFilter = null
        if (col.filters) {
          for (let filter of col.filters) {
            if (filter.filterType == FilterType.role) {
              roleFilter = filter
              break
            }
          }
        } else {
          col.filters = []
        }
        let has = false
        for (let colId of item.roleColumns) {
          if (col.id == colId) {
            has = true
            break
          }
        }
        if (has) {
          if (roleFilter == null) {
            col.filters.push({
              field: {
                columnId: col.id,
                tableId: table.id,
                mergeType: DataMergeType.none
              },
              enabled: true,
              mergeExpression: FilterExpression.and,
              filterType: FilterType.role,
              conditions: [],
              values: [],
              code: ''
            })
          }
        } else {
          if (roleFilter) {
            col.filters.splice(col.filters.indexOf(roleFilter, 1))
          }
        }
      }
    }
    this.dataContext.updateRole()
    this.addAction('update_role', item)
  }

  hasChange(): boolean {
    for (let action of this.actions) {
      if (action.created > this.lastSaved) {
        return true
      }
    }
    if (this.path && this.hasPath()) {
      return false
    } else {
      return true
    }
  }
}
