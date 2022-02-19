import {
  IControl,
  ControlType,
  ComponentControl,
  StyleType,
  FieldSelectType,
  DataMergeMethod
} from '@datahu/core'
import {
  BaseComponent,
  BaseComponentOption,
  StyleComponentOption
} from '@datahu/component-base'
import EmptyChart from './EmptyChart.vue'

class EmptyChartComponentOption extends BaseComponentOption {
  static controls = []

  mergeMethod: DataMergeMethod = DataMergeMethod.row
}

export class EmptyChartComponent extends BaseComponent {
  isLayout: boolean = false
  icon: string = `<svg t="1644728641602" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4688"><path d="M149.333333 874.602667L874.602667 874.666667 874.666667 149.397333 149.397333 149.333333 149.333333 874.602667zM106.666667 149.397333C106.666667 125.802667 125.909333 106.666667 149.397333 106.666667h725.205334C898.197333 106.666667 917.333333 125.909333 917.333333 149.397333v725.205334A42.794667 42.794667 0 0 1 874.602667 917.333333H149.397333A42.794667 42.794667 0 0 1 106.666667 874.602667V149.397333z" fill="#3D3D3D" p-id="4689"></path></svg>`
  constructor(language: string) {
    super(language)
    this.option.pos.width = '150px'
    this.option.pos.height = '80px'
  }
  title: string = '空组件'
  option: EmptyChartComponentOption = new EmptyChartComponentOption()
  getComponent() {
    return EmptyChart
  }
}
