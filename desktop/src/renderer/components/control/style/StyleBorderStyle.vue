<template>
  <a-form-item name="borderStyle" :label="label">
    <a-checkbox size="small" v-model:checked="borderStyleMore">
      单边框
    </a-checkbox>
  </a-form-item>

  <a-form-item name="borderStyle" label="">
    <BorderStylePicker
      v-if="!borderStyleMore"
      :auto="true"
      @change="change"
      v-model="borderStyleValue"
    />
    <template v-if="borderStyleMore">
      <BorderStylePicker
        label="上"
        :auto="true"
        @change="change"
        v-model="modelValue.borderTopStyle"
      />

      <BorderStylePicker
        label="右"
        :auto="true"
        @change="change"
        v-model="modelValue.borderRightStyle"
      />
      <BorderStylePicker
        label="下"
        :auto="true"
        @change="change"
        v-model="modelValue.borderBottomStyle"
      />
      <BorderStylePicker
        label="左"
        :auto="true"
        @change="change"
        v-model="modelValue.borderLeftStyle"
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
import BorderStylePicker from '../BorderStylePicker.vue'
export default defineComponent({
  name: 'StyleBorderStyle',
  components: {BorderStylePicker},
  props: ['modelValue', 'label'],
  setup(props: any, {emit}) {
    let i18n = useI18n()

    let _borderStyleMore = ref(false)
    let borderStyleMore = computed({
      get() {
        return !(
          props.modelValue.borderTopStyle ==
            props.modelValue.borderBottomStyle &&
          props.modelValue.borderTopStyle ==
            props.modelValue.borderRightStyle &&
          props.modelValue.borderTopStyle == props.modelValue.borderLeftStyle &&
          !_borderStyleMore.value
        )
      },
      set(v: boolean) {
        if (v === false) {
          props.modelValue.borderRightStyle = props.modelValue.borderTopStyle
          props.modelValue.borderBottomStyle = props.modelValue.borderTopStyle
          props.modelValue.borderLeftStyle = props.modelValue.borderTopStyle
          _borderStyleMore.value = false
          change()
        }
        if (v === true) {
          _borderStyleMore.value = true
        }
      }
    })

    let borderStyleValue = computed({
      get() {
        return props.modelValue.borderTopStyle
      },
      set(v: any) {
        props.modelValue.borderTopStyle = v
        props.modelValue.borderRightStyle = v
        props.modelValue.borderBottomStyle = v
        props.modelValue.borderLeftStyle = v
        change()
      }
    })

    let change = () => {
      emit('change', props.modelValue)
    }

    return {i18n, borderStyleMore, borderStyleValue, change}
  }
})
</script>

<style lang="less"></style>
