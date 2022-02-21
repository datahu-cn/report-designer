import {
  IControl,
  ControlType,
  ComponentControl,
  StyleType,
  FieldSelectType,
  DataMergeMethod,
  Util,
  IPackageDefinition,
  TableCacheType
} from '@datahu/core'
import {
  BaseComponent,
  BaseComponentOption,
  StyleComponentOption
} from '@datahu/component-base'
import RefreshControl from './RefreshControl.vue'

class RefreshScheduleComponentOption {
  _enabled: boolean = false
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({
    type: ControlType.select,
    title: '选择刷新表格',
    description: '计算表和非实时数据表无法设置前端数据刷新',
    multiple: true,
    options(option: any, chart: any) {
      let definition: IPackageDefinition = chart.data.dataContext.definition
      let opts = []
      opts.push({label: '所有', value: '_all_'})
      if (definition.tables && definition.tables.length > 0) {
        for (let table of definition.tables) {
          if (
            table.cacheType != TableCacheType.Disabled &&
            table.cacheType != TableCacheType.Enabled &&
            !table.isFormula
          ) {
            // 非实时数据表无法设置前端数据刷新
            opts.push({label: table.alias || table.name, value: table.id})
          }
        }
      }
      return opts
    }
  })
  tables: Array<string> = []

  @ComponentControl({
    type: ControlType.number,
    title: '定时刷新间隔(s)'
  })
  interval: number | null = null

  @ComponentControl({
    type: ControlType.boolean,
    title: '是否允许手动刷新',
    description: '在显示刷新控件时才生效'
  })
  manual: boolean = false

  @ComponentControl({
    type: ControlType.boolean,
    title: '页面加载完成后立即刷新'
  })
  refreshWhenPageLoad: boolean = false
}

class RefreshPanelComponentOption {
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({
    type: ControlType.boolean,
    title: '是否显示刷新控件'
  })
  show: boolean = true

  @ComponentControl({
    type: ControlType.boolean,
    title: '设计时禁用',
    description: '预览和发布后才执行刷新'
  })
  disabledWhenDesign: boolean = false

  @ComponentControl({
    type: ControlType.number,
    title: '是否显示下次刷新倒计时'
  })
  showNextTime: boolean = false
}

class RefreshControlComponentOption extends BaseComponentOption {
  static controls = []

  @ComponentControl({
    type: ControlType.subset,
    title: '刷新控件',
    children: RefreshPanelComponentOption.controls,
    enableProperty: 'show',
    defaultValue: new RefreshPanelComponentOption()
  })
  refreshPanel: RefreshPanelComponentOption = new RefreshPanelComponentOption()

  @ComponentControl({
    type: ControlType.subset,
    title: '刷新计划',
    children: RefreshScheduleComponentOption.controls,
    array: true,
    addable: true,
    enableProperty: '_enabled',
    defaultValue: new RefreshScheduleComponentOption()
  })
  refreshSchedules: Array<RefreshScheduleComponentOption> = [
    new RefreshScheduleComponentOption()
  ]
}

export class RefreshControlComponent extends BaseComponent {
  isLayout: boolean = false
  icon: string = `<svg t="1645447617100" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2330"><path d="M512 106.666667a405.333333 405.333333 0 1 0 405.333333 405.333333A405.333333 405.333333 0 0 0 512 106.666667z m216.96 540.885333a255.786667 255.786667 0 0 1-471.274667-107.072l-7.936 7.936a21.333333 21.333333 0 0 1-30.165333-30.165333l42.666667-42.666667a21.333333 21.333333 0 0 1 30.165333 0l42.666667 42.666667a21.333333 21.333333 0 1 1-30.165334 30.165333l-2.901333-2.901333a212.693333 212.693333 0 0 0 390.784 79.402666 21.333333 21.333333 0 1 1 36.16 22.613334z m32.789333-99.136a21.333333 21.333333 0 0 1-30.165333 0l-42.666667-42.666667a21.333333 21.333333 0 0 1 30.165334-30.165333l2.922666 2.901333a212.693333 212.693333 0 0 0-390.805333-79.402666 21.333333 21.333333 0 1 1-36.16-22.613334 255.786667 255.786667 0 0 1 471.274667 107.050667l7.936-7.936a21.333333 21.333333 0 0 1 30.165333 30.165333z" fill="#7678ed" p-id="2331"></path></svg>`
  constructor(language: string) {
    super(language)
    this.option.pos.width = '40px'
    this.option.pos.height = '40px'
  }
  title: string = '数据刷新'
  option: RefreshControlComponentOption = new RefreshControlComponentOption()
  getComponent() {
    return RefreshControl
  }
}
