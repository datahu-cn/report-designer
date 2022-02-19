<template>
  <div class="com-split-layout" :style="parentStyle">
    <div
      v-for="(rowChart, index) in chart.children"
      :key="index"
      :style="getStyle(rowChart, index)"
    >
      <div :style="cellStyle">
        <DropPanel :chart="rowChart"></DropPanel>
      </div>
    </div>
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
import {DropPanel} from '@datahu/component-base'
export default defineComponent({
  name: 'GridLayout',
  props: {
    chart: Object as PropType<IChartDefinition>,
    pkg: Object,
    data: Object as PropType<ChartData>,
    optionAfterTheme: Object
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

    let parentStyle = computed(() => {
      return {
        flexDirection: (props.optionAfterTheme as any).split.direction
      }
    })

    let getStyle = (rowChart: string, index: number) => {
      let row = (props.optionAfterTheme as any).split.rows[index]
      let style: any = {}
      if (row) {
        if (row.endsWith('px')) {
          style.flex = '0 0 ' + row
        } else {
          style.flex = `${row} ${row} auto`
        }
      }
      if ((props.optionAfterTheme as any).split.direction == 'row') {
        style.height = '100%'
      }

      // style.padding = props.optionAfterTheme!.split.style.margin
      style.paddingLeft = props.optionAfterTheme!.split.style.marginLeft
      style.paddingRight = props.optionAfterTheme!.split.style.marginRight
      style.paddingTop = props.optionAfterTheme!.split.style.marginTop
      style.paddingBottom = props.optionAfterTheme!.split.style.marginBottom

      return style
    }

    let cellStyle = computed(() => {
      let style = Util.cloneTo(props.optionAfterTheme!.split.style, {})
      style.margin = ''
      style.marginLeft = ''
      style.marginRight = ''
      style.marginTop = ''
      style.marginBottom = ''
      return style
    })

    let init = () => {
      if (!chart.children) {
        chart.children = []
      }

      for (let i = 0; i < chart.option.split.rows.length; i++) {
        if (chart.children.length == i) {
          chart.children.push({})
        }
      }
      if (chart.children.length > chart.option.split.rows.length) {
        chart.children.splice(
          chart.option.split.rows.length,
          chart.children.length - chart.option.split.rows.length
        )
      }
    }
    init()

    watch(chart.option, (n, o) => {
      init()
    })

    return {chart, parentStyle, getStyle, cellStyle}
  }
})
</script>

<style lang="less">
.com-split-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  > div {
    > div {
      width: auto;
      height: 100%;
    }
  }
}
</style>
