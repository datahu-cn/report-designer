import {IControl, ControlType, ComponentControl, Util} from '@datahu/core'
import Cartesian2dChart from '../cartesian2dChart/Cartesian2dChart.vue'
import {
  Cartesian2dChartComponent,
  Cartesian2dChartComponentOption
} from '../cartesian2dChart/index'

class ScatterChartComponentOption extends Cartesian2dChartComponentOption {
  static controls: Array<IControl> = []
}
export class ScatterChartComponent extends Cartesian2dChartComponent {
  icon: string = `<svg id="图层_1" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="2" ry="2" fill="none" opacity="0.5"/><path d="M10.32,20.72a5.44,5.44,0,0,0,10.88,0h0a5.44,5.44,0,0,0-10.88,0Z" fill="#7678ed"/><path d="M20.22,14.41A4.73,4.73,0,1,0,25,9.67a4.73,4.73,0,0,0-4.73,4.74Z" fill="#7678ed"/><path d="M14.15,11.88a3.54,3.54,0,0,0,7.07,0h0a3.54,3.54,0,1,0-7.07,0Z" fill="#7678ed"/><path d="M10.77,15a2.17,2.17,0,1,0,2.17-2.16A2.16,2.16,0,0,0,10.77,15Z" fill="#f9896b"/><path d="M12.78,8a1.16,1.16,0,1,0,1.16-1.16A1.16,1.16,0,0,0,12.78,8Z" fill="#f9896b"/><path d="M20.81,21.56a3.44,3.44,0,1,0,6.88,0h0a3.44,3.44,0,0,0-6.88,0Z" fill="#f9896b"/><rect x="5.5" y="31" width="30" height="2" fill="#f9896b"/></svg>`
  constructor(language: string) {
    super(language)
    this.option.series[0].type = 'scatter'
  }
  title: string = '散点图'
  option: ScatterChartComponentOption = new ScatterChartComponentOption()
  getComponent() {
    return Cartesian2dChart
  }
}
