import {ComponentControl, ControlType, IControl, StyleType} from '@datahu/core'
import {BaseComponent, BaseComponentOption, StyleComponentOption} from '../base'
import PageLayout from './PageLayout.vue'

class PageContentComponentOption {
  static controls = []

  @ComponentControl({
    type: ControlType.style,
    title: '页面样式',
    options: [
      StyleType.padding,
      StyleType.margin,
      StyleType.borderWidth,
      StyleType.borderColor,
      StyleType.borderStyle,
      StyleType.borderRadius,
      StyleType.backgroundColor,
      StyleType.backgroundImage
    ],
    validate(opt: any) {
      console.log('page size', opt)
    }
  })
  @ComponentControl({
    type: ControlType.screen,
    title: '屏幕大小'
  })
  style?: StyleComponentOption = new StyleComponentOption({
    width: '100%',
    height: '100%',
    marginTop: 'auto',
    marginRight: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto'
  })

  @ComponentControl({
    type: ControlType.boolean,
    title: '只有一页时显示分页标签'
  })
  showTabWhenOnlyOne: boolean = false

  @ComponentControl({
    type: ControlType.select,
    title: '选项卡类型(预览下生效)',
    description: '预览模式下才生效',
    options: [
      {label: '卡片', value: 'card'},
      {label: '下划线', value: 'line'}
    ]
  })
  tabType: string = 'card'
  @ComponentControl({
    type: ControlType.select,
    title: '选项卡位置(预览下生效)',
    description: '预览模式下才生效',
    options: [
      {label: '顶部', value: 'top'},
      {label: '右侧', value: 'right'},
      {label: '底部', value: 'bottom'},
      {label: '左侧', value: 'left'}
    ]
  })
  tabPosition: string = 'top'
  @ComponentControl({
    type: ControlType.style,
    title: '选项卡样式(预览下生效)',
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
  tabBarStyle?: StyleComponentOption = new StyleComponentOption({
    width: '',
    height: '',
    marginTop: '',
    marginRight: '',
    marginBottom: '',
    marginLeft: ''
  })
}

class PageLayoutComponentOption extends BaseComponentOption {
  static controls = []

  @ComponentControl({
    type: ControlType.subset,
    title: '页面',
    children: PageContentComponentOption.controls,
    defaultValue: new PageContentComponentOption()
  })
  pageContent?: PageContentComponentOption = new PageContentComponentOption()
}

export class PageLayoutComponent extends BaseComponent {
  isLayout: boolean = true
  icon: string = `<svg id="图层_1" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 33"><rect width="33" height="33" fill="#fff" opacity="0"/><rect x="5" y="5" width="10" height="5" fill="#7678ed"/><rect x="17" y="5" width="11" height="5" fill="#fc8967"/><rect x="5" y="12" width="23" height="16" fill="#7678ed"/></svg>`
  option: PageLayoutComponentOption = new PageLayoutComponentOption()
  constructor(language: string) {
    super(language)
    this.option.pos.width = 100
    this.option.pos.height = 100
  }
  title: string = '多页布局'
  getComponent() {
    return PageLayout
  }
}
