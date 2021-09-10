import {
  IControl,
  ControlType,
  ComponentControl,
  Util,
  StyleType,
  FieldSelectType,
  DataMergeMethod
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
  AxisLabelComponentOption,
  AreaStyleComponentOption,
  SeriesLabelComponentOption
} from '../base'
import GaugeChart from './GaugeChart.vue'

export class FieldComponentOption {
  static controls = []

  @ComponentControl({
    type: ControlType.fieldSelect,
    multiple: true,
    title: '值',
    fieldSelectType: FieldSelectType.mustMerge
  })
  series = []

  @ComponentControl({
    type: ControlType.fieldSelect,
    multiple: false,
    title: '最大值',
    fieldSelectType: FieldSelectType.mustMerge
  })
  maxField = []
}

export class GaugeProgressComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({
    type: ControlType.boolean,
    title: '展示当前进度'
  })
  show: boolean = true

  @ComponentControl({
    type: ControlType.boolean,
    title: '多组数据时进度条是否重叠'
  })
  overlap: boolean = true

  @ComponentControl({
    type: ControlType.boolean,
    title: '是否裁掉超出部分'
  })
  clip: boolean = true

  @ComponentControl({
    type: ControlType.number,
    title: '进度条宽度'
  })
  width: number = 10

  @ComponentControl({
    type: ControlType.boolean,
    title: '轴线两端显示成圆形'
  })
  roundCap: boolean = false

  @ComponentControl({
    type: ControlType.graphset,
    title: '进度条样式',
    value: {
      get(opt: any) {
        return opt
      },
      set(opt: any, v: any) {}
    }
  })
  itemStyle = {
    color: '',
    borderColor: '',
    borderWidth: 0,
    borderType: 'solid'
  }
}

export class GaugeAxisLineStyleComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({
    type: ControlType.numberColor,
    title: '仪表盘的轴线颜色段',
    description:
      '仪表盘的轴线可以被分成不同颜色的多段。每段的结束位置(0-1)和颜色可以通过一个数组来表示。',
    array: true,
    addable: true,
    min: 0,
    max: 1,
    defaultValue: [1, '#E6EBF8']
  })
  color: Array<Array<any>> = [[1, '#E6EBF8']]

  @ComponentControl({
    type: ControlType.number,
    title: '轴线宽度'
  })
  width: number = 10
}

export class GaugeAxisLineComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({
    type: ControlType.boolean,
    title: '是否显示仪表盘轴线'
  })
  show: boolean = true

  @ComponentControl({
    type: ControlType.boolean,
    title: '轴线两端显示成圆形'
  })
  roundCap: boolean = false

  @ComponentControl({
    type: ControlType.subset,
    title: '',
    children: GaugeAxisLineStyleComponentOption.controls,
    defaultValue: new GaugeAxisLineStyleComponentOption()
  })
  lineStyle: GaugeAxisLineStyleComponentOption = new GaugeAxisLineStyleComponentOption()
}

export class GaugeSplitLineComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({
    type: ControlType.boolean,
    title: '是否显示分隔线'
  })
  show: boolean = true

  @ComponentControl({
    type: ControlType.number,
    title: '分隔线线长'
  })
  length: number = 10

  @ComponentControl({
    type: ControlType.number,
    title: '分隔线与轴线的距离'
  })
  distance: number = 10

  @ComponentControl({
    type: ControlType.graphline,
    title: '线条样式',
    value: {
      get(opt: any) {
        return opt
      },
      set(opt: any, v: any) {}
    }
  })
  lineStyle = {
    color: '#63677A',
    width: 3,
    type: 'solid'
  }
}

