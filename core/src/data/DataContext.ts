import {IChartDefinition, IPackageDefinition, eachChart} from '../package'
import {
  CodeExpression,
  ColumnOrderBy,
  ColumnType,
  IColumnDefinition,
  ITableDefinition,
  Util
} from '../common'
import {IFilterInfo, DataFilter, IFieldInfo, DataMergeType} from './DataFilter'
import * as mt from 'moment'
let moment = (mt as any).default || mt
export enum ChartScopeType {
  global = 'global',
  self = 'self',
  special = 'special'
}
export interface IChartScope {
  type: ChartScopeType
  chartIds: Array<string>
}

export interface IChartTemp {
  /**
   * 临时过滤条件
   */
  filters: Array<IFilterInfo>
  /**
   * 数据下钻层主栏目id
   */
  mainFieldId: string

  /** 影响范围 默认： global 全局, self: 只影响自身, [] chartId array: 指定影响的报表 */
  scope?: IChartScope
}

export class DataContext {
  /** 表格数据筛选之前的完整数据， 用户刷选条件 */
  private dataBeforeTableFilter: any

  /** 表格数据刷新之后的完整数据， 用于图表展示 */
  private data: any

  /**全局过滤后， 临时过滤前的数据， 一般用于切片器 */
  private globalFilterBeforeTempData: any

  /** 全局过滤 + 切片器临时过滤 后的数据 */
  private globalFilterData: any
  private chartFilterData: any
  definition: IPackageDefinition
  private structure: any

  /**
   * 图表组件运行过程中的临时数据， 包括切片器过滤条件，数据下钻状态等信息
   */
  private chartTempData: Map<string, IChartTemp> = new Map()

  constructor(data: any, definition: IPackageDefinition) {
    this.data = data
    this.dataBeforeTableFilter = {}
    this.definition = definition
  }

  init() {
    this.formatData()
    this.resetFilterData()
  }

  resetFormulaTables() {
    for (let t of this.definition.tables) {
      if (t.isFormula && t.formula) {
        this.formatTableData(t)
      }
    }
  }

  getData() {
    return this.data
  }

  getDataBeforeTableFilter() {
    return this.dataBeforeTableFilter
  }

  getChartTempData(chartId: string): IChartTemp | undefined {
    return this.chartTempData.get(chartId)
  }

  getGlobalFilterBeforeTempData(chart: IChartDefinition) {
    return this.getDataAfterFilter(
      this.globalFilterBeforeTempData,
      chart.filters
    )
  }

  /**
   * 设置图表的临时数据信息， 主要为过滤条件和下钻字段
   * @param chartId
   * @param filters  null 和 undifined 时表示不更新
   * @param mainFieldId  null 和 undifined 时表示不更新
   */
  setChartTempData(
    chart: IChartDefinition,
    filters: Array<IFilterInfo> | null | undefined,
    mainFieldId: string | null | undefined
  ) {
    let tempData: IChartTemp = {
      filters: [],
      mainFieldId: '',
      scope: chart.option.dataOperation
        ? chart.option.dataOperation.scope
        : null
    }
    if (this.chartTempData.has(chart.id)) {
      tempData = this.chartTempData.get(chart.id)!
    } else {
      this.chartTempData.set(chart.id, tempData)
    }
    if (filters) {
      // 修改了过滤条件时才刷新数据
      tempData.filters = filters
      this.resetFilterData()
    }
    if (mainFieldId != undefined && mainFieldId != null) {
      tempData.mainFieldId = mainFieldId
    }
  }

