import {
  IControl,
  IDataSource,
  SourceCode,
  ITableDefinition,
  IComponent,
  ComponentControl,
  ControlType,
  StyleType,
  Util,
  IPackageDefinition,
  DataMergeMethod
} from '@datahu/core'
import {Axis, number} from 'echarts'
import {I18n} from '../i18n'
export * from './Base'
export * from './ChartUtil'

export class AmapComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  // enable 3D mode
  viewMode: string = '3D'
  // initial options of AMap
  // See https://lbs.amap.com/api/javascript-api/reference/map#MapOption for details
  // initial map center [lng, lat]

  @ComponentControl({
    type: ControlType.number,
    title: '定位中心坐标',
    array: true,
    addable: false
  })
  center: Array<number> = [108.39, 39.9]
  // initial map zoom
  @ComponentControl({
    type: ControlType.slider,
    title: '地图缩放级别',
    min: 0,
    max: 15,
    step: 0.1
  })
  zoom: number = 4

  @ComponentControl({
    type: ControlType.slider,
    step: 1,
    title: '俯仰角度',
    min: 0,
    max: 83
  })
  pitch: number = 0
  // whether the map and echarts automatically handles browser window resize to update itself.
  resizeEnable: boolean = false
  // customized map style, see https://lbs.amap.com/dev/mapstyle/index for details
  @ComponentControl({
    type: ControlType.select,
    title: '地图风格样式',
    options: [
      {label: '标准', value: 'amap://styles/normal'},
      {label: '幻影黑', value: 'amap://styles/dark'},
      {label: '月光银', value: 'amap://styles/light'},
      {label: '远山黛', value: 'amap://styles/whitesmoke'},
      {label: '草色青', value: 'amap://styles/fresh'},
      {label: '雅士灰', value: 'amap://styles/grey'},
      {label: '涂鸦', value: 'amap://styles/graffiti'},
      {label: '马卡龙', value: 'amap://styles/macaron'},
      {label: '靛青蓝', value: 'amap://styles/blue'},
      {label: '极夜蓝', value: 'amap://styles/darkblue'},
      {label: '酱籽', value: 'amap://styles/wine'}
    ]
  })
  mapStyle: string = ''
  // whether echarts layer should be rendered when the map is moving. Default is true.
  // if false, it will only be re-rendered after the map `moveend`.
  // It's better to set this option to false if data is large.
  renderOnMoving: boolean = true
  // the zIndex of echarts layer for AMap, default value is 2000.
  // deprecated since v1.9.0, use `echartsLayerInteractive` instead.
  // echartsLayerZIndex: 2019,
  // whether echarts layer is interactive. Default value is true
  // supported since v1.9.0
  @ComponentControl({
    type: ControlType.boolean,
    title: '遮挡地图层交互'
  })
  echartsLayerInteractive: boolean = true
  // whether to enable large mode. Default value is false
  // supported since v1.9.0
  largeMode: boolean = false
  // Note: Please DO NOT use the initial option `layers` to add Satellite/RoadNet/Other layers now.
  // There are some bugs about it, we can use `amap.add` instead.
  // Refer to the codes at the bottom.

  // More initial options...
}

export class PosComponentOption {
  static controls: Array<IControl> = []

  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({type: ControlType.text, title: '左'})
  left?: number = 0

  @ComponentControl({type: ControlType.text, title: '顶部'})
  top?: number = 0

  @ComponentControl({type: ControlType.text, title: '宽'})
  width?: string | number = 50

  @ComponentControl({type: ControlType.text, title: '高'})
  height?: string | number = '1w'

  @ComponentControl({
    type: ControlType.boolean,
    title: '固定宽度'
  })
  fixWidth?: boolean = false

  @ComponentControl({
    type: ControlType.boolean,
    title: '固定高度'
  })
  fixHeight?: boolean = false
}

export class StyleComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []

  backgroundColor: string = ''

  backgroundImage: string = ''
  backgroundSize: string = ''

  textAlign: string = ''
  display: string = ''
  alignItems: string = ''
  justifyContent: string = ''

  width: string = ''
  height: string = ''
  minWidth: string = ''
  maxWidth: string = ''
  minHeight: string = ''
  maxHeight: string = ''

  fontSize: string = ''
  color: string = ''
  fontFamily: string = ''
  fontWeight: string = ''
  lineHeight: string = ''

  borderTopWidth: string = ''
  borderTopColor: string = ''
  borderTopStyle: string = ''

  borderBottomWidth: string = ''
  borderBottomColor: string = ''
  borderBottomStyle: string = ''

  borderRightWidth: string = ''
  borderRightColor: string = ''
  borderRightStyle: string = ''

  borderLeftWidth: string = ''
  borderLeftColor: string = ''
  borderLeftStyle: string = ''

  paddingTop: string = ''
  paddingRight: string = ''
  paddingBottom: string = ''
  paddingLeft: string = ''

  marginTop: string = ''
  marginRight: string = ''
  marginBottom: string = ''
  marginLeft: string = ''

  borderTopLeftRadius: string = ''
  borderTopRightRadius: string = ''
  borderBottomRightRadius: string = ''
  borderBottomLeftRadius: string = ''

  graphShape: string = ''

  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }
}

export class TitleComponentOption {
  static controls: Array<IControl> = []

  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  show: boolean = false

  @ComponentControl({type: ControlType.textarea, title: '标题'})
  name: string = '标题'

  @ComponentControl({
    type: ControlType.select,
    title: '位置',
    options: [
      {value: 'top', label: '上'},
      {value: 'right', label: '右'},
      {value: 'bottom', label: '下'},
      {value: 'left', label: '左'}
    ]
  })
  position: string = 'top'

  @ComponentControl({
    type: ControlType.style,
    title: '样式',
    options: [
      StyleType.width,
      StyleType.height,
      StyleType.alignItems,
      StyleType.justifyContent,
      StyleType.fontSize,
      StyleType.color,
      StyleType.fontFamily,
      StyleType.fontWeight,
      StyleType.lineHeight,
      StyleType.padding,
      StyleType.margin,
      StyleType.borderWidth,
      StyleType.borderColor,
      StyleType.borderStyle,
      StyleType.borderRadius,
      StyleType.backgroundColor,
      StyleType.backgroundImage
    ]
  })
  style: StyleComponentOption = new StyleComponentOption({
    display: 'flex',
    paddingTop: '5px',
    paddingRight: '7px',
    paddingBottom: '5px',
    paddingLeft: '7px',
    fontWeight: 'bold'
  })
}

export class ContentComponentOption {
  static controls: Array<IControl> = []

  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({
    type: ControlType.style,
    title: '样式',
    options: [
      StyleType.width,
      StyleType.height,
      StyleType.alignItems,
      StyleType.justifyContent,
      StyleType.fontSize,
      StyleType.color,
      StyleType.fontFamily,
      StyleType.fontWeight,
      StyleType.lineHeight,
      StyleType.padding,
      StyleType.margin,
      StyleType.borderWidth,
      StyleType.borderColor,
      StyleType.borderStyle,
      StyleType.borderRadius,
      StyleType.backgroundColor,
      StyleType.backgroundImage
    ]
  })
  style: StyleComponentOption = new StyleComponentOption({
    display: 'flex'
  })
}

