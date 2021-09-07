<template>
  <a-form-item name="borderRadius" :label="label">
    <a-checkbox size="small" v-model:checked="borderRadiusMore">
      单边距
    </a-checkbox>
  </a-form-item>
  <a-form-item name="borderRadius" label="">
    <StyleLength
      v-if="!borderRadiusMore"
      :auto="false"
      @change="change"
      v-model="borderRadiusValue"
    />
    <template v-if="borderRadiusMore">
      <StyleLength
        label="左上"
        :auto="false"
        @change="change"
        v-model="modelValue.borderTopLeftRadius"
      />
      <StyleLength
        label="右上"
        :auto="false"
        @change="change"
        v-model="modelValue.borderTopRightRadius"
      />
      <StyleLength
        label="右下"
        :auto="false"
        @change="change"
        v-model="modelValue.borderBottomRightRadius"
      />
      <StyleLength
        label="左下"
        :auto="false"
        @change="change"
        v-model="modelValue.borderBottomLeftRadius"
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
export default defineComponent({
  name: 'StyleBorderRadius',
  components: {StyleLength},
  props: ['modelValue', 'label'],
  setup(props: any, {emit}) {
    let i18n = useI18n()

    let _borderRadiusMore = ref(false)
    let borderRadiusMore = computed({
      get() {
        return !(
          props.modelValue.borderTopLeftRadius ==
            props.modelValue.borderBottomRightRadius &&
          props.modelValue.borderTopLeftRadius ==
            props.modelValue.borderTopRightRadius &&
          props.modelValue.borderTopLeftRadius ==
            props.modelValue.borderBottomLeftRadius &&
          !_borderRadiusMore.value
        )
      },
      set(v: boolean) {
        if (v === false) {
          props.modelValue.borderTopRightRadius =
            props.modelValue.borderTopLeftRadius
          props.modelValue.borderBottomRightRadius =
            props.modelValue.borderTopLeftRadius
          props.modelValue.borderBottomLeftRadius =
            props.modelValue.borderTopLeftRadius
          _borderRadiusMore.value = false
          change()
        }
        if (v === true) {
          _borderRadiusMore.value = true
        }
      }
    })

    let borderRadiusValue = computed({
      get() {
        return props.modelValue.borderTopLeftRadius
      },
      set(v: any) {
        props.modelValue.borderTopLeftRadius = v
        props.modelValue.borderTopRightRadius = v
        props.modelValue.borderBottomRightRadius = v
        props.modelValue.borderBottomLeftRadius = v
        change()
      }
    })

    let change = () => {
      emit('change', props.modelValue)
    }

    return {i18n, borderRadiusMore, borderRadiusValue, change}
  }
})
</script>

<style lang="less"></style>
