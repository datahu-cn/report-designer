<template>
  <div class="c-datasource-table-column">
    <vxe-table
      :checkbox-config="{
        trigger: 'row',
        highlight: true,
        range: true,
        checkField: 'checked'
      }"
      :data="tableData"
      size="mini"
      height="100%"
      row-id="name"
      :highlight-hover-row="true"
      :border="true"
      :resizable="true"
      :auto-resize="true"
      @checkbox-change="selectChangeEvent"
      @checkbox-all="selectChangeEvent"
    >
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-column
        :formatter="column.field === 'type' ? formatterType : ''"
        v-for="column in columns"
        :key="column.field"
        :field="column.field"
        :title="column.title"
        :sortable="true"
        show-overflow
      ></vxe-column>
    </vxe-table>
  </div>
</template>

<script lang="ts">
import {defineComponent, computed, ref, Ref, nextTick} from 'vue'
import {useI18n, useState, useLanguage} from '../../use/state'
import {getCurrentInstance} from 'vue'
export default defineComponent({
  name: 'DataSourceTableColumn',
  components: {},
  props: ['connector', 'table', 'selectedColumns'],
  setup(props: any, {emit}) {
    let i18n = useI18n()
    let state = useState()
    let language = useLanguage()

    let tableData = computed(() => {
      let datas = []
      for (let col of props.table.columns) {
        datas.push({
          id: col.id,
          name: col.name,
          type: col.type,
          description: col.description,
          checked: props.selectedColumns[col.name]
        })
      }
      return datas
    })

    let columns = computed(() => {
      let cols = [
        {title: '列名称', field: 'name'},
        {title: '列说明', field: 'description'},
        {title: '列类型', field: 'type'}
      ]
      return cols
    })

    const columnsType: any = {
      0: 'Any',
      1: 'String',
      2: 'Number',
      3: 'Boolean',
      4: 'DateTime'
    }
    const formatterType = (value: any) => {
      const {cellValue} = value
      return columnsType[cellValue]
    }

    let selectChangeEvent = () => {
      for (let col of tableData.value) {
        props.selectedColumns[col.name] = col.checked
      }
    }

    return {
      columns,
      tableData,
      formatterType,
      selectChangeEvent
    }
  }
})
</script>

<style lang="less">
.c-datasource-table-column {
  height: 100%;

  .select-col-container {
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #e9e8e8;

    .select-col-title {
      width: 100px;
    }
  }
}
</style>