export class BodyComponentOption {
  static controls: Array<IControl> = []

  @ComponentControl({
    type: ControlType.style,
    title: '样式',
    options: [
      StyleType.padding,
      StyleType.borderWidth,
      StyleType.borderColor,
      StyleType.borderStyle,
      StyleType.borderRadius,
      StyleType.backgroundColor,
      StyleType.backgroundImage,
      StyleType.color,
      StyleType.fontSize,
      StyleType.fontFamily,
      StyleType.fontWeight,
      StyleType.textAlign,
      StyleType.lineHeight
    ]
  })
  style: StyleComponentOption = new StyleComponentOption({
    borderTopColor: '#d9d9d9',
    borderRightColor: '#d9d9d9',
    borderBottomColor: '#d9d9d9',
    borderLeftColor: '#d9d9d9'
  })

  // @ComponentControl({
  //   type: ControlType.select,
  //   title: '内容溢出',
  //   description: '当设置为“显示”时，可能遮挡附近的内容',
  //   options: [
  //     {label: '隐藏', value: 'hidden'},
  //     {label: '滚动条', value: 'auto'},
  //     {label: '显示', value: 'visible'}
  //   ]
  // })
  overflow: string = ''

  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }
}

export class TooltipComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []

  show: boolean = true

  @ComponentControl({
    type: ControlType.style,
    title: '样式',
    options: [
      StyleType.width,
      StyleType.height,
      StyleType.textAlign,
      StyleType.fontSize,
      StyleType.color,
      StyleType.fontFamily,
      StyleType.fontWeight,
      StyleType.lineHeight,
      StyleType.padding,
      StyleType.margin,
      StyleType.borderWidth,
      StyleType.borderColor,
      StyleType.borderStyle,
      StyleType.borderRadius,
      StyleType.backgroundColor,
      StyleType.backgroundImage
    ]
  })
  style: StyleComponentOption = new StyleComponentOption({
    paddingTop: '7px',
    paddingBottom: '7px',
    paddingRight: '7px',
    paddingLeft: '7px'
  })

  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }
}

export class LegendComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  show: boolean = true

  @ComponentControl({
    type: ControlType.select,
    title: '列表朝向',
    options: [
      {label: '横向', value: 'horizontal'},
      {label: '纵向', value: 'vertical'}
    ]
  })
  orient: string = 'horizontal'

  @ComponentControl({
    type: ControlType.select,
    title: '标记和文本位置',
    options: [
      {label: '自动', value: 'auto'},
      {label: '左', value: 'left'},
      {label: '右', value: 'right'}
    ]
  })
  align: string = 'auto'

  @ComponentControl({
    type: ControlType.styleLength,
    title: '距左',
    options: [
      {label: '自动', value: 'auto', number: false},
      {label: '左', value: 'left', number: false},
      {label: '中', value: 'center', number: false},
      {label: '右', value: 'right', number: false},
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true}
    ]
  })
  left: string = 'auto'

  @ComponentControl({
    type: ControlType.styleLength,
    title: '距右',
    options: [
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true}
    ]
  })
  right: string = ''

  @ComponentControl({
    type: ControlType.styleLength,
    title: '距上',
    options: [
      {label: '自动', value: 'auto', number: false},
      {label: '上', value: 'top', number: false},
      {label: '中', value: 'middle', number: false},
      {label: '下', value: 'bottom', number: false},
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true}
    ]
  })
  top: string = 'auto'

  @ComponentControl({
    type: ControlType.styleLength,
    title: '距下',
    options: [
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true}
    ]
  })
  bottom: string = ''

  @ComponentControl({
    type: ControlType.style,
    title: '文本样式',
    options: [
      StyleType.fontSize,
      StyleType.color,
      StyleType.fontFamily,
      StyleType.fontWeight
    ]
  })
  textStyle: StyleComponentOption = new StyleComponentOption({})

  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }
}

export class GridComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []

  @ComponentControl({type: ControlType.boolean, title: '显示'})
  show: boolean = false

  @ComponentControl({
    type: ControlType.styleLength,
    title: '宽',
    options: [
      {label: '自动', value: 'auto', number: false},
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true}
    ]
  })
  width: string = 'auto'
  @ComponentControl({
    type: ControlType.styleLength,
    title: '高',
    options: [
      {label: '自动', value: 'auto', number: false},
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true}
    ]
  })
  height: string = 'auto'

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
  left: string = '90px'

  @ComponentControl({
    type: ControlType.styleLength,
    title: '距右',
    options: [
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true}
    ]
  })
  right: string = '10px'

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
  top: string = '60px'

  @ComponentControl({
    type: ControlType.styleLength,
    title: '距下',
    options: [
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true}
    ]
  })
  bottom: string = '60px'

  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }
}

export class LineStyleComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({
    type: ControlType.color,
    title: '线颜色'
  })
  color: string = ''

  @ComponentControl({
    type: ControlType.number,
    title: '线宽度'
  })
  width: number = 1

  @ComponentControl({
    type: ControlType.select,
    title: '线类型',
    options: [
      {label: 'solid', value: 'solid'},
      {label: 'dashed', value: 'dashed'},
      {label: 'dotted', value: 'dotted'}
    ]
  })
  type: string = 'dashed'
}

export class AxisLabelComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []

  @ComponentControl({type: ControlType.boolean, title: '标签显示'})
  show: boolean = true

  @ComponentControl({type: ControlType.textarea, title: '标签格式'})
  formatter: string = ''

  fontSize: string = ''
  color: string = ''
  fontFamily: string = ''
  fontWeight: string = ''

  @ComponentControl({
    type: ControlType.select,
    title: '标签的显示间隔',
    description: '坐标轴刻度标签的显示间隔，在类目轴中有效',
    options: [
      {label: '标签不重叠', value: 'auto'},
      {label: '显示所有标签', value: '0'}
    ]
  })
  interval: string = 'auto'

  @ComponentControl({type: ControlType.number, title: '刻度标签旋转的角度'})
  rotate: number = 0

  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }
}

export class AxisLineComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []

  @ComponentControl({type: ControlType.boolean, title: '是否显示坐标轴轴线'})
  show: boolean = true

  @ComponentControl({
    type: ControlType.select,
    array: true,
    addable: false,
    options: [
      {label: '无', value: 'none'},
      {label: '箭头', value: 'arrow'}
    ],
    title: '轴线两边的箭头'
  })
  symbol: Array<string> = ['none', 'none']

  @ComponentControl({
    type: ControlType.number,
    array: true,
    addable: false,
    title: '轴线两边的箭头的大小'
  })
  symbolSize: Array<number> = [10, 15]

  @ComponentControl({
    type: ControlType.number,
    array: true,
    addable: false,
    title: '起始和结束箭头的偏移'
  })
  symbolOffset: Array<number> = [0, 0]

  @ComponentControl({
    type: ControlType.subset,
    title: '标记线条样式',
    children: LineStyleComponentOption.controls
  })
  lineStyle: LineStyleComponentOption = new LineStyleComponentOption()

  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }
}

