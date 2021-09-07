import {IRelationshipDefinition, RelationshipType} from '../package'
import {CodeExpression, Formula, Util} from '../common'

export enum DataMergeMethod {
  // 以第一行栏目为主栏目，分组关联其他栏目合并，形成表格数据
  table = 'table',
  // 无主栏目，各栏目独立合并为单个数据，形成一行数据
  row = 'row'
}

export enum DataMergeType {
  none = 'none',
  count = 'count',
  distinctCount = 'distinctCount',
  sum = 'sum',
  min = 'min',
  max = 'max',
  first = 'first',
  last = 'last',
  avg = 'avg',
  collection = 'collection',
  code = 'code'
}

export interface IFieldInfo {
  tableId: string
  columnId: string
  mergeType: DataMergeType
  mergeCode?: string
  displayName?: string
  formatter?: string
}

export enum FilterExpression {
  none = '',
  and = '&&',
  or = '||',
  leftParentheses = '(',
  rightParentheses = ')',
  eq = 'eq',
  contains = 'contains',
  in = 'in',
  notContains = 'notContains', // 不包含
  startsWith = 'startsWith', // 开头是
  notStartsWith = 'notStartsWith', // 开头不是
  notEq = 'notEq', // 不等于
  isNull = 'isNull', // 为空
  isNotNull = 'isNotNull', // 不为空
  gt = 'gt', //大于
  gtOrEq = 'gtOrEq', // 大于等于
  lt = 'lt', // 小于
  ltOrEq = 'ltOrEq' // 小于等于
}

export enum FilterType {
  basic = 'basic',
  advanced = 'advanced',
  code = 'code',
  role = 'role'
}

export interface IFilterCondition {
  expression: FilterExpression
  value: any
}

export interface IFilterInfo {
  field: IFieldInfo
  enabled: boolean
  filterType: FilterType

  /**
   * advanced filter mergeExpression and conditions
   */
  mergeExpression: FilterExpression.and | FilterExpression.or
  conditions: Array<IFilterCondition>
  /**
   *  basic filter data values
   */
  values: any

  code: string | Function
}

export class DataFilter {
  filterInfos: Array<IFilterInfo>
  structure: any
  data: any = null
  relationships: Array<IRelationshipDefinition> = []
  constructor(filterInfos: Array<IFilterInfo>, structure: any) {
    this.filterInfos = Util.filter(filterInfos, {enabled: true})
    this.structure = structure
  }

  getCodeExpression(filterInfos: Array<IFilterInfo>) {
    let code = ''
    let index = 0
    for (let filterInfo of filterInfos) {
      let fieldExpression = `row['${
        this.structure[filterInfo.field.columnId]
      }']`
      let filterCode = ''
      if (filterInfo.filterType == FilterType.advanced) {
        let j = 0
        for (let condtion of filterInfo.conditions) {
          let conCode = `formula.${condtion.expression}(${fieldExpression}, filters[${index}].conditions[${j}].value)`
          if (filterCode) {
            filterCode += ` ${filterInfo.mergeExpression} ${conCode}`
          } else {
            filterCode = conCode
          }
          j++
        }
      } else if (filterInfo.filterType == FilterType.basic) {
        if (filterInfo.values && filterInfo.values.length > 0) {
          filterCode = `formula.${FilterExpression.in}(${fieldExpression}, filters[${index}].values)`
        }
      } else if (
        filterInfo.filterType == FilterType.code &&
        filterInfo.code &&
        typeof filterInfo.code == 'string'
      ) {
        filterCode = filterInfo.code
      } else if (filterInfo.filterType == FilterType.role) {
        filterCode = `!DataHu.roles || DataHu.roles.indexOf(${fieldExpression}) >= 0`
      }
      if (filterCode) {
        if (code) {
          code += ` ${FilterExpression.and} (${filterCode})`
        } else {
          code = `(${filterCode})`
        }
      }
      index++
    }
    return new CodeExpression(code, ['row', 'filters', 'formula'])
  }

  filter(data: any, relationships: Array<IRelationshipDefinition>): any {
    this.data = data
    this.relationships = relationships
    if (this.filterInfos && this.filterInfos.length > 0) {
      let groupByTables: Array<Array<IFilterInfo>> = Util.groupBy(
        this.filterInfos,
        (a: IFilterInfo, b: IFilterInfo) => a.field.tableId == b.field.tableId
      )

      for (let tableFilters of groupByTables) {
        let tableId = tableFilters[0].field.tableId
        let table = this.structure[tableId]
        let result = []
        let codeExpression = this.getCodeExpression(tableFilters)
        for (let row of this.data[table]) {
          if (
            this.filterRowWithExpression(row, codeExpression) &&
            this.filterRowWithCode(row, tableFilters)
          ) {
            result.push(row)
          }
        }
        this.data[table] = result

        let filteredRelationships: Array<IRelationshipDefinition> = []
        this.filterRelationships(tableId, filteredRelationships)
      }
    }
    return this.data
  }

  private filterRowWithExpression(row: any, codeExpression: CodeExpression) {
    if (
      !codeExpression.code ||
      codeExpression?.run(row, this.filterInfos, Formula)
    ) {
      return true
    } else {
      return false
    }
  }

  private filterRowWithCode(row: any, filters: Array<IFilterInfo>) {
    let result = true
    for (let filterInfo of filters) {
      if (
        filterInfo.filterType == FilterType.code &&
        typeof filterInfo.code == 'function'
      ) {
        let colName = this.structure[filterInfo.field.columnId]
        let r = filterInfo.code.apply(null, [
          row[colName],
          filterInfo.values,
          Formula
        ])
        if (!r) {
          return false
        }
      }
    }
    return result
  }

  filterRow(row: any) {
    let codeExpression = this.getCodeExpression(this.filterInfos)
    return (
      this.filterRowWithExpression(row, codeExpression) &&
      this.filterRowWithCode(row, this.filterInfos)
    )
  }

  filterRelationships(
    tableId: string,
    filteredRelationships: Array<IRelationshipDefinition>
  ) {
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
      if (tableId == relation.from[0]) {
        filterRelation.from = relation.from
        filterRelation.to = relation.to
        filteredRelationships.push(relation)
      } else if (
        tableId == relation.to[0] &&
        relation.type == RelationshipType.TwoWay
      ) {
        filterRelation.from = relation.to
        filterRelation.to = relation.from
        filteredRelationships.push(relation)
      }
      if (filterRelation.from.length == 2) {
        this.filterRelationship(filterRelation, filteredRelationships)
      }
    }
  }

  filterRelationship(
    filterRelation: IRelationshipDefinition,
    filteredRelationships: Array<IRelationshipDefinition>
  ) {
    let fromTable = this.structure[filterRelation.from[0]]
    let fromColumn = this.structure[filterRelation.from[1]]

    let toTable = this.structure[filterRelation.to[0]]
    let toColumn = this.structure[filterRelation.to[1]]

    let fromRows = this.data[fromTable]
    let toRows = this.data[toTable]

    let results = []
    for (let toRow of toRows) {
      let pass = false
      for (let fromRow of fromRows) {
        if (Formula.eq(fromRow[fromColumn], toRow[toColumn])) {
          pass = true
          break
        }
      }
      if (pass) {
        results.push(toRow)
      }
    }
    this.data[toTable] = results
    this.filterRelationships(filterRelation.to[0], filteredRelationships)
  }
}
