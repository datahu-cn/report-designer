import {
  IControl,
  ControlType,
  ComponentControl,
  StyleType,
  Util
} from '@datahu/core'
import {
  BaseComponent,
  BaseComponentOption,
  DataOperationComponentOption,
  StyleComponentOption
} from '@datahu/component-base'
import SimpleSlicer from './SimpleSlicer.vue'

class SlicerComponentOption {
  static controls = []

  @ComponentControl({
    type: ControlType.select,
    title: '类型',
    options: [
      {label: '下拉单选', value: 'select'},
      {label: '下拉多选', value: 'multipleselect'},
      {label: '列表单选', value: 'singlelist'},
      {label: '列表多选', value: 'multiplelist'},
      {label: '搜索', value: 'search'},
      {label: '数字输入', value: 'number'},

      {label: '月份', value: 'month'},
      {label: '周', value: 'week'},
      {label: '日期', value: 'date'},
      {label: '小时', value: 'hour'},
      {label: '分钟', value: 'minute'},
      {label: '秒', value: 'second'},
      {label: '月区间', value: 'monthrange'},
      {label: '日期区间', value: 'daterange'},
      {label: '小时区间', value: 'hourrange'},
      {label: '分钟区间', value: 'minuterange'},
      {label: '秒区间', value: 'secondrange'},
      {label: '数字区间', value: 'numberrange'}
    ]
  })
  type: string = 'search'

  @ComponentControl({
    type: ControlType.boolean,
    title: '滑动条模式',
    show(opt: any) {
      return (
        [
          'number',
          'date',
          'month',
          'week',
          'hour',
          'minute',
          'second',
          'monthrange',
          'daterange',
          'hourrange',
          'minuterange',
          'secondrange',
          'numberrange'
        ].indexOf(opt.type) >= 0
      )
    }
  })
  slider: boolean = false

  @ComponentControl({
    type: ControlType.boolean,
    title: '滑动条竖向',
    show(opt: any) {
      return (
        [
          'number',
          'date',
          'month',
          'week',
          'hour',
          'minute',
          'second',
          'monthrange',
          'daterange',
          'hourrange',
          'minuterange',
          'secondrange',
          'numberrange'
        ].indexOf(opt.type) >= 0 && opt.slider
      )
    }
  })
  vertical: boolean = false

  @ComponentControl({
    type: ControlType.number,
    title: '滑动位移',
    show(opt: any) {
      return (
        [
          'number',
          'date',
          'month',
          'week',
          'hour',
          'minute',
          'second',
          'monthrange',
          'daterange',
          'hourrange',
          'minuterange',
          'secondrange',
          'numberrange'
        ].indexOf(opt.type) >= 0 && opt.slider
      )
    }
  })
  step: number = 1

  @ComponentControl({
    type: ControlType.styleLength,
    title: '位移宽度',
    options: [
      {label: '自动', value: 'auto', number: false},
      {label: 'px', value: '', number: true}
    ],
    show(opt: any) {
      return (
        [
          'number',
          'date',
          'month',
          'week',
          'hour',
          'minute',
          'second',
          'monthrange',
          'daterange',
          'hourrange',
          'minuterange',
          'secondrange',
          'numberrange'
        ].indexOf(opt.type) >= 0 && opt.slider
      )
    }
  })
  stepWidth: string = 'auto'

  @ComponentControl({
    type: ControlType.boolean,
    title: '是否显示滑动提示',
    show(opt: any) {
      return (
        [
          'number',
          'date',
          'month',
          'week',
          'hour',
          'minute',
          'second',
          'monthrange',
          'daterange',
          'hourrange',
          'minuterange',
          'secondrange',
          'numberrange'
        ].indexOf(opt.type) >= 0 && opt.slider
      )
    }
  })
  tooltipVisible: boolean = true

  @ComponentControl({
    type: ControlType.boolean,
    title: '是否显示最小值标注',
    show(opt: any) {
      return (
        [
          'number',
          'date',
          'month',
          'week',
          'hour',
          'minute',
          'second',
          'monthrange',
          'daterange',
          'hourrange',
          'minuterange',
          'secondrange',
          'numberrange'
        ].indexOf(opt.type) >= 0 && opt.slider
      )
    }
  })
  showMinMark: boolean = false

  @ComponentControl({
    type: ControlType.boolean,
    title: '是否显示最大值标注',
    show(opt: any) {
      return (
        [
          'number',
          'date',
          'month',
          'week',
          'hour',
          'minute',
          'second',
          'monthrange',
          'daterange',
          'hourrange',
          'minuterange',
          'secondrange',
          'numberrange'
        ].indexOf(opt.type) >= 0 && opt.slider
      )
    }
  })
  showMaxMark: boolean = false