export class AxisTickComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []

  @ComponentControl({type: ControlType.boolean, title: '是否显示坐标轴刻度'})
  show: boolean = true

  @ComponentControl({
    type: ControlType.number,
    title: '坐标轴刻度的长度'
  })
  length?: number = 5

  @ComponentControl({
    type: ControlType.subset,
    title: '标记线条样式',
    children: LineStyleComponentOption.controls
  })
  lineStyle: LineStyleComponentOption = new LineStyleComponentOption()

  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }
}

export class XAxisComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []

  show: boolean = true

  @ComponentControl({
    type: ControlType.select,
    title: '坐标轴类型',
    options: [
      {label: '类目', value: 'category'},
      {label: '数值', value: 'value'},
      {label: '时间', value: 'time'},
      {label: '对数', value: 'log'}
    ]
  })
  type: string = 'category'

  @ComponentControl({
    type: ControlType.textarea,
    title: '名称'
  })
  name: string = ''

  @ComponentControl({
    type: ControlType.select,
    title: '名称显示位置',
    options: [
      {label: '开始', value: 'start'},
      {label: '结束', value: 'end'},
      {label: '左右居中', value: 'center'},
      {label: '上下居中', value: 'middle'}
    ]
  })
  nameLocation: string = ''

  @ComponentControl({
    type: ControlType.style,
    title: '名称样式',
    options: [
      StyleType.fontSize,
      StyleType.color,
      StyleType.fontFamily,
      StyleType.fontWeight
    ]
  })
  nameTextStyle: StyleComponentOption = new StyleComponentOption()

  @ComponentControl({
    type: ControlType.select,
    title: '位置',
    options: [
      {label: '底部', value: 'bottom'},
      {label: '顶部', value: 'top'}
    ]
  })
  position: string = ''

  @ComponentControl({
    type: ControlType.boolean,
    title: '反向排列',
    show(opt: any) {
      return opt.type == 'value'
    }
  })
  inverse: boolean = false

  @ComponentControl({
    type: ControlType.styleLength,
    title: '刻度最小值',
    options: [
      {label: '最小值', value: 'dataMin', number: false},
      {label: '手动', value: '', number: true}
    ]
  })
  min: number | string = 'dataMin'

  @ComponentControl({
    type: ControlType.styleLength,
    title: '刻度最大值',
    options: [
      {label: '最大值', value: 'dataMax', number: false},
      {label: '手动', value: '', number: true}
    ]
  })
  max: number | string = 'dataMax'

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
  axisLabel: AxisLabelComponentOption = new AxisLabelComponentOption()

  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }
}

export class YAxisComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  show: boolean = true

  @ComponentControl({
    type: ControlType.select,
    title: '坐标轴类型',
    options: [
      {label: '类目', value: 'category'},
      {label: '数值', value: 'value'},
      {label: '时间', value: 'time'},
      {label: '对数', value: 'log'}
    ]
  })
  type: string = 'value'

  @ComponentControl({
    type: ControlType.textarea,
    title: '名称'
  })
  name: string = ''

  @ComponentControl({
    type: ControlType.select,
    title: '名称显示位置',
    options: [
      {label: '开始', value: 'start'},
      {label: '结束', value: 'end'},
      {label: '左右居中', value: 'center'},
      {label: '上下居中', value: 'middle'}
    ]
  })
  nameLocation: string = ''

  @ComponentControl({
    type: ControlType.style,
    title: '名称样式',
    options: [
      StyleType.fontSize,
      StyleType.color,
      StyleType.fontFamily,
      StyleType.fontWeight
    ]
  })
  nameTextStyle: StyleComponentOption = new StyleComponentOption()

  @ComponentControl({
    type: ControlType.select,
    title: '位置',
    options: [
      {label: '底部', value: 'bottom'},
      {label: '顶部', value: 'top'}
    ]
  })
  position: string = ''

  @ComponentControl({
    type: ControlType.boolean,
    title: '反向排列'
  })
  inverse: boolean = false

  @ComponentControl({
    type: ControlType.styleLength,
    title: '刻度最小值',
    options: [
      {label: '最小值', value: 'dataMin', number: false},
      {label: '手动', value: '', number: true}
    ]
  })
  min: number | string = 'dataMin'

  @ComponentControl({
    type: ControlType.styleLength,
    title: '刻度最大值',
    options: [
      {label: '最大值', value: 'dataMax', number: false},
      {label: '手动', value: '', number: true}
    ]
  })
  max: number | string = 'dataMax'

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
  axisLabel: AxisLabelComponentOption = new AxisLabelComponentOption()

  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }
}

export class SeriesLabelComponentOption {
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
      {babel: 'insideTop', value: 'insideTop'},
      {babel: 'insideBottom', value: 'insideBottom'},
      {babel: 'insideTopLeft', value: 'insideTopLeft'},
      {babel: 'insideBottomLeft', value: 'insideBottomLeft'},
      {babel: 'insideTopRight', value: 'insideTopRight'},
      {babel: 'insideBottomRight', value: 'insideBottomRight'}
    ],
    show(opt: any) {
      return opt.show
    }
  })
  position: string = 'top'

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

export class MarkPointDataLabelComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []

  @ComponentControl({type: ControlType.boolean, title: '标签显示'})
  show: boolean = true

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
      {babel: 'insideTop', value: 'insideTop'},
      {babel: 'insideBottom', value: 'insideBottom'},
      {babel: 'insideTopLeft', value: 'insideTopLeft'},
      {babel: 'insideBottomLeft', value: 'insideBottomLeft'},
      {babel: 'insideTopRight', value: 'insideTopRight'},
      {babel: 'insideBottomRight', value: 'insideBottomRight'}
    ],
    show(opt: any) {
      return opt.show
    }
  })
  position: string = 'inside'

  @ComponentControl({type: ControlType.textarea, title: '格式化'})
  formatter: string = ''

  fontSize: string = ''
  color: string = ''
  fontFamily: string = ''
  fontWeight: string = ''

  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }
}
export class MarkLineDataLabelComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []

  @ComponentControl({type: ControlType.boolean, title: '标签显示'})
  show: boolean = true

  @ComponentControl({
    type: ControlType.select,
    title: '标签的位置',
    options: [
      {label: 'start', value: 'start'},
      {label: 'middle', value: 'middle'},
      {label: 'end', value: 'end'},
      {label: 'insideStartTop', value: 'insideStartTop'},
      {babel: 'insideStartBottom', value: 'insideStartBottom'},
      {babel: 'insideMiddleTop', value: 'insideMiddleTop'},
      {babel: 'insideMiddleBottom', value: 'insideMiddleBottom'},
      {babel: 'insideEndTop', value: 'insideEndTop'},
      {babel: 'insideEndBottom', value: 'insideEndBottom'}
    ],
    show(opt: any) {
      return opt.show
    }
  })
  position: string = 'end'

  @ComponentControl({type: ControlType.textarea, title: '格式化'})
  formatter: string = ''

  fontSize: string = ''
  color: string = ''
  fontFamily: string = ''
  fontWeight: string = ''

  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }
}

