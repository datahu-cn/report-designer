import {AreaStyleComponentOption} from '@/base'
import {IControl, ControlType, ComponentControl, Util} from '@datahu/core'
import Cartesian2dChart from '../cartesian2dChart/Cartesian2dChart.vue'
import {
  Cartesian2dChartComponent,
  Cartesian2dChartComponentOption
} from '../cartesian2dChart/index'

class AreaChartComponentOption extends Cartesian2dChartComponentOption {
  static controls: Array<IControl> = []
}
export class AreaChartComponent extends Cartesian2dChartComponent {
  icon: string = `<svg id="图层_1" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="2" ry="2" fill="none" opacity="0.5"/><rect x="5" y="30.77" width="30" height="2" fill="#f9896b"/><path d="M5.22,26.67s4-19.44,9.26-19.44c4.34,0,4.14,7.07,7.39,7.07s2.66-3.63,6.11-3.63c5.42,0,6.8,15.91,6.8,15.91H5.22Z" fill="#f9896b"/><path d="M5.22,26.65s4-12,9.26-12c4.34,0,4.14,4.4,7.39,4.4s2.66-2.2,6.11-2.2c5.42,0,6.8,9.91,6.8,9.91H5.22Z" fill="#7678ed"/></svg>`
  constructor(language: string) {
    super(language)

    this.option.series[0].areaStyle = {
      _enabled: true
    } as AreaStyleComponentOption
  }
  title: string = '面积图'
  option: AreaChartComponentOption = new AreaChartComponentOption()
  getComponent() {
    return Cartesian2dChart
  }
}
