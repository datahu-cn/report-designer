<template>
  <div class="c-drop-panel">
    <div
      @drop.stop="dropHandle($event)"
      @dragover.stop="dragoverHandle($event)"
      @dragleave.stop="dragleave($event)"
      class="c-drop-cell"
      :class="{'c-dragover': isDragover, 'c-candrop': canDrop}"
      :tabindex="state.preview ? '' : 0"
      @keydown="onKeyDown"
      @keyup="onKeyUp"
    >
      <!--辅助线-->
      <span
        class="ref-line v-line"
        v-for="item in resizeData.vLine"
        :key="item.id"
        v-show="item.display"
        :style="{
          left: item.position,
          top: item.origin,
          height: item.lineLength
        }"
      />
      <span
        class="ref-line h-line"
        v-for="item in resizeData.hLine"
        :key="item.id"
        v-show="item.display"
        :style="{
          top: item.position,
          left: item.origin,
          width: item.lineLength
        }"
      />
      <!--辅助线END-->
      <ChartPanel
        v-for="child in children"
        :key="child.item.id"
        :chart="child"
        :parent="chart"
        :resizeData="resizeData"
        @remove="removeChart($event)"
        @switchLevel="switchLevel($event)"
        @size-change="sizeChange"
      ></ChartPanel>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  Ref,
  onMounted,
  reactive,
  watchEffect,
  watch,
  computed
} from 'vue'
import {IChartDefinition, IColumnDefinition, Util} from '@datahu/core'
import ChartPanel from './ChartPanel.vue'
import {getContext, findChartComponent} from './chartState'

export enum DragTargetType {
  column = 'column',
  field = 'field',
  filter = 'filter',
  chart = 'chart'
}

