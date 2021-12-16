<template>
  <div class="com-gauge-chart">
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
  name: 'GaugeChart',
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
      let data: Array<any> = []

      let index = 0
      for (let dataIndex of dataset.map['series']) {
        let dataOpt = option.gaugeData[option.gaugeData.length - 1]
        if (option.gaugeData.length > index) {
          dataOpt = option.gaugeData[index]
        }
        dataOpt = Util.copy(dataOpt)
        dataOpt.name = dataset.data[0][dataIndex]
        dataOpt.value = dataset.data[1][dataIndex]

        dataOpt.detail.formatter = (v: any) => {
          return ChartUtil.getFormatterValue(chartData, dataIndex, null, v)
        }

        data.push(dataOpt)
        index++
      }

      let series = option.series
      series[0].data = data

      if (dataset.map['maxField'] && dataset.map['maxField'].length > 0) {
        series[0].max = dataset.data[1][dataset.map['maxField'][0]]
      }

      let opt = {
        title: {
          text: ''
        },
        series: series
      }
      return opt
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