export class ItemStyleComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({
    type: ControlType.color,
    title: '图形颜色'
  })
  color: string = ''

  @ComponentControl({
    type: ControlType.color,
    title: '图形边框颜色'
  })
  borderColor: string = ''

  @ComponentControl({
    type: ControlType.number,
    title: '图形边框宽度'
  })
  borderWidth: number = 0

  @ComponentControl({
    type: ControlType.select,
    title: '图形边框类型',
    options: [
      {label: 'solid', value: 'solid'},
      {label: 'dashed', value: 'dashed'},
      {label: 'dotted', value: 'dotted'}
    ]
  })
  borderType: string = 'solid'
}

export class MarkPointDataComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({
    type: ControlType.text,
    title: '标记名称'
  })
  name: string = ''

  @ComponentControl({
    type: ControlType.select,
    title: '标记类型',
    options: [
      {label: '最小值', value: 'min'},
      {label: '最大值', value: 'max'},
      {label: '平均值', value: 'average'}
    ]
  })
  type: string = 'average'

  @ComponentControl({
    type: ControlType.number,
    title: '标记值'
  })
  value: number | null = null

  @ComponentControl({
    type: ControlType.number,
    title: '标记坐标',
    array: true,
    addable: true
  })
  coord: Array<number | null> = []

  @ComponentControl({
    type: ControlType.image,
    title: '标记图片',
    value: {
      get(opt: any) {
        if (opt.symbol && opt.symbol.startsWith('image://'))
          return opt.symbol.substring(8)
      },
      set(opt: any, v: any) {
        if (v && v.startsWith('data:')) {
          opt.symbol = 'image://' + v
        }
      }
    }
  })
  @ComponentControl({
    type: ControlType.select,
    title: '标记图形',
    options: [
      {label: 'circle', value: 'circle'},
      {label: 'rect', value: 'rect'},
      {label: 'roundRect', value: 'roundRect'},
      {label: 'triangle', value: 'triangle'},
      {label: 'diamond', value: 'diamond'},
      {label: 'pin', value: 'pin'},
      {label: 'arrow', value: 'arrow'},
      {label: 'none', value: 'none'}
    ],
    value: {
      get(opt: any) {
        if (opt.symbol && opt.symbol.startsWith('image://')) return ''
        return opt.symbol
      },
      set(opt: any, v: any) {
        opt.symbol = v
      }
    }
  })
  symbol: string = 'pin'

  @ComponentControl({
    type: ControlType.number,
    title: '',
    array: true,
    defaultValue: 20,
    show(opt: any) {
      return opt.symbolSize && opt.symbolSize.length > 0
    }
  })
  @ComponentControl({
    type: ControlType.select,
    title: '标记大小',
    options: [
      {label: '自动', value: 0},
      {label: '手动', value: 1}
    ],
    value: {
      get(opt: any) {
        if (opt.symbolSize && opt.symbolSize.length > 0) {
          return 1
        }
        return 0
      },
      set(opt: any, v: number) {
        if (v == 0) {
          opt.symbolSize = []
        } else {
          opt.symbolSize = [20, 20]
        }
      }
    }
  })
  symbolSize: Array<any> = []

  @ComponentControl({
    type: ControlType.subset,
    title: '标记图形样式',
    children: ItemStyleComponentOption.controls
  })
  itemStyle: ItemStyleComponentOption = new ItemStyleComponentOption()

  @ComponentControl({
    type: ControlType.style,
    title: '',
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
    children: MarkPointDataLabelComponentOption.controls
  })
  label: MarkPointDataLabelComponentOption = new MarkPointDataLabelComponentOption()
}

export class MarkPointComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({
    type: ControlType.subset,
    title: '标记数据',
    children: MarkPointDataComponentOption.controls,
    array: true,
    addable: true,
    defaultValue: new MarkPointDataComponentOption()
  })
  data: Array<MarkPointDataComponentOption> = []
}

export class AreaStyleComponentOption {
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

  @ComponentControl({
    type: ControlType.select,
    title: '区域起始位置',
    options: [
      {label: '轴线到数据', value: 'auto'},
      {label: '坐标轴底部', value: 'start'},
      {label: '坐标轴顶部', value: 'end'}
    ]
  })
  origin: string = 'auto'
}

export class MarkLineDataComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({
    type: ControlType.text,
    title: '标记名称'
  })
  name: string = ''

  @ComponentControl({
    type: ControlType.select,
    title: '标记类型',
    options: [
      {label: '最小值', value: 'min'},
      {label: '最大值', value: 'max'},
      {label: '平均值', value: 'average'}
    ]
  })
  type: string = 'average'

  @ComponentControl({
    type: ControlType.number,
    title: '标记值'
  })
  value: number | null = null

  @ComponentControl({
    type: ControlType.number,
    title: '标记坐标',
    array: true,
    addable: true
  })
  coord: Array<number | null> = []

  @ComponentControl({
    type: ControlType.image,
    title: '标记图片',
    value: {
      get(opt: any) {
        if (opt.symbol && opt.symbol.startsWith('image://'))
          return opt.symbol.substring(8)
      },
      set(opt: any, v: any) {
        if (v && v.startsWith('data:')) {
          opt.symbol = 'image://' + v
        }
      }
    }
  })
  @ComponentControl({
    type: ControlType.select,
    title: '标记图形',
    options: [
      {label: 'circle', value: 'circle'},
      {label: 'rect', value: 'rect'},
      {label: 'roundRect', value: 'roundRect'},
      {label: 'triangle', value: 'triangle'},
      {label: 'diamond', value: 'diamond'},
      {label: 'pin', value: 'pin'},
      {label: 'arrow', value: 'arrow'},
      {label: 'none', value: 'none'}
    ],
    value: {
      get(opt: any) {
        if (opt.symbol && opt.symbol.startsWith('image://')) return ''
        return opt.symbol
      },
      set(opt: any, v: any) {
        opt.symbol = v
      }
    }
  })
  symbol: string = 'pin'

  @ComponentControl({
    type: ControlType.number,
    title: '',
    array: true,
    defaultValue: 20,
    show(opt: any) {
      return opt.symbolSize && opt.symbolSize.length > 0
    }
  })
  @ComponentControl({
    type: ControlType.select,
    title: '标记大小',
    options: [
      {label: '自动', value: 0},
      {label: '手动', value: 1}
    ],
    value: {
      get(opt: any) {
        if (opt.symbolSize && opt.symbolSize.length > 0) {
          return 1
        }
        return 0
      },
      set(opt: any, v: number) {
        if (v == 0) {
          opt.symbolSize = []
        } else {
          opt.symbolSize = [20, 20]
        }
      }
    }
  })
  symbolSize: Array<any> = []

  @ComponentControl({
    type: ControlType.subset,
    title: '标记图形样式',
    children: LineStyleComponentOption.controls
  })
  lineStyle: LineStyleComponentOption = new LineStyleComponentOption()

  @ComponentControl({
    type: ControlType.style,
    title: '',
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
    children: MarkLineDataLabelComponentOption.controls
  })
  label: MarkLineDataLabelComponentOption = new MarkLineDataLabelComponentOption()
}

export class MarkLineComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({
    type: ControlType.subset,
    title: '标记数据',
    children: MarkLineDataComponentOption.controls,
    array: true,
    addable: true,
    defaultValue: new MarkLineDataComponentOption()
  })
  data: Array<MarkLineDataComponentOption> = []
}

