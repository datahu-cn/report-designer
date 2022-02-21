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
  DataOperationComponentOption,
  DataZoomComponentOption,
  EchartComponentOption
} from '@datahu/component-base'
import Cartesian2dChart from './Cartesian2dChart.vue'

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

export class Cartesian2dChartComponentOption extends BaseComponentOption {
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
    defaultValue: new VisualMapComponentOption()
  })
  visualMap: Array<VisualMapComponentOption> = [new VisualMapComponentOption()]
}
export class Cartesian2dChartComponent extends BaseComponent {
  icon: string =
    '<svg t="1617162901613" class="icon" viewBox="0 0 1127 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4054" width="32" height="32"><path d="M346.981295 832.460432H260.051799c-9.576978 0-17.680576-8.103597-17.680576-17.680576V251.948201c0-9.576978 8.103597-17.680576 17.680576-17.680575h86.929496c9.576978 0 17.680576 8.103597 17.680576 17.680575v562.831655c0 9.576978-8.103597 17.680576-17.680576 17.680576z" fill="#21D3AC" p-id="4055"></path><path d="M579.77554 832.460432H492.846043c-9.576978 0-17.680576-8.103597-17.680575-17.680576V443.48777c0-9.576978 8.103597-17.680576 17.680575-17.680576h86.929497c9.576978 0 17.680576 8.103597 17.680575 17.680576v371.292086c0 9.576978-8.103597 17.680576-17.680575 17.680576zM812.569784 832.460432H725.640288c-9.576978 0-17.680576-8.103597-17.680576-17.680576V355.821583c0-9.576978 8.103597-17.680576 17.680576-17.680576h86.929496c9.576978 0 17.680576 8.103597 17.680576 17.680576v458.958273c0 9.576978-8.103597 17.680576-17.680576 17.680576z" fill="#4988FD" p-id="4056"></path><path d="M1045.364029 832.460432h-86.929497c-9.576978 0-17.680576-8.103597-17.680575-17.680576V607.033094c0-9.576978 8.103597-17.680576 17.680575-17.680576h86.929497c9.576978 0 17.680576 8.103597 17.680575 17.680576v207.746762c0 9.576978-8.103597 17.680576-17.680575 17.680576z" fill="#6097FD" p-id="4057"></path><path d="M1003.372662 387.499281c-5.156835 0-10.313669-2.210072-13.997122-5.893526l-218.060432-246.791367-215.85036 168.702159c-7.366906 5.893525-18.417266 5.156835-24.310791-1.473382L271.838849 32.414388c-7.366906-7.366906-6.630216-19.153957 0.736691-25.784172 7.366906-7.366906 19.153957-6.630216 25.784172 0.73669l248.264748 257.841727 216.587051-169.438849c7.366906-5.893525 18.417266-5.156835 25.047482 2.210072l229.847482 259.315108c6.630216 7.366906 5.893525 19.153957-1.473381 25.784173-4.420144 2.946763-8.840288 4.420144-13.260432 4.420144z" fill="#4988FD" p-id="4058"></path><path d="M1012.94964 397.81295h-79.56259c-10.313669 0-18.417266-8.103597-18.417266-18.417267s8.103597-18.417266 18.417266-18.417266h61.145324v-61.145323c0-10.313669 8.103597-18.417266 18.417266-18.417267s18.417266 8.103597 18.417266 18.417267v79.562589c0 10.313669-8.103597 18.417266-18.417266 18.417267z" fill="#4988FD" p-id="4059"></path><path d="M1106.509353 962.854676l-1085.145324-3.683453c-10.313669 0-18.417266-8.103597-18.417266-18.417266s8.103597-18.417266 18.417266-18.417266l1085.145324 3.683453c10.313669 0 18.417266 8.103597 18.417266 18.417266s-8.103597 18.417266-18.417266 18.417266z" fill="#DFECFD" p-id="4060"></path><path d="M77.352518 1018.106475c-10.313669 0-18.417266-8.103597-18.417266-18.417266L61.882014 54.515108c0-10.313669 8.103597-18.417266 18.417267-18.417266s18.417266 8.103597 18.417266 18.417266v100.926619L95.769784 999.689209c0 10.313669-8.103597 18.417266-18.417266 18.417266z" fill="#DFECFD" p-id="4061"></path></svg>'
  constructor(language: string) {
    super(language)
  }
  option: Cartesian2dChartComponentOption =
    new Cartesian2dChartComponentOption()
  getComponent() {
    return Cartesian2dChart
  }
}
