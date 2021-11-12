import {
  reactive,
  ref,
  computed,
  onMounted,
  ComputedRef,
  isReactive,
  isRef,
  UnwrapRef,
  nextTick
} from 'vue'
import {getThemes, IFieldInfo, Util} from '@datahu/core'
import http from './http'
import {I18n, I18nStrings} from '../i18n'
import enUS from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import {PackageManager} from './PackageManager'
import * as echarts from 'echarts'
import {getComponents} from '@datahu/component'
import {
  Formula,
  IComponent,
  Parameter,
  Formatter,
  ITableDefinition,
  IColumnDefinition,
  IChartDefinition
} from '@datahu/core'
export enum DragTargetType {
  column = 'column',
  field = 'field',
  filter = 'filter',
  chart = 'chart'
}
export class DragContext {
  target: any
  from: any
  type: DragTargetType
  dropTarget: any
  // 鼠标移动到field上时
  hoverField: any
}

interface IState {
  loaded: boolean
  loading: boolean
  store: any
  pkg: PackageManager
  components: any

  /**
   * 打开预览
   */
  preview: boolean
  /**
   * 显示登录框
   */
  login: boolean

  /**
   * 进入登录弹出框时的提示信息
   */
  loginEnd: any

  /**
   * 发布弹出框
   */
  publish: boolean

  // table
  selectedTable?: ITableDefinition
  selectedColumn?: IColumnDefinition

  // chart
  focusItem: any
  focusDropPanel: any
  copyedCharts: Array<IChartDefinition>
  // 格式刷来源
  formatPainterChart: IChartDefinition | null
  root: any
  dragContext: DragContext

  // actions
  openLink: any

  // 处理usedata schema时，自动进入数据源页时的缓存值，用完即清理
  usedata: any

  // 视图
  viewMode: any

  // 缩放比例
  zoomRate: number

  // 显示关系管理弹出框
  showEditRelationship: boolean
}

export async function openLink(url: string) {
  await http.request('ServerRequest/openLink', {url})
}

const state = reactive({
  loaded: false,
  loading: false,
  store: null,
  pkg: null as any,
  components: getComponents(),
  preview: false,
  login: false,
  loginEnd: null,
  publish: false,
  // table
  selectedTable: undefined,
  selectedColumn: undefined,

  // chart
  focusItem: null,
  focusDropPanel: null,
  copyedCharts: [],
  // 格式刷来源
  formatPainterChart: null,
  root: null,
  dragContext: new DragContext(),

  //actions
  openLink: openLink,

  usedata: null,

  viewMode: null,

  // 缩放比例
  zoomRate: 100,

  showEditRelationship: false
}) as IState

let initGlobalContext = () => {
  let DataHu = {
    get tables() {
      return state.pkg ? state.pkg.dataContext.getData() : {}
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
      if (state.store && state.store.user) {
        return state.store.user.user || {}
      }
      return null
    },
    get roles() {
      return state.pkg.definition.mockRoles
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

export async function loadStore() {
  try {
    state.loading = true
    initGlobalContext()
    initThemes()
    var store = await http.request('LocalStore/getStore', {})
    state.store = store as any
    state.loading = false
  } catch (e) {
    console.error(e)
    state.loading = false
  }
}

export async function loadPkg() {
  let newPkg = await PackageManager.loadFrom()
  if (newPkg) {
    state.pkg = newPkg
    state.pkg.init()
    state.loaded = false

    resetState()
    nextTick(() => {
      state.loaded = true
    })
  }
}

export async function loadPkgFromPath(recenty: any) {
  state.loading = true
  try {
    let pkg: any = await PackageManager.load(recenty.path)
    if (pkg) {
      state.pkg = pkg
      state.pkg.init()
      state.loaded = false
      resetState()
      nextTick(() => {
        state.loaded = true
      })
      state.loading = false
    } else {
      state.loading = false
    }
  } catch (e) {
    console.error(e)
    state.loading = false
  }
}

export async function newPkg() {
  state.loaded = false
  let newPkg = PackageManager.emptyPkg()
  state.pkg = newPkg
  state.pkg.init()
  nextTick(() => {
    state.loaded = true
  })
}

export async function loadComponents() {
  var results: any = await import('@datahu/component')

  state.components = results.Components
}

export function useState(): IState {
  return state
}

export function resetState() {
  state.selectedTable = null as any
  state.selectedColumn = null as any
}

export function useLanguage(): ComputedRef<string> {
  return computed({
    get() {
      let language = 'zh-cn'
      if (state.store && state.store.language) {
        language = state.store.language
      }
      return language
    },
    set(v) {
      state.store.language = v
      http.request('LocalStore/setLanguageStore', {language: v})
    }
  })
}

export function useI18n(): ComputedRef<I18nStrings> {
  let i18n = computed((): I18nStrings => {
    return I18n.get(useLanguage().value as string)
  })
  return i18n
}

export function useAntLocale(): ComputedRef<any> {
  let locale = computed(() => {
    switch (useLanguage().value) {
      case 'zh-cn':
        return zhCN
      default:
        return enUS
    }
  })
  return locale
}
