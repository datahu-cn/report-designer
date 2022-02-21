<template>
  <div class="com-heat-amap-chart">
    <AmapEcharts
      :theme="pkg.getTheme()"
      :option="option"
      @dblclick="dblclickHandle"
      :view="view"
      :chart="chart"
      :pkg="pkg"
      :part-refresh="
        chart.option.dataOperation && chart.option.dataOperation.partRefresh
      "
    ></AmapEcharts>
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
import AmapEcharts from '../components/AmapEcharts.vue'
import {ChartUtil, ITooltip} from '@datahu/component-base'
export default defineComponent({
  name: 'HeatAmapChart',
  props: {
    chart: Object as PropType<IChartDefinition>,
    pkg: Object,
    data: Object as PropType<ChartData>,
    optionAfterTheme: Object
  },
  components: {AmapEcharts},
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
      let series: Array<any> = []
      let tooltips: Array<ITooltip> = []

      let index = 0
      for (let dataIndex of dataset.map['series']) {
        let seriesOpt = option.series[option.series.length - 1]
        if (option.series.length > index) {
          seriesOpt = option.series[index]
        }
        let newSeries = Util.copy(seriesOpt)
        newSeries.name = dataset.data[0][dataIndex]
        series.push(newSeries)
        index++
      }

      // for (let tooltipField of dataset.map['tooltip']) {
      //   if (
      //     tooltipField != 0 &&
      //     dataset.map['series'].indexOf(tooltipField) < 0
      //   ) {
      //     tooltips.push({
      //       name: dataset.data[0][tooltipField],
      //       field: tooltipField
      //     })
      //   }
      // }

      // let mapData = []
      // for (let i = 1; i < dataset.data.length; i++) {
      //   mapData.push(dataset.data[i])
      // }
      // series[0].data = mapData

      let opt = {
        title: {
          text: ''
        },
        dataset: {
          source: dataset.data
        },
        backgroundColor: 'transparent',
        amap: option.amap,
        // tooltip: {
        //   show: option.tooltip.show,
        //   trigger: 'item',
        //   appendToBody: true,
        //   padding: 0,
        //   borderWidth: 0,
        //   // alwaysShowContent: true,
        //   axisPointer: {
        //     type: 'cross'
        //   },
        //   confine: true,
        //   formatter(params: any) {
        //     return ChartUtil.getTooltipFormatter(
        //       params,
        //       tooltips,
        //       props.optionAfterTheme!.tooltip,
        //       dataset.data,
        //       chartData,
        //       0
        //     )
        //   }
        // },
        legend: option.legend,
        series: series,
        visualMap: option.visualMap
      }
      console.log('opt', opt)
      return Util.assignTo(props.optionAfterTheme.echart, opt, false)
    })

    let dblclickHandle = (params: any) => {
      if (params.componentType === 'series') {
        if (params.seriesIndex != undefined) {
          ;(props.data as ChartData).drillDown(params.value[0])
        }
      }
    }
    return {option, dblclickHandle}
  }
})
</script>

<style>
.com-heat-amap-chart {
}
</style>
