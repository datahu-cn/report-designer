<template>
  <div class="c-options">
    <a-tabs tab-position="left" v-model:activeKey="activeKey">
      <!-- <a-tab-pane tab="基本设置" key="1">
        <BaseSettings />
      </a-tab-pane> -->
      <a-tab-pane tab="可视化插件" key="2">
        <ComponentPlugins />
      </a-tab-pane>
      <!-- <a-tab-pane tab="数据源插件" key="3">
        <BaseSettings />
      </a-tab-pane> -->
    </a-tabs>
  </div>
</template>

<script lang="ts">
import {Util} from '@datahu/core'
import {defineComponent, ref, reactive, onMounted, computed} from 'vue'
import http from '../use/http'
import {useState, useI18n, useLanguage} from '../use/state'
import BaseSettings from '../components/options/BaseSettings.vue'
import ComponentPlugins from '../components/options/ComponentPlugins.vue'
export default defineComponent({
  name: 'Options',
  components: {BaseSettings, ComponentPlugins},
  setup() {
    let state = useState()

    let language = useLanguage()
    let activeKey = ref('2')

    onMounted(async () => {})

    // It makes no sense to make "versions" reactive
    return {
      language,
      state,
      activeKey
    }
  }
})
</script>

<style lang="less">
.c-options {
  padding: 50px;
}
</style>
