<template>
  <div class="c-options">
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
      <!-- <a-form-item label="报表服务器">
        <a-radio-group
          name="radioGroup"
          @change="setServerType"
          v-model:value="serverType"
        >
          <a-radio value="public">公有云</a-radio>
          <a-radio value="private">私有云</a-radio>
        </a-radio-group>
        <a-input
          :disabled="serverType == 'public'"
          v-model:value="serverUrl"
        ></a-input>
      </a-form-item> -->
    </a-form>
  </div>
</template>

<script lang="ts">
import {Util} from '@datahu/core'
import {defineComponent, ref, reactive, onMounted, computed} from 'vue'
import http from '../use/http'
import {useState, useI18n, useLanguage} from '../use/state'
export default defineComponent({
  name: 'Options',
  setup() {
    let dataSources = ref([])
    let state = useState()

    let language = useLanguage()

    let publicServerUrl = Util.getServerUrl()
    let serverType = computed({
      get() {
        if (state.store.server) {
          if (state.store.server != publicServerUrl) {
            return 'private'
          }
        }
        return 'public'
      },
      set(v) {
        if (v == 'public') {
          setServerUrl(publicServerUrl)
        } else {
          setServerUrl('https://')
        }
      }
    })

    let serverUrl = computed({
      get() {
        return state.store.server
      },
      set(v) {
        setServerUrl(v)
      }
    })

    let setServerUrl = async (v) => {
      let store = await http.request('LocalStore/setServerStore', {url: v})
      state.store = store
    }

    onMounted(async () => {})

    // It makes no sense to make "versions" reactive
    return {
      labelCol: {span: 6},
      wrapperCol: {span: 6},
      language,
      serverType,
      state,
      serverUrl
    }
  }
})
</script>

<style lang="less">
.c-options {
  padding: 50px;
}
</style>
