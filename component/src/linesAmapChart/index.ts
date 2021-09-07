import {
  IControl,
  ControlType,
  ComponentControl,
  Util,
  StyleType,
  DataMergeType
} from '@datahu/core'
import {
  BaseComponent,
  BaseComponentOption,
  TooltipComponentOption,
  LegendComponentOption,
  GridComponentOption,
  XAxisComponentOption,
  YAxisComponentOption,
  SeriesComponentOption,
  VisualMapComponentOption,
  PolarComponentOption,
  AngleAxisComponentOption,
  RadiusAxisComponentOption,
  DataOperationComponentOption,
  SeriesLabelComponentOption,
  MarkPointComponentOption,
  MarkLineComponentOption,
  MarkAreaComponentOption,
  AmapComponentOption,
  LineStyleComponentOption
} from '../base'
import LinesAmapChart from './LinesAmapChart.vue'

export class FieldComponentOption {
  static controls = []

  @ComponentControl({
    type: ControlType.fieldSelect,
    title: '分组',
    multiple: true
  })
  category = []

  @ComponentControl({
    type: ControlType.fieldSelect,
    title: '路径',
    description: '坐标点的集合，每个坐标的格式为{lng,lat}',
    mergeType: DataMergeType.none,
    multiple: true
  })
  series = []

  @ComponentControl({
    type: ControlType.fieldSelect,
    title: '工具提示',
    multiple: true
  })
  tooltip = []

  @ComponentControl({
    type: ControlType.fieldSelect,
    title: '视觉映射',
    multiple: true
  })
  visual = []
}

export class LinesEffectComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({
    type: ControlType.boolean,
    title: '是否显示特效'
  })
  show: boolean = false

  @ComponentControl({
    type: ControlType.number,
    title: '特效动画时间',
    description: '特效动画的时间，单位为 s'
  })
  period: number = 4

  @ComponentControl({
    type: ControlType.number,
    title: '特效动画延时',
    description: '特效动画的延时，单位ms'
  })
  delay: number = 4

  @ComponentControl({
    type: ControlType.number,
    title: '特效动画固定速度',
    description:
      '配置特效图形的移动动画是否是固定速度，单位像素/秒，设置为大于 0 的值后会忽略特效动画时间。'
  })
  constantSpeed: number = 0

  @ComponentControl({
    type: ControlType.graph,
    title: '特效图形的标记',
    value: {
      get(opt: any) {
        return opt
      },
      set(opt: any, v: any) {}
    },
    show(opt: any) {
      return opt.type != 'bar'
    }
  })
  symbol: string = 'none'
  symbolSize: Array<any> = [10, 10]

  @ComponentControl({
    type: ControlType.color,
    title: '特效标记的颜色'
  })
  color: string = ''

  @ComponentControl({
    type: ControlType.slider,
    title: '特效尾迹的长度',
    description: '特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长。',
    min: 0,
    max: 1,
    step: 0.01
  })
  trailLength: number = 0.2

  @ComponentControl({
    type: ControlType.boolean,
    title: '是否循环显示特效'
  })
  loop: boolean = false
}

export class LinesAmapSeriesComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  type: string = 'lines'

  coordinateSystem: string = 'amap'

  @ComponentControl({
    type: ControlType.boolean,
    title: '是否是多段线'
  })
  polyline: boolean = true

  @ComponentControl({
    type: ControlType.subset,
    title: '路径特效',
    children: LinesEffectComponentOption.controls
  })
  effect: LinesEffectComponentOption = new LinesEffectComponentOption()

  large: boolean = true
  largeThreshold: number = 1000

  @ComponentControl({
    type: ControlType.graph,
    title: '图形标记',
    value: {
      get(opt: any) {
        return opt
      },
      set(opt: any, v: any) {}
    },
    show(opt: any) {
      return opt.type != 'bar'
    }
  })
  symbol: string = 'none'
  symbolSize: Array<any> = [10, 10]

  @ComponentControl({
    type: ControlType.subset,
    title: '标记图形样式',
    children: LineStyleComponentOption.controls
  })
  lineStyle: LineStyleComponentOption = new LineStyleComponentOption()

  @ComponentControl({
    type: ControlType.style,
    title: '文字',
    options: [
      StyleType.fontSize,
      StyleType.color,
      StyleType.fontFamily,
      StyleType.fontWeight
    ],
    show(opt: any) {
      return opt.label.show
    }
  })
  @ComponentControl({
    type: ControlType.subset,
    title: '标签样式',
    children: SeriesLabelComponentOption.controls
  })
  label: SeriesLabelComponentOption = new SeriesLabelComponentOption()

  // @ComponentControl({
  //   type: ControlType.subset,
  //   title: '标记点',
  //   children: MarkPointComponentOption.controls
  // })
  // markPoint: MarkPointComponentOption = new MarkPointComponentOption()

  // @ComponentControl({
  //   type: ControlType.subset,
  //   title: '标记线',
  //   children: MarkLineComponentOption.controls
  // })
  // markLine: MarkLineComponentOption = new MarkLineComponentOption()

  // @ComponentControl({
  //   type: ControlType.subset,
  //   title: '标记区域',
  //   children: MarkAreaComponentOption.controls
  // })
  // markArea: MarkAreaComponentOption = new MarkAreaComponentOption()
}

