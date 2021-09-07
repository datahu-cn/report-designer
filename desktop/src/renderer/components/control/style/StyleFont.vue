<template>
  <a-form-item name="fontFamily" :label="label">
    <a-select
      class="c-style-fontfamily"
      :clearable="true"
      size="small"
      :dropdown-match-select-width="false"
      v-model:value="modelValue.fontFamily"
    >
      <a-select-option value="auto">auto</a-select-option>
      <a-select-option value="cursive">cursive</a-select-option>
      <a-select-option value="emoji">emoji</a-select-option>
      <a-select-option value="fangsong">fangsong</a-select-option>
      <a-select-option value="fantasy">fantasy</a-select-option>
      <a-select-option value="monospace">monospace</a-select-option>
      <a-select-option value="sans-serif">sans-serif</a-select-option>
      <a-select-option value="serif">serif</a-select-option>
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
    let change = () => {
      emit('change', props.modelValue)
    }

    return {i18n, change}
  }
})
</script>

<style lang="less">
.c-style-fontfamily {
  min-width: 60px;
}
</style>
