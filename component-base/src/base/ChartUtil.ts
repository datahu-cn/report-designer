import {ChartData, Formatter, IChartDefinition, Util} from '@datahu/core'
import {StyleComponentOption, TooltipComponentOption} from '.'
import {ITooltip} from './Base'
import * as echarts from 'echarts'
export class ChartUtil {
  static getStyleString(style: any): string {
    let result = ''
    if (style) {
      for (let s in style) {
        let v = style[s]
        if (v) {
          let str = s.replace(/([A-Z])/g, '-$1')
          result += `${str}:${v};`
        }
      }
    }
    return result.toLowerCase()
  }

  static getSeriesValue(p: any) {
    if (p.value) {
      let index = 0
      if (p.encode.y) {
        index = p.axisType == 'yAxis.category' ? p.encode.x[0] : p.encode.y[0]
      } else if (p.encode.radius) {
        index = p.encode.radius[0]
      } else if (p.encode.value) {
        index = p.encode.value[0]
      }
      if (
        p.value &&
        typeof p.value != 'string' &&
        p.value.length >= index + 1
      ) {
        return p.value[index]
      }
      return p.value
    } else {
      return ''
    }
  }

  static getTooltipLeftName(p: any) {
    return p.name || p.seriesName || ''
  }

  static getTooltipFormatter(
    params: any,
    tooltips: Array<ITooltip>,
    option: TooltipComponentOption,
    data: Array<any>,
    chartData: ChartData,
    title: number = -1
  ): string {
    let array = []
    if (params instanceof Array) {
      array = params
    } else {
      array = [params]
    }
    let style = ChartUtil.getStyleString(option.style)
    let titleText = ''
    if (array[0].seriesType == 'radar') {
      titleText = array[0].data.name
    } else if (array[0].seriesType == 'candlestick') {
      titleText = array[0].name
    } else if (array[0].seriesName == '_skip_waterfall') {
      titleText = array[1].seriesName || array[1].axisValue || ''
    } else {
      if (title >= 0) {
        titleText = data[array[0].dataIndex][title]
      } else {
        titleText = array[0].seriesName || array[0].axisValue || ''
      }
    }
    let html = `<div style="${style}"><div style="">${titleText || ''}</div>`
    for (let p of array) {
      if (p.seriesType == 'radar') {
        let index = 0
        for (let v of p.data.value) {
          html += `<div style="margin: 10px 0 0;">${p.marker}`
          html += `<span style="margin-left:2px">${
            data[index + 1][0] || ''
          }</span>`
          html += `<span style="float:right;margin-left:20px;"><strong>${ChartUtil.getFormatterValue(
            chartData,
            null,
            p.seriesName || '',
            v
          )}</strong></span><div style="clear:both"></div></div>`
          index++
        }
      } else if (p.seriesType == 'candlestick') {
        if (p.encode && p.encode.y) {
          for (let i = 0; i < p.encode.y.length; i++) {
            let datasetIndex = p.encode.y[i]
            let field = chartData.getFieldByDatasetIndex(datasetIndex)
            html += `<div style="margin: 10px 0 0;">${p.marker}`
            html += `<span style="margin-left:2px">${
              chartData.getFieldName(field!) || ''
            }</span>`
            html += `<span style="float:right;margin-left:20px;"><strong>${ChartUtil.getFormatterValue(
              chartData,
              datasetIndex,
              p.seriesName || '',
              p.value[datasetIndex]
            )}</strong></span><div style="clear:both"></div></div>`
          }
        }
      } else {
        if (p.seriesName == '_skip_waterfall') {
          continue
        }
        html += `<div style="margin: 10px 0 0;">${p.marker}`
        html += `<span style="margin-left:2px">${ChartUtil.getTooltipLeftName(
          p
        )}</span>`
        html += `<span style="float:right;margin-left:20px;"><strong>${ChartUtil.getFormatterValue(
          chartData,
          null,
          p.seriesName || '',
          ChartUtil.getSeriesValue(p)
        )}</strong></span><div style="clear:both"></div></div>`
      }
    }
    for (let tool of tooltips) {
      html += `<div style="margin: 10px 0 0;">`
      html += `<span style="margin-left:2px">${tool.name}</span>`
      html += `<span style="float:right;margin-left:20px;"><strong>${ChartUtil.getFormatterValue(
        chartData,
        tool.field,
        null,
        data[array[0].dataIndex + 1][tool.field]
      )}</strong></span><div style="clear:both"></div></div>`
    }
    html += '</div>'
    return html
  }