export class GaugeAxisTickComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({
    type: ControlType.boolean,
    title: '是否显示刻度'
  })
  show: boolean = true

  @ComponentControl({
    type: ControlType.number,
    title: '分隔线之间分割的刻度数'
  })
  splitNumber: number = 5

  @ComponentControl({
    type: ControlType.number,
    title: '刻度线长'
  })
  length: number = 6

  @ComponentControl({
    type: ControlType.number,
    title: '刻度线与轴线的距离'
  })
  distance: number = 10

  @ComponentControl({
    type: ControlType.graphline,
    title: '线条样式',
    value: {
      get(opt: any) {
        return opt
      },
      set(opt: any, v: any) {}
    }
  })
  lineStyle = {
    color: '#63677A',
    width: 1,
    type: 'solid'
  }
}

export class GaugeAxisLabelComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []

  @ComponentControl({type: ControlType.boolean, title: '是否显示刻度标签'})
  show: boolean = false

  @ComponentControl({
    type: ControlType.number,
    title: '标签与刻度线的距离'
  })
  distance: number = 15

  @ComponentControl({
    type: ControlType.textarea,
    title: '刻度标签的内容格式器',
    show(opt: any) {
      return opt.show
    }
  })
  formatter: string = '{value}'

  fontSize: string = ''
  color: string = ''
  fontFamily: string = ''
  fontWeight: string = ''

  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }
}

export class GaugePointerComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({
    type: ControlType.boolean,
    title: '是否显示指针'
  })
  show: boolean = true

  @ComponentControl({
    type: ControlType.image,
    title: '指针标记图片',
    value: {
      get(opt: any) {
        if (opt.symbol && opt.symbol.startsWith('image://'))
          return opt.symbol.substring(8)
      },
      set(opt: any, v: any) {
        if (v && v.startsWith('data:')) {
          opt.symbol = 'image://' + v
        }
      }
    }
  })
  @ComponentControl({
    type: ControlType.select,
    title: '指针标记图形',
    options: [
      {label: 'circle', value: 'circle'},
      {label: 'rect', value: 'rect'},
      {label: 'roundRect', value: 'roundRect'},
      {label: 'triangle', value: 'triangle'},
      {label: 'diamond', value: 'diamond'},
      {label: 'pin', value: 'pin'},
      {label: 'arrow', value: 'arrow'},
      {label: 'none', value: ''}
    ],
    value: {
      get(opt: any) {
        if (opt.icon && opt.icon.startsWith('image://')) return ''
        return opt.icon
      },
      set(opt: any, v: any) {
        opt.icon = v
      }
    }
  })
  icon: string = ''

  @ComponentControl({
    type: ControlType.number,
    title: '中心偏移位置',
    description: '相对于仪表盘中心的偏移位置',
    array: true,
    addable: false
  })
  offsetCenter: Array<number> = [0, 0]

  @ComponentControl({
    type: ControlType.number,
    title: '指针长度',
    options: [{label: '%', value: '%', number: true}]
  })
  length: number | string = '60%'

  @ComponentControl({
    type: ControlType.number,
    title: '指针宽度'
  })
  width: number = 6

  @ComponentControl({
    type: ControlType.graphset,
    title: '图形样式',
    value: {
      get(opt: any) {
        return opt
      },
      set(opt: any, v: any) {}
    }
  })
  itemStyle = {
    color: '',
    borderColor: '',
    borderWidth: 0,
    borderType: 'solid'
  }
}

export class GaugeDetailComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({
    type: ControlType.boolean,
    title: '是否显示'
  })
  show: boolean = true

  valueAnimation: boolean = true

  @ComponentControl({
    type: ControlType.number,
    title: '中心偏移位置',
    description: '相对于仪表盘中心的偏移位置',
    array: true,
    addable: false
  })
  offsetCenter: Array<any> = [0, 40]

  // @ComponentControl({
  //   type: ControlType.text,
  //   title: '显示格式化'
  // })
  // formatter: string = '{value}'

  fontSize: string = ''
  color: string = ''
  fontFamily: string = ''
  fontWeight: string = ''
}

