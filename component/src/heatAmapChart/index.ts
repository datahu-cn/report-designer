import {
  IControl,
  ControlType,
  ComponentControl,
  Util,
  StyleType
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
  RangeComponentOption,
  StyleComponentOption
} from '@datahu/component-base'
import HeatAmapChart from './HeatAmapChart.vue'

export class FieldComponentOption {
  static controls = []

  @ComponentControl({
    type: ControlType.fieldSelect,
    title: '分组',
    multiple: false
  })
  category = []

  @ComponentControl({
    type: ControlType.fieldSelect,
    title: '经度',
    multiple: false
  })
  lon = []

  @ComponentControl({
    type: ControlType.fieldSelect,
    title: '纬度',
    multiple: false
  })
  lat = []

  @ComponentControl({
    type: ControlType.fieldSelect,
    title: '值',
    multiple: true
  })
  series = []

  // @ComponentControl({
  //   type: ControlType.fieldSelect,
  //   title: '工具提示',
  //   multiple: true
  // })
  // tooltip = []

  @ComponentControl({
    type: ControlType.fieldSelect,
    title: '视觉映射',
    multiple: true
  })
  visual = []
}

export class HeatAmapSeriesComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  type: string = 'heatmap'

  coordinateSystem: string = 'amap'

  encode: any = {
    lng: 1,
    lat: 2,
    value: 3
  }

  @ComponentControl({
    type: ControlType.number,
    title: '每个点的大小'
  })
  pointSize: number = 5

  @ComponentControl({
    type: ControlType.number,
    title: '每个点模糊的大小'
  })
  blurSize: number = 6

  // @ComponentControl({
  //   type: ControlType.style,
  //   title: '文字',
  //   options: [
  //     StyleType.fontSize,
  //     StyleType.color,
  //     StyleType.fontFamily,
  //     StyleType.fontWeight
  //   ],
  //   show(opt: any) {
  //     return opt.label.show
  //   }
  // })
  // @ComponentControl({
  //   type: ControlType.subset,
  //   title: '标签样式',
  //   children: SeriesLabelComponentOption.controls
  // })
  // label: SeriesLabelComponentOption = new SeriesLabelComponentOption()

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

