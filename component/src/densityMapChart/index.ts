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
  SeriesLabelComponentOption
} from '../base'
import DensityMapChart from './DensityMapChart.vue'

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
    multiple: false
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
    multiple: false
  })
  visual = []
}

class DensityMapSeriesComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }
  type: string = 'map'

  @ComponentControl({
    type: ControlType.select,
    options: [
      {label: '中华人民共和国', value: '中华人民共和国'},
      {label: '河北省', value: '河北省'},
      {label: '山西省', value: '山西省'},
      {label: '内蒙古自治区', value: '内蒙古自治区'},
      {label: '辽宁省', value: '辽宁省'},
      {label: '吉林省', value: '吉林省'},
      {label: '黑龙江省', value: '黑龙江省'},
      {label: '江苏省', value: '江苏省'},
      {label: '浙江省', value: '浙江省'},
      {label: '安徽省', value: '安徽省'},
      {label: '福建省', value: '福建省'},
      {label: '江西省', value: '江西省'},
      {label: '山东省', value: '山东省'},
      {label: '河南省', value: '河南省'},
      {label: '湖北省', value: '湖北省'},
      {label: '湖南省', value: '湖南省'},
      {label: '广东省', value: '广东省'},
      {label: '东沙群岛', value: '东沙群岛'},
      {label: '广西壮族自治区', value: '广西壮族自治区'},
      {label: '海南省', value: '海南省'},
      {label: '四川省', value: '四川省'},
      {label: '贵州省', value: '贵州省'},
      {label: '云南省', value: '云南省'},
      {label: '西藏自治区', value: '西藏自治区'},
      {label: '陕西省', value: '陕西省'},
      {label: '甘肃省', value: '甘肃省'},
      {label: '青海省', value: '青海省'},
      {label: '宁夏回族自治区', value: '宁夏回族自治区'},
      {label: '新疆维吾尔自治区', value: '新疆维吾尔自治区'},
      {label: '北京市', value: '北京市'},
      {label: '天津市', value: '天津市'},
      {label: '深圳市', value: '深圳市'},
      {label: '重庆市', value: '重庆市'},
      {label: '台湾省', value: '台湾省'},
      {label: '香港特别行政区', value: '香港特别行政区'},
      {label: '澳门特别行政区', value: '澳门特别行政区'},
      {label: '世界', value: 'world'}
    ],
    title: '加载地图'
  })
  map: string = '中华人民共和国'

  @ComponentControl({
    type: ControlType.select,
    options: [
      {label: '不开启', value: false},
      {label: '开启', value: true},
      {label: '缩放', value: 'scale'},
      {label: '平移', value: 'move'}
    ],
    title: '缩放和平移'
  })
  roam: string | boolean = false

  // @ComponentControl({
  //   type: ControlType.number,
  //   title: '定位中心坐标',
  //   array: true,
  //   addable: false
  // })
  // center: Array<number> = [108.39, 39.9]

  @ComponentControl({
    type: ControlType.number,
    title: '地图的长宽比'
  })
  aspectScale: number = 0.75

  @ComponentControl({
    type: ControlType.number,
    title: '当前视角的缩放比例'
  })
  zoom: number = 1

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
    borderColor: 'gray',
    borderWidth: 0.3,
    borderType: 'solid'
  }

  @ComponentControl({
    type: ControlType.boolean,
    title: '显示区域中心点标识'
  })
  showLegendSymbol: boolean = false

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
    type: ControlType.styleLength,
    title: '地图中心在屏幕中的位置',
    options: [{label: '%', value: '%', number: true}],
    array: true,
    addable: false
  })
  layoutCenter: Array<string> = ['50%', '50%']

  @ComponentControl({
    type: ControlType.number,
    title: '地图的大小'
  })
  layoutSize: number | undefined = undefined

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
}

export class DensityMapChartComponentOption extends BaseComponentOption {
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
  legend: LegendComponentOption = new LegendComponentOption({show: false})
  @ComponentControl({
    type: ControlType.subset,
    title: '地图',
    children: DensityMapSeriesComponentOption.controls,
    array: true,
    addable: false,
    enableProperty: '_enabled',
    defaultValue: new DensityMapSeriesComponentOption()
  })
  series: Array<DensityMapSeriesComponentOption> = [
    new DensityMapSeriesComponentOption({map: '中华人民共和国'})
  ]

