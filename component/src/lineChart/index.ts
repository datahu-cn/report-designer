import {IControl, ControlType, ComponentControl, Util} from '@datahu/core'
import Cartesian2dChart from '../cartesian2dChart/Cartesian2dChart.vue'
import {
  Cartesian2dChartComponent,
  Cartesian2dChartComponentOption
} from '../cartesian2dChart/index'

class LineChartComponentOption extends Cartesian2dChartComponentOption {
  static controls: Array<IControl> = []
}
export class LineChartComponent extends Cartesian2dChartComponent {
  icon: string = `<svg id="图层_1" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="2" ry="2" fill="none" stroke="#fff" stroke-miterlimit="10" opacity="0.5"/><path d="M8.14,26.08l-1.89-2a.29.29,0,0,1,0-.38l9.67-11.33a.27.27,0,0,1,.42,0L22.86,20a.28.28,0,0,0,.42,0l8.2-9.26a.28.28,0,0,1,.42,0l1.85,2a.27.27,0,0,1,0,.37L23.24,25.06a.28.28,0,0,1-.42,0l-6.49-7.6a.27.27,0,0,0-.42,0L8.56,26.07A.28.28,0,0,1,8.14,26.08Z" fill="#7678ed"/><rect x="5" y="30" width="30" height="2" fill="#f9896b"/></svg>`
  constructor(language: string) {
    super(language)
  }
  title: string = '线性图'
  option: LineChartComponentOption = new LineChartComponentOption()
  getComponent() {
    return Cartesian2dChart
  }
}
