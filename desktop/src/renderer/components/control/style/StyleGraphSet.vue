<template>
  <div class="c-style-graphline">
    <a-popover title="设置" trigger="click">
      <template #content>
        <div class="c-controls-form">
          <a-form-item name="color" label="图形颜色">
            <ColorPicker
              :size="size"
              :disabled="disabled"
              v-model="modelValue.itemStyle.color"
              @change="change"
            ></ColorPicker>
          </a-form-item>
          <a-form-item name="borderColor" label="图形边框颜色">
            <ColorPicker
              v-model="modelValue.itemStyle.borderColor"
              @change="change"
            ></ColorPicker>
          </a-form-item>
          <a-form-item name="borderWidth" label="图形边框宽度">
            <a-input-number
              v-model:value="modelValue.itemStyle.borderWidth"
              @change="change"
              placeholder="图形边框宽度"
            />
          </a-form-item>
          <a-form-item name="borderType" label="图形边框类型">
            <a-select
              class="c-style-fontfamily"
              @change="change"
              :dropdown-match-select-width="false"
              v-model:value="modelValue.itemStyle.borderType"
            >
              <a-select-option value="solid">solid</a-select-option>
              <a-select-option value="dashed">dashed</a-select-option>
              <a-select-option value="dotted">dotted</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            v-if="modelValue.itemStyle.borderRadius"
            name="borderRadius"
            label="圆角"
          >
            <a-input-number
              class="c-style-border-radius"
              @change="change"
              v-model:value="modelValue.itemStyle.borderRadius[0]"
            />
            <a-input-number
              class="c-style-border-radius"
              @change="change"
              v-model:value="modelValue.itemStyle.borderRadius[1]"
            />
            <a-input-number
              class="c-style-border-radius"
              @change="change"
              v-model:value="modelValue.itemStyle.borderRadius[2]"
            />
            <a-input-number
              class="c-style-border-radius"
              @change="change"
              v-model:value="modelValue.itemStyle.borderRadius[3]"
            />
          </a-form-item>
        </div>
      </template>
      <a-button
        class="c-style-graphset-btn"
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
        color: 'red',
        width: '20px',
        height: '20px',
        background: props.modelValue.itemStyle.color,
        border:
          props.modelValue.itemStyle.borderColor +
          ' ' +
          props.modelValue.itemStyle.borderWidth +
          'px ' +
          props.modelValue.itemStyle.borderType
      }
      return data
    })

    return {i18n, change, styleData}
  }
})
</script>

<style lang="less">
.c-style-graphline {
  display: inline-block;
  .ant-select {
    min-width: 60px;
  }
  .c-style-graphset-btn {
    border: 1px solid var(--border-color-base);
    > span {
      vertical-align: middle;
    }
  }
}
</style>
