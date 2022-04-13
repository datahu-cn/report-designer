<template>
  <a-form-item
    v-if="config.options.indexOf('textAlign') >= 0"
    name="textAlign"
    label="水平位置"
  >
    <a-radio-group
      @change="change"
      v-model:value="modelValue.textAlign"
      size="small"
    >
      <a-radio-button value="left">
        <icon type="alignLeftH" />
      </a-radio-button>
      <a-radio-button value="center">
        <icon type="alignCenterH" />
      </a-radio-button>
      <a-radio-button value="right">
        <icon type="alignRightH" />
      </a-radio-button>
    </a-radio-group>
  </a-form-item>
  <a-form-item
    v-if="config.options.indexOf('justifyContent') >= 0"
    name="justifyContent"
    label="水平位置"
  >
    <a-radio-group
      @change="change"
      v-model:value="modelValue.justifyContent"
      size="small"
    >
      <a-radio-button value="flex-start">
        <icon type="alignLeftH" />
      </a-radio-button>
      <a-radio-button value="center">
        <icon type="alignCenterH" />
      </a-radio-button>
      <a-radio-button value="flex-end">
        <icon type="alignRightH" />
      </a-radio-button>
    </a-radio-group>
  </a-form-item>
  <a-form-item
    v-if="config.options.indexOf('alignItems') >= 0"
    name="alignItems"
    label="垂直位置"
  >
    <a-radio-group
      @change="change"
      v-model:value="modelValue.alignItems"
      size="small"
    >
      <a-radio-button value="flex-start">
        <icon type="alignUpV" />
      </a-radio-button>
      <a-radio-button value="center">
        <icon type="alignCenterV" />
      </a-radio-button>
      <a-radio-button value="flex-end">
        <icon type="alignDownV" />
      </a-radio-button>
    </a-radio-group>
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
import ImageUpload from '../ImageUpload.vue'
export default defineComponent({
  name: 'StyleAligin',
  components: {ImageUpload},
  props: ['modelValue', 'config'],
  setup(props: any, {emit}) {
    let i18n = useI18n()
    let change = () => {
      emit('change', props.modelValue)
    }

    return {i18n, change}
  }
})
</script>

<style lang="less"></style>
