<template>
  <div class="c-component-controls">
    <a-tabs class="c-component-controls-tabs" size="small">
      <a-tab-pane key="1">
        <template #tab>
          <span>配置</span>
        </template>
        <GroupForm
          @change="onChange"
          v-if="option"
          v-model="option"
          :parent="configParent"
          :field-function="fieldFunction"
        ></GroupForm>
      </a-tab-pane>
      <a-tab-pane key="2">
        <template #tab>
          <span>事件</span>
        </template>
        <GroupForm
          @change="onChange"
          v-if="option"
          v-model="option"
          :parent="eventParent"
          :field-function="fieldFunction"
        ></GroupForm>
      </a-tab-pane>
    </a-tabs>
    <a-row class="c-panel-rate-slider">
      <a-col :span="15">
        <a-slider
          size="small"
          :tooltipVisible="false"
          v-model:value="sliderRate"
          :min="1"
          :max="18"
        />
      </a-col>
      <a-col :span="9">
        <a-input
          size="small"
          v-model:value="state.zoomRate"
          :min="10"
          :max="500"
          type="number"
        >
          <template #suffix>%</template>
        </a-input>
      </a-col>
    </a-row>
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
import GroupForm from '../control/GroupForm.vue'

export default defineComponent({
  name: 'ComponentControls',
  props: [''],
  components: {Field, GroupForm},
  setup(props: any) {
    let i18n = useI18n()
    let state = useState()

    let language = useLanguage()

    let fieldFunction = (fun: any, formData: any, defaultValue: any) => {
      if (!fun) {
        return defaultValue
      }
      if (typeof fun == typeof defaultValue) {
        return fun
      }
      if (typeof fun == 'function') {
        return fun(formData, state.focusItem)
      }
      let funCode: Function = new Function('return ' + fun)()
      return funCode(formData, state.focusItem)
    }

    let configParent = computed(() => {
      let parent: any = {children: []}
      if (state.focusItem) {
        let controls = []
        for (let c of state.focusItem.com.getControls()) {
          if (c.name != 'fields' && c.name != 'event') {
            controls.push(c)
          }
        }
        parent.children = controls
      }
      return parent
    })

    let eventParent = computed(() => {
      let parent: any = {children: []}
      if (state.focusItem) {
        let controls = []
        for (let c of state.focusItem.com.getControls()) {
          if (c.name == 'event') {
            controls.push(c)
          }
        }
        parent.children = controls
      }
      return parent
    })

    let option = computed(() => {
      if (state.focusItem) {
        return state.focusItem.item.option
      }
      return null
    })

    let onChange = (arg: any) => {
      state.pkg.updateOption(state.focusItem.item, arg)
    }

    let sliderRate = computed({
      get() {
        if (state.zoomRate >= 100) {
          return 10 + (state.zoomRate - 100) / 50
        } else {
          return state.zoomRate / 10
        }
      },
      set(v: number) {
        if (v >= 10) {
          state.zoomRate = 100 + (v - 10) * 50
        } else {
          state.zoomRate = v * 10
        }
      }
    })

    return {
      configParent,
      eventParent,
      option,
      onChange,
      fieldFunction,
      state,
      sliderRate
    }
  }
})
</script>

<style lang="less">
.c-component-controls {
  height: 100%;
  padding: 5px;
  position: relative;
  .c-component-controls-tabs {
    height: calc(100% - 50px);
    .ant-tabs-tab {
      font-size: 1.17em;
      // color: var(--dark-primary-color);
    }
    .ant-tabs-content {
      height: calc(100% - 50px);
    }

    .ant-tabs-bar {
      margin-bottom: 0px;
    }
    .c-field-select-list {
      padding: 8px;
      > div {
        margin-bottom: 8px;
        .c-field-select-title {
          margin-bottom: 4px;
        }
      }
    }
  }

  .c-panel-rate-slider {
    height: 40px;
    border-top: 1px solid #f0f0f0;
    padding-top: 10px;
    .ant-input-affix-wrapper {
      margin-top: 7px;
    }
  }
}
</style>
