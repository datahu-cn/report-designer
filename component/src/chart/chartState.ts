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
}

let pageHistories: Array<string> = []
const chartState = reactive({
  currentPage: '',
  chartHandler: new ChartHandler(),
  unit: '%'
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
  pageHistories.push(id)
  chartState.currentPage = id
}

export function goBack() {
  let index = pageHistories.indexOf(chartState.currentPage)
  if (index > 0) {
    chartState.currentPage = pageHistories[index - 1]
    return 1
  }
  return 0
}

export function userChartState() {
  return chartState
}