  /**
   * 重置所有筛选数据集， 在数据、表格、字段、 关联关系、刷选条件变化时需主动调用刷选数据
   */
  private resetFilterData() {
    let filters = []
    for (let f of this.definition.filters) {
      filters.push(f)
    }

    this.globalFilterBeforeTempData = this.getDataAfterFilter(
      this.data,
      filters
    )

    // 全局临时过滤
    let tempFilters = []
    // 局部临时过滤
    let chartTempFilters: any = {}
    for (let mapItem of this.chartTempData) {
      let templateData = mapItem[1]
      let selfChartId = mapItem[0]
      if (templateData) {
        if (
          !templateData.scope ||
          !templateData.scope.type ||
          templateData.scope.type == ChartScopeType.global
        ) {
          for (let f of templateData.filters) {
            tempFilters.push(f)
          }
        } else if (
          templateData.scope &&
          templateData.scope.type == ChartScopeType.self
        ) {
          if (!chartTempFilters[selfChartId]) {
            chartTempFilters[selfChartId] = []
          }
          for (let f of templateData.filters) {
            chartTempFilters[selfChartId].push(f)
          }
        } else if (templateData.scope && templateData.scope.chartIds) {
          for (let chartId of templateData.scope.chartIds) {
            if (!chartTempFilters[chartId]) {
              chartTempFilters[chartId] = []
            }
            for (let f of templateData.filters) {
              chartTempFilters[chartId].push(f)
            }
          }
        }
      }
    }

    this.globalFilterData = this.getDataAfterFilter(
      this.globalFilterBeforeTempData,
      tempFilters
    )
    let chartFilterData: any = {}

    eachChart(this.definition.chart, (chart: IChartDefinition) => {
      chartFilterData[chart.id] = this.getDataAfterFilter(
        this.globalFilterData,
        this.getChartFilters(chart)
      )
    })

    this.chartFilterData = chartFilterData
  }

  private getChartFilters(chart: IChartDefinition): Array<IFilterInfo> {
    // 局部临时过滤
    let chartTempFilters: Array<IFilterInfo> = []
    for (let mapItem of this.chartTempData) {
      let templateData = mapItem[1]
      let selfChartId = mapItem[0]
      if (templateData) {
        if (
          templateData.scope &&
          templateData.scope.type &&
          templateData.scope.type != ChartScopeType.global
        ) {
          if (
            templateData.scope.type == ChartScopeType.self &&
            selfChartId == chart.id
          ) {
            for (let f of templateData.filters) {
              chartTempFilters.push(f)
            }
          } else if (
            templateData.scope.type == ChartScopeType.special &&
            templateData.scope.chartIds
          ) {
            for (let id of templateData.scope.chartIds) {
              if (id == chart.id) {
                for (let f of templateData.filters) {
                  chartTempFilters.push(f)
                }
              }
            }
          }
        }
      }
    }
    return [...chartTempFilters, ...(chart.filters || [])]
  }

  /** 只刷新指定图表的筛选数据集 */
  private resetChartFilterData(chart: IChartDefinition) {
    eachChart(chart, (item: IChartDefinition) => {
      this.chartFilterData[item.id] = this.getDataAfterFilter(
        this.globalFilterData,
        this.getChartFilters(item)
      )
    })
  }

  private getDataAfterFilter(data: any, filterInfos: Array<IFilterInfo>) {
    let cloneData = Util.cloneTo(data, {})
    let structure = this.getDataStructure()
    let filter = new DataFilter(filterInfos, structure)
    filter.filter(cloneData, this.definition.relationships)
    return cloneData
  }

  private formatData(): void {
    this.formatDataStructure()

    for (let table of this.definition.tables) {
      this.formatTableData(table)
    }
  }

  private formatFormulaTableRows(table: ITableDefinition) {
    let code = new CodeExpression(table.formula!, ['data'], false)
    table.rows = code.run(this.data)
    if (table.rows && table.rows.length > 0) {
      let firstRow = table.rows[0]
      for (let key in firstRow) {
        if (key == '_XID') {
          // vx-table 表格控件自动生成的行id，自动排除
          continue
        }
        let hasCol = null
        for (let col of table.columns) {
          let name = col.alias || col.name
          if (name == key) {
            hasCol = col
            break
          }
        }
        if (!hasCol) {
          // 新加col
          let newCol: IColumnDefinition = {
            id: Util.uniqueId(),
            name: key,
            type: ColumnType.Any,
            mergeType: DataMergeType.none,
            formatter: '',
            alias: '',
            formula: '',
            isFormula: false,
            filters: []
          }
          table.columns.push(newCol)
        } else {
          hasCol.formula = ''
          hasCol.name = key
        }
      }

      let removedCols = []
      for (let col of table.columns) {
        let hasCol = false
        for (let key in firstRow) {
          let name = col.alias || col.name
          if (name == key) {
            hasCol = true
            break
          }
        }
        if (!hasCol && !col.formula) {
          removedCols.push(col)
        }
      }
      for (let removed of removedCols) {
        table.columns.splice(table.columns.indexOf(removed), 1)
      }
    }
  }

