import {IControl, ControlType, ComponentControl, Util} from '@datahu/core'
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
  EchartComponentOption
} from '@datahu/component-base'
import LineChart from './LineChart.vue'

class FieldComponentOption {
  static controls = []

  @ComponentControl({
    type: ControlType.fieldSelect,
    title: '分组'
  })
  xaxis = []

  @ComponentControl({
    type: ControlType.fieldSelect,
    title: '值'
  })
  series = []

  @ComponentControl({
    type: ControlType.fieldSelect,
    title: '工具提示'
  })
  tooltip = []

  @ComponentControl({
    type: ControlType.fieldSelect,
    title: '视觉映射'
  })
  visual = []
}

class LineChartComponentOption extends BaseComponentOption {
  static controls: Array<IControl> = []
  @ComponentControl({
    type: ControlType.subset,
    title: '栏',
    children: FieldComponentOption.controls
  })
  fields: FieldComponentOption = new FieldComponentOption()

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
    enableProperty: 'show'
  })
  tooltip?: TooltipComponentOption = new TooltipComponentOption()

  @ComponentControl({
    type: ControlType.subset,
    title: '图例',
    children: LegendComponentOption.controls,
    enableProperty: 'show'
  })
  legend: LegendComponentOption = new LegendComponentOption()

  @ComponentControl({
    type: ControlType.subset,
    title: '坐标系内绘图网格',
    children: GridComponentOption.controls,
    array: true,
    addable: true,
    defaultValue: new GridComponentOption(),
    enableProperty: '_enabled'
  })
  grid: Array<GridComponentOption> = [new GridComponentOption()]

  @ComponentControl({
    type: ControlType.subset,
    title: 'x轴',
    children: XAxisComponentOption.controls,
    array: true,
    addable: true,
    defaultValue: new XAxisComponentOption(),
    enableProperty: '_enabled'
  })
  xAxis: Array<XAxisComponentOption> = [new XAxisComponentOption()]

  @ComponentControl({
    type: ControlType.subset,
    title: 'y轴',
    children: YAxisComponentOption.controls,
    array: true,
    addable: true,
    defaultValue: new YAxisComponentOption(),
    enableProperty: '_enabled'
  })
  yAxis: Array<YAxisComponentOption> = [new YAxisComponentOption()]

  @ComponentControl({
    type: ControlType.subset,
    title: '极坐标系',
    children: PolarComponentOption.controls,
    array: true,
    addable: true,
    defaultValue: new PolarComponentOption(),
    enableProperty: '_enabled'
  })
  polar: Array<PolarComponentOption> = [new PolarComponentOption()]

  @ComponentControl({
    type: ControlType.subset,
    title: '极坐标系的径向轴',
    children: RadiusAxisComponentOption.controls,
    array: true,
    addable: true,
    defaultValue: new RadiusAxisComponentOption(),
    enableProperty: '_enabled'
  })
  radiusAxis: Array<RadiusAxisComponentOption> = [
    new RadiusAxisComponentOption()
  ]

  @ComponentControl({
    type: ControlType.subset,
    title: '极坐标系的角度轴',
    children: AngleAxisComponentOption.controls,
    array: true,
    addable: true,
    defaultValue: new AngleAxisComponentOption(),
    enableProperty: '_enabled'
  })
  angleAxis: Array<AngleAxisComponentOption> = [new AngleAxisComponentOption()]

  @ComponentControl({
    type: ControlType.subset,
    title: '图形',
    children: SeriesComponentOption.controls,
    array: true,
    addable: true,
    enableProperty: '_enabled'
  })
  series: Array<SeriesComponentOption> = [new SeriesComponentOption()]

  @ComponentControl({
    type: ControlType.subset,
    title: '视觉映射',
    children: VisualMapComponentOption.controls,
    array: true,
    addable: true,
    enableProperty: '_enabled'
  })
  visualMap: Array<VisualMapComponentOption> = [new VisualMapComponentOption()]
}
export class LineChartComponent extends BaseComponent {
  icon: string =
    '<svg t="1613803642431" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2197"><path d="M888 792H200V168c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h752c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z" p-id="2198"></path><path d="M305.8 637.7c3.1 3.1 8.1 3.1 11.3 0l138.3-137.6L583 628.5c3.1 3.1 8.2 3.1 11.3 0l275.4-275.3c3.1-3.1 3.1-8.2 0-11.3l-39.6-39.6c-3.1-3.1-8.2-3.1-11.3 0l-230 229.9L461.4 404c-3.1-3.1-8.2-3.1-11.3 0L266.3 586.7c-3.1 3.1-3.1 8.2 0 11.3l39.5 39.7z" p-id="2199"></path></svg>'
  constructor(language: string) {
    super(language)
  }
  option: LineChartComponentOption = new LineChartComponentOption()
  getComponent() {
    return LineChart
  }
}