  @ComponentControl({
    type: ControlType.subset,
    title: '视觉映射',
    children: VisualMapComponentOption.controls,
    array: true,
    addable: false,
    enableProperty: '_enabled',
    defaultValue: new VisualMapComponentOption()
  })
  visualMap: Array<VisualMapComponentOption> = [
    new VisualMapComponentOption({
      show: true,
      _enabled: true,
      min: 0,
      max: 100,
      inRange: {
        color: ['#ffffff', '#ec6d79']
      }
    })
  ]
}
export class DensityMapChartComponent extends BaseComponent {
  icon: string = `<svg id="图层_1" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="2" ry="2" fill="none" opacity="0.5"/><path d="M32.18,27.14c-.07,0-.15,0-.21,0a.27.27,0,0,1-.18.1c0,.12-.17.13-.2.22s0,.16-.05.19l-.1,0a.45.45,0,0,0,0,.25,1.55,1.55,0,0,0-.21.59s0,.09.06.14-.06.24-.07.35l.13.12s0,.13.08.13.05.09.05.14.13,0,.18,0l0,0v.05c.14.05.05.19.16.21s.1,0,.15,0,.1-.09.12-.17a1,1,0,0,1,0-.35c.18-.19.1-.47.22-.67a4.58,4.58,0,0,0,0-1.33c-.11,0-.13-.08-.17-.12Z" fill="#f9896b"/><path d="M19.41,17c-.92.27-1.11,1.84-.46,2.19a6.91,6.91,0,0,1,2.5,3.33c.19.35,1.11.88,1.48.35.19-.26.09-.7.37-.79,1.11-.53,3,1.14,3.24-.53s-.83-3.24.46-4.37c.37-.35,1.21.17,1.58-.18a1.39,1.39,0,0,0,.18-2.1,2.05,2.05,0,0,0-1.66-.35c.18-.88,1.66-1.84.55-2.1l-.18-.05,0,0h-.15a.22.22,0,0,0-.14.09v0a1.69,1.69,0,0,1-.09.34.45.45,0,0,1-.26.09l-.06.07a2.33,2.33,0,0,1-.25.07,2.5,2.5,0,0,1-.3.28l-.1.05,0,0c-.07,0-.08.07-.15.07-.32.09-.61-.09-.91,0a.85.85,0,0,0-.19.09c0,.09-.07.09-.12.1s0,.27,0,.39a1.68,1.68,0,0,0,.21.34l.08.09v0a.2.2,0,0,1-.12.1c0,.06,0,.15-.1.19a.44.44,0,0,1-.15,0,1.84,1.84,0,0,0-.25.23c0,.08,0,.14-.1.18a2.52,2.52,0,0,1-.64,0,2.37,2.37,0,0,1-.45,0c-.23.06-.5.08-.75.16l-.09.08-.25,0-.06.08a.5.5,0,0,1-.16,0,1.38,1.38,0,0,1-.33.2C21.11,16.59,20.17,16.81,19.41,17Z" fill="#f9896b"/><path d="M20.72,28.77c-.15-.55.77-1.47.67-2.22s-.93.62-.59-.88.8-.36,1.42-1.21a1.64,1.64,0,0,0,.22-1.35,1.41,1.41,0,0,1-1-.57,6.91,6.91,0,0,0-2.5-3.33c-.64-.35-.46-1.93.47-2.19.75-.21,1.69-.43,2.06-1l-.14.05c-.11,0-.12-.08-.19-.1a5.9,5.9,0,0,1-.6,0c-.07-.1-.19-.15-.22-.25s-.27,0-.4-.08,0-.1,0-.15l-.21-.13h-.2c-.1,0-.11-.08-.18-.1-.41,0-.76-.08-1.15-.06l-.09-.06a2.83,2.83,0,0,0-.7-.11c-.1,0-.1-.09-.19-.08s-.13-.08-.18-.09-.08-.09-.08-.14v-.1c-.06,0-.07-.1-.1-.13s-.07-.13-.05-.19l-.1-.14c0-.11,0-.26-.06-.34s-.1,0-.14-.06H16.4c-.11-.05-.11-.19-.21-.2a1.77,1.77,0,0,1,0-.2c-.17-.06-.26-.21-.4-.24h-.11a1.52,1.52,0,0,0-.6-.2L15,12.83a.73.73,0,0,1-.41-.12,1,1,0,0,1,0-.39.92.92,0,0,0,.2-.41c-.1-.18,0-.39-.13-.54l-.06,0a2.27,2.27,0,0,1-.05-.43c-.05,0-.05-.1-.06-.14s-.11-.11-.19-.14-.1,0-.14,0a.68.68,0,0,1-.21-.1.21.21,0,0,0-.14-.15.58.58,0,0,0-.18-.17c-.08-.2,0-.45-.06-.62a1.42,1.42,0,0,0-.76.07c-.06.05-.06.1-.11.15l0,0a.27.27,0,0,1-.18.1c-.07,0-.15,0-.2,0s-.12.06-.14.09a.62.62,0,0,0-.06.44c-.07,0-.05.16-.11.18a.73.73,0,0,1-.3.06l-.18,0h0c-.11,0-.14-.11-.21-.12s-.25-.15-.38-.15-.1.1-.18.12,0,.15-.12.17a1.39,1.39,0,0,0-.12.25.34.34,0,0,0-.12.12l0,.09-.1.07a1.47,1.47,0,0,0-.05.34l0,.07h-.4c-.2-.2-.51-.07-.74-.11s-.1.13-.18.13,0,.15-.07.18c0,.37,0,.75,0,1.09l0,0h0c-.06,0-.06.11-.12.11l-.1.09a.74.74,0,0,1-.16.49l-.09.05a.93.93,0,0,0-.44.11,2.17,2.17,0,0,0-.91,0c-.09.1-.23.08-.34.08s-.13,0-.14.08l0,.09A1.61,1.61,0,0,0,6,14.2c-.09,0-.16,0-.25,0a.23.23,0,0,0-.17-.13,2.73,2.73,0,0,1-.4-.05l-.09.05a1.84,1.84,0,0,0-.41,0,.66.66,0,0,1-.28.19l0,.05c-.06,0-.08.08-.15.08a.55.55,0,0,0,0,.4A.8.8,0,0,1,4,15l0,.09,0,.1c.07,0,.09.1.12.13s.23,0,.35.07,0,.1.07.15,0,.15,0,.19a2,2,0,0,1-.11.25v.2l0,0a1.13,1.13,0,0,0-.29.13.34.34,0,0,0,0,.2,2.78,2.78,0,0,0,.27.19c.08.07.1.18.18.22.08.24,0,.51.08.74l0,0c.1,0,.11.08.19.09a2,2,0,0,0,.41.41h.1c0,.1.19,0,.19.1a1.54,1.54,0,0,0,.19.79,1.83,1.83,0,0,1-.15.25,3.79,3.79,0,0,1,.1.73l0,.06c-.09,0-.11-.08-.17-.13h0a.87.87,0,0,0-.2.12c0,.06,0,.14,0,.19a8.7,8.7,0,0,0,0,.89c.1,0,.13.12.18.18l.1,0c.1.12.19.23.3.34s.08.18.14.24a4,4,0,0,1,.28.43c.06,0,.15,0,.19.08s.12-.1.19-.15a.47.47,0,0,1,.15,0,3.08,3.08,0,0,1,.77.92c.07.06.19.06.25.1l.1.07.09.07c0,.08,0,.21.05.25l.09.05.06.09.23.09a.39.39,0,0,1,0,.14.41.41,0,0,0,.08.12c.1,0,.16.08.25.1a1.23,1.23,0,0,0,.1.2,1.08,1.08,0,0,0,.35,0c.06,0,.09.09.15.09s.35.11.5.15l.15.08h.26c.08,0,.09.12.16.14s.17-.05.25-.06c.14.15,0,.39.12.52a.84.84,0,0,0,.2.05c.07,0,.13,0,.15-.06a1,1,0,0,0,.08-.24c.05-.07.16-.12.22-.19h.3l.1.08a2.63,2.63,0,0,1,.36.1l.05.09.1.06,0,.09a.35.35,0,0,1,.17.17,1.06,1.06,0,0,1,.29.22c0,.11,0,.17,0,.25l.12.12a1.22,1.22,0,0,0,.6,0c.09,0,.1-.07.16-.08h.09c.08,0,.1-.07.16-.08l0,0c.16-.07.35-.05.43-.17a1.63,1.63,0,0,0,.25-.15l.1,0h.06c.1,0,.13-.07.19-.07l.13-.08h.19a2.47,2.47,0,0,0,.46.31c.13,0,.3,0,.4,0a1.37,1.37,0,0,1,.17-.23c.06,0,.09,0,.14,0,.07.18.15.35.24.53l.1,0,.07.08a.72.72,0,0,1,0,.33.74.74,0,0,0,0,.29.59.59,0,0,1-.11.19c0,.09,0,.17-.05.2a.86.86,0,0,0-.22.2c-.14.05-.21.2-.28.28v.09c0,.1-.15.08-.16.17a2.31,2.31,0,0,0,0,.64l.06,0c.19.05.41,0,.56,0l0,.1c0,.11,0,.19,0,.29s.12.14.16.22a.56.56,0,0,1,.19.11c-.06.08,0,.15-.08.19s0,.2,0,.29.07.1.1.15.09.06.13.1a.27.27,0,0,1,.15.05.14.14,0,0,0,.1.11c.05,0,.05.13.08.15a.86.86,0,0,1,.14.13.42.42,0,0,0,.24,0c.11,0,.07-.14.17-.14l0,0a1,1,0,0,1,.08.24c.13,0,.09.12.18.17a.8.8,0,0,0,.15,0c.1,0,.11-.1.19-.08.16-.22,0-.5,0-.72s.14-.05.21-.07a1.1,1.1,0,0,0,.25,0l.05-.1a.25.25,0,0,1,.15-.05c.25.1.51,0,.75.1s.1-.06.15-.08a1,1,0,0,0,.3,0,8,8,0,0,0,0-1.15ZM36,9.3l-.1-.09h0l-.09.07h-.1a1.93,1.93,0,0,0-.34.29c-.13,0-.21,0-.27.14S35,9.83,35,9.9s-.12.13-.2.2a2.49,2.49,0,0,1-.49.12.77.77,0,0,0-.19-.14l-.06,0L34,10a.46.46,0,0,0-.08-.19.17.17,0,0,1-.09-.11.51.51,0,0,1-.22-.19.48.48,0,0,0-.26,0,1.1,1.1,0,0,0-.25-.17,4,4,0,0,1-.7,0l-.08-.08c0-.06-.05-.12-.08-.12a2,2,0,0,1-.1-.39c-.07,0-.07-.1-.08-.14s-.11,0-.16,0a1.07,1.07,0,0,1-.13-.19A.33.33,0,0,0,31.62,8c-.06,0-.05-.17-.1-.2l-.05,0c-.07,0,0-.14-.07-.2s-.16-.18-.24-.25-.06-.13-.09-.14-.16,0-.2-.12-.17,0-.25,0-.09.08-.14.08a.77.77,0,0,0-.31-.16c-.11,0-.21,0-.3,0a.64.64,0,0,1-.3,0c-.1,0-.13.08-.21.08s-.11.09-.19.09a.79.79,0,0,0-.3,0l0,0,0,0h-.09s0,.11-.07.14-.08.08-.14.08l-.13,0c-.05.06-.08.13-.13.18v.09l.12.13.25,0,0,0c0,.12,0,.2,0,.3l-.05.09-.12.12c0,.08,0,.16-.05.19l-.05,0a3.8,3.8,0,0,1-.19.4,1.67,1.67,0,0,1-.06.39,2.34,2.34,0,0,0-.31.33s-.1,0-.16.07a5.8,5.8,0,0,0-.59,0L27,10a1.53,1.53,0,0,0-.19.41l-.05,0a2.64,2.64,0,0,0-.12.4l-.05,0a3.71,3.71,0,0,0-.08.54c0,.08.06.1.08.14l0,0,.1.07a.54.54,0,0,0,.25-.06l.14-.09h.19l.09.06c.07.05.13,0,.18.05s.13-.13.22-.13l.07-.09a.24.24,0,0,1,.25,0l.05.1.1,0c.07.08.12.16.2.18s.05.11.12.11.08.08.08.15l-.06.07a3.89,3.89,0,0,0-.51,0l-.11.08h-.25c-.14.09-.21.21-.31.28l.19.05c1.11.26-.37,1.22-.56,2.1a2.07,2.07,0,0,1,1.67.35,1.39,1.39,0,0,1-.19,2.1c-.37.35-1.2-.17-1.57.18-1.3,1.13-.09,2.8-.47,4.37l0,.11c.31.17.54.28.65.2s.83-.75.85-.56.6,1.21.91-.1a1.08,1.08,0,0,1,1-.89c0-.06.08-.08.13-.12a.89.89,0,0,1,.36-.38,1.14,1.14,0,0,1,.1-.19l.06,0c.06-.06,0-.17.08-.24l0,0c.08,0,.2,0,.25-.06l0-.05a1.62,1.62,0,0,0,.55-.42l0-.1c-.07,0-.08-.08-.15-.08h-.14c-.13,0-.18-.08-.26-.08l-.05,0a.72.72,0,0,0-.25-.08l-.1-.13a.85.85,0,0,0-.61.29l-.09,0a1,1,0,0,1-.29.31c-.07,0-.1,0-.15,0l-.05-.1.09,0v-.24a.58.58,0,0,0-.36-.23,2,2,0,0,1-.35,0,.78.78,0,0,1-.16-.24c0-.07-.06-.15,0-.19a.19.19,0,0,1,.14,0l.16,0c.1,0,.13-.06.19-.06a1.56,1.56,0,0,1,.21-.18c0-.09,0-.09,0-.15a1.7,1.7,0,0,1,.27-.39c.15-.05.25-.12.35-.16s.05-.1.05-.15.1-.08.12-.13.06-.18.14-.25l.16,0c.09,0,.11-.09.2-.08a.7.7,0,0,1,0,.25c-.07.05,0,.15-.11.19l-.08.05c-.09.26.07.55-.06.78l-.07.06a.29.29,0,0,1,0,.16c0,.09.08.11.09.18s.22-.09.35-.12a.91.91,0,0,0,.1-.13h.05c.05,0,.05-.1.07-.13l.1-.1c0-.06,0-.09,0-.15a.54.54,0,0,0,.13-.14c0-.07.05-.1.05-.15a.41.41,0,0,1,.2-.13,1,1,0,0,0,.68-.23v-.05a.41.41,0,0,1,.22-.21c.05-.07,0-.16.15-.23l0-.1c0-.11.16-.14.16-.25v0c0-.08.06-.1.08-.15l.08-.08v-.05a1.83,1.83,0,0,1,.1-.2c0-.05.1-.05.15-.06a1.72,1.72,0,0,0,.71,0l.09-.06c0-.08.08-.1.08-.18s-.08-.08-.08-.15a3.23,3.23,0,0,1,.37-.37c.09-.13.12-.26.2-.35a.31.31,0,0,1,.16.06l0,.09a.19.19,0,0,0,.15,0l0,0c.09-.14,0-.26.09-.4s.13-.17.19-.24c-.06-.23,0-.47-.15-.64s-.13-.26-.17-.39,0-.15,0-.2.17-.11.22-.17l0-.1a1,1,0,0,1,.6-.07c0-.08,0-.11.1-.13a.59.59,0,0,0,.09-.2,12.71,12.71,0,0,1,.06-1.52l0,0a.39.39,0,0,0,0-.39c0-.09,0-.15,0-.24a.3.3,0,0,1,.1-.14.27.27,0,0,0,0-.15Z" fill="#7678ed"/><path d="M28.92,21.22c-.31,1.31-.9.3-.92.1s-.6.36-.84.56-.34,0-.65-.2c-.34,1.48-2.13-.09-3.22.42-.27.09-.18.52-.37.79a.54.54,0,0,1-.48.22,1.64,1.64,0,0,1-.22,1.35c-.62.85-1.07-.3-1.42,1.21s.48.13.59.88-.83,1.66-.67,2.22a7.09,7.09,0,0,1,0,1.15l.06,0c.05-.1.17-.14.22-.2s.16-.13.18-.21a2.7,2.7,0,0,0,.55.24H22l.05,0c0,.13,0,.26,0,.37s0,.14.06.15.2.19.27.28a.45.45,0,0,0,.25,0l.35.16a1,1,0,0,0,.3,0c.11,0,.07-.13.19-.13a1.48,1.48,0,0,1,.35.05c0,.07.1.08.13.12l.25,0,0,0a1.48,1.48,0,0,1,0,.19l.05,0c0,.13.1.19.1.29s.1.1.14.15a.82.82,0,0,0,.19.06l0,0,0,.08-.1,0c-.08,0-.08-.07-.16-.07a.61.61,0,0,1-.3.08,5.71,5.71,0,0,0-.49.36c0,.09-.07.12-.09.17a1.29,1.29,0,0,0,0,.29l0,0a.31.31,0,0,1,0,.18l.05,0c.07.05.15,0,.2.05l0,0a.71.71,0,0,1,.19.08h.34s.13,0,.15-.1a.57.57,0,0,0,.28-.11l.05-.1.11-.05c.08-.11,0-.28,0-.39a2.53,2.53,0,0,1,.19-.22l.11,0a.49.49,0,0,0,0-.2l-.07-.07c-.21-.07-.4,0-.6-.07v-.05c0-.07.15-.05.16-.1s.09-.16.09-.25a1.54,1.54,0,0,0-.1-.19l0,0,0-.08a.48.48,0,0,1,.15,0c.08,0,.1-.06.15-.08l.05-.05a.88.88,0,0,1,.28,0c.11-.06.16-.15.26-.17a.27.27,0,0,0,.15-.05l0-.07c.15,0,.33,0,.45-.09s.07-.08.07-.15a.28.28,0,0,1,.19-.12h.16l.08-.06c0-.05,0-.11.06-.13l.09,0c0,.06,0,.09,0,.14l.05,0c.1,0,.13-.07.2-.08l.05,0c.16-.05.27-.2.4-.23l.05-.05c.12-.06.2,0,.3,0l.14-.11a.65.65,0,0,0,.51-.17h.06c.09-.06.21-.14.21-.28s.2-.1.23-.2h.16l0,0c0-.08-.12,0-.1-.11l0,0c.06,0,.09,0,.14,0s.17-.25.29-.31l.08-.06c0-.06,0-.14,0-.19l.07-.09c.1,0,.16,0,.24,0l.09-.07c.08-.06.08-.23.17-.27l.08-.07c0-.06,0-.09,0-.15l0,0,0,0,0,0a1.31,1.31,0,0,1,.14-.29c0-.15-.06-.27,0-.39s.06-.11.06-.14.1,0,.14-.06a.51.51,0,0,0,0-.2c0-.1.07-.13.07-.19s.09-.15.09-.25a1.7,1.7,0,0,0,.18-.44c.1-.08.11-.19.18-.26l.2-.1,0-.05c0-.15-.08-.32,0-.44l0-.15a2.33,2.33,0,0,0-.08-.59,1,1,0,0,1-.31-.25c-.13,0-.26,0-.36,0l0,0,.05-.09h.15c.08,0,.1-.06.15-.08s.23-.14.29-.24l-.06-.11a.74.74,0,0,1-.23-.2.83.83,0,0,0-.1-.29l-.1-.1a1.14,1.14,0,0,0-.15-.29c-.08-.14-.21-.14-.28-.22l0-.05a3.1,3.1,0,0,0-.1-.69l-.11-.13c0-.07,0-.19-.06-.24l-.1-.05c-.05-.1-.14-.05-.22-.13s-.22,0-.3-.05-.13-.07-.13-.16.07-.14.12-.15,0,0,0,0a1.07,1.07,0,0,0-1,.89Z" fill="#ffc700"/></svg>`
  constructor(language: string) {
    super(language)
  }
  title: string = '密度地图'
  option: DensityMapChartComponentOption = new DensityMapChartComponentOption()
  getComponent() {
    return DensityMapChart
  }
}