  private convertValueType2(obj: any, key: string, columnType: ColumnType) {
    let v = obj[key]
    switch (columnType) {
      case ColumnType.Boolean:
        obj[key] = v ? true : false
        break
      case ColumnType.DateTime:
        if (v) {
          if (v) {
            if (!(v instanceof Date)) {
              let parseV = moment(v).toDate()
              if (parseV.getFullYear()) {
                obj[key] = parseV
              } else {
                obj[key] = null
              }
            }
          } else {
            obj[key] = null
          }
        } else {
          obj[key] = null
        }
        break
      case ColumnType.Number:
        if (v || v === 0) {
          if (typeof v != 'number') {
            let parseV = parseFloat(v)
            if (parseV != null && parseV != undefined) {
              obj[key] = parseV
            } else {
              obj[key] = null
            }
          }
        } else {
          obj[key] = null
        }
        break
      case ColumnType.String:
        if (v || v === '') {
          if (!(typeof v == 'string')) {
            if (v.toString) {
              obj[key] = v.toString()
            } else {
              obj[key] = '' + v
            }
          }
        } else {
          v = null
        }
        break
    }
  }

  private convertValueType(obj: any, key: string, columnType: ColumnType) {
    if (columnType == ColumnType.Any) {
      return
    }
    let v = obj[key]
    if (columnType == ColumnType.Boolean) {
      obj[key] = v ? true : false
    } else if (columnType == ColumnType.DateTime) {
      if (v) {
        if (v) {
          if (!(v instanceof Date)) {
            let parseV = moment(v).toDate()
            if (parseV.getFullYear()) {
              obj[key] = parseV
            } else {
              obj[key] = null
            }
          }
        } else {
          obj[key] = null
        }
      } else {
        obj[key] = null
      }
    } else if (columnType == ColumnType.Number) {
      if (v || v === 0) {
        if (typeof v != 'number') {
          let parseV = parseFloat(v)
          if (parseV != null && parseV != undefined) {
            obj[key] = parseV
          } else {
            obj[key] = null
          }
        }
      } else {
        obj[key] = null
      }
    } else if (columnType == ColumnType.String) {
      if (v || v === '') {
        if (!(typeof v == 'string')) {
          if (v.toString) {
            obj[key] = v.toString()
          } else {
            obj[key] = '' + v
          }
        }
      } else {
        v = null
      }
    }
  }

  private formatTableData(table: ITableDefinition): void {
    // 计算表格
    if (table.formula) {
      this.formatFormulaTableRows(table)
    }

    let rowsBeforeTableFilter: Array<any> = []

    this.dataBeforeTableFilter[table.alias || table.name] =
      rowsBeforeTableFilter
    if (table.rows) {
      let codeMap: any = {}
      for (let col of table.columns) {
        if (col.formula) {
          codeMap[col.id] = new CodeExpression(
            col.formula,
            ['row', 'table'],
            false
          )
        }
      }

      for (let row of table.rows) {
        let formatRow: any = {}
        for (let col of table.columns) {
          let key = col.alias || col.name
          if (col.formula) {
            let code = codeMap[col.id]
            formatRow[key] = code.run(row, table.rows)
          } else {
            formatRow[key] = row[col.name]
          }
          this.convertValueType(formatRow, key, col.type)
        }
        rowsBeforeTableFilter.push(formatRow)
      }
    }
    this.filterTableData(table)
    this.orderByTableData(table)
  }

  /**
   * 重置所有表格的排序
   * @param table
   */
  private orderByTableData(table: ITableDefinition) {
    let orders = []
    for (let col of table.columns) {
      if (col.orderBy) {
        orders.push({
          pro: this.structure[col.id],
          desc: col.orderBy == ColumnOrderBy.Desc
        })
      }
    }
    let tableName = this.structure[table.id]
    let arr = this.data[tableName]
    if (arr && arr.length > 0) {
      this.data[tableName] = Util.orderByMultiple(arr, orders)
    }
  }

  private filterTableData(table: ITableDefinition) {
    let filters = []
    for (let col of table.columns) {
      if (col.filters) {
        for (let f of col.filters) {
          filters.push(f)
        }
      }
    }

    let dataFilter = new DataFilter(filters, this.structure)
    let rowsBeforeTableFilter: Array<any> =
      this.dataBeforeTableFilter[table.alias || table.name]

    let rows: Array<any> = []
    this.data[table.alias || table.name] = rows
    for (let row of rowsBeforeTableFilter) {
      if (filters.length == 0 || dataFilter.filterRow(row)) {
        rows.push(row)
      }
    }
  }

