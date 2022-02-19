import {IPackageDefinition} from '@datahu/core'
import {reactive} from 'vue'
import {ChartHandler} from './ChartHandler'
let context: any = {
  state: null,
  i18n: null,
  language: null
}

interface IChartState {
  currentPage: string
  chartHandler: ChartHandler
  unit: string
  pageHistories: Array<string>
}

const chartState = reactive({
  currentPage: '',
  chartHandler: new ChartHandler(),
  unit: '%',
  pageHistories: []
}) as IChartState

export function setContext(state: any, i18n: any, language: any) {
  context.state = state
  context.i18n = i18n
  context.language = language
}

export function getContext(): any {
  return context
}

export function gotoPage(id: string) {
  chartState.pageHistories.push(id)
  chartState.currentPage = id
}

export function goBack() {
  let index = chartState.pageHistories.indexOf(chartState.currentPage)
  if (index > 0) {
    chartState.currentPage = chartState.pageHistories[index - 1]
    return 1
  }
  return 0
}

export function userChartState() {
  return chartState
}

export function findChartComponent(type: string) {
  if (context.state) {
    let result = context.state.components[type]
    if (!result) {
      result = context.state.emptyChartComponent
    }
    return result
  }
  return null
}
