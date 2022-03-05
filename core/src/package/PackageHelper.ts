import {IPackageDefinition} from './IPackageDefinition'
import {DataContext} from '../data'
import {
  CodeExpression,
  Formatter,
  Formula,
  ITableDefinition,
  Parameter,
  TableCacheType,
  Util
} from '../common'
import {IChartDefinition} from './IPackageDefinition'

declare var global: any

export class PackageHelper {
  static eachChartById(
    root: IChartDefinition,
    chartId: string,
    handle: Function
  ) {
    let startChart: any = null
    PackageHelper.eachChart(
      root,
      (chart: IChartDefinition, parent: IChartDefinition) => {
        if (chart.id == chartId) {
          startChart = chart
        }
      }
    )
    if (startChart) {
      PackageHelper.eachChart(startChart, handle)
    }
  }

  static runTableSourceCode(
    tables: Array<ITableDefinition>,
    definition: IPackageDefinition
  ) {
    let copyTables: Array<ITableDefinition> = Util.copy(tables)
    for (let table of copyTables) {
      if (table.useSourceCode && table.sourceCode) {
        table.sourceCode = CodeExpression.runCode(
          table.sourceCode,
          ['table', 'definition'],
          table,
          definition
        )
      }
    }
    return copyTables
  }

  static getTablesById(
    definition: IPackageDefinition,
    ids: Array<string>
  ): Array<ITableDefinition> {
    let hasAll = ids.indexOf('_all_') >= 0
    let tables = []
    if (hasAll) {
      for (let table of definition.tables) {
        if (
          table.cacheType != TableCacheType.Disabled &&
          table.cacheType != TableCacheType.Enabled
        ) {
          tables.push(table)
        }
      }
    } else {
      for (let tableId of ids) {
        for (let table of definition.tables) {
          if (
            table.cacheType != TableCacheType.Disabled &&
            table.cacheType != TableCacheType.Enabled &&
            !table.isFormula &&
            table.id == tableId
          ) {
            tables.push(table)
          }
        }
      }
    }
    return tables
  }

  static getTablesByName(
    definition: IPackageDefinition,
    names: Array<string>
  ): Array<ITableDefinition> {
    let tables = []
    for (let tableName of names) {
      for (let table of definition.tables) {
        if (
          table.cacheType != TableCacheType.Disabled &&
          table.cacheType != TableCacheType.Enabled &&
          !table.isFormula &&
          (table.alias || table.name) == tableName
        ) {
          tables.push(table)
        }
      }
    }
    return tables
  }

  static eachChart(chart: IChartDefinition, handle: Function) {
    let innerEachChart = (
      charts: Array<any>,
      parent: IChartDefinition | null = null
    ) => {
      for (let chart of charts) {
        if (typeof chart == 'object' && chart.option) {
          handle(chart, parent)
        }
        if (chart.children && chart.children.length > 0) {
          innerEachChart(chart.children, chart)
        }
        if (chart.length > 0) {
          innerEachChart(chart, parent)
        }
      }
    }
    innerEachChart([chart])
  }

  static getCachePackage(definition: IPackageDefinition) {
    let cacheData: any = {}
    let data: any = null
    let needCachePkg = false

    let needInitContent = false
    for (let table of definition.tables) {
      if (table.cacheType == TableCacheType.Enabled) {
        let dataContext = new DataContext({}, definition)
        let DataHu = {
          get tables() {
            return dataContext.getData()
          },
          get formula() {
            return Formula
          },
          get parameter() {
            return Parameter
          },
          get formatter() {
            return Formatter
          },
          get util() {
            return Util
          },
          get user() {
            return null
          },
          get roles() {
            return null
          }
        }
        let w: any = null
        if (Util.isNode()) {
          w = global
        } else {
          w = window
        }
        w['DataHu'] = DataHu
        dataContext.init()
        data = dataContext.getData()
        break
      }
    }
    for (let table of definition.tables) {
      if (table.cacheType == TableCacheType.Enabled) {
        let tableName = table.alias || table.name
        cacheData[tableName] = data[tableName]
        table.rows = undefined
        needCachePkg = true
      } else if (table.cacheType == TableCacheType.Disabled) {
        table.rows = undefined
        needCachePkg = true
      }
    }
    definition.cacheData = cacheData
    return needCachePkg ? definition : null
  }
}
