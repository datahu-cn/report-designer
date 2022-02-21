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
  PolarComponentOption,
  AngleAxisComponentOption,
  RadiusAxisComponentOption,
  DataOperationComponentOption,
  MarkPointComponentOption,
  MarkLineComponentOption,
  MarkAreaComponentOption,
  PieceComponentOption,
  RangeComponentOption,
  StyleComponentOption,
  VisualMapComponentOption,
  EchartComponentOption
} from '@datahu/component-base'
import CandlestickChart from './CandlestickChart.vue'

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
    title: '开盘值',
    multiple: false
  })
  open = []
  @ComponentControl({
    type: ControlType.fieldSelect,
    title: '收盘值',
    multiple: false
  })
  close = []
  @ComponentControl({
    type: ControlType.fieldSelect,
    title: '最低值',
    multiple: false
  })
  lowest = []
  @ComponentControl({
    type: ControlType.fieldSelect,
    title: '最高值',
    multiple: false
  })
  highest = []

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

export class CandlestickSeriesComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  type: string = 'candlestick'

  @ComponentControl({
    type: ControlType.kItemStyle,
    title: 'K线样式'
  })
  itemStyle = {
    color: '',
    color0: '',
    borderColor: '',
    borderColor0: '',
    borderWidth: 1
  }

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

export class CandlestickChartComponentOption extends BaseComponentOption {
  static controls: Array<IControl> = []
  @ComponentControl({
    type: ControlType.subset,
    title: '栏',
    children: FieldComponentOption.controls
  })
  fields: FieldComponentOption = new FieldComponentOption()

  @ComponentControl({
    type: ControlType.subset,
    title: '数据与操作',
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
    title: 'K线',
    children: CandlestickSeriesComponentOption.controls,
    array: true,
    addable: false,
    enableProperty: '_enabled',
    defaultValue: new CandlestickSeriesComponentOption()
  })
  candlestickSeries: Array<CandlestickSeriesComponentOption> = [
    new CandlestickSeriesComponentOption()
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
      _seriesOpts: [{label: 'K线', value: 0}]
    })
  })
  visualMap: Array<VisualMapComponentOption> = [
    new VisualMapComponentOption({_seriesOpts: [{label: 'K线', value: 0}]})
  ]
}
export class CandlestickChartComponent extends BaseComponent {
  icon: string = `<svg id="图层_1" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="2" ry="2" fill="none" opacity="0.5"/><polygon points="10.77 24.5 12.62 24.5 12.62 21.73 14.46 21.73 14.46 14.34 12.62 14.34 12.62 12.5 10.77 12.5 10.77 14.34 8.93 14.34 8.93 21.73 10.77 21.73 10.77 24.5" fill="#7678ed"/><polygon points="19.08 30.03 20.92 30.03 20.92 21.73 22.77 21.73 22.77 10.65 20.92 10.65 20.92 6.96 19.08 6.96 19.08 10.65 17.23 10.65 17.23 21.73 19.08 21.73 19.08 30.03" fill="#7678ed"/><polygon points="27.38 27.26 29.23 27.26 29.23 22.65 31.07 22.65 31.07 16.19 29.23 16.19 29.23 11.58 27.38 11.58 27.38 16.19 25.54 16.19 25.54 22.65 27.38 22.65 27.38 27.26" fill="#7678ed"/><rect x="5" y="32.04" width="30" height="2" fill="#f9896b"/></svg>`
  constructor(language: string) {
    super(language)
  }
  title: string = 'K线图'
  option: CandlestickChartComponentOption =
    new CandlestickChartComponentOption()
  getComponent() {
    return CandlestickChart
  }
}
