<template>
  <div class="c-chart-scope">
    <a-select
      :disabled="disabled"
      :options="options"
      @change="change"
      v-model:value="modelValue.type"
    ></a-select>
    <a-tree-select
      v-model:value="modelValue.chartIds"
      :multiple="true"
      v-if="modelValue.type == 'special'"
      style="width: 100%"
      :disabled="disabled"
      :dropdown-style="{maxHeight: '400px', overflow: 'auto'}"
      :tree-data="treeData"
      placeholder="选择..."
      @change="change"
      tree-default-expand-all
    ></a-tree-select>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, computed} from 'vue'
import Icon from '../common/icon/Icon.vue'
import {useI18n, useLanguage, useState} from '../../use/state'
import {message} from 'ant-design-vue'
import {ChartScopeType, IChartDefinition} from '@datahu/core'
export default defineComponent({
  name: 'ObjectSet',
  components: {
    Icon
  },
  props: ['modelValue', 'size', 'disabled', 'data'],
  setup(props: any, {emit}) {
    let i18n = useI18n()

    let options = [
      {label: '全局', value: ChartScopeType.global},
      {label: '自身', value: ChartScopeType.self},
      {label: '部分组件', value: ChartScopeType.special}
    ]

    let state = useState()
    let language = useLanguage()

    let chartComs: any = {}
    for (let comClass in state.components) {
      chartComs[comClass] = new state.components[comClass](language.value)
    }

    let buildNode = (children: Array<any>, chart: IChartDefinition) => {
      let innerEachChart = (children: Array<any>, charts: Array<any>) => {
        for (let chart of charts) {
          let node = null
          if (typeof chart == 'object' && chart.option) {
            let com = chartComs[chart.type]

            node = {
              key: chart.id,
              value: chart.id,
              title: com ? com.title : '页面',
              children: [],
              chart: chart
            }
            if (chart.option.title && chart.option.title.name != '标题') {
              node.title += `[${chart.option.title.name}]`
            }
            children.push(node)
          }
          if (chart.children && chart.children.length > 0) {
            innerEachChart(node ? node.children : children, chart.children)
          }
          if (chart.length > 0) {
            innerEachChart(node ? node.children : children, chart)
          }
        }
      }
      innerEachChart(children, [chart])
    }

    let treeData = computed(() => {
      let trees: Array<any> = []
      let root = state.pkg.definition.chart
      buildNode(trees, root)
      for (let node of trees) {
        node.disabled = false
      }
      return trees
    })

    let change = () => {
      emit('change', props.modelValue)
    }
    return {
      i18n,
      options,
      treeData,
      change
    }
  }
})
</script>

<style lang="less">
.c-chart-scope {
}
</style>