export class MarkAreaDataLabelComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []

  @ComponentControl({type: ControlType.boolean, title: '标签显示'})
  show: boolean = true

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
      {babel: 'insideTop', value: 'insideTop'},
      {babel: 'insideBottom', value: 'insideBottom'},
      {babel: 'insideTopLeft', value: 'insideTopLeft'},
      {babel: 'insideBottomLeft', value: 'insideBottomLeft'},
      {babel: 'insideTopRight', value: 'insideTopRight'},
      {babel: 'insideBottomRight', value: 'insideBottomRight'}
    ],
    show(opt: any) {
      return opt.show
    }
  })
  position: string = 'top'

  @ComponentControl({type: ControlType.textarea, title: '格式化'})
  formatter: string = ''

  fontSize: string = ''
  color: string = ''
  fontFamily: string = ''
  fontWeight: string = ''

  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }
}
export class MarkAreaDataStartComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({
    type: ControlType.text,
    title: '标记名称'
  })
  name: string = ''

  @ComponentControl({
    type: ControlType.select,
    title: '标记类型',
    options: [
      {label: '最小值', value: 'min'},
      {label: '最大值', value: 'max'},
      {label: '平均值', value: 'average'}
    ]
  })
  type: string = 'average'

  @ComponentControl({
    type: ControlType.number,
    title: '标记值'
  })
  value: number | null = null

  @ComponentControl({
    type: ControlType.number,
    title: '标记坐标',
    array: true,
    addable: true
  })
  coord: Array<number | null> = []

  @ComponentControl({
    type: ControlType.subset,
    title: '标记图形样式',
    children: ItemStyleComponentOption.controls
  })
  itemStyle: ItemStyleComponentOption = new ItemStyleComponentOption()

  @ComponentControl({
    type: ControlType.style,
    title: '',
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
    children: MarkPointDataLabelComponentOption.controls
  })
  label: MarkPointDataLabelComponentOption = new MarkPointDataLabelComponentOption()
}

export class MarkAreaDataEndComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({
    type: ControlType.select,
    title: '标记类型',
    options: [
      {label: '最小值', value: 'min'},
      {label: '最大值', value: 'max'},
      {label: '平均值', value: 'average'}
    ]
  })
  type: string = 'average'

  @ComponentControl({
    type: ControlType.number,
    title: '标记值'
  })
  value: number | null = null

  @ComponentControl({
    type: ControlType.number,
    title: '标记坐标',
    array: true,
    addable: true
  })
  coord: Array<number | null> = []
}

export class MarkAreaDataComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({
    type: ControlType.subset,
    title: '区域开始点',
    children: MarkAreaDataStartComponentOption.controls
  })
  0: MarkAreaDataStartComponentOption = new MarkAreaDataStartComponentOption()

  @ComponentControl({
    type: ControlType.subset,
    title: '区域结束点',
    children: MarkAreaDataEndComponentOption.controls
  })
  1: MarkAreaDataEndComponentOption = new MarkAreaDataEndComponentOption()
}

export class MarkAreaComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({
    type: ControlType.subset,
    title: '标记数据',
    children: MarkAreaDataComponentOption.controls,
    array: true,
    addable: true,
    defaultValue: new MarkAreaDataComponentOption()
  })
  data: Array<MarkAreaDataComponentOption> = []
}

export class SeriesComponentOption {
  _enabled: boolean = true
  _disabledType: boolean = false
  _disabledSort: boolean = false
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({
    type: ControlType.select,
    title: '图形形状',
    show(opt: any) {
      return !opt._disabledType
    },
    options: [
      {label: '线性', value: 'line'},
      {label: '柱状', value: 'bar'},
      {label: '散点', value: 'scatter'},
      {label: '涟漪散点', value: 'effectScatter'},
      {label: 'K线', value: 'candlestick'}
    ]
  })
  type: string = 'line'

