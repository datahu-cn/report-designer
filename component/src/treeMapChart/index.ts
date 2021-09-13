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
  @ComponentControl({
    type: ControlType.fieldSelect,
    title: '工具提示',
    multiple: true
  })
  tooltip = []
}

class TreeMapSeriesItemStyleComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  color = ''
  borderColor = ''
  borderWidth = 0
  borderType = 'solid'
  borderRadius = [0, 0, 0, 0]

  @ComponentControl({
    type: ControlType.number,
    title: '矩形间隔距离'
  })
  gapWidth = 0
}

class TreeMapSeriesUpperLabelComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }
  @ComponentControl({type: ControlType.boolean, title: '标签显示'})
  show: boolean = false

  @ComponentControl({
    type: ControlType.select,
    title: '标签的位置',
    options: [
      {label: 'top', value: 'top'},
      {label: 'left', value: 'left'},
      {label: 'right', value: 'right'},
      {label: 'bottom', value: 'bottom'},
      {babel: 'inside', value: 'inside'},
      {babel: 'insideLeft', value: 'insideLeft'},
      {babel: 'insideRight', value: 'insideRight'},
      {babel: 'insideTop', value: 'insideTop'},
      {babel: 'insideBottom', value: 'insideBottom'},
      {babel: 'insideTopLeft', value: 'insideTopLeft'},
      {babel: 'insideBottomLeft', value: 'insideBottomLeft'},
      {babel: 'insideTopRight', value: 'insideTopRight'},
      {babel: 'insideBottomRight', value: 'insideBottomRight'}
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
  formatter: string = ''

  fontSize: string = ''
  color: string = ''
  fontFamily: string = ''
  fontWeight: string = ''
  backgroundColor: string = ''
}

class TreeMapSeriesLevelComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({
    type: ControlType.graphset,
    title: '矩形样式',
    value: {
      get(opt: any) {
        return opt
      },
      set(opt: any, v: any) {}
    }
  })
  @ComponentControl({
    type: ControlType.subset,
    title: '',
    children: TreeMapSeriesItemStyleComponentOption.controls,
    defaultValue: new TreeMapSeriesItemStyleComponentOption()
  })
  itemStyle: TreeMapSeriesItemStyleComponentOption = new TreeMapSeriesItemStyleComponentOption()
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
    type: ControlType.styleLength,
    title: '移动和缩放',
    options: [
      {label: '移动和缩放', value: true},
      {label: '缩放', value: 'scale'},
      {label: '移动', value: 'move'},
      {label: '禁用', value: false}
    ]
  })
  roam: string | boolean = true

  @ComponentControl({
    type: ControlType.number,
    title: '展示子层级',
    description: '层次更深的节点则被隐藏起来。点击则可下钻看到层次更深的节点'
  })
  leafDepth: number | undefined = undefined

  @ComponentControl({
    type: ControlType.style,
    title: '标签文字样式',
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
    title: '标签',
    children: SeriesLabelComponentOption.controls
  })
  label: SeriesLabelComponentOption = new SeriesLabelComponentOption({
    show: true,
    position: 'inside'
  })

  @ComponentControl({
    type: ControlType.graphset,
    title: '矩形样式',
    value: {
      get(opt: any) {
        return opt
      },
      set(opt: any, v: any) {}
    }
  })
  @ComponentControl({
    type: ControlType.subset,
    title: '',
    children: TreeMapSeriesItemStyleComponentOption.controls,
    defaultValue: new TreeMapSeriesItemStyleComponentOption()
  })
  itemStyle: TreeMapSeriesItemStyleComponentOption = new TreeMapSeriesItemStyleComponentOption()

  @ComponentControl({
    type: ControlType.style,
    title: '父节点标签文字样式',
    options: [
      StyleType.fontSize,
      StyleType.color,
      StyleType.fontFamily,
      StyleType.fontWeight,
      StyleType.backgroundColor
    ],
    show(opt: any) {
      return opt.upperLabel.show
    }
  })
  @ComponentControl({
    type: ControlType.subset,
    title: '父节点标签样式',
    children: TreeMapSeriesUpperLabelComponentOption.controls
  })
  upperLabel: TreeMapSeriesUpperLabelComponentOption = new TreeMapSeriesUpperLabelComponentOption()

  @ComponentControl({
    type: ControlType.subset,
    title: '各层级配置',
    array: true,
    addable: true,
    defaultValue: new TreeMapSeriesLevelComponentOption(),
    children: TreeMapSeriesLevelComponentOption.controls
  })
  levels: Array<TreeMapSeriesLevelComponentOption> = []
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
