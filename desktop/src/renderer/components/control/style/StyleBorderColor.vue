<template>
  <a-form-item name="borderColor" :label="label">
    <a-checkbox size="small" v-model:checked="borderColorMore">
      单边框
    </a-checkbox>
  </a-form-item>

  <a-form-item name="borderColor" label="">
    <ColorPicker
      v-if="!borderColorMore"
      :auto="true"
      @change="change"
      v-model="borderColorValue"
    />
    <template v-if="borderColorMore">
      <ColorPicker
        label="上"
        :auto="true"
        @change="change"
        v-model="modelValue.borderTopColor"
      />

      <ColorPicker
        label="右"
        :auto="true"
        @change="change"
        v-model="modelValue.borderRightColor"
      />
      <ColorPicker
        label="下"
        :auto="true"
        @change="change"
        v-model="modelValue.borderBottomColor"
      />
      <ColorPicker
        label="左"
        :auto="true"
        @change="change"
        v-model="modelValue.borderLeftColor"
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
import ColorPicker from '../ColorPicker.vue'
export default defineComponent({
  name: 'StyleBorderColor',
  components: {ColorPicker},
  props: ['modelValue', 'label'],
  setup(props: any, {emit}) {
    let i18n = useI18n()

    let _borderColorMore = ref(false)
    let borderColorMore = computed({
      get() {
        return !(
          props.modelValue.borderTopColor ==
            props.modelValue.borderBottomColor &&
          props.modelValue.borderTopColor ==
            props.modelValue.borderRightColor &&
          props.modelValue.borderTopColor == props.modelValue.borderLeftColor &&
          !_borderColorMore.value
        )
      },
      set(v: boolean) {
        if (v === false) {
          props.modelValue.borderRightColor = props.modelValue.borderTopColor
          props.modelValue.borderBottomColor = props.modelValue.borderTopColor
          props.modelValue.borderLeftColor = props.modelValue.borderTopColor
          _borderColorMore.value = false
          change()
        }
        if (v === true) {
          _borderColorMore.value = true
        }
      }
    })

    let borderColorValue = computed({
      get() {
        return props.modelValue.borderTopColor
      },
      set(v: any) {
        props.modelValue.borderTopColor = v
        props.modelValue.borderRightColor = v
        props.modelValue.borderBottomColor = v
        props.modelValue.borderLeftColor = v
        change()
      }
    })

    let change = () => {
      emit('change', props.modelValue)
    }

    return {i18n, borderColorMore, borderColorValue, change}
  }
})
</script>

<style lang="less"></style>
