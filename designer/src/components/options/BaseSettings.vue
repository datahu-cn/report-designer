<template>
  <div class="c-base-settings">
    <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="语言">
        <a-select
          size="small"
          v-model:value="language"
          :dropdown-match-select-width="false"
        >
          <a-select-option value="en">English</a-select-option>
          <a-select-option value="zh-cn">简体中文</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import {Util} from '@datahu/core'
import {defineComponent, ref, reactive, onMounted, computed} from 'vue'
import http from '../../use/http'
import {useState, useI18n, useLanguage} from '../../use/state'
export default defineComponent({
  name: 'BaseSettings',
  setup() {
    let dataSources = ref([])
    let state = useState()

    let language = useLanguage()

    onMounted(async () => {})

    // It makes no sense to make "versions" reactive
    return {
      labelCol: {span: 6},
      wrapperCol: {span: 6},
      language,
      state
    }
  }
})
</script>

<style lang="less">
.c-base-settings {
  padding: 0px;
}
</style>
