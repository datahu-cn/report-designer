import {Util, Formula, CodeExpression} from '../common'
import {
  IRelationshipDefinition,
  RelationshipType,
  IChartDefinition
} from '../package'
import {DataContext} from './DataContext'
import {
  DataMergeType,
  IFieldInfo,
  IFilterInfo,
  FilterExpression,
  FilterType,
  DataMergeMethod
} from './DataFilter'

/**
 * 数据合并前置约定条件：
 * 1、数据合并必须以一个主栏目开始、 其他栏目都是值或描述栏目， 按主栏目分组合并
 * 2、当主栏目为多个时，按栏目顺序执行数据下钻， 所以同时生效的主栏目只有一个
 */
export class ChartData {
  private dataContext: DataContext
  private chart: IChartDefinition

  private data: any
  fieldMap: any
  private relationships: Array<IRelationshipDefinition> = []
  structure: any
  // rows: Array<any> = []

  private ralationshipCache: any = {}

  // 查询2个表建的关联数据时，主表关联字段值相同时，对应的关联数据相同
  private relationshipDataCache: any = {}
  // 将表格数据按指定栏目分组后转换成map存储
  private mapTableCache: any = {}
  fields: Array<IFieldInfo> = []

  mainFields: Array<IFieldInfo> = []
  mainField: IFieldInfo | null = null
  private i18n: any

  /**
   * 数据下钻状态： level:数据深度， index: 当前数据所属深度
   */
  public drillStatus = {
    level: 0,
    index: 0
  }

  private dataset = {
    data: [[]] as Array<Array<any>>,
    map: {} as any
  }

  constructor(i18n: any, dataContext: DataContext, chart: IChartDefinition) {
    this.i18n = i18n
    this.dataContext = dataContext
    this.chart = chart
    this.relationships = this.dataContext.definition.relationships

    this.data = this.dataContext.getChartData(this.chart)

    this.fieldMap = this.chart.option.fields
    this.structure = this.dataContext.getDataStructure()

    this.fields = []
    let index = 0
    for (let key in this.fieldMap) {
      if (index == 0) {
        index++
        continue
      }
      index++
      let infos = this.fieldMap[key]
      if (infos && infos.length > 0) {
        for (let info of infos) {
          this.fields.push(info)
        }
      }
    }
    this.initMainField()
    this.initDatasetInfo()
    if (!this.data) {
      // 数据为空，主要是删除图表时的问题
      return
    }
    this.merge()
  }

  public isReady(): boolean {
    return !!this.mainField
  }

  private initDatasetInfo() {
    if (!this.mainField) {
      return
    }
    if (this.chart.option.mergeMethod == DataMergeMethod.row) {
      for (let key in this.fieldMap) {
        let infos = this.fieldMap[key]
        this.dataset.map[key] = []
        if (infos && infos.length > 0) {
          for (let info of infos) {
            this.dataset.data[0].push(this.getFieldName(info))
            this.dataset.map[key].push(this.dataset.data[0].length - 1)
          }
        }
      }
    } else {
      this.dataset.data[0].push(this.getFieldName(this.mainField))
      let index = 0
      for (let key in this.fieldMap) {
        if (index == 0) {
          index++
          continue
        }
        index++

        let infos = this.fieldMap[key]
        this.dataset.map[key] = []
        if (infos && infos.length > 0) {
          for (let info of infos) {
            this.dataset.data[0].push(this.getFieldName(info))
            this.dataset.map[key].push(this.dataset.data[0].length - 1)
          }
        }
      }
    }
  }

  /**
   * 获取dataset数据中，数据表头对应的栏目信息
   * @param datasetIndex
   * @returns
   */
  public getFieldByDatasetIndex(datasetIndex: number): IFieldInfo | null {
    if (datasetIndex == 0) {
      return this.mainField
    } else {
      let index = 0
      for (let key in this.fieldMap) {
        if (
          index == 0 &&
          this.chart.option.mergeMethod == DataMergeMethod.table
        ) {
          index++
          continue
        }

        let infos = this.fieldMap[key]
        if (infos && infos.length > 0) {
          for (let info of infos) {
            if (index == datasetIndex) {
              return info
            }
            index++
          }
        }
      }
    }

    return null
  }

