<template>
  <div v-if="table" class="c-table-viewer">
    <div class="c-table-viewer-table">
      <vxe-grid v-bind="gridOptions">
        <template #cellTemplate="cellData">
          <span v-html="colFormatter(cellData)"></span>
        </template>
      </vxe-grid>
    </div>
    <div class="c-table-viewer-footer">行数：{{ gridOptions.data.length }}</div>
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
  computed,
  Ref,
  nextTick
} from 'vue'
import {useI18n, useState, useLanguage} from '../../use/state'
import http from '../../use/http'
import {Formatter, Formula} from '@datahu/core'
export default defineComponent({
  name: 'TableViewer',
  components: {},
  props: ['connector', 'table'],
  setup(props: any) {
    let i18n = useI18n()
    let state = useState()
    let language = useLanguage()

    let tableData = computed(() => {
      let data = []
      if (props.table) {
        data = state.pkg.getTableData(props.table)
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
        } else {
          data = []
        }
      }
      // 新建数组，解决修改排序后，表格数据不变的问题
      return [...data]
    })

    let columns = computed(() => {
      let cols = []
      if (props.table) {
        for (let col of props.table.columns) {
          let tcol = {
            title: col.alias || col.name,
            field: col.alias || col.name,
            sorter: true,
            minWidth: '100px',
            slots: {
              // 使用插槽模板渲染
              default: 'cellTemplate'
            },
            opt: col
          } as any
          cols.push(tcol)
        }
      }
      return cols
    })

    let colFormatter = (cellData: any) => {
      // let cellValue = row[column.field]
      let {columnIndex, row} = cellData
      let col = columns.value[columnIndex]
      if (col) {
        let cellValue = row[col.field]
        if (col && col.opt && col.opt.formatter) {
          return Formatter.formatHtml(col.opt.formatter, cellValue)
        }
        return cellValue
      }
    }

    let gridOptions = computed(() => {
      return {
        data: tableData.value,
        columns: columns.value,
        size: 'mini',
        height: '100%',
        highlightHoverRow: true,
        showOverflow: 'title',
        resizable: true
      }
    })

    return {gridOptions, colFormatter}
  }
})
</script>

<style lang="less">
.c-table-viewer {
  > div.c-table-viewer-table {
    height: calc(100% - 35px);
  }
  > div.c-table-viewer-footer {
    height: 35px;
    line-height: 35px;
    vertical-align: middle;
    padding: 0px 10px;
    border-left: 1px solid #e8eaec;
    background-color: #f8f8f9;
  }

  width: 100%;
}
</style>
