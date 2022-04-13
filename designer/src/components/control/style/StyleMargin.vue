<template>
  <a-form-item name="margin" :label="label">
    <a-checkbox size="small" v-model:checked="marginMore">单边距</a-checkbox>
  </a-form-item>
  <a-form-item name="margin" label="">
    <StyleLength
      v-if="!marginMore"
      :auto="true"
      @change="change"
      v-model="marginValue"
    />
    <template v-if="marginMore">
      <StyleLength
        label="上"
        :auto="true"
        @change="change"
        v-model="modelValue.marginTop"
      />
      <StyleLength
        label="右"
        :auto="true"
        @change="change"
        v-model="modelValue.marginRight"
      />
      <StyleLength
        label="下"
        :auto="true"
        @change="change"
        v-model="modelValue.marginBottom"
      />
      <StyleLength
        label="左"
        :auto="true"
        @change="change"
        v-model="modelValue.marginLeft"
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

    let _marginMore = ref(false)
    let marginMore = computed({
      get() {
        return !(
          props.modelValue.marginTop == props.modelValue.marginBottom &&
          props.modelValue.marginTop == props.modelValue.marginRight &&
          props.modelValue.marginTop == props.modelValue.marginLeft &&
          !_marginMore.value
        )
      },
      set(v: boolean) {
        if (v === false) {
          props.modelValue.marginRight = props.modelValue.marginTop
          props.modelValue.marginBottom = props.modelValue.marginTop
          props.modelValue.marginLeft = props.modelValue.marginTop
          _marginMore.value = false
          change()
        }
        if (v === true) {
          _marginMore.value = true
        }
      }
    })

    let marginValue = computed({
      get() {
        return props.modelValue.marginTop
      },
      set(v: any) {
        props.modelValue.marginTop = v
        props.modelValue.marginRight = v
        props.modelValue.marginBottom = v
        props.modelValue.marginLeft = v
        change()
      }
    })

    let change = () => {
      emit('change', props.modelValue)
    }

    return {i18n, marginMore, marginValue, change}
  }
})
</script>

<style lang="less"></style>
