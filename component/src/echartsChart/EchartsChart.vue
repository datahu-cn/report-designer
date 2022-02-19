<template>
  <div class="com-echarts-chart">
    <Echarts
      :theme="pkg.getTheme()"
      :option="chartOption"
      @dblclick="dblclickHandle"
      :part-refresh="
        chart.option.dataOperation && chart.option.dataOperation.partRefresh
      "
      @ready="ready"
      :disable-skeleton="true"
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
import {
  IChartDefinition,
  Util,
  ChartData,
  IFieldInfo,
  CodeExpression
} from '@datahu/core'
import {Echarts} from '@datahu/component-base'
import {ChartUtil, ITooltip} from '@datahu/component-base'
import * as echarts from 'echarts'
export default defineComponent({
  name: 'EchartsChart',
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
    let chartInstance = ref(null)

    let chartOption = ref(null)

    let setOption = async () => {
      if (chartInstance.value == null) {
        return null
      }

      let option = ChartUtil.getChartOption(props.chart!)
      ;(window as any).echarts = echarts
      if (option.echarts && option.echarts.map) {
        await ChartUtil.registerMap(option.echarts.map)
      }

      let chartData: ChartData = props.data!
      let dataset = chartData.getDataset()
      let code = ''
      if (
        option.echarts.code &&
        option.echarts.code.indexOf('return option') >= 0
      ) {
        code = option.echarts.code
      } else {
        code =
          option.echarts.code +
          `
        return option
        `
      }
      let opt = CodeExpression.runCode(
        code,
        ['option', 'data', 'myChart', 'http', 'echarts', 'ROOT_PATH'],
        null,
        dataset.data,
        chartInstance.value,
        Util.http,
        echarts,
        'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples'
      )
      if (opt) {
        chartOption.value = opt
      }
    }

    let ready = (mChart: any) => {
      chartInstance.value = mChart
      setOption()
    }

    watch(() => {
      let option = ChartUtil.getChartOption(props.chart!)
      let chartData: ChartData = props.data!
      let dataset = chartData.getDataset()
      return [dataset, option.echarts.code, option.echarts.map]
    }, setOption)

    let dblclickHandle = (params: any) => {}

    return {chartOption, dblclickHandle, ready}
  }
})
</script>

<style>
.com-echarts-chart-chart {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