export class HeatMapVisualMapComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({type: ControlType.boolean, title: '显示手柄'})
  show: boolean = true

  @ComponentControl({
    type: ControlType.boolean,
    title: '显示手柄标签'
  })
  showLabel: boolean = false

  type: string = 'continuous'

  color: Array<string> = []

  @ComponentControl({
    type: ControlType.select,
    title: '维度',
    options: (option: any, chart: any) => {
      if (chart.data && chart.data.dataset.data.length > 0) {
        let opts = []
        for (let i = 0; i < chart.data.dataset.data[0].length; i++) {
          opts.push({label: chart.data.dataset.data[0][i], value: i})
        }
        return opts
      }
      return []
    }
  })
  dimension: number | null = null

  @ComponentControl({
    type: ControlType.select,
    title: '映射系列',
    options: (option: any, chart: any) => {
      if (chart.data && chart.data.dataset.data.length > 0) {
        let opts = []
        let seriesIndexs = chart.data.dataset.map['series']
        if (seriesIndexs) {
          for (let i = 0; i < seriesIndexs.length; i++) {
            opts.push({
              label: chart.data.dataset.data[0][seriesIndexs[i]],
              value: i
            })
          }
        }

        return opts
      }
      return []
    }
  })
  seriesIndex: number | null = null

  @ComponentControl({
    type: ControlType.number,
    title: '最小值',
    show: (opt: any) => {
      return opt.type == 'continuous' || !(opt.pieces && opt.pieces.length > 0)
    }
  })
  min: number = 0

  @ComponentControl({
    type: ControlType.number,
    title: '最大值'
  })
  max: number = 30

  @ComponentControl({
    type: ControlType.number,
    title: '小数精度'
  })
  precision: number = 1

  @ComponentControl({
    type: ControlType.range,
    min: (opt: any) => {
      return opt.min
    },
    max: (opt: any) => {
      return opt.max
    },
    step: (opt: any) => {
      return 1 / Math.pow(10, opt.precision)
    },
    title: '默认滑动范围',
    show: (opt: any) => {
      return opt.type == 'continuous'
    }
  })
  range: Array<number> = [0, 100]

  @ComponentControl({
    type: ControlType.subset,
    title: '范围中视觉元素',
    children: RangeComponentOption.controls,
    show: (opt: any) => {
      return opt.type == 'continuous' || !(opt.pieces && opt.pieces.length > 0)
    }
  })
  inRange: RangeComponentOption = new RangeComponentOption({
    _rangeTypes: ['color'],
    color: ['white', 'red']
  })

  @ComponentControl({
    type: ControlType.subset,
    title: '范围外视觉元素',
    children: RangeComponentOption.controls,
    show: (opt: any) => {
      return opt.type == 'continuous' || !(opt.pieces && opt.pieces.length > 0)
    }
  })
  outOfRange: RangeComponentOption = new RangeComponentOption({
    _rangeTypes: ['color'],
    color: ['grey']
  })

  align: string = 'auto'

  @ComponentControl({
    type: ControlType.text,
    title: '手柄文字(上、下)',
    array: true,
    addable: false,
    show: (opt: any) => {
      return opt.show
    }
  })
  text: Array<string> = ['', '']

  @ComponentControl({
    type: ControlType.boolean,
    title: '允许操作手柄',
    show: (opt: any) => {
      return opt.show
    }
  })
  calculable: boolean = true

  @ComponentControl({
    type: ControlType.select,
    title: '朝向',
    options: [
      {label: '横向', value: 'horizontal'},
      {label: '纵向', value: 'vertical'}
    ],
    show: (opt: any) => {
      return opt.show
    }
  })
  orient: string = 'vertical'

  @ComponentControl({
    type: ControlType.styleLength,
    title: '距左',
    options: [
      {label: '自动', value: 'auto', number: false},
      {label: '左', value: 'left', number: false},
      {label: '中', value: 'center', number: false},
      {label: '右', value: 'right', number: false},
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true}
    ],
    show: (opt: any) => {
      return opt.show
    }
  })
  left: string = 'auto'

  @ComponentControl({
    type: ControlType.styleLength,
    title: '距右',
    options: [
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true}
    ],
    show: (opt: any) => {
      return opt.show
    }
  })
  right: string | null = null

  @ComponentControl({
    type: ControlType.styleLength,
    title: '距上',
    options: [
      {label: '自动', value: 'auto', number: false},
      {label: '上', value: 'top', number: false},
      {label: '中', value: 'middle', number: false},
      {label: '下', value: 'bottom', number: false},
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true}
    ],
    show: (opt: any) => {
      return opt.show
    }
  })
  top: string = 'auto'

  @ComponentControl({
    type: ControlType.styleLength,
    title: '距下',
    options: [
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true}
    ],
    show: (opt: any) => {
      return opt.show
    }
  })
  bottom: string | null = null

  @ComponentControl({
    type: ControlType.styleLength,
    title: '手柄宽度',
    options: [
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true},
      {label: '自动', value: '', number: false}
    ],
    show: (opt: any) => {
      return opt.show
    }
  })
  itemWidth: string = ''

  @ComponentControl({
    type: ControlType.styleLength,
    title: '手柄高度',
    options: [
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true},
      {label: '自动', value: '', number: false}
    ],
    show: (opt: any) => {
      return opt.show
    }
  })
  itemHeight: string = ''

  @ComponentControl({
    type: ControlType.style,
    title: '',
    options: [
      StyleType.fontSize,
      StyleType.color,
      StyleType.fontFamily,
      StyleType.fontWeight
    ],
    show: (opt: any) => {
      return opt.show
    }
  })
  textStyle: StyleComponentOption = new StyleComponentOption({})
}

export class HeatAmapChartComponentOption extends BaseComponentOption {
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