export default defineComponent({
  name: 'ComponentPanel',
  components: {ChartPanel},
  props: ['chart'],
  setup(props: any, {emit}) {
    let uniqueId = Util.uniqueId()
    console.log(uniqueId)
    let context = getContext()
    let i18n = context.i18n
    let state = context.state
    let language = context.language

    let chart = props.chart
    let getSequence = () => {
      return Util.sequence()
    }

    let children: Ref<Array<any>> = ref([])
    let initChild = () => {
      let coms = []
      console.log(chart)
      if (!chart.children) {
        chart.children = []
      }
      for (let child of chart.children) {
        let comClass = findChartComponent(child.type)

        coms.push({com: new comClass(language.value), item: child})
      }
      children.value = coms
    }
    initChild()

    let addChild = (c: any) => {
      let comClass = findChartComponent(c.type)
      if (c.option.pos.px) {
        // 复制剪切图表时，保持原图表的像素大小
        c.option.pos.width = c.option.pos.px.width + 'px'
        c.option.pos.height = c.option.pos.px.height + 'px'
      }
      let item = {com: new comClass(language.value), item: c, isNew: true}
      children.value.push(item)
      if (comClass.pluginName) {
        c.pluginName = comClass.pluginName
      }
      state.pkg.addChart(chart, c)
    }

    let canDrop = computed(() => {
      return (
        state.dragContext.type == DragTargetType.chart &&
        state.dragContext.target
      )
    })

    let isDragover = computed(() => {
      return canDrop.value && state.dragContext.dropTarget === chart
    })
    let dragleave = (e: MouseEvent) => {
      state.dragContext.dropTarget = null
      e.preventDefault()
    }
    let dragoverHandle = (e: MouseEvent) => {
      if (state.dragContext.dropTarget != chart) {
        state.dragContext.dropTarget = chart
      }
      e.preventDefault()
    }

    let dropHandle = (e: MouseEvent) => {
      if (state.dragContext.target && isDragover.value) {
        let comClass = findChartComponent(state.dragContext.target.type)
        let instance = new comClass(language.value)
        if (e.target) {
          let panel = e.target as HTMLElement
          instance.option.pos.left = (e.offsetX / panel.clientWidth) * 100
          instance.option.pos.top = (e.offsetY / panel.clientHeight) * 100
        }
        addChild({
          filters: [],
          type: state.dragContext.target.type,
          option: instance.option,
          children: []
        })
      }
      state.dragContext.dropTarget = null
    }

    let resizeData: any = reactive({
      react: null,
      vLine: [],
      hLine: []
    })

    let removeChart = (child: any) => {
      children.value.splice(children.value.indexOf(child), 1)
      emit('remove-chart', child)
    }

    let removeChild = (item: IChartDefinition) => {
      for (let c of children.value) {
        if (c.item == item) {
          removeChart(c)
        }
      }
    }

    let switchLevel = (arg: any) => {
      if (arg.level == 1) {
        children.value.push(
          children.value.splice(children.value.indexOf(arg.chart), 1)[0]
        )
      } else {
        children.value.unshift(
          children.value.splice(children.value.indexOf(arg.chart), 1)[0]
        )
      }
    }

    let onFocus = () => {
      state.focusDropPanel = {children, chart}
      console.log('focus', chart)
    }

    let onPaste = () => {
      console.log('paste', state.copyedCharts)

      if (state.copyedCharts != null && state.copyedCharts.length > 0) {
        for (let c of state.copyedCharts) {
          if (chart.children.indexOf(c) >= 0) {
            let newChart = Util.copy(c)
            // 复制相同的报表时，未避免重合，看不到复制的项，移动部分起始位置
            if (
              (newChart.option.pos.width &&
                newChart.option.pos.width.endsWith &&
                newChart.option.pos.width.endsWith('px')) ||
              newChart.option.pos.width < 99
            ) {
              newChart.option.pos.left += 1
            }
            if (
              (newChart.option.pos.height &&
                newChart.option.pos.height.endsWith &&
                newChart.option.pos.height.endsWith('px')) ||
              newChart.option.pos.height < 99
            ) {
              newChart.option.pos.top += 1
            }
            addChild(newChart)
          } else {
            let newChart = Util.copy(c)
            addChild(newChart)
          }
        }
      }
    }

    // onPaste 事件有时无效，自己监听组合事件
    let pressedKey: any = {}
    let onKeyDown = (e: any) => {
      if (state.preview) return
      pressedKey[e.key] = true
      console.log('onKeyDown', e.key)
      if (pressedKey['Meta'] || pressedKey['Control']) {
        if (e.key == 'v' || e.key == 'V') {
          // paste
          onPaste()
          e.preventDefault()
          e.stopPropagation()
        } else if (e.key == 'c' || e.key == 'C') {
          state.copyedCharts = chart.children
          e.preventDefault()
          e.stopPropagation()
        } else if (e.key == 'x' || e.key == 'X') {
          let arr: Array<IChartDefinition> = []
          state.copyedCharts = arr
          for (let c of children.value) {
            arr.push(c.item)
            state.pkg.removeChart(chart, c.item)
          }
          for (let item of arr) {
            removeChild(item)
          }
          e.preventDefault()
          e.stopPropagation()
        }
      }
    }
    let onKeyUp = (e: any) => {
      pressedKey[e.key] = false
    }

    let sizeChange = (chart: any) => {
      emit('size-change', chart)
    }

    return {
      dragleave,
      dropHandle,
      isDragover,
      canDrop,
      chart,
      children,
      dragoverHandle,
      resizeData,
      removeChart,
      removeChild,
      addChild,
      switchLevel,
      onFocus,
      onKeyDown,
      onKeyUp,
      sizeChange,
      state
    }
  }
})
</script>

<style lang="less">
.c-drop-panel {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  min-width: 10px;
  min-height: 10px;

  .c-drop-cell {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    position: relative;
    border: 1px dashed var(--border-color-base);
    &:focus {
      outline: 1px solid var(--primary-color);
    }
  }

  .c-candrop {
    border: 1px solid var(--warning-color);
  }

  .c-dragover {
    background-color: var(--light-warning-color);
  }
}
</style>
