import {IControl, ControlType, ComponentControl, StyleType} from '@datahu/core'
import {BaseComponent, BaseComponentOption, StyleComponentOption} from '../base'
import SplitLayout from './SplitLayout.vue'

class SplitComponentOption {
  static controls = []

  @ComponentControl({
    type: ControlType.select,
    title: '拆分方向',
    options: [
      {label: '横向', value: 'row'},
      {label: '纵向', value: 'column'}
    ]
  })
  direction: string = 'row'

  @ComponentControl({
    type: ControlType.styleLength,
    options: [
      {label: 'px', value: 'px', number: true},
      {label: '占比', value: '', number: true}
    ],
    array: true,
    addable: true,
    defaultValue: '1',
    title: '拆分份数'
  })
  rows: Array<string> = ['1', '1']

  @ComponentControl({
    type: ControlType.style,
    title: '拆分格样式',
    options: [
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
  style: StyleComponentOption = new StyleComponentOption({})
}

class SplitLayoutComponentOption extends BaseComponentOption {
  static controls = []
  @ComponentControl({
    type: ControlType.subset,
    title: '拆分行列',
    children: SplitComponentOption.controls,
    defaultValue: new SplitComponentOption()
  })
  split: SplitComponentOption = new SplitComponentOption()
}
export class SplitLayoutComponent extends BaseComponent {
  isLayout: boolean = true
  icon: string = `<svg id="图层_1" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 33"><rect width="33" height="33" fill="#fff" opacity="0"/><path d="M11,28H5.07V5H11Z" transform="translate(0 0)" fill="#fc8967"/><path d="M27.93,28H13V5H27.93Z" transform="translate(0 0)" fill="#7678ed"/></svg>`
  constructor(language: string) {
    super(language)
  }
  title: string = '拆分行列布局'
  option: SplitLayoutComponentOption = new SplitLayoutComponentOption()
  getComponent() {
    return SplitLayout
  }
}
