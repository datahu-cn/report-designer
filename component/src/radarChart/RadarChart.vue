<template>
  <div class="com-cartesian2d-chart">
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
  name: 'Cartesian2dChart',
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

        let index = 0
        for (let dataIndex of dataset.map['series']) {
          let seriesOpt = option.series[option.series.length - 1]
          if (option.series.length > index) {
            seriesOpt = option.series[index]
          }
          seriesOpt = Util.copy(seriesOpt)
          seriesOpt.name = dataset.data[0][dataIndex]
          let seriesData: any = {
            name: seriesOpt.name,
            value: []
          }
          for (let i = 1; i < dataset.data.length; i++) {
            seriesData.value.push(dataset.data[i][dataIndex])
          }
          seriesOpt.data = [seriesData]

          series.push(seriesOpt)
          index++
        }

        let indicator = []
        let maxDataIndex =
          dataset.map['max'] && dataset.map['max'].length > 0
            ? dataset.map['max'][0]
            : -1
        let minDataIndex =
          dataset.map['min'] && dataset.map['min'].length > 0
            ? dataset.map['min'][0]
            : -1
        for (let i = 1; i < dataset.data.length; i++) {
          let nameItem: any = {name: dataset.data[i][0]}
          if (maxDataIndex >= 0) {
            nameItem.max = dataset.data[i][maxDataIndex]
          }
          if (minDataIndex >= 0) {
            nameItem.min = dataset.data[i][minDataIndex]
          }
          indicator.push(nameItem)
        }

        option.radar.indicator = indicator

        let tooltips: Array<ITooltip> = []
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
            padding: 0,
            borderWidth: 0,
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
          legend: option.legend,
          radar: option.radar,
          series: series
        }
        return opt
      } catch (e) {
        console.error(e)
      }
      return null
    })

    // 雷达图参数 params 无法区分点击的是哪个点， 无法点钻取
    let dblclickHandle = (params: any) => {
      // if (params.componentType === 'series') {
      //   if (params.seriesIndex != undefined) {
      //     ;(props.data as ChartData).drillDown(params.name)
      //   }
      // }
    }
    return {option, dblclickHandle}
  }
})
</script>

<style>
.com-cartesian2d-chart-chart {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
