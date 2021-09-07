<template>
  <div class="com-lines-amap-chart">
    <AmapEcharts
      :theme="pkg.getTheme()"
      :option="option"
      :view="view"
      :chart="chart"
      :pkg="pkg"
      @dblclick="dblclickHandle"
      :part-refresh="
        chart.option.dataOperation && chart.option.dataOperation.partRefresh
      "
    ></AmapEcharts>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, onMounted, PropType, watch, computed} from 'vue'
import {IChartDefinition, Util, ChartData, IFieldInfo} from '@datahu/core'
import AmapEcharts from '../components/AmapEcharts.vue'
import {ChartUtil, ITooltip} from '../base'
import {number} from 'echarts'
export default defineComponent({
  name: 'LinesAmapChart',
  props: {
    chart: Object as PropType<IChartDefinition>,
    pkg: Object,
    data: Object as PropType<ChartData>,
    optionAfterTheme: Object,
    view: Object as PropType<boolean>
  },
  components: {AmapEcharts},
  setup(props) {
    let option = computed(() => {
      let option = ChartUtil.getChartOption(props.chart!)
      let chartData: ChartData = props.data!
      let dataset = chartData.getDataset()
      if (
        !chartData.isReady() ||
        !option ||
        !option.series ||
        option.series.length == 0 ||
        dataset.map['series'].length == 0
      ) {
        return null
      }

      let series: Array<any> = []
      let tooltips: Array<ITooltip> = []

      let formatPathSeries = (serieOpt: any, dataIndex: number) => {
        let mapData = []
        for (let i = 1; i < dataset.data.length; i++) {
          let row = dataset.data[i]
          if (row.length > 0) {
            let paths = row[dataIndex]
            if (paths && paths.length > 0) {
              let item: any = {
                coords: []
              }

              for (let path of paths) {
                if (path && path.split) {
                  let coords = path.split(',')
                  let lng: any = parseFloat(coords[0])
                  let lat: any = parseFloat(coords[1])
                  if (
                    typeof lng == 'number' &&
                    typeof lat == 'number' &&
                    lng &&
                    lat
                  ) {
                    item.coords.push([lng, lat])
                  }
                }
              }
              if (item.coords.length > 1) {
                mapData.push(item)
              }
            }
          }
        }
        serieOpt.data = mapData
      }

      let index = 0
      for (let dataIndex of dataset.map['series']) {
        let seriesOpt = option.series[option.series.length - 1]
        if (option.series.length > index) {
          seriesOpt = option.series[index]
        }
        let newSeries = Util.copy(seriesOpt)
        newSeries.name = dataset.data[0][dataIndex]
        series.push(newSeries)
        formatPathSeries(newSeries, dataIndex)
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
        backgroundColor: 'transparent',
        dataset: {
          source: dataset.data
        },
        amap: option.amap,
        tooltip: {
          show: option.tooltip.show,
          trigger: 'item',
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
              chartData,
              0
            )
          }
        },
        legend: option.legend,
        series: series,
        visualMap: option.visualMap
      }
      return opt
    })

    let dblclickHandle = (params: any) => {
      if (
        params.componentType === 'series' &&
        params.value &&
        params.value.length > 0
      ) {
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
.com-lines-amap-chart {
}
</style>
