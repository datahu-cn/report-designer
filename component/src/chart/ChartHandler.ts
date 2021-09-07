import {IChartDefinition} from '@datahu/core'

export interface IChartEvent {
  chart: IChartDefinition
  // 事件名称，事件标识符
  name: string
  // 预览模式下是否可用
  enabledWhenView: boolean
  // 事件的显示名称
  title?(): string
  // 事件执行函数
  handle(arg: any): any
}

export class ChartHandler {
  events: Array<IChartEvent> = []
  instances: Array<any> = []

  getInstance(chart: IChartDefinition) {
    for (let instance of this.instances) {
      if (
        instance.proxy &&
        instance.proxy.chart &&
        instance.proxy.chart.item == chart
      ) {
        return instance
      }
    }
  }

  getEvents(chart: IChartDefinition) {
    let evts = []
    for (let evt of this.events) {
      if (evt.chart == chart) {
        evts.push(evt)
      }
    }
    return evts
  }

  addInstance(instance: any) {
    this.instances.push(instance)
  }
  removeInstance(instance: any) {
    this.instances.splice(this.instances.indexOf(instance), 1)
  }

  addEvent(chartEvent: IChartEvent) {
    this.events.push(chartEvent)
  }

  removeEvent(chartEvent: IChartEvent) {
    this.events.splice(this.events.indexOf(chartEvent), 1)
  }

  addEvents(events: Array<IChartEvent>) {
    for (let h of events) {
      this.addEvent(h)
    }
  }

  removeEvents(events: Array<IChartEvent>) {
    for (let h of events) {
      this.removeEvent(h)
    }
  }
}
