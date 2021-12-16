<template>
  <div class="com-grid-layout">
    <a-row type="flex">
      <a-col
        class="com-grid-layout-item"
        v-for="(cell, index) in chart.children"
        :key="index"
        :title="view ? '' : '栅格' + (index + 1)"
        :xxl="chart.option.cells[index].xxl"
        :xl="chart.option.cells[index].xl"
        :lg="chart.option.cells[index].lg"
        :md="chart.option.cells[index].md"
        :sm="chart.option.cells[index].sm"
        :xs="chart.option.cells[index].xs"
        :style="cellParentStyle(chart.option.cells[index].style)"
      >
        <div :style="cellStyle(chart.option.cells[index].style)">
          <DropPanel :chart="cell"></DropPanel>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import {ChartData, Formula, IChartDefinition, Util} from '@datahu/core'
import {
  defineComponent,
  ref,
  onMounted,
  onUnmounted,
  watch,
  computed,
  PropType
} from 'vue'
import {DropPanel} from '../chart'
export default defineComponent({
  name: 'GridLayout',
  props: {
    chart: Object as PropType<IChartDefinition>,
    pkg: Object,
    data: Object as PropType<ChartData>,
    optionAfterTheme: Object,
    view: Boolean
  },
  components: {DropPanel},
  setup(props, {emit}) {
    onMounted(() => {
      emit('mounted')
    })
    onUnmounted(() => {
      emit('unmounted')
    })
    var container = ref(null)
    let chart: any = props.chart!

    let init = () => {
      if (!chart.children) {
        chart.children = []
      }
      if (!chart.option.cells) {
        chart.option.cells = []
      }
      for (let i = 0; i < chart.option.cells.length; i++) {
        if (chart.children.length == i) {
          chart.children.push({})
        }
      }
      if (chart.children.length > chart.option.cells.length) {
        chart.children.splice(
          chart.option.cells.length,
          chart.children.length - chart.option.cells.length
        )
      }
    }
    init()

    watch(chart.option, (n, o) => {
      init()
    })

    let cellParentStyle = (cellStyle: any) => {
      let style: any = {}
      style.paddingLeft = cellStyle.marginLeft
      style.paddingRight = cellStyle.marginRight
      style.paddingTop = cellStyle.marginTop
      style.paddingBottom = cellStyle.marginBottom
    }
    let cellStyle = (cellStyle: any) => {
      let style = Util.cloneTo(cellStyle, {})
      style.margin = ''
      style.marginLeft = ''
      style.marginRight = ''
      style.marginTop = ''
      style.marginBottom = ''
      return style
    }

    return {chart, cellStyle, cellParentStyle}
  }
})
</script>

<style lang="less">
.com-grid-layout {
  width: 100%;
  height: 100%;
  .com-grid-layout-item {
    > div {
      width: auto;
      height: -webkit-fill-available;
    }
  }
  > .ant-row,
  table {
    width: 100%;
    height: 100%;
  }
}
</style>
