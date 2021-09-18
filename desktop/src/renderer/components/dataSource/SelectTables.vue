<template>
  <div>
    <a-drawer
      :title="'选择表格'"
      placement="right"
      :closable="false"
      class="c-select-table-drawer"
      width="80%"
      v-model:visible="visible"
    >
      <a-spin :spinning="loading">
        <div class="c-select-tables">
          <div class="c-select-actions">
            <a-button
              v-if="modelValue"
              type="primary"
              @click="editDataSource()"
            >
              编辑数据连接
            </a-button>
            <a-button
              v-if="modelValue && modelValue.ds.sourceCode == 2"
              type="primary"
              @click="newSourceCodeTable()"
            >
              自定义代码
            </a-button>
          </div>
          <div class="c-layouts">
            <div class="c-layout-left">
              <a-table
                :scroll="{x: true, y: true}"
                size="small"
                row-key="name"
                :pagination="false"
                :row-selection="computedSelection"
                :columns="columns"
                :data-source="tables"
                :custom-row="customRow"
                :row-class-name="rowClassName"
              ></a-table>
            </div>
            <div class="c-layout-right">
              <a-tabs
                @change="tabSeletedChange()"
                v-model:activeKey="tabSelectedKey"
              >
                <a-tab-pane key="1" tab="列">
                  <DataSourceTableColumn
                    v-if="selectedTable"
                    :connector="modelValue.connector"
                    :selected-columns="selectedColumns[selectedTable.name]"
                    :table="selectedTable"
                  />
                </a-tab-pane>
                <a-tab-pane key="2" tab="内容" :force-render="true">
                  <DataSourceTableViewer
                    v-if="selectedTable && tabSelectedKey == '2'"
                    :connector="modelValue.connector"
                    :selected-columns="selectedColumns[selectedTable.name]"
                    :table="selectedTable"
                  ></DataSourceTableViewer>
                </a-tab-pane>
                <a-tab-pane
                  v-if="selectedTable && selectedTable.useSourceCode"
                  key="3"
                  tab="代码"
                >
                  <div class="c-m10">
                    <a-form layout="vertical">
                      <a-form-item label="表名称">
                        <a-input
                          :default-value="selectedTable.name"
                          @change="checkTableName"
                        />
                        <div
                          v-if="sourceCodeTableError"
                          class="c-source-code-form-error"
                        >
                          {{ sourceCodeTableError }}
                        </div>
                      </a-form-item>
                      <a-form-item label="代码">
                        <CodeEditor
                          v-model="selectedTable.sourceCode"
                          :code-description="{
                            params: [],
                            return: 'SQL语句'
                          }"
                        />
                      </a-form-item>
                      <a-form-item>
                        <a-button
                          type="primary"
                          @click="requestSourceCodeData()"
                        >
                          提交并验证
                        </a-button>
                      </a-form-item>
                    </a-form>
                  </div>
                </a-tab-pane>
              </a-tabs>
            </div>
          </div>
          <div class="c-drawer-footer">
            <a-button style="margin-right: 8px" @click="visible = null">
              {{ i18n.common_cancel }}
            </a-button>
            <a-button
              type="primary"
              style="margin-right: 8px"
              @click="onSubmit()"
            >
              {{ i18n.common_submit }}
            </a-button>
          </div>
        </div>
      </a-spin>
    </a-drawer>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  defineEmit,
  onMounted,
  reactive,
  toRefs,
  unref,
  Ref,
  ref
} from 'vue'
import {useI18n, useState, useLanguage} from '../../use/state'
import http from '../../use/http'
import DataSourceTableViewer from './DataSourceTableViewer.vue'
import DataSourceTableColumn from './DataSourceTableColumn.vue'
import {message} from 'ant-design-vue'
import {
  DataSourceHelper,
  IColumnDefinition,
  ITableDefinition,
  Util
} from '@datahu/core'
import CodeEditor from '../control/CodeEditor.vue'
import {Modal} from 'ant-design-vue'
export default defineComponent({
  name: 'SelectTables',
  components: {DataSourceTableViewer, DataSourceTableColumn, CodeEditor},
  props: ['modelValue', 'dataSource', 'visible'],
  setup(props: any, {emit}) {
    let i18n = useI18n()
    let state = useState()
    let language = useLanguage()

    let loading = ref(false)

    const rowSelection: any = reactive({
      selectedRowKeys: []
    })
    let computedSelection = computed(() => {
      return {
        selectedRowKeys: rowSelection.selectedRowKeys,
        onChange: (selectedRowKeys: any) => {
          rowSelection.selectedRowKeys = selectedRowKeys
        }
      }
    })

    let connectorId = props.modelValue.connector.id
    let sourceCodeTables: Ref<Array<ITableDefinition>> = ref([])
    let initSelectedTables = () => {
      for (let t of state.pkg.definition.tables) {
        if (t.connectorId == connectorId) {
          rowSelection.selectedRowKeys.push(t.name)
          if (t.useSourceCode) {
            sourceCodeTables.value.push({
              id: t.id,
              name: t.name,
              alias: t.alias,
              useSourceCode: t.useSourceCode,
              sourceCode: t.sourceCode,
              columns: Util.copy(t.columns),
              connectorId: t.connectorId,
              isFormula: t.isFormula
            })
          }
        }
      }
    }
    initSelectedTables()

    // 初始化选中的column
    let selectedColumns: Ref<any> = ref({})
    let initSelectColumns = () => {
      let selected: any = {}
      for (let t of tables.value) {
        selected[t.name] = {}

        let existTable: ITableDefinition | null = null
        for (let table of state.pkg.definition.tables) {
          if (table.name == t.name) {
            existTable = table
          }
        }
        if (existTable) {
          for (let col of t.columns) {
            let has = false
            for (let existCol of existTable.columns) {
              if (existCol.name == col.name) {
                has = true
                break
              }
            }
            selected[t.name][col.name] = has
          }
        } else {
          for (let col of t.columns) {
            selected[t.name][col.name] = true
          }
        }
      }
      selectedColumns.value = selected
    }

    let tables: Ref<Array<any>> = ref([])
    let getTablesFromConnector = async () => {
      let arg = {
        connector: props.modelValue.connector,
        language: language.value
      }
      loading.value = true
      let result = await http.request('DataSource/getTables', arg)
      tables.value = result as any
      loading.value = false
      for (let t of sourceCodeTables.value) {
        tables.value.push(t)
      }
      initSelectColumns()
      if (props.modelValue.defaultSelectedTable) {
        for (let t of tables.value) {
          if (t.name == props.modelValue.defaultSelectedTable) {
            selectedTable.value = t
            if (rowSelection.selectedRowKeys.indexOf(t.name) < 0) {
              rowSelection.selectedRowKeys.push(t.name)
            }
            break
          }
        }
      }
    }
    getTablesFromConnector()

    let visible = computed({
      get() {
        return !!props.modelValue
      },
      set(v) {
        emit('update:modelValue', v)
      }
    })

    // 表格
    const columns = [
      {
        title: '表格名称',
        dataIndex: 'name',
        key: 'name',
        sortDirections: ['ascend', 'descend'],
        sorter: (a: any, b: any) => {
          if (a.name < b.name) {
            return -1
          } else if (a.name == b.name) {
            return 0
          } else {
            return 1
          }
        },
        defaultSortOrder: 'ascend'
      }
    ]

    let setTableData = async (table: ITableDefinition) => {
      loading.value = true
      let data = (await http.request('DataSource/getData', {
        language: language.value,
        tables: [table],
        connector: props.modelValue.connector
      })) as any
      loading.value = false
      table.rows = data[0]
      return data[0]
    }

    let selectedTable: Ref<any> = ref(null)
    let requested: any = []

    let requestTableData = (table: ITableDefinition) => {
      if (!table.rows) {
        setTableData(table)
        // 已查看可能会更新数据
        if (requested.indexOf(table.name) < 0) {
          requested.push(table.name)
        }
      }
    }

    let tabSelectedKey = ref('1')
    let tabSeletedChange = () => {
      if (selectedTable.value && tabSelectedKey.value == '2') {
        requestTableData(selectedTable.value)
      }
    }
    const customRow = (record: any) => {
      return {
        onClick: async () => {
          if (record.useSourceCode && !record.sourceCode) {
            tabSelectedKey.value = '3'
          } else {
            if (tabSelectedKey.value == '3') {
              tabSelectedKey.value = '1'
            }
            requestTableData(record)
          }
          selectedTable.value = record
        }
      }
    }
    let rowClassName = (record: any, index: number) => {
      if (record == selectedTable.value) {
        return 'c-row-selected'
      }
    }

    let checkSameNameTableInOtherConnector = () => {
      return new Promise((resolve) => {
        let removedTables: Array<any> = []
        let updatedTables: Array<any> = []
        let addedTables: Array<any> = []
        let sameNameTables: Array<any> = []
        let result: any = {removedTables, addedTables, updatedTables}
        for (let t of tables.value) {
          let existTable = null
          let sameNameTable = null
          for (let table of state.pkg.definition.tables) {
            if (table.connectorId == connectorId) {
              if (table.name == t.name) {
                existTable = table
                break
              }
            }
            if (table.name == t.name && table.connectorId != connectorId) {
              sameNameTable = table
            }
          }

          if (
            rowSelection.selectedRowKeys.indexOf(t.name) >= 0 // 选中
          ) {
            if (existTable) {
              updatedTables.push([existTable, t])
            } else {
              if (sameNameTable) {
                sameNameTables.push([sameNameTable, t])
              } else {
                addedTables.push(t)
              }
            }
          } else {
            if (existTable) {
              // 原有表格，被取消选择，移除表格
              removedTables.push(existTable)
            }
          }
        }

        if (sameNameTables.length > 0) {
          // 存在重名的表格，并且该表格在其他的数据源中，此时需用户确认是否覆盖原表， 原表将从旧数据源移到新数据源并更新
          let sameNames = ''
          for (let t of sameNameTables) {
            sameNames += t[0].name + ','
          }
          sameNames = sameNames.substring(0, sameNames.length - 1)
          Modal.confirm({
            title: `存在重名的表格 [${sameNames}] ，并且该表格在其他的数据源中,请确认是否覆盖原表格`,
            icon: '',
            content: '',
            okText: '确认',
            cancelText: '取消',
            onOk() {
              for (let t of sameNameTables) {
                updatedTables.push(t)
              }
              resolve(result)
            },
            onCancel() {
              for (let t of sameNameTables) {
                addedTables.push(t[1])
              }
              resolve(result)
            }
          })
        } else {
          resolve(result)
        }
      })
    }

    let onSubmit = async () => {
      let result: any = await checkSameNameTableInOtherConnector()
      for (let t of result.removedTables) {
        state.pkg.removeTable(t)
      }
      for (let t of result.addedTables) {
        const visibilityColumns: any = []
        t.columns.forEach((column: any) => {
          if (selectedColumns.value[t.name][column.name]) {
            visibilityColumns.push(column)
          }
        })
        t.columns = visibilityColumns
        t.connectorId = connectorId
        state.pkg.addTable(t)
      }
      for (let tArr of result.updatedTables) {
        let t = tArr[1]
        let existTable = tArr[0]
        const visibilityColumns: any = []
        t.columns.forEach((column: any) => {
          if (selectedColumns.value[t.name][column.name]) {
            visibilityColumns.push(column)
          }
        })
        t.columns = visibilityColumns
        t.connectorId = connectorId
        existTable.connectorId = connectorId
        if (requested.indexOf(t.name) >= 0) {
          existTable.rows = t.rows
        } else {
          // 表格数据没有重新请求过，保存原状
        }
        for (let col of t.columns) {
          let existCol: IColumnDefinition | null = null
          for (let ecol of existTable.columns) {
            if (col.name == ecol.name) {
              existCol = ecol
              break
            }
          }
          if (!existCol) {
            state.pkg.addColumn(existTable, col)
          }
        }
        for (let ecol of existTable.columns) {
          let has = false
          for (let col of t.columns) {
            if (col.name == ecol.name) {
              has = true
            }
          }
          if (!has) {
            // 删除列
            state.pkg.removeColumn(existTable, ecol)
          }
        }
      }

      try {
        state.loading = true
        state.loaded = false
        await state.pkg.loadData(language.value, false)
        emit('submit', true)
        state.loading = false
      } catch (e) {
        console.error(e)
        message.error(e)
        state.loading = false
      }
      state.loaded = true
    }

    let newTableName = () => {
      let hasSame = true
      while (hasSame) {
        hasSame = false
        let n = '自定义表' + Util.sequence()
        for (let t of tables.value) {
          if (n == t.name) {
            hasSame = true
            break
          }
        }
        return n
      }
    }

    let sourceCodeTableError = ref('')
    let checkTableName = (e: Event) => {
      let hasSame = false
      let v = (e.target as any).value
      for (let t of tables.value) {
        if (v == t.name) {
          hasSame = true
          break
        }
      }
      if (hasSame || !v) {
        sourceCodeTableError.value = '表名称有重名且不能为空'
      } else {
        sourceCodeTableError.value = ''
        let oldName = selectedTable.value.name
        selectedTable.value.name = v
        resetTableSelectColumns(selectedTable.value, oldName)
      }
    }

    let resetTableSelectColumns = (
      table: ITableDefinition,
      oldName: string
    ) => {
      if (oldName && oldName != table.name) {
        delete selectedColumns.value[oldName]
        if (rowSelection.selectedRowKeys.indexOf(oldName)) {
          rowSelection.selectedRowKeys[
            rowSelection.selectedRowKeys.indexOf(oldName)
          ] = table.name
        }
      }
      selectedColumns.value[table.name] = {}
      for (let c of table.columns) {
        selectedColumns.value[table.name][c.name] = true
      }
    }

    let newSourceCodeTable = () => {
      let table = {
        id: Util.uniqueId(),
        name: newTableName(),
        alias: '',
        useSourceCode: true,
        sourceCode: '',
        columns: [],
        connectorId: connectorId,
        isFormula: false,
        rows: undefined
      } as ITableDefinition
      tables.value.push(table)
      selectedTable.value = table
      tabSelectedKey.value = '3'
      resetTableSelectColumns(table, '')
      rowSelection.selectedRowKeys.push(table.name)
    }

    let requestSourceCodeData = async () => {
      let data = await setTableData(selectedTable.value)
      if (data && data.length > 0) {
        let t = DataSourceHelper.getTableDefinitionFromObject(data[0])
        selectedTable.value.columns.length = 0
        for (let c of t.columns) {
          selectedTable.value.columns.push(c)
        }
        resetTableSelectColumns(selectedTable.value, '')
        message.success('验证通过')
      } else {
        message.error('未能获取到数据')
      }
    }

    let editDataSource = () => {
      emit('edit')
    }

    return {
      visible,
      i18n,
      tables,
      loading,
      selectedTable,
      onSubmit,
      columns,
      customRow,
      rowClassName,
      computedSelection,
      selectedColumns,
      newSourceCodeTable,
      requestSourceCodeData,
      tabSelectedKey,
      tabSeletedChange,
      sourceCodeTableError,
      checkTableName,
      editDataSource
    }
  }
})
</script>

