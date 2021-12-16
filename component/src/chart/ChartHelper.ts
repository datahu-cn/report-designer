import {IChartDefinition, IPackageDefinition, PackageHelper} from '@datahu/core'

export class ChartHelper {
  public chartState: any = null
  public state: any = null
  constructor(chartState: any, state: any) {
    this.chartState = chartState
    this.state = state
  }

  public gotoPage(name: string) {
    let definition: IPackageDefinition = this.state.pkg.definition
    if (definition.chart.children && definition.chart.children.length > 0) {
      for (let c of definition.chart.children) {
        if (name == c.option.title.name) {
          this.chartState.pageHistories.push(c.id)
          this.chartState.currentPage = c.id
          break
        }
      }
    }
  }

  public getChartByTitle(title: string) {
    let searchChart = null
    PackageHelper.eachChart(
      this.state.pkg.definition.chart,
      (chart: IChartDefinition) => {
        if (
          chart.option &&
          chart.option.title &&
          chart.option.title.name == title
        ) {
          searchChart = chart
        }
      }
    )
    return searchChart
  }
}