  // @ComponentControl({
  //   type: ControlType.subset,
  //   title: '工具提示',
  //   children: TooltipComponentOption.controls,
  //   enableProperty: 'show',
  //   defaultValue: new TooltipComponentOption()
  // })
  // tooltip?: TooltipComponentOption = new TooltipComponentOption({show: false})

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
    children: HeatAmapSeriesComponentOption.controls,
    array: true,
    addable: true,
    enableProperty: '_enabled',
    defaultValue: new HeatAmapSeriesComponentOption()
  })
  series: Array<HeatAmapSeriesComponentOption> = [
    new HeatAmapSeriesComponentOption()
  ]

  @ComponentControl({
    type: ControlType.subset,
    title: '视觉映射',
    children: HeatMapVisualMapComponentOption.controls,
    array: true,
    addable: true,
    enableProperty: '_enabled',
    defaultValue: new HeatMapVisualMapComponentOption()
  })
  visualMap: Array<HeatMapVisualMapComponentOption> = [
    new HeatMapVisualMapComponentOption()
  ]
}
export class HeatAmapChartComponent extends BaseComponent {
  icon: string = `<svg id="图层_1" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="2" ry="2" fill="none" opacity="0.5"/><path d="M31.58,30.13c-.11,0,0-.16-.16-.21v-.07l0,0c-.05,0-.12,0-.18-.05s0-.09-.05-.15-.06-.08-.08-.13L31,29.36c0-.1.1-.24.08-.36s0-.11-.07-.14a1.58,1.58,0,0,1,.21-.61.47.47,0,0,1,0-.25l.09-.06s0-.12.05-.2.17-.09.2-.22a.26.26,0,0,0,.18-.1c.05,0,.14-.05.19-.05s.06.12.17.14a5.35,5.35,0,0,1,0,1.38c-.12.2,0,.49-.21.69a.83.83,0,0,0,0,.36c0,.08,0,.15-.11.18s-.07,0-.13,0Zm-7.52,3.28s-.11-.06-.18-.09l0,0c-.06,0-.14,0-.19-.05l-.06-.06s0-.13,0-.18l0,0a3,3,0,0,1,0-.31s.1-.08.08-.17a4.45,4.45,0,0,1,.49-.37.67.67,0,0,0,.3-.08c.07,0,.07,0,.14.06h.1l0-.09,0,0a1,1,0,0,1-.19-.06c0-.05-.11-.09-.14-.15s-.08-.17-.09-.31l-.06-.05a1.38,1.38,0,0,0,0-.2l0,0a1.09,1.09,0,0,1-.24,0c-.05,0-.11-.05-.14-.12a1.35,1.35,0,0,0-.34-.06c-.11,0-.08.1-.18.14a1.42,1.42,0,0,1-.3,0,2.06,2.06,0,0,1-.34-.16.53.53,0,0,1-.24,0c-.07-.09-.17-.17-.26-.28s0-.09-.06-.16a2.47,2.47,0,0,0,0-.39l0,0h-.19a3.32,3.32,0,0,1-.54-.25c0,.08-.15.13-.19.22s-.15.1-.21.2-.22,0-.34,0-.06.07-.16.09-.48,0-.73-.1a.28.28,0,0,0-.15.06l0,.09h-.24c-.07,0-.15,0-.2.07,0,.23.1.52-.05.75-.07,0-.09.06-.19.08a1.31,1.31,0,0,1-.15,0c-.08,0,0-.15-.17-.17a1.27,1.27,0,0,0-.07-.24l0,0c-.1,0-.07.11-.16.15a.36.36,0,0,1-.24,0l-.14-.13s0-.12-.08-.15a.15.15,0,0,1-.09-.12.28.28,0,0,0-.16-.05l-.13-.1c0-.05-.07-.06-.09-.16s0-.18,0-.31,0-.11.07-.19-.11-.06-.18-.1-.12-.12-.16-.22,0-.2,0-.31l0-.11c-.15-.08-.36,0-.54,0l-.07-.05a2.44,2.44,0,0,1,0-.66c0-.1.13-.08.16-.17V28c.08-.08.14-.23.28-.28a.58.58,0,0,1,.21-.2.32.32,0,0,0,0-.21.52.52,0,0,0,.11-.19,1.05,1.05,0,0,1,0-.3.76.76,0,0,0,0-.34l-.06-.1-.11,0c-.09-.18-.16-.36-.23-.54h-.14a2.29,2.29,0,0,0-.17.23c-.1.09-.27,0-.39.05s-.29-.22-.45-.31h-.19l-.12.08c-.06,0-.09.05-.19.07h0l-.1,0a1.41,1.41,0,0,1-.24.16c-.07.12-.27.1-.42.17l0,.05s-.07.06-.16.08h-.09s-.06.08-.16.1a1.26,1.26,0,0,1-.58,0l-.12-.13c0-.08,0-.15,0-.25a.89.89,0,0,0-.28-.23.35.35,0,0,0-.17-.17l0-.09-.09-.07-.06-.09a1.88,1.88,0,0,0-.35-.1L12,25.24H11.7c-.06.07-.17.13-.21.2a.65.65,0,0,1-.09.24s-.07,0-.14.07a.63.63,0,0,1-.2-.06c-.11-.12,0-.38-.11-.54-.08,0-.15.09-.25.07s-.07-.12-.16-.15H10.3L10.14,25c-.15,0-.33-.12-.49-.16s-.09-.05-.15-.08a.78.78,0,0,1-.33,0,.82.82,0,0,1-.1-.21,1.34,1.34,0,0,1-.24-.09.26.26,0,0,1-.08-.13.44.44,0,0,0,0-.15A1.28,1.28,0,0,1,8.51,24l-.06-.1-.09-.05s0-.17,0-.25l-.09-.09-.1-.06c-.07,0-.17,0-.25-.11a3,3,0,0,0-.75-.94H7a.77.77,0,0,1-.19.16c0-.05-.12-.05-.18-.1a2.12,2.12,0,0,0-.28-.43c0-.07-.06-.2-.12-.26a1.64,1.64,0,0,1-.29-.35l-.11,0c0-.05-.07-.16-.17-.19-.07-.31,0-.6,0-.91,0-.06,0-.14,0-.2s.1-.09.19-.12h0s.07.12.17.14l0-.08a4.13,4.13,0,0,0-.1-.75,2.18,2.18,0,0,0,.15-.27A1.75,1.75,0,0,1,6,18.24c0-.13-.14,0-.18-.11H5.69a1.64,1.64,0,0,1-.41-.42c-.07,0-.09-.07-.19-.1l0,0c-.07-.23,0-.51-.07-.76-.09,0-.1-.16-.18-.23a1.93,1.93,0,0,1-.27-.19.67.67,0,0,1,0-.2,1.2,1.2,0,0,1,.28-.14l0,0v-.22c0-.1.08-.14.11-.26s0-.13,0-.2,0-.11-.06-.15-.21,0-.34-.07,0-.1-.12-.13l0-.1,0-.1a.61.61,0,0,0,.16-.16.64.64,0,0,1,0-.41c.07,0,.09-.06.15-.09v-.05a1,1,0,0,0,.28-.2,1.05,1.05,0,0,1,.4,0l.05-.07c.14,0,.25.07.4.06A.19.19,0,0,1,6,14c.08,0,.14,0,.24,0s.13-.11.24-.15l.05-.1s.08,0,.15-.08.24,0,.33-.08a2.06,2.06,0,0,1,.89,0,1,1,0,0,1,.43-.12l.1-.05a.85.85,0,0,0,.15-.51l.1-.08s0-.08.12-.13h0l0,0c0-.35,0-.74,0-1.13.09,0,0-.11.08-.19s.08-.1.17-.12.53-.1.72.1h.39l0-.07a1.17,1.17,0,0,1,.06-.35l.09-.07,0-.09a.3.3,0,0,1,.12-.13,1.8,1.8,0,0,1,.12-.25c.08,0,0-.12.11-.18s.1-.1.18-.13.21.13.37.16.1.11.2.13h0l.17.05a.66.66,0,0,0,.3-.07s0-.14.1-.18a.73.73,0,0,1,.06-.45s.14,0,.14-.1.13,0,.19,0a.25.25,0,0,0,.18-.1V9.43s0-.09.11-.15a1.26,1.26,0,0,1,.74-.07c.08.17,0,.42.07.64a.68.68,0,0,1,.17.17c.06,0,.1.06.13.16a.87.87,0,0,0,.21.09s.07,0,.13,0,.1.14.18.15a.21.21,0,0,0,.07.14,2.32,2.32,0,0,0,0,.44l.05,0c.11.16,0,.39.13.57a.84.84,0,0,1-.19.42,1.32,1.32,0,0,0,0,.4.71.71,0,0,0,.4.13l.08.06a1.49,1.49,0,0,1,.59.21h.11c.15,0,.22.18.39.24a1.42,1.42,0,0,0,0,.2c.1,0,.1.16.2.2h.05s.11,0,.13.07a.76.76,0,0,1,.06.35l.09.13c0,.07.07.1.06.19s0,.1.1.14v.1c0,.05.07.05.09.14s.09.06.17.09.08.07.18.09a3.48,3.48,0,0,1,.69.1l.08.07c.39,0,.73.06,1.13.06.06,0,.08.08.17.1h.19a.86.86,0,0,0,.2.13c0,.06,0,.09,0,.15s.24,0,.39.1.15.15.22.25.37,0,.58,0c.06,0,.07.09.18.1a1.28,1.28,0,0,0,.47-.26l.15,0,.07-.08.24-.06.09-.08a7,7,0,0,1,.74-.16,2.12,2.12,0,0,0,.43,0,2,2,0,0,0,.63,0c.05,0,.06-.11.1-.18a2.83,2.83,0,0,1,.24-.25l.15,0c.05,0,.05-.14.1-.2a.13.13,0,0,0,.11-.11v0l-.07-.1a1.24,1.24,0,0,1-.21-.35c0-.13,0-.25,0-.4s.1,0,.11-.1a.67.67,0,0,1,.19-.1c.3-.05.58.14.88,0,.08,0,.09,0,.15-.08l0,0,.1-.06a2.51,2.51,0,0,0,.29-.28c.09,0,.16,0,.24-.08l.06-.06a.42.42,0,0,0,.25-.1c0-.12.08-.2.08-.35v0a.38.38,0,0,1,.13-.09h.15c.13-.07.19-.22.34-.32h.24l.12-.09a3.68,3.68,0,0,1,.49,0l.06-.06c0-.08-.05-.1-.08-.16s-.07-.07-.12-.12-.13-.11-.19-.19l-.11,0L27.91,11a.27.27,0,0,0-.24,0l-.07.11c-.09,0-.13.08-.21.13s-.11,0-.17-.06l-.08-.06h-.2l-.13.1a.71.71,0,0,1-.25.06l-.09-.07,0,0s-.06-.06-.07-.15a3.89,3.89,0,0,1,.07-.56l.06,0A2.08,2.08,0,0,1,26.6,10l.06,0a1.3,1.3,0,0,1,.19-.42l0,0a5.61,5.61,0,0,1,.58,0c.06,0,.12,0,.15-.08a4.37,4.37,0,0,1,.31-.34,1.68,1.68,0,0,0,.06-.4,2.28,2.28,0,0,0,.18-.41l.06,0a.28.28,0,0,0,0-.19L28.39,8l.05-.1c0-.09,0-.19,0-.3l0,0-.25,0-.1-.14V7.27s.07-.13.12-.19l.13,0A.2.2,0,0,0,28.44,7a.27.27,0,0,1,.06-.14h.1l0-.05,0,0a1,1,0,0,1,.29,0c.08,0,.09-.09.19-.1s.11,0,.2-.07a.49.49,0,0,0,.29,0c.09.06.18,0,.29,0a.75.75,0,0,1,.31.15.19.19,0,0,0,.14-.08c.08,0,.15,0,.24,0s.15.06.19.13,0,.11.1.14a1.3,1.3,0,0,0,.23.26c0,.06,0,.16.08.2l.05,0s0,.16.1.2a.4.4,0,0,1,.16.24,1.22,1.22,0,0,0,.12.19c.06,0,.09,0,.16,0s0,.13.08.14a3.24,3.24,0,0,0,.09.4s.08.07.09.13l.07.08a3.11,3.11,0,0,0,.69.06,1,1,0,0,1,.24.17.45.45,0,0,1,.25,0,.58.58,0,0,0,.21.2s0,.08.1.12a.5.5,0,0,1,.07.19v.09h.05c.07,0,.13.1.19.15a1.92,1.92,0,0,0,.48-.13c.08-.06.08-.16.19-.2s.09-.09.07-.19.13-.1.26-.14a2,2,0,0,1,.34-.3h.1l.09-.07h0l.1.09a.42.42,0,0,1,0,.16.56.56,0,0,0-.1.15c0,.09,0,.15,0,.25a.44.44,0,0,1,0,.4l-.06.05c-.11.48,0,1.05-.06,1.57a.53.53,0,0,1-.1.2s-.06.05-.09.14a.93.93,0,0,0-.59.06v.1c0,.07-.17.09-.21.19s0,.13,0,.2.17.22.17.4.09.43.15.67c-.06.06-.11.16-.19.24s0,.27-.08.42l0,0a.17.17,0,0,1-.14,0l0-.1a.35.35,0,0,0-.14-.06,2.29,2.29,0,0,0-.21.36,4.5,4.5,0,0,0-.36.38c0,.06.06.09.09.15s0,.11-.08.19l-.09.06a1.48,1.48,0,0,1-.69,0s-.12,0-.15.06-.06.11-.11.21v.05l-.07.09c0,.06-.06.07-.07.15v.06c0,.1-.14.13-.16.25l0,.1c-.15.07-.1.17-.15.23a.47.47,0,0,0-.22.22v.06a1,1,0,0,1-.66.23c-.08,0-.14,0-.19.14s0,.09-.06.16a.42.42,0,0,1-.11.14c0,.06,0,.1-.05.16l-.09.1s0,.11-.07.14h-.05s0,.08-.09.13-.2.13-.34.13-.07-.09-.1-.19a.22.22,0,0,0,0-.16l.07-.06c.12-.23,0-.54.06-.81l.07,0c.06,0,.05-.15.11-.19a.78.78,0,0,0,0-.26c-.1,0-.11.07-.2.09l-.15,0c-.09.06-.1.16-.14.25s-.06.07-.12.14,0,.09-.05.15a2.66,2.66,0,0,1-.34.17,2.48,2.48,0,0,0-.26.4c0,.07-.06.07,0,.15s-.12.11-.2.19-.09.05-.19.07l-.16,0a.19.19,0,0,0-.14,0c-.08,0,0,.13,0,.2a.78.78,0,0,0,.16.24,1.29,1.29,0,0,0,.34,0,.59.59,0,0,1,.35.24v.24l-.08,0,.05.1c.05,0,.08,0,.15,0a1,1,0,0,0,.27-.32l.1,0a.76.76,0,0,1,.59-.3l.11.12a.47.47,0,0,1,.24.1l.06,0c.07,0,.12.08.24.08s.08,0,.14,0,.08.05.15.08l0,.11a1.77,1.77,0,0,1-.54.44l0,.05c-.05.05-.16,0-.25.06l0,0c0,.07,0,.19-.07.25l-.06,0a.82.82,0,0,0-.09.19,1,1,0,0,0-.36.39c-.06.06-.13.07-.14.16s-.06.09-.12.16.1.09.13.16.2,0,.3.05.17,0,.21.14l.09.06c.06.05.05.17.06.25l.11.14a3.21,3.21,0,0,1,.1.72v0c.07.09.19.09.28.22a1.77,1.77,0,0,1,.15.31l.09.1a.87.87,0,0,1,.11.31.61.61,0,0,0,.22.2l.05.11c-.05.11-.18.16-.27.26s-.08.06-.15.08h-.15l-.05.1,0,0c.09,0,.22,0,.34,0a.89.89,0,0,0,.31.27,2.81,2.81,0,0,1,.08.6l-.05.15c-.08.13,0,.31,0,.47l0,.05-.19.09c-.07.08-.09.2-.19.27a1.69,1.69,0,0,1-.18.47c0,.09-.06.12-.08.25s-.05.1-.07.19a.38.38,0,0,1,0,.2s-.09,0-.12.07,0,.12-.07.13a1.42,1.42,0,0,0,0,.41,1.31,1.31,0,0,0-.13.31l0,0h0l0,0c0,.06,0,.1,0,.16l-.09.06c-.08.06-.08.23-.16.29l-.08.06c-.08,0-.14,0-.23,0l-.08.1c0,.05,0,.13,0,.19l-.08.06c-.12.07-.14.22-.28.32s-.07,0-.14.05l0,0c0,.06.08,0,.11.11l0,0h-.15c0,.11-.17.11-.24.21s-.12.22-.2.28h-.05a.57.57,0,0,1-.5.17l-.14.12c-.09,0-.17,0-.29,0l-.05,0c-.13,0-.23.19-.39.24l-.05,0a.75.75,0,0,1-.2.09l0,0s0-.09,0-.15l0,.07s0,.09-.06.14l-.09.07h-.14a.27.27,0,0,0-.2.12c0,.07-.05.07-.07.15s-.29.05-.43.1l-.05.08a.26.26,0,0,1-.16.06c-.09,0-.14.11-.24.16a.65.65,0,0,0-.28,0l0,.05s-.06.06-.15.08-.08,0-.15,0l-.05.09.05,0a.85.85,0,0,1,.1.19c0,.1-.09.16-.09.26s-.12,0-.15.1V32c.19.08.37,0,.58.07l.06.09a.51.51,0,0,1,0,.2l-.1,0a2.3,2.3,0,0,0-.2.22c0,.12.06.29,0,.41l-.1.05-.05.1a.5.5,0,0,1-.27.12c0,.06-.12,0-.14.1Z" fill="#7678ed"/><path d="M11.85,15.5a3.32,3.32,0,0,1,1.36.1,4.15,4.15,0,0,1,2.45,2.45,5.68,5.68,0,0,0,.94,1.46,3.33,3.33,0,0,0,2.42.88c1.33,0,1.52,1.64,1.37,2.51A1.28,1.28,0,0,1,19.54,24a3,3,0,0,1-1.95-.48A21.51,21.51,0,0,0,12.83,22C11.14,21.57,9,21.22,9,19.34a4.07,4.07,0,0,1,1.22-3.1A3.34,3.34,0,0,1,11.85,15.5Z" fill="#f9896b" opacity="0.9"/><path d="M11.5,16.39c.89-.29,1.8.54,2.11,1.3a6.33,6.33,0,0,0,1.51,2.51,3.66,3.66,0,0,0,3,.84,2.25,2.25,0,0,1,.52-.07c.89,0,.42,1.17.09,1.57a1.19,1.19,0,0,1-1.29.52c-.69-.23-.94-1-1.4-1.53l-.16-.16a5.92,5.92,0,0,0-1.94-1.1,9,9,0,0,1-2.74-.88A1.77,1.77,0,0,1,11,16.71a1.71,1.71,0,0,1,.54-.32Z" fill="#ffc46e"/><path d="M20.1,27.4a1.75,1.75,0,0,0,.35.63,2.44,2.44,0,0,0,1.65.84c.6,0,1.2-.32,1.8-.15s.75.51,1.26.52c1,0,5.08-2,3.27-5.47a12.07,12.07,0,0,1-1.33-3.63,5.28,5.28,0,0,1,.23-2.4c.29-1-.88-1-1.47-.87a6.52,6.52,0,0,0-3.07,2.75c-2.63,3.81.15,5-.48,6-.45.71-1.31.24-1.89.58a.92.92,0,0,0-.32,1.16Z" fill="#f9896b"/><path d="M26.12,18.08a1.1,1.1,0,0,1,0,.57,9.49,9.49,0,0,0-.09,3,2.78,2.78,0,0,0,.47,1.15c.39.52,1.12.63,1.37,1.29.4,1.12-.78,2.47-1.62,3A7.85,7.85,0,0,1,23,28a1.83,1.83,0,0,1-1.09-.08c-.47-.31,0-1,.27-1.31.81-1,2.31-1.72,2.4-3.14a1.77,1.77,0,0,0-.33-1.08,3,3,0,0,1-.57-.87,2.48,2.48,0,0,1,.47-1.7,6.8,6.8,0,0,1,.94-1.31C25.32,18.24,26,17.73,26.12,18.08Z" fill="#ffc46e"/><path d="M25.46,20.23c.12.11.08.38.07.53A3.67,3.67,0,0,0,26,23.33c.14.16.29.29.43.44.61.68,0,1.53-.51,2a5.55,5.55,0,0,1-1.2.74l-.67.33a1.43,1.43,0,0,1-.66.19c-.31-.05-.08-.42,0-.56a3.45,3.45,0,0,1,.5-.51c.44-.39,1-.65,1.34-1.2a2,2,0,0,0,.2-1.55,8.16,8.16,0,0,1-.54-1.76,1.58,1.58,0,0,1,0-.89.65.65,0,0,1,.41-.35.14.14,0,0,1,.13,0Z" fill="#8c70f8"/><path d="M13.72,19.58s0,0,0,0-.38,0-.48-.1c-.53-.33-1.16-.4-1.7-.72s-.29-1.62.48-1.51a2,2,0,0,1,1.23,1C13.39,18.51,13.9,19.29,13.72,19.58Z" fill="#8c70f8"/><path d="M16.79,21.66c-.2.12.54.62.67.66.35.13.79.13.94-.27.07-.16.08-.49-.19-.43a.57.57,0,0,0-.21.13.64.64,0,0,1-.6,0c-.16-.06-.45-.24-.61-.13Z" fill="#8c70f8"/></svg>`
  constructor(language: string) {
    super(language)
    super.title = '热点地图'
  }
  option: HeatAmapChartComponentOption = new HeatAmapChartComponentOption()
  getComponent() {
    return HeatAmapChart
  }
}
