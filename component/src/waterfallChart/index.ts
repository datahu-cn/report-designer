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
  MarkAreaComponentOption
} from '../base'
import WaterfallChart from './WaterfallChart.vue'

export class WaterfallSeriesComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  type: string = 'bar'

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

  stack: string = 'waterfall'

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

  @ComponentControl({
    type: ControlType.slider,
    title: '平滑曲线',
    min: 0,
    max: 1,
    step: 0.1
  })
  smooth: number = 0

  @ComponentControl({
    type: ControlType.subset,
    title: '标记点',
    children: MarkPointComponentOption.controls
  })
  markPoint: MarkPointComponentOption = new MarkPointComponentOption()

  @ComponentControl({
    type: ControlType.subset,
    title: '标记线',
    children: MarkLineComponentOption.controls
  })
  markLine: MarkLineComponentOption = new MarkLineComponentOption()

  @ComponentControl({
    type: ControlType.subset,
    title: '标记区域',
    children: MarkAreaComponentOption.controls
  })
  markArea: MarkAreaComponentOption = new MarkAreaComponentOption()
}

export class FieldComponentOption {
  static controls = []

  @ComponentControl({
    type: ControlType.fieldSelect,
    title: '分组',
    multiple: true
  })
  xaxis = []

  @ComponentControl({
    type: ControlType.fieldSelect,
    title: '瀑布值',
    multiple: false
  })
  waterfallSeries = []

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

  @ComponentControl({
    type: ControlType.fieldSelect,
    title: '视觉映射',
    multiple: true
  })
  visual = []
}

export class WaterfallChartComponentOption extends BaseComponentOption {
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
    title: '图例标签',
    children: LegendComponentOption.controls,
    enableProperty: 'show',
    defaultValue: new LegendComponentOption()
  })
  legend: LegendComponentOption = new LegendComponentOption()

  @ComponentControl({
    type: ControlType.subset,
    title: '绘图网格',
    children: GridComponentOption.controls,
    enableProperty: 'show',
    defaultValue: new GridComponentOption()
  })
  grid: GridComponentOption = new GridComponentOption()

  @ComponentControl({
    type: ControlType.subset,
    title: 'x轴',
    children: XAxisComponentOption.controls,
    enableProperty: 'show',
    defaultValue: new XAxisComponentOption()
  })
  xAxis: XAxisComponentOption = new XAxisComponentOption()

  @ComponentControl({
    type: ControlType.subset,
    title: 'y轴',
    children: YAxisComponentOption.controls,
    enableProperty: 'show',
    defaultValue: new YAxisComponentOption()
  })
  yAxis: YAxisComponentOption = new YAxisComponentOption()

  @ComponentControl({
    type: ControlType.subset,
    title: '瀑布图',
    children: SeriesComponentOption.controls,
    array: true,
    addable: false,
    enableProperty: '_enabled',
    defaultValue: new SeriesComponentOption({stack: 'waterfall', type: 'bar'})
  })
  waterfallSeries: Array<SeriesComponentOption> = [
    new SeriesComponentOption({stack: 'waterfall', type: 'bar'})
  ]

  @ComponentControl({
    type: ControlType.subset,
    title: '图形',
    children: SeriesComponentOption.controls,
    array: true,
    addable: true,
    enableProperty: '_enabled',
    defaultValue: new SeriesComponentOption()
  })
  series: Array<SeriesComponentOption> = [new SeriesComponentOption()]

  @ComponentControl({
    type: ControlType.subset,
    title: '视觉映射',
    children: VisualMapComponentOption.controls,
    array: true,
    addable: true,
    enableProperty: '_enabled',
    defaultValue: new VisualMapComponentOption({
      _seriesOpts: [
        {label: '瀑布图-透明底部', value: 0},
        {label: '瀑布图-顶部', value: 1}
      ]
    })
  })
  visualMap: Array<VisualMapComponentOption> = [
    new VisualMapComponentOption({
      _seriesOpts: [
        {label: '瀑布图-透明底部', value: 0},
        {label: '瀑布图-顶部', value: 1}
      ]
    })
  ]
}
export class WaterfallChartComponent extends BaseComponent {
  icon: string = `<svg id="图层_1" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="2" ry="2" fill="none" opacity="0.5"/><rect x="6.02" y="6.41" width="4.81" height="22.97" fill="#7678ed"/><polygon points="18.63 6.41 18.63 11.92 13.82 11.92 13.82 6.41 18.63 6.41 18.63 6.41" fill="#f9896b"/><rect x="21.63" y="11.52" width="4.81" height="9.77" fill="#7678ed"/><rect x="29.44" y="21.12" width="4.81" height="8.26" fill="#f9896b"/><rect x="5" y="31.59" width="30" height="2" fill="#f9896b"/></svg>`

  constructor(language: string) {
    super(language)
  }
  title: string = '瀑布图'
  option: WaterfallChartComponentOption = new WaterfallChartComponentOption()
  getComponent() {
    return WaterfallChart
  }
}
