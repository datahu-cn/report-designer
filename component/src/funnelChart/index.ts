import {
  IControl,
  ControlType,
  ComponentControl,
  Util,
  StyleType
} from '@datahu/core'
import FunnelChart from './FunnelChart.vue'
import {
  BaseComponent,
  BaseComponentOption,
  TooltipComponentOption,
  LegendComponentOption,
  DataOperationComponentOption
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

export class FunnelSeriesLabelComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []

  @ComponentControl({type: ControlType.boolean, title: '标签显示'})
  show: boolean = false

  //top / left / right / bottom / inside / insideLeft / insideRight / insideTop / insideBottom / insideTopLeft / insideBottomLeft
  // insideTopRight / insideBottomRight
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
      {babel: 'leftTop', value: 'leftTop'},
      {babel: 'leftBottom', value: 'leftBottom'},
      {babel: 'rightTop', value: 'rightTop'},
      {babel: 'rightBottom', value: 'rightBottom'},
      {babel: 'outside', value: 'outside'}
    ],
    show(opt: any) {
      return opt.show
    }
  })
  position: string = 'outside'

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

  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }
}

//series 项
export class FunnelSeriesComponentOption {
  _enabled: boolean = true
  type: string = 'funnel'
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({
    type: ControlType.number,
    title: '数据最小值'
  })
  min?: number

  @ComponentControl({
    type: ControlType.number,
    title: '数据最大值'
  })
  max?: number

  @ComponentControl({
    type: ControlType.styleLength,
    title: '最小值映射的宽度',
    options: [
      {label: '%', value: '%', number: true},
      {label: 'px', value: '', number: true}
    ]
  })
  minSize: number | string = '0%'

  @ComponentControl({
    type: ControlType.styleLength,
    title: '最大值映射的宽度',
    options: [
      {label: '%', value: '%', number: true},
      {label: 'px', value: '', number: true}
    ]
  })
  maxSize: number | string = '100%'

  @ComponentControl({
    type: ControlType.select,
    title: '布局方向',
    options: [
      {label: '纵向', value: 'vertical'},
      {label: '横向', value: 'horizontal'}
    ]
  })
  orient: string = 'vertical'

  @ComponentControl({
    type: ControlType.select,
    title: '数据对齐布局',
    options: [
      {label: '居中', value: 'center'},
      {label: '左', value: 'left'},
      {label: '右', value: 'right'}
    ]
  })
  funnelAlign: string = 'center'

  @ComponentControl({
    type: ControlType.select,
    title: '数据排序',
    options: [
      {label: '倒序', value: 'descending'},
      {label: '正序', value: 'ascending'},
      {label: '不排序', value: 'none'}
    ]
  })
  sort: string = 'descending'

  @ComponentControl({
    type: ControlType.number,
    title: '数据图形间距'
  })
  gap: number = 0

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
    children: FunnelSeriesLabelComponentOption.controls
  })
  label: FunnelSeriesLabelComponentOption = new FunnelSeriesLabelComponentOption()

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
}

//第三列 项
class FunnelChartComponentOption extends BaseComponentOption {
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
    children: FunnelSeriesComponentOption.controls,
    array: true,
    addable: true,
    enableProperty: '_enabled',
    defaultValue: new FunnelSeriesComponentOption()
  })
  series: Array<FunnelSeriesComponentOption> = [
    new FunnelSeriesComponentOption()
  ]
}
export class FunnelChartComponent extends BaseComponent {
  icon: string = `<svg id="图层_1" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="2" ry="2" fill="none" opacity="0.5"/><polygon points="30.67 16 27.33 24 12.67 24 9.33 16 30.67 16" fill="#f9896b"/><polygon points="31.5 14 34 8 6 8 8.5 14 31.5 14" fill="#7678ed"/><polygon points="26.5 26 24 32 16 32 13.5 26 26.5 26" fill="#ffc700"/></svg>`
  constructor(language: string) {
    super(language)
  }
  title: string = '漏斗图'
  option: FunnelChartComponentOption = new FunnelChartComponentOption()
  getComponent() {
    return FunnelChart
  }
}
