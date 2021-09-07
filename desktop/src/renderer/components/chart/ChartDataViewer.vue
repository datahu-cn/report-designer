<template>
  <div class="c-chart-data-viewer">
    <a-modal width="800px" v-model:visible="visible" title="数据">
      <div class="c-modal-content">
        <vxe-table
          :data="tableData"
          size="mini"
          height="600px"
          :highlight-hover-row="true"
          :border="true"
          :resizable="true"
          :auto-resize="true"
          :sort-config="{multiple: true}"
        >
          <vxe-column
            v-for="column in columns"
            :key="column.field"
            :field="column.field"
            :title="column.title"
            :sortable="true"
            :filters="column.filters"
            show-overflow
          ></vxe-column>
        </vxe-table>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  onMounted,
  computed,
  createVNode,
  Ref,
  ComputedRef
} from 'vue'
import {getColumnIcon} from '../common/icon/Icons'
import {useI18n, useLanguage, useState} from '../../use/state'
import {
  TableOutlined,
  CaretDownOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons-vue'
import http from '../../use/http'
import {message, Modal} from 'ant-design-vue'
import CodeEditor from '../control/CodeEditor.vue'
import {
  ChartData,
  DataMergeType,
  Formula,
  IColumnDefinition,
  ITableDefinition,
  Util
} from '@datahu/core'
export default defineComponent({
  name: 'TableTree',
  components: {CodeEditor},
  props: ['data', 'visible'],
  setup(props, {emit}) {
    onMounted(async () => {})
    let tableData: ComputedRef<Array<any>> = computed(() => {
      let data: Array<any> = []
      if (
        props.data!.getDataset().data &&
        props.data!.getDataset().data.length > 0
      ) {
        for (let i = 1; i < props.data!.getDataset().data.length; i++) {
          let row: any = {}
          let arr = props.data!.getDataset().data[i]
          for (let j = 0; j < props.data!.getDataset().data[0].length; j++) {
            let col = props.data!.getDataset().data[0][j]
            row[col] = arr[j]
          }
          data.push(row)
        }
        if (data.length > 0) {
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
      return data
    })

    let columns: ComputedRef<Array<any>> = computed(() => {
      let cols = []
      if (
        props.data!.getDataset().data &&
        props.data!.getDataset().data.length > 0
      ) {
        // let col: any = {type: 'seq', field: ''}
        // cols.push(col)
        for (let j = 0; j < props.data!.getDataset().data[0].length; j++) {
          let col = props.data!.getDataset().data[0][j]
          let tcol = {
            title: col,
            field: col
          } as any
          cols.push(tcol)
        }
      }
      return cols
    })

    let visible = computed({
      get() {
        return props.visible
      },
      set(v: any) {
        emit('update:visible', v)
      }
    })

    return {tableData, columns, visible}
  }
})
</script>

<style lang="less">
.c-chart-data-viewer {
}
</style>
