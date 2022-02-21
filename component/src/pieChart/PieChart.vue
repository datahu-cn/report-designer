<template>
  <div class="com-pie-chart">
    <Echarts
      :theme="pkg.getTheme()"
      :option="option"
      @dblclick="dblclickHandle"
      @ready="echartReady"
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
  name: 'PieChart',
  props: {
    chart: Object as PropType<IChartDefinition>,
    pkg: Object,
    data: Object as PropType<ChartData>,
    optionAfterTheme: Object
  },
  components: {Echarts},
  setup(props, {emit}) {
    let timer: any = null
    let myChart: any = null
    onMounted(() => {
      autoStart()
      emit('mounted')
    })
    onUnmounted(() => {
      if (timer) {
        clearTimeout(timer)
      }
      emit('unmounted')
    })

    let echartReady = (instance: any) => {
      myChart = instance
    }
    let autoStart = () => {
      let currentIndex = -1
      if (props.chart.option && props.chart.option.animation) {
        let run = () => {
          if (
            props.chart &&
            props.chart.option &&
            props.chart.option.animation &&
            props.chart.option.animation._enabled &&
            props.chart.option.animation.actions &&
            props.chart.option.animation.actions.length > 0 &&
            option.value &&
            option.value.series &&
            option.value.series.length > 0 &&
            myChart &&
            option.value.series.length >
              props.chart.option.animation.seriesIndex - 1 &&
            option.value.dataset.source &&
            option.value.dataset.source.length > 1
          ) {
            var dataLen = option.value.dataset.source.length - 1

            if (
              props.chart.option.animation.actions.indexOf('highlight') >= 0
            ) {
              //取消之前高亮的图形
              myChart.dispatchAction({
                type: 'downplay',
                seriesIndex: props.chart.option.animation.seriesIndex - 1,
                dataIndex: currentIndex
              })
            }

            if (props.chart.option.animation.actions.indexOf('showTip') >= 0) {
              // 显示 tooltip
              myChart.dispatchAction({
                type: 'hideTip',
                seriesIndex: props.chart.option.animation.seriesIndex - 1,
                dataIndex: currentIndex
              })
            }

            currentIndex = (currentIndex + 1) % dataLen
            // 高亮当前图形
            if (
              props.chart.option.animation.actions.indexOf('highlight') >= 0
            ) {
              myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: props.chart.option.animation.seriesIndex - 1,
                dataIndex: currentIndex
              })
            }

            if (props.chart.option.animation.actions.indexOf('showTip') >= 0) {
              // 显示 tooltip
              myChart.dispatchAction({
                type: 'showTip',
                seriesIndex: props.chart.option.animation.seriesIndex - 1,
                dataIndex: currentIndex
              })
            }
          }
          timer = setTimeout(() => {
            run()
          }, props.chart.option.animation.speed)
        }
        run()
      }
    }
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

        let index = 0
        for (let dataIndex of dataset.map['series']) {
          let seriesOpt = option.series[option.series.length - 1]
          if (option.series.length > index) {
            seriesOpt = option.series[index]
          }
          seriesOpt = Util.copy(seriesOpt)
          seriesOpt.name = dataset.data[0][dataIndex]
          seriesOpt.encode = {value: dataIndex, itemName: 0}
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
            trigger: 'item',
            appendToBody: true,
            padding: 0,
            borderWidth: 0,
            // alwaysShowContent: true,
            //   axisPointer: {
            //     type: 'cross'
            //   },
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
          // grid: option.grid,
          legend: option.legend,
          // polar: option.polar,
          // radiusAxis: option.radiusAxis,
          // angleAxis: option.angleAxis,
          // xAxis: option.xAxis,
          // yAxis: option.yAxis,
          series: series
          // visualMap: option.visualMap
        }
        console.log('opt', opt)
        return Util.assignTo(props.optionAfterTheme.echart, opt, false)
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
    return {option, dblclickHandle, echartReady}
  }
})
</script>

<style>
.com-pie-chart-chart {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
