<template>
  <div class="com-waterfall-chart">
    <Echarts
      :theme="pkg.getTheme()"
      :option="option"
      @dblclick="dblclickHandle"
      :part-refresh="
        chart.option.dataOperation && chart.option.dataOperation.partRefresh
      "
    ></Echarts>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, onMounted, PropType, watch, computed} from 'vue'
import {IChartDefinition, Util, ChartData, IFieldInfo} from '@datahu/core'
import Echarts from '../components/Echarts.vue'
import {ChartUtil, ITooltip} from '../base'
export default defineComponent({
  name: 'WaterfallChart',
  props: {
    chart: Object as PropType<IChartDefinition>,
    pkg: Object,
    data: Object as PropType<ChartData>,
    optionAfterTheme: Object
  },
  components: {Echarts},
  setup(props) {
    let option = computed(() => {
      let option = ChartUtil.getChartOption(props.chart!)
      let chartData: ChartData = props.data!
      if (
        !chartData.isReady() ||
        !option ||
        !option.series ||
        option.series.length == 0
      ) {
        return null
      }
      let dataset = chartData.getDataset()
      let series: Array<any> = []
      let tooltips: Array<ITooltip> = []

      let xData = []
      for (let i = 1; i < dataset.data.length; i++) {
        xData.push(dataset.data[i][0])
      }

      option.xAxis.data = xData

      let index = 0
      option.legend.data = []
      for (let dataIndex of dataset.map['series']) {
        let seriesOpt = option.series[option.series.length - 1]
        if (option.series.length > index) {
          seriesOpt = option.series[index]
        }

        seriesOpt = Util.copy(seriesOpt)

        seriesOpt.name = dataset.data[0][dataIndex]
        option.legend.data.push(seriesOpt.name)
        seriesOpt.stack = seriesOpt.stack + dataIndex

        let data = []
        let subData = [0]
        let total = 0
        for (let i = 1; i < dataset.data.length; i++) {
          let v = dataset.data[i][dataIndex]
          total += v
          data.push(v)
        }

        total = data[0]

        let sub = total
        for (let i = 1; i < data.length; i++) {
          sub = sub - data[i]
          subData.push(sub)
        }

        seriesOpt.data = data

        series.push({
          _enabled: true,
          stack: seriesOpt.stack,
          name: '_skip_waterfall',
          type: 'bar',
          itemStyle: {
            barBorderColor: 'rgba(0,0,0,0)',
            color: 'rgba(0,0,0,0)'
          },
          emphasis: {
            itemStyle: {
              barBorderColor: 'rgba(0,0,0,0)',
              color: 'rgba(0,0,0,0)'
            }
          },
          data: subData
        })
        series.push(seriesOpt)
        index++
      }
      for (let tooltipField of dataset.map['tooltip']) {
        if (
          tooltipField != 0 &&
          dataset.map['series'].indexOf(tooltipField) < 0
        ) {
          tooltips.push({
            name: dataset.data[0][tooltipField],
            field: tooltipField
          })
        }
      }

      let opt = {
        title: {
          text: ''
        },
        tooltip: {
          show: option.tooltip.show,
          trigger: 'axis',
          appendToBody: true,
          padding: 0,
          borderWidth: 0,
          // alwaysShowContent: true,
          axisPointer: {
            type: 'cross'
          },
          confine: true,
          formatter(params: any) {
            return ChartUtil.getTooltipFormatter(
              params,
              tooltips,
              props.optionAfterTheme!.tooltip,
              dataset.data,
              chartData
            )
          }
        },
        grid: option.grid,
        legend: option.legend,
        polar: option.polar,
        radiusAxis: option.radiusAxis,
        angleAxis: option.angleAxis,
        xAxis: option.xAxis,
        yAxis: option.yAxis,
        series: series,
        visualMap: option.visualMap
      }
      console.log('opt', opt)
      return opt
    })

    let dblclickHandle = (params: any) => {
      if (params.componentType === 'series') {
        if (params.seriesIndex != undefined) {
          ;(props.data as ChartData).drillDown(params.name)
        }
      }
    }

    return {option, dblclickHandle}
  }
})
</script>

<style>
.com-waterfall-chart-chart {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
