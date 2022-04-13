<template>
  <div class="c-component-fields">
    <a-tabs size="small">
      <a-tab-pane key="1">
        <template #tab>
          <span>数据</span>
        </template>
        <a-collapse v-model:activeKey="activeKey">
          <a-collapse-panel key="1" header="数据栏">
            <div class="c-field-select-list">
              <div
                class="c-field-item"
                v-for="field in fieldControls"
                :key="field.name"
              >
                <div class="c-field-select-title">{{ field.title }}</div>
                <FieldSelect
                  :same="true"
                  @change="onFieldChange()"
                  v-model="chart.item.option.fields[field.name]"
                  :config="field"
                ></FieldSelect>
              </div>
            </div>
          </a-collapse-panel>
          <a-collapse-panel key="2" header="图表过滤">
            <div class="c-field-item c-chart-filter">
              <FieldFilter
                v-if="chart && chart.com && !chart.com.isLayout"
                @change="onChartFilterChange()"
                v-model="chart.item.filters"
              ></FieldFilter>
            </div>
          </a-collapse-panel>
          <a-collapse-panel key="3" header="全局过滤">
            <div class="c-field-item c-global-filter">
              <FieldFilter
                @change="onGlobalFilterChange()"
                v-model="state.pkg.definition.filters"
              ></FieldFilter>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </a-tab-pane>
      <a-tab-pane key="2">
        <template #tab>
          <span>组件树</span>
        </template>
        <ComponentTree />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  reactive,
  watchEffect,
  watch,
  computed
} from 'vue'
import {useI18n, useState, useLanguage} from '../../use/state'
import http from '../../use/http'
import Field from '../control/Field.vue'

import FieldSelect from '../control/FieldSelect.vue'
import FieldFilter from '../control/FieldFilter.vue'
import ComponentTree from './ComponentTree.vue'

export default defineComponent({
  name: 'ComponentFields',
  props: [''],
  components: {Field, FieldSelect, FieldFilter, ComponentTree},
  setup(props: any) {
    let i18n = useI18n()
    let state = useState()

    let language = useLanguage()

    let fieldControls = computed(() => {
      if (state.focusItem) {
        for (let c of state.focusItem.com.getControls()) {
          if (c.name == 'fields') {
            return c.children
          }
        }
      }
      return []
    })

    let chart = computed(() => {
      if (state.focusItem) {
        return state.focusItem
      }
      return null
    })

    let onChartFilterChange = () => {
      state.pkg.updateFilter(state.focusItem.item)
    }
    let onGlobalFilterChange = () => {
      state.pkg.updateGlobalFilter()
    }
    let onFieldChange = () => {
      state.pkg.updateFields(state.focusItem.item)
    }

    let activeKey = ref(['1', '2', '3'])
    return {
      activeKey,
      fieldControls,
      chart,
      onFieldChange,
      onChartFilterChange,
      onGlobalFilterChange,
      state
    }
  }
})
</script>

<style lang="less">
.c-component-fields {
  height: 100%;
  padding: 5px;

  .c-field-select-list {
    min-height: 200px;
  }
  .c-chart-filter {
    min-height: 80px;
  }
  .c-global-filter {
    min-height: 80px;
  }
  .c-field-item {
    margin-bottom: 8px;
    .c-field-select-title {
      margin-bottom: 4px;
    }
  }
}
</style>
