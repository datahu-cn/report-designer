<template>
  <a-form-item name="padding" :label="label">
    <a-checkbox size="small" v-model:checked="paddingMore">单边距</a-checkbox>
  </a-form-item>
  <a-form-item name="padding" label="">
    <StyleLength
      v-if="!paddingMore"
      :auto="false"
      @change="change"
      v-model="paddingValue"
    />
    <template v-if="paddingMore">
      <StyleLength
        label="上"
        :auto="false"
        @change="change"
        v-model="modelValue.paddingTop"
      />
      <StyleLength
        label="右"
        :auto="false"
        @change="change"
        v-model="modelValue.paddingRight"
      />
      <StyleLength
        label="下"
        :auto="false"
        @change="change"
        v-model="modelValue.paddingBottom"
      />
      <StyleLength
        label="左"
        :auto="false"
        @change="change"
        v-model="modelValue.paddingLeft"
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
  name: 'StyleFour',
  components: {StyleLength},
  props: ['modelValue', 'label'],
  setup(props: any, {emit}) {
    let i18n = useI18n()

    let _paddingMore = ref(false)
    let paddingMore = computed({
      get() {
        return !(
          props.modelValue.paddingTop == props.modelValue.paddingBottom &&
          props.modelValue.paddingTop == props.modelValue.paddingRight &&
          props.modelValue.paddingTop == props.modelValue.paddingLeft &&
          !_paddingMore.value
        )
      },
      set(v: boolean) {
        if (v === false) {
          props.modelValue.paddingRight = props.modelValue.paddingTop
          props.modelValue.paddingBottom = props.modelValue.paddingTop
          props.modelValue.paddingLeft = props.modelValue.paddingTop
          _paddingMore.value = false
          change()
        }
        if (v === true) {
          _paddingMore.value = true
        }
      }
    })

    let paddingValue = computed({
      get() {
        return props.modelValue.paddingTop
      },
      set(v: any) {
        props.modelValue.paddingTop = v
        props.modelValue.paddingRight = v
        props.modelValue.paddingBottom = v
        props.modelValue.paddingLeft = v
        change()
      }
    })
    let change = () => {
      emit('change', props.modelValue)
    }
    return {i18n, paddingMore, paddingValue, change}
  }
})
</script>

<style lang="less"></style>
