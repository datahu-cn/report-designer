<template>
  <a-form-item name="borderWidth" :label="label">
    <a-checkbox size="small" v-model:checked="borderWidthMore">
      单边框
    </a-checkbox>
  </a-form-item>

  <a-form-item name="borderWidth" label="">
    <StyleLength
      v-if="!borderWidthMore"
      :auto="true"
      @change="change"
      v-model="borderWidthValue"
    />
    <template v-if="borderWidthMore">
      <StyleLength
        label="上"
        :auto="true"
        @change="change"
        v-model="modelValue.borderTopWidth"
      />
      <StyleLength
        label="右"
        :auto="true"
        @change="change"
        v-model="modelValue.borderRightWidth"
      />
      <StyleLength
        label="下"
        :auto="true"
        @change="change"
        v-model="modelValue.borderBottomWidth"
      />
      <StyleLength
        label="左"
        :auto="true"
        @change="change"
        v-model="modelValue.borderLeftWidth"
      />
    </template>
  </a-form-item>
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
import StyleLength from './StyleLength.vue'
import ColorPicker from '../ColorPicker.vue'
export default defineComponent({
  name: 'StyleBorderWidth',
  components: {StyleLength, ColorPicker},
  props: ['modelValue', 'label'],
  setup(props: any, {emit}) {
    let i18n = useI18n()

    let _borderWidthMore = ref(false)
    let borderWidthMore = computed({
      get() {
        return !(
          props.modelValue.borderTopWidth ==
            props.modelValue.borderBottomWidth &&
          props.modelValue.borderTopWidth ==
            props.modelValue.borderRightWidth &&
          props.modelValue.borderTopWidth == props.modelValue.borderLeftWidth &&
          !_borderWidthMore.value
        )
      },
      set(v: boolean) {
        if (v === false) {
          props.modelValue.borderRightWidth = props.modelValue.borderTopWidth
          props.modelValue.borderBottomWidth = props.modelValue.borderTopWidth
          props.modelValue.borderLeftWidth = props.modelValue.borderTopWidth
          _borderWidthMore.value = false
          change()
        }
        if (v === true) {
          _borderWidthMore.value = true
        }
      }
    })

    let borderWidthValue = computed({
      get() {
        return props.modelValue.borderTopWidth
      },
      set(v: any) {
        props.modelValue.borderTopWidth = v
        props.modelValue.borderRightWidth = v
        props.modelValue.borderBottomWidth = v
        props.modelValue.borderLeftWidth = v
        change()
      }
    })

    let change = () => {
      emit('change', props.modelValue)
    }

    return {i18n, borderWidthMore, borderWidthValue, change}
  }
})
</script>

<style lang="less"></style>