  static getFormatterValue(
    chartData: ChartData,
    datasetIndex: number | null,
    fieldName: string | null,
    value: any
  ) {
    let field = null
    if (datasetIndex != null) {
      field = chartData.getFieldByDatasetIndex(datasetIndex)
    } else if (fieldName) {
      field = chartData.getFieldByName(fieldName)
    }
    if (field && field.formatter) {
      return Formatter.formatHtml(field.formatter, value)
    }
    return value
  }

  static getChartOption(chart: IChartDefinition) {
    let chartOption: any = {}
    for (let key in chart.option) {
      if (
        key != 'body' &&
        key != 'fields' &&
        key != 'title' &&
        key != 'pos' &&
        key != 'disableResize' &&
        key != 'disableDrag'
      ) {
        chartOption[key] = chart.option[key]
      }
    }
    return Util.copy(chartOption)
  }

  static registerAllMaps = async (option: echarts.EChartsOption) => {
    if (option && option.series) {
      let series: Array<echarts.SeriesOption> = []
      if (option.series instanceof Array) {
        series = option.series
      } else {
        series.push(option.series)
      }
      for (let s of series) {
        if (s.type == 'map' && s.map) {
          await ChartUtil.registerMap(s.map)
        }
      }
    }
  }

  static jsonp = (
    url: string,
    args: any = null,
    options = {timeout: 15000}
  ) => {
    let global: any = window
    function generateJsonpCallback() {
      return `jsonpcallback_${Date.now()}_${Math.floor(Math.random() * 100000)}`
    }

    function removeScript(id: string) {
      let el = document.getElementById(id)
      if (el) document.body.removeChild(el as any)
    }

    function removeFunc(name: string) {
      delete global[name]
    }

    const timeout = options.timeout
    let timeId: any
    return new Promise((resolve, reject) => {
      const funcName = generateJsonpCallback()
      global[funcName] = (res: any) => {
        resolve(res)
        removeScript(funcName)
        removeFunc(funcName)
      }
      timeId = setTimeout(() => {
        removeScript(funcName)
        removeFunc(funcName)
        reject(new Error(`fetch ${url} timeout in ${timeout} ms`))
      }, timeout)
      const script = document.createElement('script')
      var urlArgs = args ? encodeURI(args) : ''
      script.src = `${url}?callback=${funcName}&arg=${urlArgs}`
      script.id = funcName
      script.type = 'text/javascript'
      document.body.appendChild(script)
      script.onerror = () => {
        reject(new Error(`fetch ${url} failed`))
        removeScript(funcName)
        removeFunc(funcName)
        if (timeId) clearTimeout(timeId)
      }
    })
  }

  static requestMaps: any = {}
  static async registerMap(name: string) {
    let m = echarts.getMap(name)
    if (!m) {
      if (!ChartUtil.requestMaps[name]) {
        let jsonUrl: string =
          Util.getServerUrl() + '/geo/download/' + name + '.json'
        ChartUtil.requestMaps[name] = ChartUtil.jsonp(jsonUrl)
      }
      let result = await ChartUtil.requestMaps[name]
      echarts.registerMap(name, result.data)
    }
  }

  static overrideEchartOptionStyle(
    opt: echarts.EChartsOption,
    contentOption: any
  ) {
    if (contentOption.style.backgroundColor) {
      opt.backgroundColor = contentOption.style.backgroundColor
    }
    if (!opt.textStyle) {
      opt.textStyle = {}
    }
    if (contentOption.style.color) {
      opt.textStyle.color = contentOption.style.color
    }
    if (contentOption.style.fontSize) {
      opt.textStyle.fontSize = contentOption.style.fontSize
    }
    if (contentOption.style.fontFamily) {
      opt.textStyle.fontFamily = contentOption.style.fontFamily
    }
    if (contentOption.style.fontWeight) {
      opt.textStyle.fontWeight = contentOption.style.fontWeight
    }
  }
}
