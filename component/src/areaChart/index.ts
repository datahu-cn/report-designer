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
  YAxisComponentOption,
  EchartComponentOption
} from '@datahu/component-base'
import {IControl, ControlType, ComponentControl, Util} from '@datahu/core'
import Cartesian2dChart from '../cartesian2dChart/Cartesian2dChart.vue'
import {
  Cartesian2dChartComponent,
  FieldComponentOption
} from '../cartesian2dChart'

export class AreaChartComponentOption extends BaseComponentOption {
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
      areaStyle: new AreaStyleComponentOption(),
      symbol: 'none',
      lineStyle: {
        color: '',
        width: 0,
        type: 'solid'
      }
    })
  })
  series: Array<SeriesComponentOption> = [
    new SeriesComponentOption({
      areaStyle: new AreaStyleComponentOption(),
      symbol: 'none',
      lineStyle: {
        color: '',
        width: 0,
        type: 'solid'
      }
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
export class AreaChartComponent extends Cartesian2dChartComponent {
  icon: string = `<svg id="图层_1" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="2" ry="2" fill="none" opacity="0.5"/><rect x="5" y="30.77" width="30" height="2" fill="#f9896b"/><path d="M5.22,26.67s4-19.44,9.26-19.44c4.34,0,4.14,7.07,7.39,7.07s2.66-3.63,6.11-3.63c5.42,0,6.8,15.91,6.8,15.91H5.22Z" fill="#f9896b"/><path d="M5.22,26.65s4-12,9.26-12c4.34,0,4.14,4.4,7.39,4.4s2.66-2.2,6.11-2.2c5.42,0,6.8,9.91,6.8,9.91H5.22Z" fill="#7678ed"/></svg>`
  constructor(language: string) {
    super(language)
  }
  title: string = '面积图'
  option: AreaChartComponentOption = new AreaChartComponentOption()
  getComponent() {
    return Cartesian2dChart
  }
}
