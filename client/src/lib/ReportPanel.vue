<template>
  <div class="c-report-panel">
    <a-spin v-if="state.loaded" :spinning="loading">
      <ChartPanel v-if="panel.item" :chart="panel"></ChartPanel>
    </a-spin>
  </div>
</template>

<script lang="ts">
import {Helper} from './helper'
import {computed, defineComponent, onMounted, reactive, ref} from 'vue'
import {message} from 'ant-design-vue'
import {useState, initState, useLanguage, useI18n} from './state'
import {PackageManager} from './PackageManager'
import {ChartPanel, setContext} from '@datahu/component'
import * as JSZip from 'jszip'

export default defineComponent({
  name: 'ReportPanel',
  components: {ChartPanel},
  props: ['filePath'],
  setup(props: any) {
    let loading = ref(false)
    initState()
    let state = useState()
    let language = useLanguage()
    let i18n = useI18n()

    setContext(state, i18n, language)

    let initInClient = async () => {
      try {
        loading.value = true
        let result = await Helper.get(props.filePath, false, {
          responseType: 'arraybuffer'
        })
        let zipFiles = await JSZip.loadAsync(result.data)
        if (zipFiles) {
          let text = await zipFiles.file('file')!.async('string')
          let json = JSON.parse(text)
          let pkg = new PackageManager(json)
          state.pkg = pkg
          state.pkg.init()
          initPanel()
        } else {
          throw Error('读取报表文件失败')
        }
      } catch (e) {
        console.error(e)
        message.error(e.message)
      }
      loading.value = false
    }

    let panel = reactive({com: null, item: null})
    let initPanel = () => {
      let chart = state.pkg.getChart()
      let comClass = state.components[chart.type]
      panel.com = new comClass(language.value)
      panel.item = chart as any
    }

    onMounted(async () => {
      await initInClient()
    })
    return {
      loading,
      panel,
      state
    }
  }
})
</script>

<style lang="less">
.c-report-panel {
  height: 100%;
  .ant-spin-nested-loading,
  .ant-spin-spinning {
    height: 100%;
    width: 100%;
    .ant-spin-dot {
      margin-top: 50px;
    }
    .ant-spin-container {
      height: 100%;
    }
  }
}
</style>