<style lang="less">
.c-select-table-drawer {
  .ant-drawer-wrapper-body {
    overflow: hidden;
  }
  .ant-tabs-bar.ant-tabs-top-bar {
    margin-bottom: 0px;
  }
}

.c-select-tables {
  width: 100%;
  height: 100%;

  .ant-tabs {
    height: 100%;
  }
  .ant-tabs .ant-tabs-top-content.ant-tabs-content-animated,
  .ant-tabs .ant-tabs-bottom-content.ant-tabs-content-animated {
    height: 100%;
  }
  .c-select-actions {
    margin-bottom: 10px;
    .ant-btn {
      margin-right: 10px;
    }
  }
  .c-source-code-form-error {
    color: var(--error-color);
  }

  .c-layouts {
    width: 100%;
    height: 100%;
    padding-bottom: 100px;
    .ant-table colgroup > col.ant-table-selection-col {
      width: 46px;
    }
    .ant-table table > .ant-table-tbody > tr > td {
      white-space: nowrap;
      padding: 4px !important;
      cursor: pointer;
    }
    .ant-table table > .ant-table-thead > tr > th {
      padding: 4px !important;
      cursor: pointer;
    }
    .c-row-selected {
      background-color: var(--primary-color);
      td {
        background-color: var(--primary-color) !important;
        color: white;
      }
    }
    .c-layout-left {
      display: inline-block;
      width: 25%;
      height: 100%;
      overflow-y: auto;
      border: 1px solid var(--border-color-base);
    }
    .c-layout-right {
      float: right;
      width: 74%;
      height: 100%;
      border: 1px solid var(--border-color-base);
    }
  }
}
</style>