  getChartData(chart: IChartDefinition) {
    return this.chartFilterData[chart.id]
  }

  getTableData(table: ITableDefinition): Array<any> {
    return this.data[table.alias || table.name]
  }

  getTableDataBeforeTableFilter(table: ITableDefinition): Array<any> {
    return this.dataBeforeTableFilter[table.alias || table.name]
  }

  setTableData(table: ITableDefinition) {
    this.formatTableData(table)
    this.formatDataStructure()
    this.resetFilterData()
  }

  addTable(table: ITableDefinition) {
    this.formatTableData(table)
    this.formatDataStructure()
    this.resetFilterData()
  }

  removeTable(table: ITableDefinition) {
    delete this.data[table.alias || table.name]
    delete this.dataBeforeTableFilter[table.alias || table.name]
    this.resetFilterData()
    this.formatDataStructure()
  }

  renameTable(table: ITableDefinition, alias: string) {
    let preName = table.alias || table.name
    table.alias = alias
    this.data[alias] = this.data[preName]
    this.dataBeforeTableFilter[alias] = this.dataBeforeTableFilter[preName]
    delete this.data[preName]
    delete this.dataBeforeTableFilter[preName]
    this.resetFilterData()
    this.formatDataStructure()
  }

  editTableFormula(table: ITableDefinition) {
    this.formatTableData(table)
    this.formatDataStructure()
    this.resetFilterData()
  }

  addColumn(table: ITableDefinition) {
    this.formatTableData(table)
    this.formatDataStructure()
    this.resetFilterData()
  }

  editColumn(table: ITableDefinition) {
    this.formatTableData(table)
    this.formatDataStructure()
    this.resetFilterData()
  }

  renameColumn(table: ITableDefinition) {
    this.formatTableData(table)
    this.formatDataStructure()
    this.resetFilterData()
  }

  editColumnType(table: ITableDefinition) {
    this.formatTableData(table)
    this.resetFilterData()
  }

  editColumnFilter(table: ITableDefinition) {
    this.filterTableData(table)
    this.resetFilterData()
  }

  editColumnOrderBy(table: ITableDefinition) {
    this.orderByTableData(table)
    this.resetFilterData()
  }

  editColumnFormula(table: ITableDefinition) {
    this.formatTableData(table)
    this.resetFilterData()
  }

  removeColumn(table: ITableDefinition) {
    this.formatTableData(table)
    this.formatDataStructure()
    this.resetFilterData()
  }

  addChart(chart: IChartDefinition) {
    this.resetChartFilterData(chart)
  }

  removeChart(chart: IChartDefinition) {
    eachChart(chart, (item: IChartDefinition) => {
      delete this.chartFilterData[item.id]
      this.updateFields(item)
    })
  }

  updateRelations() {
    this.resetFilterData()
  }

  updateRole() {
    this.formatData()
    this.resetFilterData()
  }

  updateFields(chart: IChartDefinition) {
    if (this.chartTempData.has(chart.id)) {
      let temp = this.chartTempData.get(chart.id)!
      this.chartTempData.delete(chart.id)
      if (temp.filters.length > 0) {
        // 如果有过滤条件， 需要重置刷新数据
        this.resetFilterData()
      }
    }
  }

  updateFilter(chart: IChartDefinition) {
    if (this.definition.chart == chart) {
      this.resetFilterData()
    } else {
      this.chartFilterData[chart.id] = this.getDataAfterFilter(
        this.globalFilterData,
        this.getChartFilters(chart)
      )
    }
  }

  updateGlobalFilter() {
    this.resetFilterData()
  }

  private formatDataStructure() {
    let structure: any = {}
    for (let table of this.definition.tables) {
      structure[table.id] = table.alias || table.name
      for (let column of table.columns) {
        structure[column.id] = column.alias || column.name
      }
    }
    this.structure = structure
  }
  getDataStructure() {
    return this.structure
  }

  getStrctureNames(field: IFieldInfo) {
    return [this.structure[field.tableId], this.structure[field.columnId]]
  }
}
