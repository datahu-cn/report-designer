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
import RadarChart from './RadarChart.vue'

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
    title: '最大值',
    multiple: false
  })
  max = []

  @ComponentControl({
    type: ControlType.fieldSelect,
    title: '最小值',
    multiple: false
  })
  min = []
}

export class RadarAreaStyleComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({
    type: ControlType.color,
    title: '区域颜色'
  })
  color: string = ''
}

export class RadarSeriesComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  type: string = 'radar'

  @ComponentControl({
    type: ControlType.graph,
    title: '图形标记',
    value: {
      get(opt: any) {
        return opt
      },
      set(opt: any, v: any) {}
    },
    show(opt: any) {
      return opt.type != 'bar'
    }
  })
  symbol: string = 'circle'
  symbolSize: Array<any> = [10, 10]

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
    type: ControlType.graphline,
    title: '线条样式',
    value: {
      get(opt: any) {
        return opt
      },
      set(opt: any, v: any) {}
    },
    show(opt: any) {
      return opt.type == 'line'
    }
  })
  lineStyle = {
    color: '',
    width: 2,
    type: 'solid'
  }

  @ComponentControl({
    type: ControlType.subset,
    title: '',
    children: RadarAreaStyleComponentOption.controls,
    defaultValue: new RadarAreaStyleComponentOption()
  })
  areaStyle: RadarAreaStyleComponentOption = new RadarAreaStyleComponentOption()

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
}

class RadarNameComponentOption {
  static controls = []
  color: string = ''
  fontSize: string = ''
  fontFamily: string = ''
  fontWeight: string = ''

  backgroundColor: string = ''
}

class RadarConfigComponentOption {
  static controls = []

  @ComponentControl({type: ControlType.boolean, title: '显示名称'})
  show: boolean = true

  @ComponentControl({
    type: ControlType.styleLength,
    title: '（圆心）坐标',
    options: [
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true}
    ],
    array: true,
    addable: false
  })
  center: Array<string> = ['50%', '50%']

  @ComponentControl({
    type: ControlType.styleLength,
    title: '半径',
    options: [
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true}
    ]
  })
  radius: string = '70%'

  @ComponentControl({
    type: ControlType.number,
    min: 0,
    max: 360,
    title: '起始刻度的角度'
  })
  startAngle: number = 90

  @ComponentControl({
    type: ControlType.style,
    title: '文字样式',
    options: [
      StyleType.fontSize,
      StyleType.color,
      StyleType.fontFamily,
      StyleType.fontWeight,
      StyleType.backgroundColor
    ]
  })
  axisName: RadarNameComponentOption = new RadarNameComponentOption()

  @ComponentControl({
    type: ControlType.number,
    title: '指示器名称和指示器轴的距离'
  })
  axisNameGap: number = 15

  @ComponentControl({
    type: ControlType.number,
    title: '指示器轴的分割段数'
  })
  splitNumber: number = 5

  @ComponentControl({
    type: ControlType.select,
    title: '雷达图绘制类型',
    options: [
      {label: '多边行', value: 'polygon'},
      {label: '圆形', value: 'circle'}
    ]
  })
  shape: string = 'polygon'

  @ComponentControl({
    type: ControlType.style,
    title: '标签样式',
    options: [
      StyleType.fontSize,
      StyleType.color,
      StyleType.fontFamily,
      StyleType.fontWeight
    ]
  })
  @ComponentControl({
    type: ControlType.subset,
    title: '',
    children: AxisLabelComponentOption.controls
  })
  axisLabel: AxisLabelComponentOption = new AxisLabelComponentOption({
    show: false
  })
}

export class RadarChartComponentOption extends BaseComponentOption {
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
    title: '雷达图配置',
    children: RadarConfigComponentOption.controls,
    defaultValue: new RadarConfigComponentOption()
  })
  radar: RadarConfigComponentOption = new RadarConfigComponentOption()

  @ComponentControl({
    type: ControlType.subset,
    title: '图形',
    children: RadarSeriesComponentOption.controls,
    array: true,
    addable: true,
    enableProperty: '_enabled',
    defaultValue: new RadarSeriesComponentOption()
  })
  series: Array<RadarSeriesComponentOption> = [new RadarSeriesComponentOption()]
}
export class RadarChartComponent extends BaseComponent {
  icon: string = `<svg id="图层_1" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="2" ry="2" fill="none" opacity="0.5"/><path d="M14.12,28.5,11.9,17.85l8-5.79,8,5.79L24.8,27.22Z" fill="#f9896b"/><path d="M16.61,25.25l.16-6.18,3.11-3.42,3.51,3.93-.89,3.84Z" fill="#ffc700"/><path d="M32.22,17,20.33,8.39a.57.57,0,0,0-.66,0L7.78,17a.54.54,0,0,0-.2.62l4.54,14a.55.55,0,0,0,.53.39h14.7a.56.56,0,0,0,.53-.38l4.54-14A.54.54,0,0,0,32.22,17ZM19.88,21.2l3.93,6.11L15,28.36Zm-.44-1.68-6.07-1.45,6.07-4.42Zm1.11-5.86,6.12,4.43-6.12,1.39Zm-1.11-1.38L12,17.73,9.5,17.14l9.94-7.22ZM19,20.55l-4.54,6.7-1.7-8.19Zm-4.76,9h.09l10.16-1.22,1.65,2.56H13.31Zm6.57-9,6.35-1.44L24.7,26.64Zm7.31-2.79-7.55-5.48V9.92l10,7.29Zm-19.2.37,2.65.63,2,9.76-.88,1.3ZM27.11,30.4l-1.64-2.55,2.93-9,2.66-.61Z" fill="#7678ed"/></svg>`
  constructor(language: string) {
    super(language)
  }
  title: string = '雷达图'
  option: RadarChartComponentOption = new RadarChartComponentOption()
  getComponent() {
    return RadarChart
  }
}