  @ComponentControl({
    type: ControlType.boolean,
    title: '动态排序',
    show(opt: any) {
      return opt.type == 'bar' && !opt._disabledSort
    }
  })
  realtimeSort: boolean = false

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
  symbolSize: Array<any> = [4, 4]

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
    borderType: 'solid',
    borderRadius: [0, 0, 0, 0]
  }

  @ComponentControl({
    type: ControlType.styleLength,
    title: '柱条的宽度',
    show(opt: any) {
      return opt.type == 'bar'
    },
    options: [
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true},
      {label: '自适应', value: '', number: false}
    ]
  })
  barWidth: string = ''

  @ComponentControl({
    type: ControlType.styleLength,
    title: '柱条的最大宽度',
    show(opt: any) {
      return opt.type == 'bar'
    },
    options: [
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true},
      {label: '自适应', value: '', number: false}
    ]
  })
  barMaxWidth: string = ''

  @ComponentControl({
    type: ControlType.styleLength,
    title: '柱条的最小宽度',
    show(opt: any) {
      return opt.type == 'bar'
    },
    options: [
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true},
      {label: '自适应', value: '', number: false}
    ]
  })
  barMinWidth: string = ''

  @ComponentControl({
    type: ControlType.styleLength,
    title: '柱条最小高度',
    description: '可用于防止某数据项的值过小而影响交互',
    show(opt: any) {
      return opt.type == 'bar'
    },
    options: [
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true},
      {label: '自适应', value: '', number: false}
    ]
  })
  barMinHeight: string = ''

  @ComponentControl({
    type: ControlType.styleLength,
    title: '不同系列的柱间距离',
    show(opt: any) {
      return opt.type == 'bar'
    },
    options: [
      {label: '%', value: '%', number: true},
      {label: '自适应', value: '', number: false}
    ]
  })
  barGap: string = ''

  @ComponentControl({
    type: ControlType.styleLength,
    title: '同一系列的柱间距离',
    show(opt: any) {
      return opt.type == 'bar'
    },
    options: [
      {label: '%', value: '%', number: true},
      {label: '自适应', value: '', number: false}
    ]
  })
  barCategoryGap: string = ''

  @ComponentControl({
    type: ControlType.boolean,
    title: '裁剪超出坐标系部分的图形'
  })
  clip: boolean = true

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
    children: AreaStyleComponentOption.controls,
    show(opt: any) {
      return opt.type == 'line'
    }
  })
  @ComponentControl({
    type: ControlType.boolean,
    title: '显示为面积图',
    show(opt: any) {
      return opt.type == 'line'
    },
    value: {
      get(opt: any) {
        return !!opt.areaStyle
      },
      set(opt: any, v: boolean) {
        if (v) {
          opt.areaStyle = new AreaStyleComponentOption()
        } else {
          opt.areaStyle = null
        }
      }
    }
  })
  areaStyle: AreaStyleComponentOption | null = null

  @ComponentControl({
    type: ControlType.text,
    title: '数据堆叠',
    description: '数据堆叠，同个类目轴上系列配置相同的stack值可以堆叠放置。'
  })
  stack: string = ''

  @ComponentControl({
    type: ControlType.select,
    title: '阶梯线图',
    show(opt: any) {
      return opt.type == 'line'
    },
    options: [
      {label: '否', value: false},
      {label: '当前点', value: 'start'},
      {label: '中间点', value: 'middle'},
      {label: '下个点', value: 'end'}
    ]
  })
  step: string | boolean = false

  @ComponentControl({
    type: ControlType.style,
    title: '标签文字样式',
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
    step: 0.1,
    show(opt: any) {
      return opt.type == 'line'
    }
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

export class RangeComponentOption {
  _enabled: boolean = true
  _rangeTypes: Array<string> = ['color', 'symbolSize', 'symbol']
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({
    type: ControlType.color,
    title: '图元颜色',
    array: true,
    addable: true,
    defaultValue: '#cccccc',
    show(opt: any) {
      return opt._rangeTypes.indexOf('color') >= 0
    }
  })
  color: Array<string> = []

  @ComponentControl({
    type: ControlType.number,
    title: '图元大小',
    array: true,
    addable: true,
    defaultValue: 0,
    show(opt: any) {
      return opt._rangeTypes.indexOf('symbolSize') >= 0
    }
  })
  symbolSize: Array<number> = []

  @ComponentControl({
    type: ControlType.select,
    title: '图元类别',
    options: [
      {label: 'circle', value: 'circle'},
      {label: 'rect', value: 'rect'},
      {label: 'roundRect', value: 'roundRect'},
      {label: 'triangle', value: 'triangle'},
      {label: 'diamond', value: 'diamond'},
      {label: 'pin', value: 'pin'},
      {label: 'arrow', value: 'arrow'},
      {label: 'none', value: 'none'}
    ],
    array: true,
    addable: true,
    defaultValue: 'circle',
    show(opt: any) {
      return opt._rangeTypes.indexOf('symbol') >= 0
    }
  })
  symbol: Array<string> = []
}

export class PieceComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({
    type: ControlType.number,
    title: '最小值'
  })
  min: number = 0

  @ComponentControl({
    type: ControlType.number,
    title: '最大值'
  })
  max: number = 30

  @ComponentControl({
    type: ControlType.text,
    title: '值',
    description:
      '如果维度为数值类型，此处为数值本身， 如果为文本，次数为该文本在集合中的行数，从0开始'
  })
  value: string | null = null

  @ComponentControl({
    type: ControlType.text,
    title: '名称'
  })
  label: string | null = null

  @ComponentControl({
    type: ControlType.color,
    title: '颜色'
  })
  color: string | null = null
}

export class VisualMapComponentOption {
  _enabled: boolean = false
  _seriesOpts: Array<any> = []
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({type: ControlType.boolean, title: '显示手柄'})
  show: boolean = false

  @ComponentControl({
    type: ControlType.select,
    title: '映射类型',
    options: [
      {label: '连续型', value: 'continuous'},
      {label: '分段型', value: 'piecewise'}
    ]
  })
  type: string = 'continuous'

  @ComponentControl({
    type: ControlType.boolean,
    title: '显示手柄标签',
    show(opt: any) {
      return opt.type == 'piecewise'
    }
  })
  showLabel: boolean = false

  color: Array<string> = []

  @ComponentControl({
    type: ControlType.select,
    title: '维度',
    options: (option: any, chart: any) => {
      if (chart.data && chart.data.dataset.data.length > 0) {
        let opts = []
        for (let i = 0; i < chart.data.dataset.data[0].length; i++) {
          opts.push({label: chart.data.dataset.data[0][i], value: i})
        }
        return opts
      }
      return []
    }
  })
  dimension: number | null = null

  @ComponentControl({
    type: ControlType.select,
    title: '映射系列',
    options: (option: any, chart: any) => {
      if (chart.data && chart.data.dataset.data.length > 0) {
        let innerOpts = option._seriesOpts || []
        let opts = [...innerOpts]
        let seriesIndexs = chart.data.dataset.map['series']
        if (seriesIndexs) {
          for (let i = 0; i < seriesIndexs.length; i++) {
            opts.push({
              label: chart.data.dataset.data[0][seriesIndexs[i]],
              value: i + innerOpts.length
            })
          }
        }

        return opts
      }
      return []
    }
  })
  seriesIndex: number | null = null

  @ComponentControl({
    type: ControlType.subset,
    title: '精确分段',
    array: true,
    addable: true,
    children: PieceComponentOption.controls,
    defaultValue: new PieceComponentOption()
  })
  pieces: Array<PieceComponentOption> = []

  @ComponentControl({
    type: ControlType.number,
    title: '最小值',
    show: (opt: any) => {
      return opt.type == 'continuous' || !(opt.pieces && opt.pieces.length > 0)
    }
  })
  min: number = 0

  @ComponentControl({
    type: ControlType.number,
    title: '最大值'
  })
  max: number = 30

  @ComponentControl({
    type: ControlType.number,
    title: '小数精度'
  })
  precision: number = 1

  @ComponentControl({
    type: ControlType.number,
    title: '自动切分段数',
    show: (opt: any) => {
      return opt.type == 'piecewise' && !(opt.pieces && opt.pieces.length > 0)
    }
  })
  splitNumber: number = 5

  @ComponentControl({
    type: ControlType.text,
    title: '分段名称',
    array: true,
    addable: true,
    defaultValue: '',
    show: (opt: any) => {
      return (
        opt.type == 'piecewise' &&
        opt.showLabel &&
        !(opt.pieces && opt.pieces.length > 0)
      )
    }
  })
  categories: Array<string> = []

  @ComponentControl({
    type: ControlType.range,
    min: (opt: any) => {
      return opt.min
    },
    max: (opt: any) => {
      return opt.max
    },
    step: (opt: any) => {
      return 1 / Math.pow(10, opt.precision)
    },
    title: '默认滑动范围',
    show: (opt: any) => {
      return opt.type == 'continuous'
    }
  })
  range: Array<number> = [0, 100]

  @ComponentControl({
    type: ControlType.subset,
    title: '范围中视觉元素',
    children: RangeComponentOption.controls,
    show: (opt: any) => {
      return opt.type == 'continuous' || !(opt.pieces && opt.pieces.length > 0)
    }
  })
  inRange: RangeComponentOption = new RangeComponentOption()

  @ComponentControl({
    type: ControlType.subset,
    title: '范围外视觉元素',
    children: RangeComponentOption.controls,
    show: (opt: any) => {
      return opt.type == 'continuous' || !(opt.pieces && opt.pieces.length > 0)
    }
  })
  outOfRange: RangeComponentOption = new RangeComponentOption()

  align: string = 'auto'

  @ComponentControl({
    type: ControlType.text,
    title: '手柄文字(上、下)',
    array: true,
    addable: false,
    show: (opt: any) => {
      return opt.show
    }
  })
  text: Array<string> = ['', '']

  @ComponentControl({
    type: ControlType.boolean,
    title: '允许操作手柄',
    show: (opt: any) => {
      return opt.show
    }
  })
  calculable: boolean = true

  @ComponentControl({
    type: ControlType.select,
    title: '朝向',
    options: [
      {label: '横向', value: 'horizontal'},
      {label: '纵向', value: 'vertical'}
    ],
    show: (opt: any) => {
      return opt.show
    }
  })
  orient: string = 'vertical'

  @ComponentControl({
    type: ControlType.styleLength,
    title: '距左',
    options: [
      {label: '自动', value: 'auto', number: false},
      {label: '左', value: 'left', number: false},
      {label: '中', value: 'center', number: false},
      {label: '右', value: 'right', number: false},
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true}
    ],
    show: (opt: any) => {
      return opt.show
    }
  })
  left: string = 'auto'

  @ComponentControl({
    type: ControlType.styleLength,
    title: '距右',
    options: [
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true}
    ],
    show: (opt: any) => {
      return opt.show
    }
  })
  right: string | null = null

  @ComponentControl({
    type: ControlType.styleLength,
    title: '距上',
    options: [
      {label: '自动', value: 'auto', number: false},
      {label: '上', value: 'top', number: false},
      {label: '中', value: 'middle', number: false},
      {label: '下', value: 'bottom', number: false},
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true}
    ],
    show: (opt: any) => {
      return opt.show
    }
  })
  top: string = 'auto'

  @ComponentControl({
    type: ControlType.styleLength,
    title: '距下',
    options: [
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true}
    ],
    show: (opt: any) => {
      return opt.show
    }
  })
  bottom: string | null = null

  @ComponentControl({
    type: ControlType.styleLength,
    title: '手柄宽度',
    options: [
      {label: '自动', value: '', number: false},
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true}
    ],
    show: (opt: any) => {
      return opt.show
    }
  })
  itemWidth: string = ''

  @ComponentControl({
    type: ControlType.styleLength,
    title: '手柄高度',
    options: [
      {label: '自动', value: '', number: false},
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true}
    ],
    show: (opt: any) => {
      return opt.show
    }
  })
  itemHeight: string = ''

  @ComponentControl({
    type: ControlType.style,
    title: '',
    options: [
      StyleType.fontSize,
      StyleType.color,
      StyleType.fontFamily,
      StyleType.fontWeight
    ],
    show: (opt: any) => {
      return opt.show
    }
  })
  textStyle: StyleComponentOption = new StyleComponentOption({})
}