export class LinesAmapChartComponentOption extends BaseComponentOption {
  static controls: Array<IControl> = []
  @ComponentControl({
    type: ControlType.subset,
    title: '栏',
    children: FieldComponentOption.controls
  })
  fields: FieldComponentOption = new FieldComponentOption()

  @ComponentControl({
    type: ControlType.subset,
    title: '数据',
    children: DataOperationComponentOption.controls
  })
  dataOperation: DataOperationComponentOption = new DataOperationComponentOption(
    {_supportPartRefresh: true, _supportDrillDown: true, _supportScope: true}
  )

  @ComponentControl({
    type: ControlType.subset,
    title: '工具提示',
    children: TooltipComponentOption.controls,
    enableProperty: 'show',
    defaultValue: new TooltipComponentOption()
  })
  tooltip?: TooltipComponentOption = new TooltipComponentOption({show: false})

  @ComponentControl({
    type: ControlType.subset,
    title: '图例标签',
    children: LegendComponentOption.controls,
    enableProperty: 'show',
    defaultValue: new LegendComponentOption()
  })
  legend: LegendComponentOption = new LegendComponentOption({show: false})

  @ComponentControl({
    type: ControlType.subset,
    title: '地图',
    children: AmapComponentOption.controls,
    defaultValue: new AmapComponentOption()
  })
  amap: AmapComponentOption = new AmapComponentOption()

  @ComponentControl({
    type: ControlType.subset,
    title: '图形',
    children: LinesAmapSeriesComponentOption.controls,
    array: true,
    addable: true,
    enableProperty: '_enabled',
    defaultValue: new LinesAmapSeriesComponentOption()
  })
  series: Array<LinesAmapSeriesComponentOption> = [
    new LinesAmapSeriesComponentOption()
  ]