  public getDatasetIndexByField(field: IFieldInfo): number | null {
    if (field == this.mainField) {
      return 0
    }
    let index = 0
    for (let key in this.fieldMap) {
      if (
        index == 0 &&
        this.chart.option.mergeMethod == DataMergeMethod.table
      ) {
        index++
        continue
      }

      let infos = this.fieldMap[key]
      if (infos && infos.length > 0) {
        for (let info of infos) {
          if (info == field) {
            return index
          }
          index++
        }
      }
    }
    return null
  }

  public getFieldByName(fieldName: string): IFieldInfo | undefined {
    for (let key in this.fieldMap) {
      let infos = this.fieldMap[key]
      if (infos && infos.length > 0) {
        for (let info of infos) {
          let name = this.getFieldName(info)
          if (name == fieldName) {
            return info
          }
        }
      }
    }
  }

  /** 获取临时过滤之前的图表数据， 一般用于切片器刷选， 切片器不受自身和其他切片器过滤影响 */
  public getRowBeforeTempFilter(field: IFieldInfo): Array<any> {
    return Util.getRow(
      this.dataContext.getGlobalFilterBeforeTempData(this.chart)[
        this.structure[field.tableId]
      ],
      this.structure[field.columnId]
    )
  }

  public getMainRowBeforeTempFilter() {
    if (!this.mainField) {
      return []
    }
    return this.getRowBeforeTempFilter(this.mainField!)
  }

  public getRow(field: IFieldInfo): Array<any> {
    let index = this.getDatasetIndexByField(field)
    if (index != null) {
      let row = []
      for (let i = 1; i < this.dataset.data.length; i++) {
        row.push(this.dataset.data[i][index])
      }
      return row
    }
    return []
  }
  public getMainRow(): Array<any> {
    if (!this.mainField) {
      return []
    }
    return this.getRow(this.mainField!)
  }

  public getFieldName(field: IFieldInfo): string {
    if (field.displayName) {
      return field.displayName
    } else {
      let key = 'merge_type_' + field.mergeType
      if (this.i18n.value && this.i18n.value[key]) {
        key = this.i18n.value['merge_type_' + field.mergeType]
      } else {
        key = ''
      }
      return Util.format(
        key,
        this.structure[field.tableId],
        this.structure[field.columnId]
      )
    }
  }

  setFilter(value: any, compare: Function) {
    if (this.mainField) {
      let filter: IFilterInfo = {
        field: this.mainField,
        enabled: true,
        filterType: FilterType.code,
        values: value,
        code: compare,
        mergeExpression: FilterExpression.and,
        conditions: []
      }
      this.dataContext.setChartTempData(this.chart, [filter], null)
    }
  }

  /**
   * 数据下钻
   * @param name
   */
  drillDown(name: any) {
    let mainFields: Array<IFieldInfo> = []
    for (let key in this.fieldMap) {
      mainFields = this.fieldMap[key]
      break
    }
    let mainIndex = mainFields.indexOf(this.mainField!)
    // 最后一层时不能继续下钻
    if (mainIndex < mainFields.length - 1) {
      let nextMainField = mainFields[mainIndex + 1]
      let filter: IFilterInfo = {
        field: this.mainField!,
        enabled: true,
        filterType: FilterType.advanced,
        values: [],
        code: '',
        mergeExpression: FilterExpression.and,
        conditions: [{expression: FilterExpression.eq, value: name}]
      }
      this.dataContext.setChartTempData(
        this.chart,
        [filter],
        nextMainField.columnId
      )
    }
  }

  /**
   * level: 0 恢复， 1： 下钻一层  -1: 上回一层
   * @param level
   */
  drillDownLevel(level: number) {
    let index = this.drillStatus.index + level
    if (level == 0 || index == 0) {
      // 恢复
      this.dataContext.setChartTempData(this.chart, [], '')
    } else {
      let drillField = this.mainFields[index]
      this.dataContext.setChartTempData(this.chart, [], drillField.columnId)
    }
  }

