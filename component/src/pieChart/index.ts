import {IControl, ControlType, ComponentControl, Util} from '@datahu/core'
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
  DataOperationComponentOption
} from '../base'

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
    type: ControlType.text,
    title: '标签格式',
    show(opt: any) {
      return opt.show
    }
  })
  formatter: string = '{b}  {d}%'

  fontSize: string = ''
  color: string = ''
  fontFamily: string = ''
  fontWeight: string = ''

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
    title: '支持多个选中'
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
  center: Array<string> = ['50%', '50%']

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
  radius: Array<any> = ['0', '65%']

  @ComponentControl({
    type: ControlType.subset,
    title: '（圆心）坐标',
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
