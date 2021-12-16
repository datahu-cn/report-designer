import {
  Util,
  IPackageDefinition,
  IConnectorDefinition,
  ITableDefinition,
  IColumnDefinition,
  IChartDefinition,
  IRelationshipDefinition,
  DataContext,
  ITablePosition
} from '@datahu/core'
export class PackageManager {
  definition: IPackageDefinition
  dataContext: DataContext

  constructor(definition: IPackageDefinition) {
    this.definition = definition
    this.dataContext = new DataContext({}, this.definition)
  }

  init() {
    this.dataContext.init()
  }

  getChart(): IChartDefinition {
    return this.definition.chart
  }

  getTheme() {
    if (this.definition.theme) {
      return this.definition.theme
    }
    return 'default'
  }
}