  @ComponentControl({
    type: ControlType.boolean,
    title: '是否显示年标注',
    show(opt: any) {
      return (
        [
          'date',
          'month',
          'hour',
          'minute',
          'second',
          'monthrange',
          'daterange',
          'hourrange',
          'minuterange',
          'secondrange'
        ].indexOf(opt.type) >= 0 && opt.slider
      )
    }
  })
  showYearMark: boolean = false

  @ComponentControl({
    type: ControlType.boolean,
    title: '是否显示月标注',
    show(opt: any) {
      return (
        [
          'date',
          'month',
          'hour',
          'minute',
          'second',
          'monthrange',
          'daterange',
          'hourrange',
          'minuterange',
          'secondrange'
        ].indexOf(opt.type) >= 0 && opt.slider
      )
    }
  })
  showMonthMark: boolean = false

  @ComponentControl({
    type: ControlType.boolean,
    title: '是否显示日标注',
    show(opt: any) {
      return (
        [
          'date',
          'hour',
          'minute',
          'second',
          'daterange',
          'hourrange',
          'minuterange',
          'secondrange'
        ].indexOf(opt.type) >= 0 && opt.slider
      )
    }
  })
  showDayMark: boolean = false

  @ComponentControl({
    type: ControlType.boolean,
    title: '是否显示小时标注',
    show(opt: any) {
      return (
        [
          'hour',
          'minute',
          'second',
          'hourrange',
          'minuterange',
          'secondrange'
        ].indexOf(opt.type) >= 0 && opt.slider
      )
    }
  })
  showHourMark: boolean = false

  @ComponentControl({
    type: ControlType.boolean,
    title: '是否显示分钟标注',
    show(opt: any) {
      return (
        ['minute', 'second', 'minuterange', 'secondrange'].indexOf(opt.type) >=
          0 && opt.slider
      )
    }
  })
  showMinuteMark: boolean = false

  @ComponentControl({
    type: ControlType.boolean,
    title: '是否显示周标注',
    show(opt: any) {
      return ['week'].indexOf(opt.type) >= 0 && opt.slider
    }
  })
  showWeekMark: boolean = false

  @ComponentControl({
    type: ControlType.code,
    title: '其他标注',
    array: true,
    addable: true,
    codeDescription: {
      params: [],
      return: '标注的值'
    },
    show(opt: any) {
      return (
        [
          'number',
          'date',
          'month',
          'week',
          'hour',
          'minute',
          'second',
          'daterange',
          'hourrange',
          'minuterange',
          'secondrange',
          'numberrange'
        ].indexOf(opt.type) >= 0 && opt.slider
      )
    }
  })
  marks: Array<string> = []

  // @ComponentControl({
  //   type: ControlType.select,
  //   title: '滑动提示显示位置',
  //   options: [
  //     {label: '上', value: 'top'},
  //     {label: '左', value: 'left '},
  //     {label: '右', value: 'right '},
  //     {label: '下', value: 'bottom '},
  //     {label: '上左', value: 'topLeft '},
  //     {label: '上右', value: 'topRight '},
  //     {label: '下左', value: 'bottomLeft '},
  //     {label: '下右', value: 'bottomRight '},
  //     {label: '左上', value: 'leftTop '},
  //     {label: '左下', value: 'leftBottom '},
  //     {label: '右上', value: 'rightTop '},
  //     {label: '右下', value: 'rightBottom'}
  //   ],
  //   show(opt: any) {
  //     return (
  //       [
  //         'number',
  //         'date',
  //         'month',
  //         'week',
  //         'hour',
  //         'minute',
  //         'second',
  //         'daterange',
  //         'hourrange',
  //         'minuterange',
  //         'secondrange',
  //         'numberrange'
  //       ].indexOf(opt.type) >= 0 && opt.slider
  //     )
  //   }
  // })
  // tooltipPlacement: string = 'top'

  @ComponentControl({
    type: ControlType.boolean,
    title: '反向滑动',
    show(opt: any) {
      return (
        [
          'number',
          'date',
          'month',
          'week',
          'hour',
          'minute',
          'second',
          'monthrange',
          'daterange',
          'hourrange',
          'minuterange',
          'secondrange',
          'numberrange'
        ].indexOf(opt.type) >= 0 && opt.slider
      )
    }
  })
  reverse: boolean = false

