import {IControl, ControlType, ComponentControl, Util} from '@datahu/core'
import Cartesian2dChart from '../cartesian2dChart/Cartesian2dChart.vue'
import {
  Cartesian2dChartComponent,
  Cartesian2dChartComponentOption
} from '../cartesian2dChart/index'

class BarHorizontalChartComponentOption extends Cartesian2dChartComponentOption {
  static controls: Array<IControl> = []
}
export class BarHorizontalChartComponent extends Cartesian2dChartComponent {
  icon: string = `<svg id="图层_1" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">rect width="40" height="40" rx="2" ry="2" fill="#fff" opacity="0.5"/><path d="M35.85,27.87v3.45a.3.3,0,0,1-.28.31H9.81a.3.3,0,0,1-.28-.31V27.87a.3.3,0,0,1,.28-.32H35.57a.3.3,0,0,1,.28.32Z" fill="#7678ed"/><path d="M25.08,21.68v3.45a.32.32,0,0,1-.32.32H9.85a.32.32,0,0,1-.32-.32V21.68a.31.31,0,0,1,.32-.31H24.76a.32.32,0,0,1,.32.31Z" fill="#7678ed"/><path d="M28.15,8.68v3.45a.35.35,0,0,1-.38.32H9.91a.35.35,0,0,1-.38-.32V8.68a.35.35,0,0,1,.38-.31H27.77a.35.35,0,0,1,.38.31Z" fill="#7678ed"/><path d="M35.85,15.41v3.45a.3.3,0,0,1-.28.31H9.81a.3.3,0,0,1-.28-.31V15.41a.3.3,0,0,1,.28-.32H35.57a.3.3,0,0,1,.28.32Z" fill="#7678ed"/><rect x="-10" y="18.5" width="30" height="2" transform="translate(24.5 14.5) rotate(90)" fill="#f9896b"/></svg>
`
  constructor(language: string) {
    super(language)
    this.option.series[0].type = 'bar'
    this.option.xAxis.type = 'value'
    this.option.yAxis.type = 'category'
    super.title = '条形图'
  }
  option: BarHorizontalChartComponentOption =
    new BarHorizontalChartComponentOption()
  getComponent() {
    return Cartesian2dChart
  }
}