export class GaugeTitleComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({
    type: ControlType.boolean,
    title: '是否显示'
  })
  show: boolean = true

  valueAnimation: boolean = true

  @ComponentControl({
    type: ControlType.number,
    title: '中心偏移位置',
    description: '相对于仪表盘中心的偏移位置',
    array: true,
    addable: false
  })
  offsetCenter: Array<any> = [0, 70]

  fontSize: string = ''
  color: string = ''
  fontFamily: string = ''
  fontWeight: string = ''
}

export class GaugeSeriesComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  type: string = 'gauge'

  @ComponentControl({
    type: ControlType.styleLength,
    title: '（圆心）坐标',
    options: [
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true}
    ],
    array: true,
    addable: false
  })
  center: Array<string> = ['50%', '50%']

  @ComponentControl({
    type: ControlType.styleLength,
    title: '半径',
    options: [
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true}
    ]
  })
  radius: string = '75%'

  @ComponentControl({
    type: ControlType.number,
    min: -360,
    max: 360,
    title: '起始刻度的角度',
    description: '正右手侧为0度，正上方为90度，正左手侧为180度'
  })
  startAngle: number = 225

  @ComponentControl({
    type: ControlType.number,
    min: -360,
    max: 360,
    title: '结束刻度的角度',
    description: '正右手侧为0度，正上方为90度，正左手侧为180度'
  })
  endAngle: number = -45

  @ComponentControl({
    type: ControlType.number,
    title: '最小值'
  })
  min: number = 0

  @ComponentControl({
    type: ControlType.number,
    title: '最大值',
    description: '如果数据栏中设置最大值栏，以数据栏为准'
  })
  max: number = 100

  @ComponentControl({
    type: ControlType.boolean,
    title: '刻度顺时针增长'
  })
  clockwise: boolean = true

  @ComponentControl({
    type: ControlType.number,
    title: '刻度的分割段数'
  })
  splitNumber: number = 5

  // @ComponentControl({
  //   type: ControlType.boolean,
  //   title: '鼠标移动到图表时高亮'
  // })
  legendHoverLink: boolean = true

  @ComponentControl({
    type: ControlType.subset,
    title: '',
    children: GaugeAxisLineComponentOption.controls,
    defaultValue: new GaugeAxisLineComponentOption()
  })
  axisLine: GaugeAxisLineComponentOption = new GaugeAxisLineComponentOption()

  @ComponentControl({
    type: ControlType.subset,
    title: '',
    children: GaugeProgressComponentOption.controls,
    defaultValue: new GaugeProgressComponentOption()
  })
  progress: GaugeProgressComponentOption = new GaugeProgressComponentOption()

  @ComponentControl({
    type: ControlType.subset,
    title: '',
    children: GaugeSplitLineComponentOption.controls,
    defaultValue: new GaugeSplitLineComponentOption()
  })
  splitLine: GaugeSplitLineComponentOption = new GaugeSplitLineComponentOption()

  @ComponentControl({
    type: ControlType.subset,
    title: '',
    children: GaugeAxisTickComponentOption.controls,
    defaultValue: new GaugeAxisTickComponentOption()
  })
  axisTick: GaugeAxisTickComponentOption = new GaugeAxisTickComponentOption()

  @ComponentControl({
    type: ControlType.style,
    title: '刻度标签文字',
    options: [
      StyleType.fontSize,
      StyleType.color,
      StyleType.fontFamily,
      StyleType.fontWeight
    ]
  })
  @ComponentControl({
    type: ControlType.subset,
    title: '刻度标签样式',
    children: GaugeAxisLabelComponentOption.controls
  })
  axisLabel: GaugeAxisLabelComponentOption = new GaugeAxisLabelComponentOption()

  @ComponentControl({
    type: ControlType.subset,
    title: '指针样式',
    children: GaugePointerComponentOption.controls,
    defaultValue: new GaugePointerComponentOption()
  })
  pointer: GaugePointerComponentOption = new GaugePointerComponentOption()
}

