import {PackageManager} from './PackageManager'
import {reactive, computed, ComputedRef, WritableComputedRef} from 'vue'
import {I18n, I18nStrings} from './i18n'
import * as echarts from 'echarts'
import {getComponents} from '@datahu/component'

import {
  Formula,
  IComponent,
  Parameter,
  Formatter,
  ITableDefinition,
  IColumnDefinition,
  IChartDefinition,
  getThemes,
  Util
} from '@datahu/core'
import {Helper} from './helper'

export enum DragTargetType {
  column = 'column',
  field = 'field',
  filter = 'filter',
  chart = 'chart'
}
export class DragContext {
  target: any
  from: any
  type: DragTargetType | undefined
  dropTarget: any
}

export async function openLink(url: string) {
  window.open(url)
}

interface IState {
  pkg: PackageManager
  components: any
  preview: boolean
  loaded: boolean

  // chart
  focusItem: any
  focusDropPanel: any
  copyedCharts: Array<IChartDefinition>
  root: any
  dragContext: DragContext

  // actions
  openLink: any
}

let state = reactive({
  pkg: null as any,
  components: getComponents(),
  preview: true,
  loaded: false,

  // chart
  focusItem: null,
  focusDropPanel: null,
  copyedCharts: [],
  root: null,
  dragContext: new DragContext(),

  //actions
  openLink: openLink
}) as IState

let initGlobalContext = () => {
  let DataHu = {
    get tables() {
      return state.pkg!.dataContext.getData()
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
      return Helper.globalData.user
    },
    get roles() {
      return Helper.globalData.roles
    }
  }
  let w = window as any
  w['DataHu'] = DataHu
}

export function initThemes() {
  let themes = getThemes()
  for (let name in themes) {
    echarts.registerTheme(name, themes[name].echarts)
  }
}

export async function initState() {
  initGlobalContext()
  initThemes()
  // await loadComponents()
  state.loaded = true
}

export function useState(): IState {
  return state
}

export async function loadComponents() {
  var results: any = await import('@datahu/component')

  state.components = results.Components
}

export function useLanguage(): WritableComputedRef<string> {
  return computed({
    get(): string {
      let language = 'zh-cn'
      return language
    },
    set() {}
  })
}

export function useI18n(): ComputedRef<I18nStrings> {
  let i18n = computed((): I18nStrings => {
    return I18n.get(useLanguage().value as string)
  })
  return i18n
}