export class PolarComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({
    type: ControlType.styleLength,
    title: '（圆心）坐标',
    options: [
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true}
    ],
    array: true
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
  radius: string = '30%'
}

export class AngleAxisComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({
    type: ControlType.select,
    title: '坐标轴类型',
    options: [
      {label: '类目', value: 'category'},
      {label: '数值', value: 'value'},
      {label: '时间', value: 'time'},
      {label: '对数', value: 'log'}
    ]
  })
  type: string = 'category'

  @ComponentControl({
    type: ControlType.number,
    min: 0,
    max: 360,
    title: '起始刻度的角度'
  })
  startAngle: number = 90

  @ComponentControl({
    type: ControlType.boolean,
    title: '顺时针增长'
  })
  clockwise: boolean = true

  @ComponentControl({
    type: ControlType.number,
    title: '刻度最小值，默认dataMin'
  })
  min: number | string = 'dataMin'

  @ComponentControl({
    type: ControlType.number,
    title: '刻度最大值，默认 dataMax'
  })
  max: number | string = 'dataMax'

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
  axisLabel: AxisLabelComponentOption = new AxisLabelComponentOption()
}

export class RadiusAxisComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({
    type: ControlType.textarea,
    title: '名称'
  })
  name: string = ''

  @ComponentControl({
    type: ControlType.select,
    title: '名称显示位置',
    options: [
      {label: '开始', value: 'start'},
      {label: '结束', value: 'end'},
      {label: '居中', value: 'center'}
    ]
  })
  nameLocation: string = ''

  @ComponentControl({
    type: ControlType.style,
    title: '名称样式',
    options: [
      StyleType.fontSize,
      StyleType.color,
      StyleType.fontFamily,
      StyleType.fontWeight
    ]
  })
  nameTextStyle: StyleComponentOption = new StyleComponentOption()

  @ComponentControl({
    type: ControlType.select,
    title: '坐标轴类型',
    options: [
      {label: '类目', value: 'category'},
      {label: '数值', value: 'value'},
      {label: '时间', value: 'time'},
      {label: '对数', value: 'log'}
    ]
  })
  type: string = 'value'

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
  axisLabel: AxisLabelComponentOption = new AxisLabelComponentOption()
}

export class DataOperationComponentOption {
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  _supportPartRefresh: boolean = false
  _supportDrillDown: boolean = false
  _supportScope: boolean = false

  @ComponentControl({
    type: ControlType.boolean,
    title: '开启增量刷新',
    show(opt: any) {
      return opt._supportPartRefresh
    },
    description:
      '当页面有频繁和快速的数据变化时，可以开启局部刷新，此时图表数据变化更流畅，但图表框架结构可能不会变化'
  })
  partRefresh: boolean = false

  @ComponentControl({
    type: ControlType.boolean,
    title: '显示数据下钻按钮',
    description: '当图表有数据可下钻时，右上角显示数据下钻图标按钮',
    show(opt: any) {
      return opt._supportDrillDown
    }
  })
  showDrillDown: boolean = true

  @ComponentControl({
    type: ControlType.boolean,
    title: '显示数据查看按钮'
  })
  showDataViewer: boolean = true

  @ComponentControl({
    type: ControlType.boolean,
    title: '显示全屏按钮'
  })
  showFullScreen: boolean = true

  @ComponentControl({
    type: ControlType.chartScope,
    multiple: true,
    title: '影响数据范围',
    description: '影响动作包括数据下钻以及过滤器的数据筛选变化',
    show(opt: any) {
      return opt._supportScope
    }
  })
  scope: any = {
    type: 'global',
    chartIds: []
  }
}

class EventActionComponentOption {
  static controls: Array<IControl> = []

  @ComponentControl({
    type: ControlType.select,
    title: '触发',
    options: [
      {label: '单击', value: 'body_click'},
      {label: '双击', value: 'body_dblclick'},
      {label: '标题单击', value: 'title_click'},
      {label: '标题双击', value: 'title_click'}
    ]
  })
  trigger: string = 'body_click'

  @ComponentControl({
    type: ControlType.select,
    title: '执行',
    options: [
      {label: '跳转页面', value: 'goto_page'},
      {label: '返回上一页', value: 'goto_back'},
      {label: '打开链接', value: 'open_link'},
      {label: '执行代码', value: 'run_code'}
    ]
  })
  handler: string = 'goto_page'

  @ComponentControl({
    type: ControlType.select,
    title: '选择跳转页面',
    show(opt: any) {
      return opt.handler == 'goto_page'
    },
    options(option: any, chart: any) {
      let definition: IPackageDefinition = chart.data.dataContext.definition
      if (definition.chart.children && definition.chart.children.length > 0) {
        let opts = []
        for (let c of definition.chart.children) {
          opts.push({label: c.option.title.name, value: c.id})
        }
        return opts
      }
      return []
    }
  })
  page: string = ''

  @ComponentControl({
    type: ControlType.text,
    title: '打开页面地址',
    show(opt: any) {
      return opt.handler == 'open_link'
    }
  })
  link: string = ''
  @ComponentControl({
    type: ControlType.code,
    title: '执行代码',
    codeDescription: {
      params: [
        {name: 'chart', description: '当前组件定义对象'},
        {name: 'chartData', description: '当前组件数据示例'},
        {name: 'instance', description: '当前组件Vue组件示例对象'},
        {name: 'chartState', description: '全局状态信息'}
      ],
      return: ''
    },
    show(opt: any) {
      return opt.handler == 'run_code'
    }
  })
  code: string = ''
}

