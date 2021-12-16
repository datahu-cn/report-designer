<template>
  <div class="com-candlestick-chart">
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
import {
  defineComponent,
  ref,
  onMounted,
  onUnmounted,
  PropType,
  watch,
  computed
} from 'vue'
import {IChartDefinition, Util, ChartData, IFieldInfo} from '@datahu/core'
import Echarts from '../components/Echarts.vue'
import {ChartUtil, ITooltip} from '../base'
export default defineComponent({
  name: 'CandlestickChart',
  props: {
    chart: Object as PropType<IChartDefinition>,
    pkg: Object,
    data: Object as PropType<ChartData>,
    optionAfterTheme: Object
  },
  components: {Echarts},
  setup(props, {emit}) {
    onMounted(() => {
      emit('mounted')
    })
    onUnmounted(() => {
      emit('unmounted')
    })
    let option = computed(() => {
      try {
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

        for (let c of option.candlestickSeries) {
          series.push(c)
        }

        let index = 0
        for (let dataIndex of dataset.map['series']) {
          let seriesOpt = option.series[option.series.length - 1]
          if (option.series.length > index) {
            seriesOpt = option.series[index]
            seriesOpt.encode = {y: dataIndex}
          }
          seriesOpt = Util.copy(seriesOpt)
          seriesOpt.name = dataset.data[0][dataIndex]
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
          dataset: {
            source: dataset.data
          },
          tooltip: {
            show: option.tooltip.show,
            trigger: 'axis',
            appendToBody: true,
            padding: 0,
            borderWidth: 0,
            // alwaysShowContent: true,
            axisPointer: {
              type: 'line'
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
          xAxis: option.xAxis,
          yAxis: option.yAxis,
          series: series,
          visualMap: option.visualMap
        }
        console.log('opt', opt)
        return opt
      } catch (e) {
        console.error(e)
        return null
      }
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
.com-candlestick-chart-chart {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
