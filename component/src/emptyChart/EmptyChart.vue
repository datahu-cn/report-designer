<template>
  <div class="com-empty-chart">
    <div>未找到组件{{ chart.type }}</div>
  </div>
</template>

<script lang="ts">
import {} from '@datahu/core'
import {
  defineComponent,
  ref,
  onMounted,
  onUnmounted,
  watch,
  computed
} from 'vue'
import moment from 'moment'
export default defineComponent({
  name: 'SimpleSlicer',
  props: ['chart', 'data', 'pkg', 'view', 'optionAfterTheme'],
  setup(props, {emit}) {
    onMounted(() => {
      emit('mounted')
    })
    onUnmounted(() => {
      emit('unmounted')
    })
    let chart = props.chart

    return {chart}
  }
})
</script>

<style lang="less">
.com-empty-chart {
  width: 100%;
  height: 100%;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
}
</style>
