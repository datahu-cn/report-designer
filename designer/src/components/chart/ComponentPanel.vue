<template>
  <div class="c-component-panel">
    <ChartPanel :chart="panel" ref="chartPanel"></ChartPanel>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  reactive,
  watchEffect,
  watch,
  onMounted
} from 'vue'
import {useI18n, useState, useLanguage} from '../../use/state'
import http from '../../use/http'
import {
  ChartPanel,
  setContext,
  findChartComponent
} from '@datahu/component-base'

export default defineComponent({
  name: 'ComponentPanel',
  props: [],
  components: {ChartPanel},
  setup(props: any) {
    let state = useState()
    let language = useLanguage()
    let i18n = useI18n()

    setContext(state, i18n, language)

    let chart = state.pkg.getChart()

    let comClass = findChartComponent(chart.type)
    let panel = reactive({com: new comClass(language.value), item: chart})
    state.focusItem = panel
    state.root = panel

    let chartPanel: any = ref(null)
    onMounted(() => {
      watch(
        () => {
          return state.pkg.getTheme()
        },
        () => {
          chartPanel.value.refreshChart()
        }
      )
    })
    return {panel, chartPanel, state}
  }
})
</script>

<style lang="less">
.c-component-panel {
  height: 100%;
  width: 100%;
  min-width: 10px;
  min-height: 10px;
  > div.ant-tabs {
    height: 100%;
    .ant-tabs-bar {
      margin-bottom: 1px;
    }
    > div.ant-tabs-content {
      height: 100%;
    }
  }
}
</style>
