import {
  IControl,
  ControlType,
  ComponentControl,
  StyleType,
  FieldSelectType,
  DataMergeMethod
} from '@datahu/core'
import {BaseComponent, BaseComponentOption, StyleComponentOption} from '../base'
import SingleCard from './SingleCard.vue'

class CardItemComponentOption {
  static controls = []

  @ComponentControl({
    type: ControlType.boolean,
    title: '显示项名称'
  })
  showLabel = true

  @ComponentControl({
    type: ControlType.select,
    title: '文字位置',
    show(opt: any) {
      return opt.showLabel
    },
    options: [
      {value: 'top', label: '上'},
      {value: 'right', label: '右'},
      {value: 'bottom', label: '下'},
      {value: 'left', label: '左'}
    ]
  })
  labelPosition: string = 'top'

  @ComponentControl({
    type: ControlType.style,
    title: '项样式',
    options: [
      StyleType.width,
      StyleType.height,
      StyleType.color,
      StyleType.fontFamily,
      StyleType.fontSize,
      StyleType.fontWeight,
      StyleType.justifyContent,
      StyleType.alignItems,
      StyleType.lineHeight,
      StyleType.margin,
      StyleType.padding
    ]
  })
  itemStyle: StyleComponentOption = new StyleComponentOption({
    display: 'flex',
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'center'
  })

  @ComponentControl({
    type: ControlType.style,
    title: '文字样式',
    show(opt: any) {
      return opt.showLabel
    },
    options: [
      StyleType.width,
      StyleType.height,
      StyleType.color,
      StyleType.fontFamily,
      StyleType.fontSize,
      StyleType.fontWeight,
      StyleType.justifyContent,
      StyleType.alignItems,
      StyleType.lineHeight,
      StyleType.margin,
      StyleType.padding
    ]
  })
  labelStyle: StyleComponentOption = new StyleComponentOption({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  })

  @ComponentControl({
    type: ControlType.style,
    title: '值样式',
    options: [
      StyleType.width,
      StyleType.height,
      StyleType.color,
      StyleType.fontFamily,
      StyleType.fontSize,
      StyleType.fontWeight,
      StyleType.justifyContent,
      StyleType.alignItems,
      StyleType.lineHeight,
      StyleType.margin,
      StyleType.padding
    ]
  })
  valueStyle: StyleComponentOption = new StyleComponentOption({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  })
}

class CardComponentOption {
  static controls = []

  @ComponentControl({
    type: ControlType.style,
    title: '文字样式',
    options: [
      StyleType.color,
      StyleType.fontFamily,
      StyleType.fontSize,
      StyleType.fontWeight,
      StyleType.justifyContent,
      StyleType.alignItems,
      StyleType.lineHeight,
      StyleType.padding
    ]
  })
  style: StyleComponentOption = new StyleComponentOption({
    display: 'flex'
  })

  @ComponentControl({
    type: ControlType.text,
    title: '空文本',
    description: '没有信息时的占位文本'
  })
  emptyText: string = ''

  @ComponentControl({
    type: ControlType.select,
    title: '排列',
    description: '',
    options: [
      {label: '横向', value: 'h'},
      {label: '纵向', value: 'v'}
    ]
  })
  layout: string = 'h'
}

class SingleCardFieldComponentOption {
  static controls = []

  @ComponentControl({
    type: ControlType.fieldSelect,
    multiple: true,
    title: '值',
    fieldSelectType: FieldSelectType.mustMerge
  })
  series = []
}

class SingleCardComponentOption extends BaseComponentOption {
  static controls = []

  mergeMethod: DataMergeMethod = DataMergeMethod.row

  @ComponentControl({
    type: ControlType.subset,
    title: '栏',
    children: SingleCardFieldComponentOption.controls
  })
  fields: SingleCardFieldComponentOption = new SingleCardFieldComponentOption()

  @ComponentControl({
    type: ControlType.subset,
    title: '卡片',
    children: CardComponentOption.controls,
    defaultValue: new CardComponentOption()
  })
  card: CardComponentOption = new CardComponentOption()

  @ComponentControl({
    type: ControlType.subset,
    title: '卡片项',
    children: CardItemComponentOption.controls,
    array: true,
    addable: true,
    defaultValue: new CardItemComponentOption()
  })
  cardItems: Array<CardItemComponentOption> = [new CardItemComponentOption()]
}

export class SingleCardComponent extends BaseComponent {
  isLayout: boolean = false
  icon: string = `<svg id="图层_1" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="2" ry="2" fill="none" opacity="0.5"/><path d="M34.82,10.05V30a2.78,2.78,0,0,1-2.69,2.85H7.87A2.78,2.78,0,0,1,5.18,30V10.05A2.78,2.78,0,0,1,7.87,7.2H32.13a2.78,2.78,0,0,1,2.69,2.85ZM32.13,30V27.11H7.87V30ZM7.87,10.05V25.69H32.13V10.05Z" fill="#7678ed"/><path d="M18.48,17.81a.36.36,0,0,0,0-.35.47.47,0,0,0-.41-.18H11.67v.09h0l-.17-.09a.4.4,0,0,0,0,.78h3.32l1.11,0h2.15A.41.41,0,0,0,18.48,17.81Z" fill="#f9896b"/><path d="M21.45,15.34H15.69a.39.39,0,0,0-.38.28.35.35,0,0,0,0,.3.39.39,0,0,0,.25.2l.18,0h5.7a.42.42,0,0,0,.36-.4A.4.4,0,0,0,21.45,15.34Z" fill="#f9896b"/><path d="M11.59,14.22h4.83a.41.41,0,0,0,.33-.46.4.4,0,0,0-.45-.34H11.57a.4.4,0,0,0-.4.4A.42.42,0,0,0,11.59,14.22Z" fill="#f9896b"/><path d="M16.29,19.18H11.64v.1l-.13-.1a.4.4,0,0,0-.33.35.38.38,0,0,0,.26.43.69.69,0,0,0,.2,0h4.77a.35.35,0,0,0,.26-.15.4.4,0,0,0,.08-.28A.41.41,0,0,0,16.29,19.18Z" fill="#f9896b"/><path d="M21.37,19.18H18.7a.4.4,0,0,0-.45.4c0,.25.17.4.45.4h2.66a.41.41,0,0,0,.46-.42A.42.42,0,0,0,21.37,19.18Z" fill="#f9896b"/><path d="M18.66,14.22v-.1l0,.1h2.74a.42.42,0,0,0,.4-.42.41.41,0,0,0-.42-.39H18.64a.4.4,0,0,0-.39.42A.41.41,0,0,0,18.66,14.22Z" fill="#f9896b"/><path d="M11.62,15.34a.54.54,0,0,0-.22,0,.4.4,0,0,0-.22.45.42.42,0,0,0,.4.32v-.1l0,.1h2.23A.53.53,0,0,0,14.2,16a.4.4,0,0,0,.11-.27.43.43,0,0,0-.48-.4Z" fill="#f9896b"/><path d="M21.38,17.27H19.75a.4.4,0,1,0,0,.8h1.68a.4.4,0,0,0,.36-.44A.42.42,0,0,0,21.38,17.27Z" fill="#f9896b"/></svg>`
  constructor(language: string) {
    super(language)
    this.option.pos.width = '150px'
    this.option.pos.height = '80px'
  }
  title: string = '卡片'
  option: SingleCardComponentOption = new SingleCardComponentOption()
  getComponent() {
    return SingleCard
  }
}
