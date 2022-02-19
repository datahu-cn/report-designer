<template>
  <div class="c-chart-data-viewer">
    <Modal width="800px" v-model:visible="visible" title="数据">
      <div class="c-modal-content">
        <Table
          :data="tableData"
          size="mini"
          ref="vxeTable"
          height="600px"
          :export-config="{
            type: 'csv',
            types: ['csv']
          }"
          :highlight-hover-row="true"
          :border="true"
          :resizable="true"
          :auto-resize="true"
          :sort-config="{multiple: true}"
        >
          <Column
            v-for="column in columns"
            :key="column.field"
            :field="column.field"
            :title="column.title"
            :sortable="true"
            :filters="column.filters"
            show-overflow
          ></Column>
        </Table>
      </div>
      <template #footer>
        <Button key="export" type="primary" @click="exportData()">导出</Button>
        <Button key="cancel" @click="visible = false">关闭</Button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import {Modal, Button} from 'ant-design-vue'
import {Table, Column} from 'vxe-table'
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
import {
  ChartData,
  DataMergeType,
  Formula,
  IColumnDefinition,
  ITableDefinition,
  Util
} from '@datahu/core'
export default defineComponent({
  name: 'ChartDataViewer',
  components: {Modal, Button, Table, Column},
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

    let vxeTable: Ref<any> = ref(null)
    let exportData = () => {
      if (vxeTable.value) {
        vxeTable.value.exportData({})
      }
    }

    return {tableData, columns, visible, vxeTable, exportData}
  }
})
</script>

<style lang="less">
.c-chart-data-viewer {
}
</style>
