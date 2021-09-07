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
  AxisLabelComponentOption,
  AreaStyleComponentOption,
  SeriesLabelComponentOption
} from '../base'
import TreeMapChart from './TreeMapChart.vue'

export class FieldComponentOption {
  static controls = []

  @ComponentControl({
    type: ControlType.fieldSelect,
    title: '分组',
    multiple: false
  })
  xaxis = []

  @ComponentControl({
    type: ControlType.fieldSelect,
    title: '值',
    multiple: false
  })
  series = []

  @ComponentControl({
    type: ControlType.fieldSelect,
    title: '父级',
    multiple: false
  })
  parent = []

  // 数据结构有变化， 工具提示有问题
  // @ComponentControl({
  //   type: ControlType.fieldSelect,
  //   title: '工具提示',
  //   multiple: true
  // })
  // tooltip = []
}

export class TreeMapSeriesComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  type: string = 'treemap'

  @ComponentControl({
    type: ControlType.text,
    title: '名称'
  })
  name: string = ''

  @ComponentControl({
    type: ControlType.styleLength,
    title: '距左',
    options: [
      {label: '左', value: 'left', number: false},
      {label: '中', value: 'center', number: false},
      {label: '右', value: 'right', number: false},
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true}
    ]
  })
  left: string = 'center'

  @ComponentControl({
    type: ControlType.styleLength,
    title: '距右',
    options: [
      {label: '自动', value: 'auto', number: false},
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true}
    ]
  })
  right: string = 'auto'

  @ComponentControl({
    type: ControlType.styleLength,
    title: '距上',
    options: [
      {label: '上', value: 'top', number: false},
      {label: '中', value: 'middle', number: false},
      {label: '下', value: 'bottom', number: false},
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true}
    ]
  })
  top: string = 'middle'

  @ComponentControl({
    type: ControlType.styleLength,
    title: '距下',
    options: [
      {label: '自动', value: 'auto', number: false},
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true}
    ]
  })
  bottom: string = 'auto'

  @ComponentControl({
    type: ControlType.styleLength,
    title: '宽',
    options: [
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true}
    ]
  })
  width: string = '80%'

  @ComponentControl({
    type: ControlType.styleLength,
    title: '高',
    options: [
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true}
    ]
  })
  height: string = '80%'

  @ComponentControl({
    type: ControlType.number,
    title: '展示子层级',
    description: '层次更深的节点则被隐藏起来。点击则可下钻看到层次更深的节点'
  })
  leafDepth: number | undefined = undefined

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
  label: SeriesLabelComponentOption = new SeriesLabelComponentOption({
    show: true,
    position: 'inside'
  })
}

export class TreeMapChartComponentOption extends BaseComponentOption {
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
  tooltip?: TooltipComponentOption = new TooltipComponentOption()

  @ComponentControl({
    type: ControlType.subset,
    title: '矩形树图',
    children: TreeMapSeriesComponentOption.controls,
    array: true,
    addable: false,
    defaultValue: new TreeMapSeriesComponentOption()
  })
  series: Array<TreeMapSeriesComponentOption> = [
    new TreeMapSeriesComponentOption()
  ]
}
export class TreeMapChartComponent extends BaseComponent {
  icon: string = `<svg id="图层_1" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="2" ry="2" fill="none" opacity="0.5"/><rect x="5.5" y="8.8" width="15.4" height="12.2" fill="#7678ed"/><rect x="5.5" y="22.8" width="15.4" height="8.4" fill="#7678ed"/><rect x="22.5" y="8.8" width="12" height="9.2" fill="#7678ed"/><rect x="22.5" y="20" width="12" height="5" fill="#f9896b"/><rect x="22.5" y="27" width="12" height="4.2" fill="#f9896b"/></svg>`
  constructor(language: string) {
    super(language)
  }
  title: string = '矩形树图'
  option: TreeMapChartComponentOption = new TreeMapChartComponentOption()
  getComponent() {
    return TreeMapChart
  }
}
