import {
  IControl,
  ControlType,
  ComponentControl,
  Util,
  StyleType
} from '@datahu/core'
import PieChart from './PieChart.vue'
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
  EchartComponentOption
} from '@datahu/component-base'

// 第二列 项
class FieldComponentOption {
  static controls = []

  @ComponentControl({
    type: ControlType.fieldSelect,
    title: '分组',
    multiple: true
  })
  xaxis = []

  @ComponentControl({
    type: ControlType.fieldSelect,
    title: '值',
    multiple: true
  })
  series = []

  @ComponentControl({
    type: ControlType.fieldSelect,
    title: '工具提示',
    multiple: true
  })
  tooltip = []
}

export class PieSeriesLabelComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []

  @ComponentControl({type: ControlType.boolean, title: '标签显示'})
  show: boolean = true

  @ComponentControl({
    type: ControlType.select,
    title: '显示位置',
    options: [
      {label: '扇区外侧', value: 'outside'},
      {label: '扇区内部', value: 'inside'},
      {label: '中心位置', value: 'center'}
    ],
    show(opt: any) {
      return opt.show
    }
  })
  position: string = ''

  @ComponentControl({
    type: ControlType.textarea,
    title: '标签格式',
    show(opt: any) {
      return opt.show
    }
  })
  formatter: string = '{b}\n{d}%'

  @ComponentControl({
    type: ControlType.select,
    title: '标签的对齐方式',
    options: [
      {label: '自动', value: 'none'},
      {label: '末端对齐', value: 'labelLine'},
      {label: '文字对齐', value: 'edge'}
    ],
    show(opt: any) {
      return opt.show
    }
  })
  alignTo = ''

  @ComponentControl({
    type: ControlType.number,
    title: '内边距',
    show(opt: any) {
      return opt.show
    }
  })
  padding = 0

  @ComponentControl({
    type: ControlType.number,
    title: '文字块的圆角',
    show(opt: any) {
      return opt.show
    }
  })
  borderRadius = 0

  color = ''
  fontWeight = ''
  fontFamily = ''
  fontSize = ''
  backgroundColor = ''
  lineHeight = ''

  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }
}

//series 项
export class PieSeriesComponentOption {
  _enabled: boolean = true
  type: string = 'pie'
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({
    type: ControlType.boolean,
    title: '支持选中'
  })
  selectedMode: boolean = false

  @ComponentControl({
    type: ControlType.boolean,
    title: '顺时针排布'
  })
  clockwise: boolean = false

  @ComponentControl({
    type: ControlType.number,
    title: '起始角度'
  })
  startAngle: number = 90

  @ComponentControl({
    type: ControlType.number,
    title: '最小的扇区角度',
    description:
      '最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互。'
  })
  minAngle: number = 0

  @ComponentControl({
    type: ControlType.number,
    title: '不显示最小角度',
    description:
      '小于这个角度（0 ~ 360）的扇区，不显示标签（label 和 labelLine）。'
  })
  minShowLabelAngle: number = 0

  @ComponentControl({
    type: ControlType.select,
    title: '南丁格尔图',
    options: [
      {label: '否', value: false},
      {label: '圆心角,半径', value: 'radius'},
      {label: '半径', value: 'area'}
    ]
  })
  roseType: boolean = false

  voidLabelOverlap: boolean = true

  tillShowZeroSum: boolean = true

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
    ]
  })
  left: string = 'auto'

  @ComponentControl({
    type: ControlType.styleLength,
    title: '距右',
    options: [
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true}
    ]
  })
  right: string = ''

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
    ]
  })
  top: string = 'auto'

  @ComponentControl({
    type: ControlType.styleLength,
    title: '距下',
    options: [
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true}
    ]
  })
  bottom: string = ''

  @ComponentControl({
    type: ControlType.styleLength,
    title: '（圆心）坐标',
    options: [
      {label: '%', value: '%', number: true},
      {label: 'px', value: '', number: true}
    ],
    array: true,
    addable: false
  })
  center: Array<string> = ['50%', '55%']

  @ComponentControl({
    type: ControlType.styleLength,
    title: '半径',
    options: [
      {label: '%', value: '%', number: true},
      {label: 'px', value: '', number: true}
    ],
    array: true,
    addable: false
  })
  radius: Array<any> = ['0', '55%']

  @ComponentControl({
    type: ControlType.style,
    title: '标签文字',
    show(opt: any) {
      return opt.label.show
    },
    options: [
      StyleType.fontSize,
      StyleType.color,
      StyleType.fontFamily,
      StyleType.fontWeight,
      StyleType.backgroundColor
    ]
  })
  @ComponentControl({
    type: ControlType.subset,
    title: '标签',
    children: PieSeriesLabelComponentOption.controls
  })
  label: PieSeriesLabelComponentOption = new PieSeriesLabelComponentOption()

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
    borderType: 'solid',
    borderRadius: [0, 0, 0, 0]
  }
}

class PieAnimationComponentOption {
  _enabled: boolean = false
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({
    type: ControlType.select,
    multiple: true,
    options: [
      {label: '高亮扇区', value: 'highlight'},
      {label: '显示Tooltip', value: 'showTip'}
    ],
    title: '触发动作'
  })
  actions = ['highlight']

  @ComponentControl({
    type: ControlType.number,
    title: '应用到第几个图形系列',
    min: 1
  })
  seriesIndex = 1

  @ComponentControl({
    type: ControlType.number,
    title: '播放速度（ms）'
  })
  speed: number = 2000
}

//第三列 项
class PieChartComponentOption extends BaseComponentOption {
  static controls: Array<IControl> = []

  // 挂在第二列 项
  @ComponentControl({
    type: ControlType.subset,
    title: '栏',
    children: FieldComponentOption.controls
  })
  fields: FieldComponentOption = new FieldComponentOption()

  // // 后面挂在第三列 项
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
    title: '图表',
    children: EchartComponentOption.controls,
    defaultValue: new EchartComponentOption()
  })
  echart?: EchartComponentOption = new EchartComponentOption()

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
    children: PieSeriesComponentOption.controls,
    array: true,
    addable: true,
    enableProperty: '_enabled',
    defaultValue: new PieSeriesComponentOption()
  })
  series: Array<PieSeriesComponentOption> = [new PieSeriesComponentOption()]

  @ComponentControl({
    type: ControlType.subset,
    title: '动画',
    enableProperty: '_enabled',
    children: PieAnimationComponentOption.controls
  })
  animation: PieAnimationComponentOption = new PieAnimationComponentOption()
}
export class PieChartComponent extends BaseComponent {
  icon: string = `<svg id="图层_1" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="2" ry="2" fill="none" opacity="0.5"/><path d="M20.31,32A12,12,0,0,0,30.45,14.09L20.31,20.18Z" fill="#7678ed" opacity="0.5"/><path d="M9.62,14A12,12,0,0,0,19.69,32V20.18L9.62,14Z" fill="#f9896b"/><path d="M30.13,13.57A12,12,0,0,0,10,13.44L20,19.64Z" fill="#7678ed"/></svg>`
  constructor(language: string) {
    super(language)
  }
  title: string = '饼图'
  option: PieChartComponentOption = new PieChartComponentOption()
  getComponent() {
    return PieChart
  }
}