export class GaugeDataComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({
    type: ControlType.subset,
    title: '标题样式',
    children: GaugeTitleComponentOption.controls,
    defaultValue: new GaugeTitleComponentOption()
  })
  @ComponentControl({
    type: ControlType.style,
    title: '标题文字样式',
    options: [
      StyleType.fontSize,
      StyleType.color,
      StyleType.fontFamily,
      StyleType.fontWeight
    ]
  })
  title: GaugeTitleComponentOption = new GaugeTitleComponentOption()

  @ComponentControl({
    type: ControlType.subset,
    title: '数据样式',
    children: GaugeDetailComponentOption.controls,
    defaultValue: new GaugeDetailComponentOption()
  })
  @ComponentControl({
    type: ControlType.style,
    title: '数据文字样式',
    options: [
      StyleType.fontSize,
      StyleType.color,
      StyleType.fontFamily,
      StyleType.fontWeight
    ]
  })
  detail: GaugeDetailComponentOption = new GaugeDetailComponentOption()

  @ComponentControl({
    type: ControlType.graphset,
    title: '图形样式',
    value: {
      get(opt: any) {
        return opt
      },
      set(opt: any, v: any) {}
    }
  })
  itemStyle = {
    color: '',
    borderColor: '',
    borderWidth: 0,
    borderType: 'solid'
  }
}

export class GaugeChartComponentOption extends BaseComponentOption {
  static controls: Array<IControl> = []

  mergeMethod: DataMergeMethod = DataMergeMethod.row

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
  tooltip?: TooltipComponentOption = new TooltipComponentOption()

  @ComponentControl({
    type: ControlType.subset,
    title: '图例标签',
    children: LegendComponentOption.controls,
    enableProperty: 'show',
    defaultValue: new LegendComponentOption()
  })
  legend: LegendComponentOption = new LegendComponentOption()

  @ComponentControl({
    type: ControlType.subset,
    title: '图形',
    children: GaugeSeriesComponentOption.controls,
    array: true,
    addable: false,
    defaultValue: new GaugeSeriesComponentOption()
  })
  series: Array<GaugeSeriesComponentOption> = [new GaugeSeriesComponentOption()]

  @ComponentControl({
    type: ControlType.subset,
    title: '仪表盘',
    children: GaugeDataComponentOption.controls,
    array: true,
    addable: true,
    defaultValue: new GaugeDataComponentOption()
  })
  gaugeData: Array<GaugeDataComponentOption> = [new GaugeDataComponentOption()]
}
export class GaugeChartComponent extends BaseComponent {
  icon: string = `<svg id="图层_1" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="2" ry="2" fill="none" opacity="0.5"/><path d="M13.86,27.47a7,7,0,0,1-1.36-4.32,7.5,7.5,0,0,1,15,0,7,7,0,0,1-1.36,4.32l2,.91a10.8,10.8,0,0,0,1.59-5.23A9.7,9.7,0,0,0,20,13.38a9.85,9.85,0,0,0-9.77,9.77,7.94,7.94,0,0,0,1.59,5.23l2-.91Z" fill="#f9896b"/><path d="M10,29.52A11.87,11.87,0,0,1,20,11.34,11.73,11.73,0,0,1,31.82,23.15,12.19,12.19,0,0,1,30,29.52l2.73,1.59a15.53,15.53,0,0,0,2.27-8,15,15,0,0,0-30,0,15.53,15.53,0,0,0,2.27,8Z" fill="#7678ed"/><path d="M22.05,30.2c.22-1.14.9-11.82.9-11.82s-4.77,9.55-5,10.91a2,2,0,0,0,1.6,2.5,2,2,0,0,0,2.5-1.59Z" fill="#f9896b"/></svg>`
  constructor(language: string) {
    super(language)
  }
  title: string = '仪表盘'
  option: GaugeChartComponentOption = new GaugeChartComponentOption()
  getComponent() {
    return GaugeChart
  }
}