  /**
   * 未指定主栏目时，默认第一个栏目为主栏目
   */
  private initMainField() {
    let mainFields: Array<IFieldInfo> = []
    for (let key in this.fieldMap) {
      mainFields = this.fieldMap[key]
      break
    }
    this.mainFields = mainFields
    this.drillStatus.level = mainFields.length
    if (mainFields.length > 0) {
      let tempData = this.dataContext.getChartTempData(this.chart.id)
      if (tempData && tempData.mainFieldId) {
        for (let f of mainFields) {
          if (f.columnId == tempData.mainFieldId) {
            this.drillStatus.index = mainFields.indexOf(f)
            this.mainField = f
            return
          }
        }
      }
      this.drillStatus.index = 0
      this.mainField = mainFields[0]
      return
    } else {
      return null
    }
  }

  /**
   * 第一组栏目默认为主栏目， 当有多组栏目时，第一组栏目必须为不汇总栏目，其他栏目根据第一组栏目选择的主栏目进行分组汇总， 合并为一个表格
   * 当只有一组栏目时， 第一组栏目可以进行汇总，用于卡片组件中
   * @returns
   */
  private merge() {
    this.ralationshipCache = {}
    this.relationshipDataCache = {}
    this.mapTableCache = []
    if (!this.mainField) {
      return []
    }
    let mainRowData: Map<any, any> = new Map()
    let mainFieldName = this.structure[this.mainField.tableId]
    if (!mainFieldName) {
      return []
    }

    //只有主栏目，而且主栏目进行汇总时
    // let mergeRows: Array<any> = []
    if (this.chart.option.mergeMethod == DataMergeMethod.row) {
      let arr: Array<any> = []
      // let row: any = {}
      for (let key in this.fieldMap) {
        let infos = this.fieldMap[key]
        if (infos && infos.length > 0) {
          for (let info of infos) {
            let v = this.getFieldMergeValue(
              this.data[this.structure[info.tableId]],
              info
            )
            arr.push(v)
            // row[info.columnId] = v
          }
        }
      }
      this.dataset.data.push(arr)
      // mergeRows.push(row)
    } else {
      // 主栏目不进行合并
      for (let row of this.data[this.structure[this.mainField.tableId]]) {
        let v = row[this.structure[this.mainField.columnId]]
        if (!mainRowData.has(v)) {
          mainRowData.set(v, new Map())
        }
        let currentData: Map<IFieldInfo, Array<any>> = mainRowData.get(v)
        for (let field of this.fields) {
          if (!currentData.has(field)) {
            currentData.set(field, [])
          }
          let fieldRows = currentData.get(field) as Array<any>
          let appandRows = this.getFieldRows(this.mainField, row, field)
          for (let appendRow of appandRows) {
            if (fieldRows.indexOf(appendRow) < 0) {
              fieldRows.push(appendRow)
            }
          }
        }
      }
      for (let mainV of mainRowData) {
        // let mergeRow: any = {}
        let arr = []
        arr.push(mainV[0])
        // mergeRow[this.mainField.columnId] = mainV[0]
        for (let fieldV of mainV[1]) {
          let v = this.getFieldMergeValue(fieldV[1], fieldV[0])
          // mergeRow[fieldV[0].columnId] = v
          arr.push(v)
        }
        this.dataset.data.push(arr)
        // mergeRows.push(mergeRow)
      }
    }
    // return mergeRows
  }

  public getDataset() {
    return this.dataset
  }

  private getFieldMergeValue(rows: Array<any>, field: IFieldInfo): any {
    let columnName = this.structure[field.columnId]
    return this.getMergeValue(
      rows,
      columnName,
      field.mergeType,
      field.mergeCode
    )
  }

  public getMergeValue(
    rows: Array<any>,
    columnName: string,
    mergeType: DataMergeType,
    mergeCode: string | null = null
  ): any {
    switch (mergeType) {
      case DataMergeType.none:
        return Formula.first(rows, columnName)
      case DataMergeType.code:
        if (mergeCode) {
          return CodeExpression.runCode(
            mergeCode,
            ['rows', 'column'],
            rows,
            columnName
          )
        } else {
          return Formula.first(rows, columnName)
        }
      default:
        let formula = Formula as any
        return formula[mergeType](rows, columnName)
    }
    return null
  }

