<template>
  <div class="c-datasource-table-viewer">
    <vxe-table
      :data="tableData"
      size="mini"
      height="100%"
      :highlight-hover-row="true"
      :border="true"
      :resizable="true"
      :auto-resize="true"
      :sort-config="{multiple: true}"
      ref="DataSourceTableViewer"
    >
      <vxe-column
        v-for="column in columns"
        :key="column.field"
        :field="column.field"
        :title="column.title"
        min-width="100px"
        :sortable="true"
        :filters="column.filters"
        show-overflow
      ></vxe-column>
    </vxe-table>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  reactive,
  watchEffect,
  watch,
  computed
} from 'vue'
import {useI18n, useState, useLanguage} from '../../use/state'
import http from '../../use/http'
import {Formula} from '@datahu/core'
import {getCurrentInstance} from 'vue'
export default defineComponent({
  name: 'DataSourceTableViewer',
  components: {},
  props: ['connector', 'table', 'selectedColumns'],
  setup(props: any) {
    let i18n = useI18n()
    let state = useState()
    let language = useLanguage()
    let tableData = computed(() => {
      let data = []
      if (props.table) {
        data = props.table.rows
        if (data && data.length > 0) {
          for (let col of columns.value) {
            col.filters = []
            let distincts = Formula.distinct(data, col.field)
            let index = 0
            for (let v of distincts) {
              if (index < 100) {
                col.filters.push({label: v, value: v})
              } else {
                break
              }
              index++
            }
          }
        }
      }
      return [...(data || [])]
    })

    let columns = computed(() => {
      let cols = []
      if (props.table) {
        for (let col of props.table.columns) {
          if (props.selectedColumns[col.name]) {
            let tcol = {
              title: col.name,
              field: col.name,
              sorter: true
            } as any
            cols.push(tcol)
          }
        }
      }
      return cols
    })

    return {tableData, columns}
  }
})
</script>

<style lang="less">
.c-datasource-table-viewer {
  height: 100%;
}
</style>