  @ComponentControl({
    type: ControlType.text,
    title: '占位提示符',
    show(opt: any) {
      return (
        [
          'number',
          'search',
          'select',
          'multipleselect',
          'date',
          'month',
          'week',
          'hour',
          'minute',
          'second'
        ].indexOf(opt.type) >= 0 && !opt.slider
      )
    }
  })
  placeholder: string = '输入...'

  @ComponentControl({
    type: ControlType.text,
    title: '占位提示符',
    array: true,
    addable: false,
    show(opt: any) {
      return (
        [
          'monthrange',
          'daterange',
          'hourrange',
          'minuterange',
          'secondrange',
          'numberrange'
        ].indexOf(opt.type) >= 0 && !opt.slider
      )
    }
  })
  placeholders: Array<string> = ['开始', '结束']

  @ComponentControl({
    type: ControlType.code,
    codeDescription: {
      params: [],
      return: '默认值'
    },
    title: '默认值',
    show(opt: any) {
      return (
        [
          'number',
          'search',
          'select',
          'date',
          'month',
          'week',
          'hour',
          'minute',
          'second',
          'singlelist'
        ].indexOf(opt.type) >= 0
      )
    }
  })
  defaultValue: string | null = null

  @ComponentControl({
    type: ControlType.code,
    title: '默认值',
    codeDescription: {
      params: [],
      return: '默认值'
    },
    array: true,
    addable: (opt: any): boolean => {
      return opt.type == 'multipleselect'
    },
    show(opt: any) {
      return (
        [
          'multipleselect',
          'monthrange',
          'daterange',
          'hourrange',
          'minuterange',
          'secondrange',
          'multiplelist',
          'numberrange'
        ].indexOf(opt.type) >= 0
      )
    }
  })
  defaultValues: Array<string | null> = [null, null]

  @ComponentControl({
    type: ControlType.select,
    multiple: true,
    title: '预设值',
    options: [
      {label: '1小时内', value: 'hour1'},
      {label: '2小时内', value: 'hour2'},
      {label: '3小时内', value: 'hour3'},
      {label: '6小时内', value: 'hour6'},
      {label: '12小时内', value: 'hour12'},
      {label: '1天内', value: 'hour24'},
      {label: '今天', value: 'today'},
      {label: '本周', value: 'week'},
      {label: '本月', value: 'month'},
      {label: '本季度', value: 'quarter'},
      {label: '半年度', value: 'halfyear'},
      {label: '本年度', value: 'year'}
    ],
    show(opt: any) {
      return (
        [
          'monthrange',
          'daterange',
          'hourrange',
          'minuterange',
          'secondrange'
        ].indexOf(opt.type) >= 0 && !opt.slider
      )
    }
  })
  ranges: Array<string> = []

  @ComponentControl({
    type: ControlType.style,
    title: '样式',
    options: [
      StyleType.color,
      StyleType.fontFamily,
      StyleType.fontSize,
      StyleType.fontWeight,
      StyleType.padding
    ],
    show(opt: any) {
      return ['multiplelist', 'singlelist'].indexOf(opt.type) < 0
    }
  })
  style: StyleComponentOption = new StyleComponentOption({})

  @ComponentControl({
    type: ControlType.select,
    title: '列表项排列',
    options: [
      {label: '横向', value: 'h'},
      {label: '纵向', value: 'v'}
    ],
    show(opt: any) {
      return ['multiplelist', 'singlelist'].indexOf(opt.type) >= 0
    }
  })
  itemLayout: string = 'h'

  @ComponentControl({
    type: ControlType.style,
    title: '列表项样式',
    options: [
      StyleType.color,
      StyleType.fontFamily,
      StyleType.fontSize,
      StyleType.fontWeight,
      StyleType.borderWidth,
      StyleType.borderStyle,
      StyleType.borderColor,
      StyleType.borderRadius,
      StyleType.backgroundColor,
      StyleType.backgroundImage,
      StyleType.lineHeight,
      StyleType.textAlign,
      StyleType.height,
      StyleType.width,
      StyleType.padding,
      StyleType.margin
    ],
    show(opt: any) {
      return ['multiplelist', 'singlelist'].indexOf(opt.type) >= 0
    }
  })
  itemStyle: StyleComponentOption = new StyleComponentOption({
    paddingTop: '5px',
    paddingBottom: '5px',
    paddingLeft: '10px',
    paddingRight: '10px',
    marginTop: '5px',
    marginBottom: '5px',
    marginLeft: '5px',
    marginRight: '5px',
    backgroundColor: '#eff1ff'
  })

