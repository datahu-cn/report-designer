<template>
  <div class="com-treemap-chart">
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
import {Echarts} from '@datahu/component-base'
import {ChartUtil, ITooltip} from '@datahu/component-base'
export default defineComponent({
  name: 'TreeMapChart',
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
      let series: Array<any> = []

      let serieData = []

      if (dataset.map['series'] && dataset.map['series'].length == 1) {
        let items: Array<any> = []
        let nameIndex = 0
        let valueIndex = dataset.map['series'][0]
        let parentIndex =
          dataset.map['parent'] && dataset.map['parent'].length == 1
            ? dataset.map['parent'][0]
            : null
        for (let i = 1; i < dataset.data.length; i++) {
          let item = dataset.data[i]
          items.push({
            name: item[nameIndex],
            value: item[valueIndex],
            parent: parentIndex ? item[parentIndex] : null,
            children: []
          })
        }
        let root: any = {children: []}
        for (let item of items) {
          let hasParent = false
          for (let p of items) {
            if (p.name == item.parent) {
              hasParent = true
              p.children.push(item)
            }
          }
          if (!hasParent) {
            root.children.push(item)
          }
        }

        serieData = root.children
      } else {
        return null
      }

      series = [option.series[0]]
      series[0].data = serieData

      let tooltips: Array<ITooltip> = []
      if (dataset.map['tooltip']) {
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
        series: series
      }
      console.log('opt', opt)
      return Util.assignTo(props.optionAfterTheme.echart, opt, false)
    })

    let dblclickHandle = (params: any) => {}
    return {option, dblclickHandle}
  }
})
</script>

<style>
.com-treemap-chart-chart {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
