<template>
  <div class="c-style-graphset">
    <a-popover title="设置" trigger="click">
      <template #content>
        <div class="c-controls-form">
          <a-form-item name="color" label="线颜色">
            <ColorPicker
              :size="size"
              :disabled="disabled"
              v-model="modelValue.lineStyle.color"
              @change="change"
            ></ColorPicker>
          </a-form-item>
          <a-form-item name="width" label="线宽度">
            <a-input-number
              v-model:value="modelValue.lineStyle.width"
              @change="change"
              placeholder="线宽度"
            />
          </a-form-item>
          <a-form-item name="type" label="线类型">
            <a-select
              class="c-style-fontfamily"
              @change="change"
              :dropdown-match-select-width="false"
              v-model:value="modelValue.lineStyle.type"
            >
              <a-select-option value="solid">solid</a-select-option>
              <a-select-option value="dashed">dashed</a-select-option>
              <a-select-option value="dotted">dotted</a-select-option>
            </a-select>
          </a-form-item>
        </div>
      </template>
      <a-button
        style="
          max-width: 64px;
          min-width: 64px;
          min-height: 28px;
          max-height: 28px;
          overflow: hidden;
        "
        size="small"
      >
        <span :style="styleData"></span>
      </a-button>
    </a-popover>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  onMounted,
  watchEffect,
  watch
} from 'vue'
import {useI18n, useState} from '../../../use/state'
import ColorPicker from '../ColorPicker.vue'
export default defineComponent({
  name: 'StyleGraph',
  components: {
    ColorPicker
  },
  props: ['modelValue', 'disabled', 'data', 'config'],
  setup(props: any, {emit}) {
    let i18n = useI18n()
    let change = () => {
      emit('change', props.modelValue)
    }

    let styleData = computed(() => {
      let data = {
        width: '40px',
        height: '1px',
        border:
          props.modelValue.lineStyle.color +
          ' ' +
          props.modelValue.lineStyle.type
      }
      return data
    })

    return {i18n, change, styleData}
  }
})
</script>

<style lang="less">
.c-style-graphset {
  display: inline-block;
  .ant-select {
    min-width: 60px;
  }
  .rect {
    width: 20px;
    height: 20px;
    background-color: pink;
    border: 3px;
    border-style: dotted;
  }
}
</style>
