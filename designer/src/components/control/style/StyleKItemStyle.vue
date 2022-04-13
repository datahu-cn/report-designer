<template>
  <div class="c-style-kitemstype">
    <a-popover title="设置" trigger="click">
      <template #content>
        <div class="c-controls-form">
          <a-form-item name="color" label="阳线颜色">
            <ColorPicker
              :size="size"
              :disabled="disabled"
              v-model="modelValue.color"
              @change="change"
            ></ColorPicker>
          </a-form-item>
          <a-form-item name="borderColor" label="阳线边框颜色">
            <ColorPicker
              v-model="modelValue.borderColor"
              @change="change"
            ></ColorPicker>
          </a-form-item>
          <a-form-item name="color0" label="阴线颜色">
            <ColorPicker
              :size="size"
              :disabled="disabled"
              v-model="modelValue.color0"
              @change="change"
            ></ColorPicker>
          </a-form-item>
          <a-form-item name="borderColor0" label="阴线边框颜色">
            <ColorPicker
              v-model="modelValue.borderColor0"
              @change="change"
            ></ColorPicker>
          </a-form-item>
          <a-form-item name="borderWidth" label="图形边框宽度">
            <a-input-number
              v-model:value="modelValue.borderWidth"
              @change="change"
              placeholder="图形边框宽度"
            />
          </a-form-item>
        </div>
      </template>
      <a-button class="c-kitemstyle-btn" size="small">
        <span :style="style"></span>
        <span :style="style0"></span>
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
  name: 'StyleKItemStyle',
  components: {
    ColorPicker
  },
  props: ['modelValue', 'disabled', 'data', 'config'],
  setup(props: any, {emit}) {
    let i18n = useI18n()
    let change = () => {
      emit('change', props.modelValue)
    }

    let style = computed(() => {
      let data = {
        background: props.modelValue.color,
        border:
          props.modelValue.borderColor +
          ' ' +
          props.modelValue.borderWidth +
          'px solid'
      }
      return data
    })

    let style0 = computed(() => {
      let data = {
        background: props.modelValue.color0,
        border:
          props.modelValue.borderColor0 +
          ' ' +
          props.modelValue.borderWidth +
          'px solid'
      }
      return data
    })

    return {i18n, change, style, style0}
  }
})
</script>

<style lang="less">
.c-style-kitemstype {
  display: inline-block;
  .ant-select {
    min-width: 60px;
  }
  button.c-kitemstyle-btn {
    > span {
      width: 14px;
      height: 14px;
      display: inline-block;
      margin: 4px 5px;
      border: 1px solid var(--border-color-base);
    }
  }
}
</style>
