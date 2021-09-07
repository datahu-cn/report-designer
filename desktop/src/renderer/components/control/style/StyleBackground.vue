<template>
  <a-form-item name="borderStyle" :label="label">
    <ImageUpload v-model="backgroundImageValue" />
  </a-form-item>
  <a-form-item name="backgroundSize" label="图片尺寸">
    <a-select
      class="c-style-background-size-select"
      size="small"
      v-model:value="modelValue.backgroundSize"
      :dropdown-match-select-width="false"
    >
      <a-select-option value="auto">自动</a-select-option>
      <a-select-option value="cover">覆盖</a-select-option>
      <a-select-option value="contain">包含</a-select-option>
    </a-select>
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
  name: 'StyleBackground',
  components: {ImageUpload},
  props: ['modelValue', 'auto', 'label'],
  setup(props: any, {emit}) {
    let i18n = useI18n()
    let backgroundImageValue = computed({
      get() {
        let url = ''
        if (props.modelValue && props.modelValue.backgroundImage) {
          url = props.modelValue.backgroundImage.substring(
            4,
            props.modelValue.backgroundImage.length - 1
          )
        }
        return url
      },
      set(v: any) {
        props.modelValue.backgroundImage = `url(${v})`
        emit('update:modelValue', props.modelValue)
        emit('change', props.modelValue)
      }
    })

    return {i18n, backgroundImageValue}
  }
})
</script>

<style lang="less">
.c-style-background-size-select {
  min-width: 65px;
}
</style>