class EventComponentOption {
  static controls = []

  @ComponentControl({
    type: ControlType.subset,
    array: true,
    addable: true,
    title: '事件',
    children: EventActionComponentOption.controls,
    defaultValue: new EventActionComponentOption()
  })
  actions: Array<EventActionComponentOption> = []
}

export class DataZoomComponentOption {
  _enabled: boolean = false
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({
    type: ControlType.select,
    title: '缩放方式',
    options: [
      {label: '内置型', value: 'inside'},
      {label: '滑动条型', value: 'slider'}
    ]
  })
  type: string = 'slider'

  @ComponentControl({
    type: ControlType.select,
    title: '布局方式',
    description:
      '不仅是布局方式，对于直角坐标系而言，也决定了，缺省情况控制横向数轴还是纵向数轴。',
    options: [
      {label: '水平', value: 'horizontal'},
      {label: '竖直', value: 'vertical'}
    ]
  })
  orient: string = 'horizontal'

  @ComponentControl({
    type: ControlType.number,
    title: '数据窗口范围的起始百分比(%)',
    min: 0,
    max: 100
  })
  start: number = 0

  @ComponentControl({
    type: ControlType.number,
    title: '数据窗口范围的结束百分比(%)',
    min: 0,
    max: 100
  })
  end: number = 100

  @ComponentControl({
    type: ControlType.boolean,
    title: '是否锁定选择区域'
  })
  zoomLock: boolean = false

  @ComponentControl({
    type: ControlType.color,
    title: '滚动条的背景颜色',
    show: (opt: any) => {
      return opt.type == 'slider'
    }
  })
  backgroundColor: string = ''

  @ComponentControl({
    type: ControlType.color,
    title: '选中范围的填充颜色',
    show: (opt: any) => {
      return opt.type == 'slider'
    }
  })
  fillerColor: string = ''

  // @ComponentControl({
  //   type: ControlType.color,
  //   title: '边框颜色',
  //   show: (opt: any) => {
  //     return opt.type == 'slider'
  //   }
  // })
  // borderColor: string = ''

  @ComponentControl({
    type: ControlType.image,
    title: '两侧缩放手柄的 icon 形状',
    show: (opt: any) => {
      return opt.type == 'slider'
    },
    value: {
      get(opt: any) {
        if (opt.symbol && opt.symbol.startsWith('image://'))
          return opt.symbol.substring(8)
      },
      set(opt: any, v: any) {
        if (v && v.startsWith('data:')) {
          opt.symbol = 'image://' + v
        }
      }
    }
  })
  handleIcon: string = ''

  @ComponentControl({
    type: ControlType.styleLength,
    title: '控制手柄的尺寸',
    show: (opt: any) => {
      return opt.type == 'slider'
    },
    options: [
      {label: '%', value: '%', number: true},
      {label: 'px', value: 'px', number: true}
    ]
  })
  handleSize: string = '100%'

  @ComponentControl({
    type: ControlType.number,
    title: '移动手柄的尺寸高度',
    show: (opt: any) => {
      return opt.type == 'slider'
    }
  })
  moveHandleSize: number = 7

  @ComponentControl({
    type: ControlType.styleLength,
    title: '距左',
    show: (opt: any) => {
      return opt.type == 'slider'
    },
    options: [
      {label: '左', value: 'left', number: false},
      {label: '中', value: 'center', number: false},
      {label: '右', value: 'right', number: false},
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true},
      {label: '自动', value: '', number: false}
    ]
  })
  left: string = ''

  @ComponentControl({
    type: ControlType.styleLength,
    title: '距右',
    show: (opt: any) => {
      return opt.type == 'slider'
    },
    options: [
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true},
      {label: '自动', value: '', number: false}
    ]
  })
  right: string = ''

  @ComponentControl({
    type: ControlType.styleLength,
    title: '距上',
    show: (opt: any) => {
      return opt.type == 'slider'
    },
    options: [
      {label: '上', value: 'top', number: false},
      {label: '中', value: 'middle', number: false},
      {label: '下', value: 'bottom', number: false},
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true},
      {label: '自动', value: '', number: false}
    ]
  })
  top: string = ''

  @ComponentControl({
    type: ControlType.styleLength,
    title: '距下',
    show: (opt: any) => {
      return opt.type == 'slider'
    },
    options: [
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true},
      {label: '自动', value: '', number: false}
    ]
  })
  bottom: string = ''
}

export class BaseComponentOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  mergeMethod: DataMergeMethod = DataMergeMethod.table

  @ComponentControl({
    type: ControlType.subset,
    title: '事件',
    children: EventComponentOption.controls
  })
  event: EventComponentOption = new EventComponentOption()

  @ComponentControl({
    type: ControlType.subset,
    title: '画板区域',
    children: BodyComponentOption.controls,
    defaultValue: new BodyComponentOption()
  })
  body?: BodyComponentOption = new BodyComponentOption()

  @ComponentControl({
    type: ControlType.subset,
    title: '标题',
    children: TitleComponentOption.controls,
    enableProperty: 'show',
    show: (opt: any) => {
      return !opt.disableResize && !opt.disableDrag
    },
    defaultValue: new TitleComponentOption()
  })
  title?: TitleComponentOption = new TitleComponentOption()

  @ComponentControl({
    type: ControlType.subset,
    title: '定位',
    children: PosComponentOption.controls,
    show: (opt: any) => {
      return !opt.disableResize && !opt.disableDrag
    }
  })
  pos: PosComponentOption = new PosComponentOption()

  disableResize: boolean = false
  disableDrag: boolean = false
}

export class BaseComponent implements IComponent {
  isLayout: boolean = false
  language: string = 'zh-cn'
  icon: string =
    '<svg t="1615530060549" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5480" ><path d="M864 64H160C107 64 64 107 64 160v704c0 53 43 96 96 96h704c53 0 96-43 96-96V160c0-53-43-96-96-96z" fill="" p-id="5481"></path></svg>'
  title: string = ''
  description: string = ''
  children: Array<IComponent> = []
  constructor(language: string) {
    this.language = language
    var i18n = I18n.get(this.language)
  }
  option: any = new BaseComponentOption()

  private _controls: Array<IControl> = []

  private formatControls = (componentOption: any) => {
    if (componentOption && componentOption.controls) {
      if (componentOption.__proto__) {
        this.formatControls(componentOption.__proto__)
      }
      for (let c of componentOption.controls) {
        let has = null
        for (let exist of this._controls) {
          if (c.name == exist.name) {
            has = exist
            break
          }
        }
        if (has) {
          this._controls[this._controls.indexOf(has)] = c
        } else {
          this._controls.push(c)
        }
      }
    }
  }

  getControls(): Array<IControl> {
    if (this._controls.length == 0) {
      this.formatControls(this.option.constructor)
    }
    return this._controls
  }
  getComponent(): any {
    return null
  }
  setOption(option: any) {
    this.option = option
  }
}
