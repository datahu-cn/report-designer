<template>
  <div class="c-field-number-color">
    <a-input-number
      @change="change"
      size="small"
      v-model:value="modelValue[0]"
    ></a-input-number>
    <ColorPicker @change="change" v-model="modelValue[1]"></ColorPicker>
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
  name: 'StyleBackground',
  components: {ColorPicker},
  props: ['modelValue', 'config', 'min', 'max'],
  setup(props: any, {emit}) {
    let i18n = useI18n()
    let change = () => {
      emit('change', props.modelValue)
    }

    return {i18n, change}
  }
})
</script>

<style lang="less">
.c-field-number-color {
  display: inline-block;
  .ant-input-number {
    width: 30px;
    margin-right: 5px;
  }
  .c-color-picker {
    vertical-align: middle;
  }
}
</style>
