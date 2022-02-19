import {
  AreaStyleComponentOption,
  BaseComponentOption,
  DataOperationComponentOption,
  DataZoomComponentOption,
  GridComponentOption,
  LegendComponentOption,
  SeriesComponentOption,
  TooltipComponentOption,
  VisualMapComponentOption,
  XAxisComponentOption,
  YAxisComponentOption
} from '@datahu/component-base'
import {IControl, ControlType, ComponentControl, Util} from '@datahu/core'
import Cartesian2dChart from '../cartesian2dChart/Cartesian2dChart.vue'
import {
  Cartesian2dChartComponent,
  FieldComponentOption
} from '../cartesian2dChart'

export class BarChartComponentOption extends BaseComponentOption {
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
    title: '数据缩放',
    children: DataZoomComponentOption.controls,
    array: true,
    addable: true,
    enableProperty: '_enabled',
    defaultValue: new DataZoomComponentOption()
  })
  dataZoom: Array<DataZoomComponentOption> = [new DataZoomComponentOption()]

  @ComponentControl({
    type: ControlType.subset,
    title: '图形',
    children: SeriesComponentOption.controls,
    array: true,
    addable: true,
    enableProperty: '_enabled',
    defaultValue: new SeriesComponentOption({
      type: 'bar'
    })
  })
  series: Array<SeriesComponentOption> = [
    new SeriesComponentOption({
      type: 'bar'
    })
  ]

  @ComponentControl({
    type: ControlType.subset,
    title: '视觉映射',
    children: VisualMapComponentOption.controls,
    array: true,
    addable: true,
    enableProperty: '_enabled',
    defaultValue: new VisualMapComponentOption()
  })
  visualMap: Array<VisualMapComponentOption> = [new VisualMapComponentOption()]
}
export class BarChartComponent extends Cartesian2dChartComponent {
  icon: string = `<svg id="图层_1" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="2" ry="2" fill="none" opacity="0.5"/><path d="M22.66,27.89H17.53a.33.33,0,0,1-.29-.36h0V7.18a.33.33,0,0,1,.29-.36h5.13a.33.33,0,0,1,.29.36V27.53a.33.33,0,0,1-.29.36Z" fill="#7678ed"/><path d="M14,27.89H8.84a.33.33,0,0,1-.29-.36h0V12a.33.33,0,0,1,.29-.36H14a.33.33,0,0,1,.29.36V27.53a.33.33,0,0,1-.29.36Z" fill="#7678ed"/><path d="M31.16,27.89H26a.33.33,0,0,1-.29-.36h0V16.21a.33.33,0,0,1,.29-.36h5.13a.33.33,0,0,1,.29.36V27.53a.33.33,0,0,1-.29.36Z" fill="#7678ed"/><rect x="5" y="31" width="30" height="2" fill="#f9896b"/></svg>`
  constructor(language: string) {
    super(language)
  }
  title: string = '柱状图'
  option: BarChartComponentOption = new BarChartComponentOption()
  getComponent() {
    return Cartesian2dChart
  }
}
