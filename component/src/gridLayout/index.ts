import {IControl, ControlType, ComponentControl, StyleType} from '@datahu/core'
import {BaseComponent, BaseComponentOption, StyleComponentOption} from '../base'
import GridLayout from './GridLayout.vue'

let opts: Array<any> = []
for (let i = 1; i < 25; i++) {
  opts.push({label: i.toString(), value: i})
}
class GridCellComponentOption {
  static controls = []

  @ComponentControl({
    type: ControlType.select,
    title: '超大屏（≥1600px）',
    options: opts
  })
  xxl: number = 6

  @ComponentControl({
    type: ControlType.select,
    title: '大屏（≥1200px）',
    options: opts
  })
  xl: number = 6

  @ComponentControl({
    type: ControlType.select,
    title: '中屏（≥992px）',
    options: opts
  })
  lg: number = 6

  @ComponentControl({
    type: ControlType.select,
    title: '中小屏（≥768px）',
    options: opts
  })
  md: number = 12

  @ComponentControl({
    type: ControlType.select,
    title: '小屏（≥576px）',
    options: opts
  })
  sm: number = 24

  @ComponentControl({
    type: ControlType.select,
    title: '极小屏（<576px）',
    options: opts
  })
  xs: number = 24

  @ComponentControl({
    type: ControlType.style,
    title: '栅格样式',
    options: [
      StyleType.padding,
      StyleType.margin,
      StyleType.borderWidth,
      StyleType.borderColor,
      StyleType.borderStyle,
      StyleType.borderRadius,
      StyleType.backgroundColor,
      StyleType.backgroundImage,
      StyleType.height,
      StyleType.minHeight,
      StyleType.maxHeight
    ]
  })
  style: StyleComponentOption = new StyleComponentOption({
    height: '200px',
    width: '100%'
  })
}

class GridComponentOption {
  static controls = []

  @ComponentControl({
    type: ControlType.subset,
    title: '栅格',
    array: true,
    addable: true,
    children: GridCellComponentOption.controls,
    defaultValue: new GridCellComponentOption()
  })
  cells: Array<GridCellComponentOption> = [
    new GridCellComponentOption(),
    new GridCellComponentOption(),
    new GridCellComponentOption(),
    new GridCellComponentOption()
  ]
}

class GridLayoutComponentOption extends BaseComponentOption {
  static controls = []

  @ComponentControl({
    type: ControlType.subset,
    title: '栅格',
    array: true,
    addable: true,
    children: GridCellComponentOption.controls,
    defaultValue: new GridCellComponentOption()
  })
  cells: Array<GridCellComponentOption> = [
    new GridCellComponentOption(),
    new GridCellComponentOption(),
    new GridCellComponentOption(),
    new GridCellComponentOption()
  ]
}
export class GridLayoutComponent extends BaseComponent {
  isLayout: boolean = true
  icon: string = `<svg id="图层_1" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="2" ry="2" fill="none" opacity="0.5"/><path d="M31.3,7H7.24A.24.24,0,0,0,7,7.24V32.76a.24.24,0,0,0,.24.24H32.76a.24.24,0,0,0,.24-.24V7.24A.24.24,0,0,0,32.76,7Zm-.24,24.3H8.94a.24.24,0,0,1-.24-.24V8.94a.24.24,0,0,1,.24-.24H31.06a.24.24,0,0,1,.24.24V31.06A.24.24,0,0,1,31.06,31.3Z" fill="#7678ed"/><rect x="11.5" y="11.5" width="7" height="7" rx="0.28" ry="0.28" fill="#f9896b"/><rect x="21.5" y="11.5" width="7" height="7" rx="0.28" ry="0.28" fill="#7678ed"/><rect x="11.5" y="21.5" width="7" height="7" rx="0.28" ry="0.28" fill="#7678ed"/><rect x="21.5" y="21.5" width="7" height="7" rx="0.28" ry="0.28" fill="#7678ed"/></svg>`
  constructor(language: string) {
    super(language)
    this.option.pos.width = 100
    this.option.pos.height = 'auto'
    this.option.body!.overflow = 'visible'
    this.option.pos.fixHeight = true
  }
  title: string = '响应式栅格布局'
  option: GridLayoutComponentOption = new GridLayoutComponentOption()
  getComponent() {
    return GridLayout
  }
}