  @ComponentControl({
    type: ControlType.style,
    title: '选中列表项样式',
    options: [
      StyleType.color,
      StyleType.fontFamily,
      StyleType.fontSize,
      StyleType.fontWeight,
      StyleType.borderWidth,
      StyleType.borderStyle,
      StyleType.borderColor,
      StyleType.borderRadius,
      StyleType.backgroundColor,
      StyleType.backgroundImage,
      StyleType.lineHeight,
      StyleType.textAlign,
      StyleType.height,
      StyleType.width,
      StyleType.padding,
      StyleType.margin
    ],
    show(opt: any) {
      return ['multiplelist', 'singlelist'].indexOf(opt.type) >= 0
    }
  })
  selectedItemStyle: StyleComponentOption = new StyleComponentOption({
    paddingTop: '5px',
    paddingBottom: '5px',
    paddingLeft: '10px',
    paddingRight: '10px',
    marginTop: '5px',
    marginBottom: '5px',
    marginLeft: '5px',
    marginRight: '5px',
    backgroundColor: '#7678ed',
    color: '#ffffff'
  })
}

class SimpleSlicerFieldComponentOption {
  static controls = []

  @ComponentControl({
    type: ControlType.fieldSelect,
    multiple: false,
    title: '值'
  })
  series = []
}

class AnimationComponentOption {
  _enabled: boolean = false
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({
    type: ControlType.boolean,
    title: '是否显示播放按钮'
  })
  showPlayBtn: boolean = true

  @ComponentControl({
    type: ControlType.boolean,
    title: '是否循环播放'
  })
  loop: boolean = true

  @ComponentControl({
    type: ControlType.number,
    title: '播放间隔（ms）'
  })
  playInterval: number = 1000

  @ComponentControl({
    type: ControlType.boolean,
    title: '反向播放'
  })
  inverse: boolean = false

  @ComponentControl({
    type: ControlType.number,
    title: '播放跳动间隔'
  })
  steps: number = 1
}

class SimpleSlicerComponentOption extends BaseComponentOption {
  static controls = []

  @ComponentControl({
    type: ControlType.subset,
    title: '栏',
    children: SimpleSlicerFieldComponentOption.controls
  })
  fields: SimpleSlicerFieldComponentOption = new SimpleSlicerFieldComponentOption()

  @ComponentControl({
    type: ControlType.subset,
    title: '数据',
    children: DataOperationComponentOption.controls
  })
  dataOperation: DataOperationComponentOption = new DataOperationComponentOption(
    {
      _supportPartRefresh: false,
      _supportDrillDown: false,
      _supportScope: true,
      showFullScreen: false,
      showDataViewer: false,
      _supportBindGlobalParameter: true
    }
  )

  @ComponentControl({
    type: ControlType.subset,
    title: '过滤器',
    children: SlicerComponentOption.controls
  })
  slicer: SlicerComponentOption = new SlicerComponentOption()

  @ComponentControl({
    type: ControlType.subset,
    title: '动画',
    enableProperty: '_enabled',
    children: AnimationComponentOption.controls
  })
  animation: AnimationComponentOption = new AnimationComponentOption()
}
export class SimpleSlicerComponent extends BaseComponent {
  isLayout: boolean = false
  icon: string = `<svg id="图层_1" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="2" ry="2" fill="none" opacity="0.5"/><rect width="40" height="40" rx="2" ry="2" fill="none" opacity="0.5"/><path d="M18.76,19.07V16.53H10a.94.94,0,0,1-.93-.94V8.52A.93.93,0,0,1,10,7.59H30a.93.93,0,0,1,.93.93v7.07a.93.93,0,0,1-.93.93H21.24v2.55h1.43a.93.93,0,0,1,.93.93V31.48a.93.93,0,0,1-.93.93H17.33a.93.93,0,0,1-.93-.93V20a.93.93,0,0,1,.93-.93ZM11.07,9.58v5H28.94v-5Zm7.32,11.48v9.37h3.23V21.06Z" fill="#7678ed"/></svg>`
  constructor(language: string) {
    super(language)
    this.option.pos.width = '300px'
    this.option.pos.height = '32px'
    this.option.body!.style.backgroundColor = '#FFFFFF00'
    this.option.event.customEvents = [{label: '值变化', value: 'change'}]
  }
  title: string = '过滤器'
  option: SimpleSlicerComponentOption = new SimpleSlicerComponentOption()
  getComponent() {
    return SimpleSlicer
  }
}