  @ComponentControl({
    type: ControlType.subset,
    title: '视觉映射',
    children: VisualMapComponentOption.controls,
    array: true,
    addable: true,
    enableProperty: '_enabled',
    defaultValue: new VisualMapComponentOption()
  })
  visualMap: Array<VisualMapComponentOption> = [new VisualMapComponentOption()]
}
export class LinesAmapChartComponent extends BaseComponent {
  icon: string = `<svg id="图层_1" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="2" ry="2" fill="none" opacity="0.5"/><path d="M30.76,29.41c-.1,0,0-.15-.15-.2v-.06l0,0s-.11,0-.17-.05,0-.08-.05-.14-.05-.07-.07-.12l-.11-.11a1.86,1.86,0,0,0,.07-.34c0-.05,0-.11-.06-.14a1.42,1.42,0,0,1,.18-.56.43.43,0,0,1,0-.24l.09,0s0-.12,0-.19.16-.09.19-.21a.26.26,0,0,0,.17-.09s.12-.05.17-.05.06.11.16.13a4.6,4.6,0,0,1,0,1.28c-.11.19,0,.46-.2.64a.94.94,0,0,0,0,.34c0,.08,0,.14-.1.17s-.06,0-.12,0Zm-7,3a.68.68,0,0,0-.17-.08l0,0c-.05,0-.12,0-.17,0l0-.05s0-.11,0-.16l0,0a2.58,2.58,0,0,1,0-.29s.1-.08.08-.16a3.75,3.75,0,0,1,.45-.34.6.6,0,0,0,.28-.08c.07,0,.07.05.13.06h.09l0-.08,0,0a.7.7,0,0,1-.17-.06c0-.05-.1-.08-.13-.14s-.08-.15-.09-.28l-.05-.05a1.25,1.25,0,0,0,0-.19l0,0-.23,0s-.09,0-.12-.12a1.19,1.19,0,0,0-.32-.05c-.1,0-.07.09-.17.13a1.14,1.14,0,0,1-.27,0,3,3,0,0,1-.32-.15.63.63,0,0,1-.23,0c-.05-.09-.15-.16-.23-.27s0-.08-.06-.15a2,2,0,0,0,0-.35l-.05,0h-.18a2.88,2.88,0,0,1-.5-.24c0,.08-.14.12-.17.21s-.15.09-.19.18-.21,0-.32,0-.06.06-.15.08-.45,0-.68-.09a.22.22,0,0,0-.14.05l0,.09h-.22c-.06,0-.14,0-.19.06,0,.22.1.48,0,.7-.07,0-.09.06-.18.08a.79.79,0,0,1-.13,0c-.08-.05-.05-.14-.16-.16a.94.94,0,0,0-.07-.22l0,0c-.09,0-.06.11-.15.13a.42.42,0,0,1-.22,0,.8.8,0,0,0-.13-.13s0-.11-.07-.14a.15.15,0,0,1-.09-.11.25.25,0,0,0-.15-.05l-.12-.09c0-.05-.07-.06-.09-.15s0-.16,0-.28,0-.11.07-.18-.1-.06-.16-.1-.11-.11-.15-.2,0-.18,0-.29l0-.1c-.14-.08-.34,0-.5,0l-.06-.05a2.05,2.05,0,0,1,0-.61c0-.09.12-.07.15-.16v-.08c.06-.08.12-.22.25-.27a.73.73,0,0,1,.2-.19s0-.11,0-.18a.54.54,0,0,0,.1-.18,1,1,0,0,1,0-.29c.05-.16,0-.21,0-.31l-.06-.09-.1,0c-.08-.17-.15-.34-.22-.5h-.13a1.91,1.91,0,0,0-.15.21c-.09.08-.25,0-.37.05s-.26-.21-.41-.29h-.18l-.11.08c-.06,0-.09,0-.18.06h-.05l-.08,0a1.14,1.14,0,0,1-.23.15c-.07.12-.25.1-.39.16l0,.05s-.07.06-.15.08h-.09s-.06.07-.15.09a1.1,1.1,0,0,1-.54,0l-.11-.12c0-.08,0-.14,0-.24a.75.75,0,0,0-.26-.21.28.28,0,0,0-.15-.15l0-.09L13,25.13,13,25a1.31,1.31,0,0,0-.33-.09l-.08-.09h-.27c-.06.07-.16.12-.2.19a.79.79,0,0,1-.08.23s-.07,0-.13.06a.83.83,0,0,1-.18-.05c-.11-.12,0-.36-.11-.51-.07,0-.14.08-.23.06s-.07-.11-.14-.13H11l-.15-.08c-.14,0-.3-.12-.45-.15s-.09-.05-.14-.08a.74.74,0,0,1-.32,0c0-.06,0-.1-.08-.19a1.57,1.57,0,0,1-.23-.09A.35.35,0,0,1,9.55,24a.36.36,0,0,0,0-.14,1.2,1.2,0,0,1-.21-.09l-.05-.09-.08-.05s0-.16,0-.24l-.08-.07L9,23.22c-.06,0-.16,0-.23-.1a2.84,2.84,0,0,0-.7-.88H7.9c-.05.05-.08.12-.17.15s-.11,0-.17-.09a1.84,1.84,0,0,0-.26-.4c0-.06-.06-.18-.11-.24a2.16,2.16,0,0,1-.27-.33l-.1,0s-.07-.14-.16-.17a7.94,7.94,0,0,1,0-.85c0-.05,0-.13,0-.19s.09-.08.18-.11h0c0,.05.07.11.16.13l0-.07a4.76,4.76,0,0,0-.09-.7c0-.08.09-.13.14-.24A1.58,1.58,0,0,1,7,18.36c0-.12-.13,0-.17-.1H6.7c-.15-.08-.24-.25-.37-.39s-.09-.06-.18-.09l0,0c-.07-.22,0-.48-.07-.71-.08,0-.09-.15-.17-.21s-.13-.11-.24-.18a.54.54,0,0,1,0-.18,1,1,0,0,1,.25-.13l0,0V16.1c0-.09.08-.13.11-.23s0-.13,0-.19,0-.11-.06-.14-.19,0-.31-.07,0-.09-.11-.12l0-.1,0-.08A1.06,1.06,0,0,0,5.68,15a.58.58,0,0,1,0-.39c.06,0,.08-.05.14-.08v0a1,1,0,0,0,.25-.19,1.17,1.17,0,0,1,.38,0l0-.06a3.48,3.48,0,0,0,.36,0A.17.17,0,0,1,7,14.4c.08,0,.14,0,.22,0s.12-.11.23-.14l0-.1s.08,0,.14-.07A.36.36,0,0,0,8,14a1.89,1.89,0,0,1,.82,0,.93.93,0,0,1,.41-.11l.08,0a.78.78,0,0,0,.15-.47l.09-.08c.05,0,.05-.07.11-.12h0l0,0c0-.32,0-.69,0-1,.08,0,0-.11.07-.18s.08-.1.15-.12c.22,0,.5-.08.67.1H11l0-.07a1.39,1.39,0,0,1,.05-.32l.09-.06,0-.09a.29.29,0,0,1,.1-.12,2.29,2.29,0,0,1,.11-.23c.08,0,0-.11.11-.17s.09-.09.17-.12.19.12.34.15.09.11.18.12h0l.16.05a.6.6,0,0,0,.27-.06c.05,0,0-.14.1-.17a.62.62,0,0,1,.06-.42s.13,0,.13-.09.12,0,.18,0,.13,0,.16-.1v-.05s0-.09.1-.14a1.18,1.18,0,0,1,.69-.07c.07.16,0,.4.06.59a.61.61,0,0,1,.16.16c.06,0,.1.06.13.15a.67.67,0,0,0,.19.09s.06,0,.12,0,.09.13.17.14,0,.09.06.12a2.06,2.06,0,0,0,0,.42l.05,0c.1.15,0,.35.12.52a.74.74,0,0,1-.18.39,1.2,1.2,0,0,0,0,.38.71.71,0,0,0,.37.12l.07.06a1.37,1.37,0,0,1,.55.18h.1c.14,0,.21.17.37.23a1.29,1.29,0,0,0,0,.19c.09,0,.09.14.18.18h0s.11,0,.13.06a.85.85,0,0,1,.05.33l.09.13c0,.06.06.09,0,.17s0,.09.1.13v.09s.06,0,.08.13a1.47,1.47,0,0,1,.15.09c.08,0,.08.06.17.08a2.84,2.84,0,0,1,.64.1l.08,0c.37,0,.68.06,1.05.06.06,0,.07.08.15.09h.18a1.07,1.07,0,0,0,.19.13c0,.05,0,.08,0,.14s.22,0,.36.09.14.13.2.23.34,0,.54,0,.07.08.17.09a1.37,1.37,0,0,0,.43-.23l.15,0,.06-.08.23,0,.07-.08c.23-.08.48-.09.69-.15a2,2,0,0,0,.41,0,1.72,1.72,0,0,0,.58,0c.05,0,.06-.1.09-.17l.23-.22.13,0c.05,0,.05-.13.1-.19a.13.13,0,0,0,.1-.1v0l-.07-.09a1,1,0,0,1-.19-.32c0-.13,0-.24,0-.38s.1,0,.11-.09a.74.74,0,0,1,.18-.09c.28-.05.53.13.82,0,.07,0,.08,0,.14-.08l0,0,.08-.05a2.29,2.29,0,0,0,.27-.27,1.55,1.55,0,0,0,.23-.07l.06-.06a.4.4,0,0,0,.22-.08c0-.12.08-.19.08-.33v0a.27.27,0,0,1,.12-.09h.14c.12-.06.17-.19.31-.29h.23l.11-.08a3.09,3.09,0,0,1,.45,0l.06-.06c0-.07-.05-.09-.08-.15s-.06-.06-.11-.11-.12-.1-.17-.17l-.1,0,0-.1a.25.25,0,0,0-.23,0l-.06.1c-.09,0-.12.07-.19.11s-.1,0-.16,0l-.08-.05h-.18l-.13.08a.55.55,0,0,1-.22.06L26,11.84l0,0c0-.05-.06-.06-.07-.14a3.35,3.35,0,0,1,.07-.53l.05,0a1.9,1.9,0,0,1,.11-.39l.05,0c0-.15.11-.25.17-.39l0,0a4.86,4.86,0,0,1,.54,0s.11,0,.14-.07a2.71,2.71,0,0,1,.29-.32,1.43,1.43,0,0,0,.06-.37,2.42,2.42,0,0,0,.16-.39l.05,0s0-.11,0-.18l.11-.12.05-.09c0-.09,0-.18,0-.29l0,0-.23,0-.09-.13V8.17c0-.05.07-.12.11-.18l.12,0a.17.17,0,0,0,.13-.08.22.22,0,0,1,.06-.13H28l0,0,0,0a.85.85,0,0,1,.26,0c.08,0,.09-.08.18-.09s.1,0,.19-.07a.46.46,0,0,0,.26,0c.09,0,.17,0,.28,0a.73.73,0,0,1,.29.15c.05,0,.08,0,.12-.08s.14,0,.23,0,.14.06.18.12,0,.11.09.13.1.16.21.24,0,.15.07.19l.05,0s0,.15.09.19a.27.27,0,0,1,.15.21,1.13,1.13,0,0,0,.12.18c.05,0,.08,0,.14,0S31,9,31,9a2.83,2.83,0,0,0,.09.37s.07.06.08.12l.07.08a3.32,3.32,0,0,0,.64,0,1.88,1.88,0,0,1,.23.16.35.35,0,0,1,.22,0,.72.72,0,0,0,.2.18.14.14,0,0,0,.09.11.52.52,0,0,1,.07.18v.09h.05a1,1,0,0,1,.18.13,2.17,2.17,0,0,0,.44-.11c.07-.06.07-.16.18-.19s.08-.09.06-.18.12-.1.24-.13a2.29,2.29,0,0,1,.32-.28h.09l.08-.06h0l.09.08a.37.37,0,0,1,0,.15.3.3,0,0,0-.09.13.65.65,0,0,1,0,.24.41.41,0,0,1,0,.37l-.05,0a14.05,14.05,0,0,0,0,1.46.55.55,0,0,1-.09.19s-.06.05-.09.13a.9.9,0,0,0-.54.06v.1c-.05,0-.16.07-.2.16s0,.13,0,.19.16.21.16.37.07.41.13.63a2.46,2.46,0,0,0-.17.22c0,.13,0,.25-.08.39l0,0a.17.17,0,0,1-.14,0l0-.09a.35.35,0,0,0-.14-.06,2,2,0,0,0-.18.33,3,3,0,0,0-.34.36c0,.06,0,.08.08.14s0,.09-.07.17l-.09.06a1.41,1.41,0,0,1-.64-.05c-.05,0-.11,0-.14.06s-.06.1-.1.19v.05l-.06.09s-.06.06-.07.14v0c0,.1-.13.13-.15.24l0,.09c-.14.07-.09.16-.14.22a.39.39,0,0,0-.2.2v.05a.86.86,0,0,1-.62.22.27.27,0,0,0-.17.13.53.53,0,0,1-.05.15.53.53,0,0,1-.11.13,1.13,1.13,0,0,1,0,.15l-.09.09s0,.1-.06.13h-.05s0,.08-.09.13-.17.11-.31.11-.06-.08-.09-.17a.2.2,0,0,0,0-.15l.06-.06c.12-.22,0-.5.06-.75l.07-.05s0-.14.09-.18a.66.66,0,0,0,0-.23c-.08,0-.09.06-.18.08l-.14,0c-.08.06-.09.14-.13.23s-.06.06-.11.13,0,.08-.05.14a2.86,2.86,0,0,1-.31.16,1.85,1.85,0,0,0-.25.37c0,.06-.05.06,0,.14a1.53,1.53,0,0,0-.18.18c-.06,0-.09,0-.18.06l-.15,0s-.11,0-.13,0,0,.11,0,.18a.83.83,0,0,0,.15.23,1.69,1.69,0,0,0,.32,0,.55.55,0,0,1,.32.22v.22l-.08,0,0,.09c.05,0,.08,0,.14,0a1,1,0,0,0,.26-.3l.08,0a.78.78,0,0,1,.56-.28l.09.12a.52.52,0,0,1,.23.09l0,0c.07,0,.12.08.23.08s.07,0,.13,0,.07,0,.13.07l0,.1a1.53,1.53,0,0,1-.5.41l0,.05c0,.05-.15,0-.23.06l0,0c0,.06,0,.17-.06.23l0,0a.76.76,0,0,0-.09.18,1,1,0,0,0-.34.36c-.05.05-.12.06-.13.15s-.06.08-.1.15.08.08.11.15.19,0,.28.05.16,0,.2.12l.09.05s0,.16,0,.24l.11.13a3.39,3.39,0,0,1,.09.67v.05c.07.08.18.08.26.2a1,1,0,0,1,.14.29l.08.09a.85.85,0,0,1,.1.28.55.55,0,0,0,.21.19l.05.11c-.05.1-.17.15-.26.24s-.07.06-.13.08h-.14l-.05.08,0,0c.09,0,.2,0,.31,0a.86.86,0,0,0,.29.25,2.44,2.44,0,0,1,.08.56l-.05.14c-.07.12,0,.29,0,.43l0,.05-.18.09c-.06.07-.08.18-.17.25a1.72,1.72,0,0,1-.16.43c0,.09-.06.12-.08.24s-.05.09-.07.18a.42.42,0,0,1,0,.18s-.09,0-.12.06,0,.12-.06.13a1.15,1.15,0,0,0,0,.37,1.32,1.32,0,0,0-.13.29l0,0h0l0,0c0,.06,0,.09,0,.15l-.07.06c-.08.05-.08.2-.15.26l-.08.06c-.07,0-.13,0-.22,0l-.07.09c0,.05,0,.12,0,.18l-.08.06c-.1.06-.12.19-.25.29s-.07,0-.13.05l0,0c0,.06.08,0,.1.11l0,0h-.15c0,.1-.16.1-.21.19s-.11.2-.19.26H28a.52.52,0,0,1-.46.16l-.13.11c-.09,0-.16,0-.27,0l-.05,0c-.12,0-.21.17-.36.21l-.05,0a1.05,1.05,0,0,1-.18.08l0,0c0-.05,0-.08,0-.13l0,.06s0,.08-.06.13l-.08.06h-.13a.23.23,0,0,0-.18.12c0,.06,0,.06-.07.14s-.27.05-.4.09l0,.08a.33.33,0,0,1-.15,0c-.09,0-.14.11-.23.16a.67.67,0,0,0-.25,0l0,.05c-.05,0-.06.06-.14.08a.89.89,0,0,0-.14,0l-.05.09.05,0a1,1,0,0,1,.09.18c0,.08-.08.14-.08.23s-.12,0-.15.1v0c.18.08.35,0,.54.07l.06.08a.38.38,0,0,1,0,.18l-.1,0c-.05,0-.1.13-.17.21s0,.27,0,.38l-.1.05,0,.09a.54.54,0,0,1-.26.11c0,.06-.1.05-.12.09Z" fill="#7678ed"/><rect x="19.84" y="9.46" width="0.5" height="13.9" transform="translate(0.73 33.68) rotate(-80.99)" fill="#ffc700"/><path d="M18.87,21.18a.85.85,0,0,0,1.7,0h0a.85.85,0,1,0-1.7,0Z" fill="#36f"/><polygon points="20.68 26.36 13.24 16.14 13.02 23.8 12.53 23.79 12.78 14.66 21.08 26.07 20.68 26.36" fill="#ffc700"/><polygon points="19.75 21.36 12.54 14.85 27.19 20.71 27.02 21.14 14.81 16.27 20.07 21.01 19.75 21.36" fill="#ffc700"/><path d="M12.1,15.28a1.09,1.09,0,1,0,2.17,0,1.09,1.09,0,0,0-2.17,0Z" fill="#f9896b"/><path d="M25.3,17.38a.85.85,0,0,0,1.69,0h0a.85.85,0,1,0-1.69,0Z" fill="#f9896b"/><path d="M26.26,20.86a.83.83,0,0,0,.82.87.85.85,0,0,0,.87-.82h0a.85.85,0,0,0-.82-.87.83.83,0,0,0-.87.82Z" fill="#f9896b"/><path d="M20,26.21a.83.83,0,0,0,.84.85.85.85,0,0,0,.85-.84h0a.85.85,0,0,0-.85-.84.84.84,0,0,0-.84.84Z" fill="#f9896b"/><path d="M18.89,21.14a.85.85,0,1,0,1.69.05h0a.85.85,0,1,0-1.69-.06Z" fill="#f9896b"/><path d="M11.93,23.79a.85.85,0,1,0,1.69,0h0a.85.85,0,1,0-1.69,0Z" fill="#f9896b"/></svg>`
  constructor(language: string) {
    super(language)
    super.title = '高德地图路径图'
  }
  option: LinesAmapChartComponentOption = new LinesAmapChartComponentOption()
  getComponent() {
    return LinesAmapChart
  }
}
