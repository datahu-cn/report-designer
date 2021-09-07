import {IControl, ControlType, ComponentControl, Util} from '@datahu/core'
import Cartesian2dChart from '../cartesian2dChart/Cartesian2dChart.vue'
import {
  Cartesian2dChartComponent,
  Cartesian2dChartComponentOption
} from '../cartesian2dChart/index'

class BarChartComponentOption extends Cartesian2dChartComponentOption {
  static controls: Array<IControl> = []
}
export class BarChartComponent extends Cartesian2dChartComponent {
  icon: string = `<svg id="图层_1" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="2" ry="2" fill="none" opacity="0.5"/><path d="M22.66,27.89H17.53a.33.33,0,0,1-.29-.36h0V7.18a.33.33,0,0,1,.29-.36h5.13a.33.33,0,0,1,.29.36V27.53a.33.33,0,0,1-.29.36Z" fill="#7678ed"/><path d="M14,27.89H8.84a.33.33,0,0,1-.29-.36h0V12a.33.33,0,0,1,.29-.36H14a.33.33,0,0,1,.29.36V27.53a.33.33,0,0,1-.29.36Z" fill="#7678ed"/><path d="M31.16,27.89H26a.33.33,0,0,1-.29-.36h0V16.21a.33.33,0,0,1,.29-.36h5.13a.33.33,0,0,1,.29.36V27.53a.33.33,0,0,1-.29.36Z" fill="#7678ed"/><rect x="5" y="31" width="30" height="2" fill="#f9896b"/></svg>`
  constructor(language: string) {
    super(language)
    this.option.series[0].type = 'bar'
  }
  title: string = '柱状图'
  option: BarChartComponentOption = new BarChartComponentOption()
  getComponent() {
    return Cartesian2dChart
  }
}
