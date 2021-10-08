<template>
  <ReportPanel :file-path="state.filePath"></ReportPanel>
</template>

<script lang="ts">
import {defineComponent, reactive} from 'vue'
import ReportPanel from './ReportPanel.vue'

export default defineComponent({
  name: 'Index',
  components: {ReportPanel},
  setup() {
    let state = reactive({filePath: ''})
    return {state}
  }
})
</script>

<style lang="less"></style>