  private getFieldRows(
    mainField: IFieldInfo,
    mainRow: any,
    targetfield: IFieldInfo
  ): Array<any> {
    // 相同的表返回自身即可
    if (mainField.tableId == targetfield.tableId) {
      return [mainRow]
    }

    // 获取2个表之间的关联关系

    let relations = this.getConnectRelationships(
      mainField.tableId,
      targetfield.tableId
    )

    // 如果2个表之间没有关联，则直接返回目标表全部数据
    if (relations.length == 0) {
      return this.data[this.structure[targetfield.tableId]]
    }

    // 如果2个表之间有关联，则循环直到目标表的所有数据
    let filterRows = [mainRow]
    for (let relation of relations) {
      filterRows = this.filterRelationRows(mainRow, relation)
    }
    return filterRows
  }

  private filterRelationRows(
    mainRow: any,
    relationship: IRelationshipDefinition
  ): Array<any> {
    let fromColumn = this.structure[relationship.from[1]]
    let results = []
    let keyValue = mainRow[fromColumn]
    let cacheKey = `${relationship.from[1]}|${relationship.to[1]}|${keyValue}`
    if (this.relationshipDataCache[cacheKey]) {
      return this.relationshipDataCache[cacheKey]
    }

    let mapData = this.getGroupByMap(relationship.to[0], relationship.to[1])

    if (mapData.has(keyValue)) {
      results = mapData.get(keyValue)!
    }
    this.relationshipDataCache[cacheKey] = results
    return results
  }

  private getGroupByMap(
    tableId: string,
    columnId: string
  ): Map<any, Array<any>> {
    let key = `${tableId}|${columnId}`
    if (this.mapTableCache[key]) {
      return this.mapTableCache[key]
    }

    let rows = this.data[this.structure[tableId]]
    let toColumn = this.structure[columnId]
    let mapData = new Map<any, Array<any>>()
    for (let row of rows) {
      let v = row[toColumn]
      if (!mapData.has(v)) {
        mapData.set(v, [])
      }
      mapData.get(v)!.push(row)
    }

    this.mapTableCache[key] = mapData
    return mapData
  }

  private getConnectRelationships(
    fromTableId: string,
    toTableId: string
  ): Array<IRelationshipDefinition> {
    let key = `${fromTableId}-${toTableId}`
    if (this.ralationshipCache[key]) {
      return this.ralationshipCache[key]
    }
    let filteredRelationships: Array<IRelationshipDefinition> = []
    let relationPath: Array<IRelationshipDefinition> = []
    let relations = this.innerGetConnectRelationships(
      fromTableId,
      toTableId,
      filteredRelationships,
      relationPath
    )
    this.ralationshipCache[key] = relations
    return relations
  }
  /**
   * 获取2个表格间的关联关系路线
   * @param fromTableId
   * @param toTableId
   * @param filteredRelationships
   * @param relationPath
   * @returns
   */
  private innerGetConnectRelationships(
    fromTableId: string,
    toTableId: string,
    filteredRelationships: Array<IRelationshipDefinition>,
    relationPath: Array<IRelationshipDefinition>
  ): Array<IRelationshipDefinition> {
    for (let relation of this.relationships) {
      // 避免循环关联
      if (filteredRelationships.indexOf(relation) >= 0) {
        continue
      }
      let filterRelation: IRelationshipDefinition = {
        from: [],
        to: [],
        type: RelationshipType.OneWay
      }
      // 数据合并不区分关联方向，是否单向和双向， 关联方向只影响 filter
      if (fromTableId == relation.from[0]) {
        filterRelation.from = relation.from
        filterRelation.to = relation.to
        filteredRelationships.push(relation)
      } else if (fromTableId == relation.to[0]) {
        filterRelation.from = relation.to
        filterRelation.to = relation.from
        filteredRelationships.push(relation)
      }

      if (filterRelation.from.length > 0) {
        let newRelationPath = []
        for (let r of relationPath) {
          newRelationPath.push(r)
        }
        newRelationPath.push(filterRelation)
        if (filterRelation.to[0] == toTableId) {
          return newRelationPath
        } else {
          let subResults = this.innerGetConnectRelationships(
            filterRelation.to[0],
            toTableId,
            filteredRelationships,
            newRelationPath
          )
          if (subResults.length > 0) {
            return subResults
          }
        }
      }
    }
    return []
  }
}
