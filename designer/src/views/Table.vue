<template>
  <div class="c-table">
    <Multipanel layout="vertical">
      <div class="c-pane c-pane-1 c-table-vertical-panel" style="width: 200px">
        <TableTree></TableTree>
      </div>
      <MultipaneResizer
        :show-expand="true"
        layout="vertical"
      ></MultipaneResizer>
      <div
        class="c-pane c-pane-2 c-table-vertical-panel"
        style="width: 200px; margin-left: -3px"
      >
        <DataActions></DataActions>
      </div>
      <MultipaneResizer
        :show-expand="true"
        layout="vertical"
      ></MultipaneResizer>
      <div
        style="flex-grow: 1; margin-left: -3px; width: calc(100% - 400px)"
        class="c-pane c-table-vertical-panel"
      >
        <TableViewer
          :table="selectedTable"
          :connector="connector"
        ></TableViewer>
      </div>
    </Multipanel>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, reactive, onMounted, computed} from 'vue'
import {useI18n, useLanguage, useState} from '../use/state'
import TableViewer from '../components/table/TableViewer.vue'
import TableTree from '../components/table/TableTree.vue'
import http from '../use/http'
import Multipanel from '../components/common/multipanel/Multipanel.vue'
import MultipaneResizer from '../components/common/multipanel/MultipaneResizer.vue'
import DataActions from '../components/table/DataActions.vue'
import FormulaEditor from '../components/table/FormulaEditor.vue'
export default defineComponent({
  name: 'Table',
  components: {
    TableTree,
    Multipanel,
    MultipaneResizer,
    DataActions,
    FormulaEditor,
    TableViewer
  },
  setup() {
    onMounted(async () => {})

    let state = useState()

    let selectedTable = computed(() => {
      return state.selectedTable
    })

    let connector = computed(() => {
      if (selectedTable.value) {
        for (let ds of state.pkg.definition.connectors) {
          if (ds.id == selectedTable.value.connectorId) {
            return ds
          }
        }
      }
    })

    // It makes no sense to make "versions" reactive
    return {selectedTable, connector}
  }
})
</script>

<style lang="less">
.c-table {
  height: 100%;
  width: 100%;
  > div {
    height: 100%;
    > div {
      height: 100%;
      &.c-pane.c-table-vertical-panel {
        overflow: hidden;
      }
    }
  }
}
</style>
