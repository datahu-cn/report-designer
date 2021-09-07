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
  DataOperationComponentOption
} from '../base'
import EchartsChart from './EchartsChart.vue'

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
}

class EchartsOptionComponentOption {
  static controls: Array<IControl> = []

  @ComponentControl({
    type: ControlType.select,
    options: [
      {label: 'world', value: 'world'},
      {label: 'hk', value: 'hk'}
    ],
    title: '加载地图'
  })
  map: string = ''

  @ComponentControl({
    type: ControlType.code,
    title: '代码'
  })
  code: string = `option = {
  dataset: {
    source: data
  },
  xAxis: {
    type: 'category'
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      type: 'line'
    }
  ]
}`
}

export class EchartsChartComponentOption extends BaseComponentOption {
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
    title: 'Echarts 配置',
    children: EchartsOptionComponentOption.controls
  })
  echarts: EchartsOptionComponentOption = new EchartsOptionComponentOption()
}
export class EchartsChartComponent extends BaseComponent {
  icon: string = `<svg id="图层_1" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="2" ry="2" fill="none" opacity="0.5"/><path d="M32.85,7.63H8.64A1.66,1.66,0,0,0,7,9.29V31a1.65,1.65,0,0,0,1.66,1.65H32.85A1.65,1.65,0,0,0,34.51,31V9.29a1.66,1.66,0,0,0-1.66-1.66Zm-5,2.78a.61.61,0,0,1,.61-.61h.61a.61.61,0,0,1,.61.61h0v.69a.61.61,0,0,1-.61.61h-.61a.61.61,0,0,1-.61-.61Zm-2.84,0a.61.61,0,0,1,.61-.61h.61a.61.61,0,0,1,.61.61v.69a.61.61,0,0,1-.61.61h-.61A.61.61,0,0,1,25,11.1Zm7.49,20.24H9V13.55H32.52v17.1Zm0-19.55a.61.61,0,0,1-.61.61h-.61a.61.61,0,0,1-.61-.61h0v-.69a.61.61,0,0,1,.61-.61h.61a.61.61,0,0,1,.61.61Z" fill="#7678ed"/><path d="M12.89,22.75l4.43,2.06A.87.87,0,0,0,18.54,24v0a.86.86,0,0,0-.5-.78l-2.77-1.28L18,20.65a.86.86,0,0,0,.5-.78v0a.86.86,0,0,0-.4-.73.82.82,0,0,0-.46-.13.76.76,0,0,0-.36.08l-4.43,2.05a.88.88,0,0,0-.5.78V22a.87.87,0,0,0,.5.78Zm5.69,4.19a.86.86,0,0,0,.7.35h0a.87.87,0,0,0,.82-.59l2.91-9a.85.85,0,0,0-.12-.77.86.86,0,0,0-.7-.35h0a.86.86,0,0,0-.82.59l-2.91,9a.85.85,0,0,0,.12.77ZM23,19.87a.86.86,0,0,0,.5.78l2.77,1.29-2.77,1.28A.86.86,0,0,0,23,24v0a.86.86,0,0,0,1.22.78l4.43-2.06a.87.87,0,0,0,.5-.78v-.06a.89.89,0,0,0-.5-.79l-4.43-2.05a.73.73,0,0,0-.36-.08.82.82,0,0,0-.46.13.86.86,0,0,0-.4.73v0Z" fill="#f9896b"/></svg>`
  constructor(language: string) {
    super(language)
  }
  title: string = '代码'
  option: EchartsChartComponentOption = new EchartsChartComponentOption()
  getComponent() {
    return EchartsChart
  }
}
