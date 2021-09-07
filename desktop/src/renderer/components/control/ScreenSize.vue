<template>
  <div class="c-screen-size">
    <a-popover title="设置" trigger="click">
      <template #content>
        <div class="c-controls-form">
          <a-form-item name="width" label="宽">
            <StyleLength
              :options="options"
              :auto="true"
              @change="change"
              v-model="modelValue.width"
            />
          </a-form-item>
          <a-form-item name="height" label="高">
            <StyleLength
              :options="options"
              :auto="true"
              @change="change"
              v-model="modelValue.height"
            />
          </a-form-item>
          <a-form-item name="minWidth" label="最小宽">
            <StyleLength
              :options="options"
              :auto="true"
              @change="change"
              v-model="modelValue.minWidth"
            />
          </a-form-item>
          <a-form-item name="maxWidth" label="最大宽">
            <StyleLength
              :options="options"
              :auto="true"
              @change="change"
              v-model="modelValue.maxWidth"
            />
          </a-form-item>
          <a-form-item name="minHeight" label="最小高">
            <StyleLength
              :options="options"
              :auto="true"
              @change="change"
              v-model="modelValue.minHeight"
            />
          </a-form-item>
          <a-form-item name="maxHeight" label="最大高">
            <StyleLength
              :options="options"
              :auto="true"
              @change="change"
              v-model="modelValue.maxHeight"
            />
          </a-form-item>
        </div>
      </template>
      <a-button class="c-screen-size-btn" size="small">
        {{ modelValue.width }}
        <span>x</span>
        {{ modelValue.height }}
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
import {useI18n, useState} from '../../use/state'
import StyleLength from './style/StyleLength.vue'
export default defineComponent({
  name: 'StyleProperty',
  components: {
    StyleLength
  },
  props: ['modelValue', 'disabled', 'data', 'config'],
  setup(props: any, {emit}) {
    let i18n = useI18n()
    let change = () => {
      emit('change', props.modelValue)
    }

    let options = [
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true},
      {label: '自动', value: 'auto', number: false}
    ]

    return {i18n, change, options}
  }
})
</script>

<style lang="less">
.c-screen-size {
  display: inline-block;
  .c-screen-size-btn {
    > span {
      display: inline-block;
      margin: auto 5px;
    }
  }
  .ant-select {
    min-width: 60px;
  }
}
</style>
