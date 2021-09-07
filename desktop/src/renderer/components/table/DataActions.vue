<template>
  <div class="c-data-actions">
    <a-collapse v-model:activeKey="activeKey">
      <a-collapse-panel v-if="state.selectedTable" key="1" header="表格">
        <div class="c-action">
          <a-button type="primary" @click="createTable()" block size="small">
            新建表
          </a-button>
        </div>

        <div class="c-action">
          <a-button type="primary" @click="createColumn()" block size="small">
            新建栏目
          </a-button>
        </div>
        <div class="c-action">
          <a-button type="danger" @click="removeTable()" block size="small">
            删除表
          </a-button>
        </div>
        <div class="c-action">
          <div>名称</div>
          <div>
            <input
              class="ant-input ant-input-sm"
              @change="change(state.selectedTable, 'rename_table')"
              size="small"
              v-model="tableName"
            />
          </div>
        </div>
      </a-collapse-panel>
      <a-collapse-panel v-if="state.selectedColumn" key="2" header="栏目">
        <div class="c-action">
          <a-button
            v-if="
              state.selectedTable.columns.indexOf(state.selectedColumn) <
              state.selectedTable.columns.length - 1
            "
            type="primary"
            @click="downColumn()"
            block
            size="small"
          >
            下移栏目
          </a-button>
        </div>
        <div class="c-action">
          <a-button type="danger" @click="removeColumn()" block size="small">
            删除栏目
          </a-button>
        </div>
        <div class="c-action">
          <div>名称</div>
          <div>
            <input
              class="ant-input ant-input-sm"
              :disabled="
                state.selectedTable.formula && !state.selectedColumn.formula
              "
              @change="change(state.selectedColumn, 'rename_column')"
              v-model="columnName"
            />
          </div>
        </div>
        <div class="c-action">
          <div>值类型</div>
          <div>
            <a-select
              size="small"
              @change="change(state.selectedColumn, 'edit_column_type')"
              :dropdown-match-select-width="false"
              v-model:value="state.selectedColumn.type"
            >
              <a-select-option :value="0">未定义</a-select-option>
              <a-select-option :value="1">文本</a-select-option>
              <a-select-option :value="2">数字</a-select-option>
              <a-select-option :value="3">是/否</a-select-option>
              <a-select-option :value="4">日期</a-select-option>
            </a-select>
          </div>
        </div>
        <div class="c-action">
          <div>汇总方式</div>
          <div>
            <a-select
              size="small"
              :dropdown-match-select-width="false"
              @change="change(state.selectedColumn, 'edit_column_mergeType')"
              v-model:value="state.selectedColumn.mergeType"
            >
              <a-select-option value="none">不汇总</a-select-option>
              <a-select-option value="count">计数</a-select-option>
              <a-select-option value="sum">求和</a-select-option>
              <a-select-option value="min">最小值</a-select-option>
              <a-select-option value="max">最大值</a-select-option>
            </a-select>
          </div>
        </div>
        <div class="c-action">
          <div>排序</div>
          <div>
            <a-select
              size="small"
              :dropdown-match-select-width="false"
              @change="change(state.selectedColumn, 'edit_column_orderBy')"
              v-model:value="state.selectedColumn.orderBy"
            >
              <a-select-option value="">不排序</a-select-option>
              <a-select-option value="asc">正序</a-select-option>
              <a-select-option value="desc">倒序</a-select-option>
            </a-select>
          </div>
        </div>
        <div class="c-action">
          <div>格式化</div>
          <div>
            <FormatterSelect
              @change="change(state.selectedColumn, 'edit_column_formatter')"
              v-model="state.selectedColumn.formatter"
            />
          </div>
        </div>
      </a-collapse-panel>

      <a-collapse-panel key="3" header="公式" v-if="isFormula()">
        <div class="c-field-item c-global-filter">
          <FormulaEditor></FormulaEditor>
        </div>
      </a-collapse-panel>
      <a-collapse-panel key="4" header="过滤">
        <div class="c-field-item c-global-filter">
          <FieldFilter
            scope="table"
            @change="change(state.selectedColumn, 'edit_column_filter')"
            v-model="filters"
            :disable-dropable="true"
          ></FieldFilter>
        </div>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  reactive,
  watchEffect,
  computed,
  watch
} from 'vue'
import {useI18n, useState, useLanguage} from '../../use/state'
import http from '../../use/http'
import FieldFilter from '../control/FieldFilter.vue'
import FormatterSelect from '../control/FormatterSelect.vue'
import {
  ColumnType,
  DataMergeType,
  FilterExpression,
  FilterType,
  IColumnDefinition,
  IFilterInfo,
  ITableDefinition,
  Util
} from '@datahu/core'
import {message, Modal} from 'ant-design-vue'
import CodeEditor from '../control/CodeEditor.vue'
import FormulaEditor from './FormulaEditor.vue'

export default defineComponent({
  name: 'DataActions',
  components: {FieldFilter, FormulaEditor, FormatterSelect},
  props: ['connector', 'table'],
  setup(props: any) {
    let i18n = useI18n()
    let state = useState()
    let language = useLanguage()
    let activeKey = ref(['1', '2', '3', '4'])

    let changedTableName = ''
    let tableName = computed({
      get() {
        if (state.selectedTable) {
          return (
            changedTableName ||
            state.selectedTable.alias ||
            state.selectedTable.name
          )
        }
      },
      set(v: any) {
        if (state.selectedTable) {
          changedTableName = v
        }
      }
    })

    let changeColumnName = ''
    let columnName = computed({
      get() {
        if (state.selectedColumn) {
          return (
            changeColumnName ||
            state.selectedColumn.alias ||
            state.selectedColumn.name
          )
        }
      },
      set(v: any) {
        if (state.selectedColumn) changeColumnName = v
      }
    })

    let defaultfilters: Array<IFilterInfo> = []
    let getFilters = (table: ITableDefinition, column: IColumnDefinition) => {
      if (column && column.filters && column.filters.length > 0) {
        defaultfilters = column.filters
      } else {
        defaultfilters = [
          {
            field: {
              columnId: column.id,
              tableId: table.id,
              mergeType: DataMergeType.none
            },
            enabled: true,
            mergeExpression: FilterExpression.and,
            filterType: FilterType.basic,
            conditions: [],
            values: [],
            code: ''
          }
        ]
      }
      return defaultfilters
    }

    let filters = computed({
      get() {
        if (state.selectedColumn) {
          return getFilters(state.selectedTable!, state.selectedColumn!)
        }
      },
      set(v: any) {}
    })

    let change = (item: any, action: string) => {
      if (action == 'rename_table') {
        state.pkg.renameTable(item, changedTableName)
        changedTableName = ''
      } else if (action == 'rename_column') {
        state.pkg.renameColumn(state.selectedTable!, item, changeColumnName)
        changeColumnName = ''
      } else if (action == 'edit_column_type') {
        state.pkg.editColumnType(state.selectedTable!, item)
      } else if (
        action == 'edit_column_mergeType' ||
        action == 'edit_column_formatter'
      ) {
        state.pkg.editColumnWithoutUpdateData(
          state.selectedTable!,
          item,
          action
        )
      } else if (action == 'edit_column_filter') {
        if (state.selectedColumn?.filters != defaultfilters) {
          state.selectedColumn!.filters = defaultfilters
        }
        state.pkg.editColumnFilter(state.selectedTable!, item)
      } else if (action == 'edit_column_orderBy') {
        state.pkg.editColumnOrderBy(state.selectedTable!, item)
      }
    }

    let isFormula = () => {
      if (state.selectedColumn) {
        return state.selectedColumn.formula || state.selectedColumn.isFormula
      } else if (state.selectedTable) {
        return state.selectedTable.formula || state.selectedTable.isFormula
      }
      return false
    }

    let createTable = () => {
      let i = 1
      let name = '表格' + i
      while (true) {
        let has = false
        for (let table of state.pkg.definition.tables) {
          let n = table.alias || table.name
          if (n == name) {
            has = true
            break
          }
        }
        if (!has) {
          break
        } else {
          i++
          name = '表格' + i
        }
      }
      let newTable: ITableDefinition = {
        id: '',
        name: name,
        alias: '',
        columns: [],
        useSourceCode: false,
        connectorId: '',
        rows: [],
        formula: `[{ '栏目1': 1 }]`,
        isFormula: true
      }
      state.pkg.addTable(newTable)
      state.selectedTable = newTable
      state.selectedColumn = undefined
    }

    let resetFormulaTable = (table: ITableDefinition) => {}

    let createColumn = () => {
      let i = 1
      let name = '栏目' + i
      while (true) {
        let has = false
        for (let col of state.selectedTable!.columns) {
          let n = col.alias || col.name
          if (n == name) {
            has = true
            break
          }
        }
        if (!has) {
          break
        } else {
          i++
          name = '栏目' + i
        }
      }

      let newCol: IColumnDefinition = {
        id: '',
        name: name,
        type: ColumnType.Any,
        mergeType: DataMergeType.none,
        formatter: '',
        alias: '',
        formula: `row['name']`,
        isFormula: true,
        filters: []
      }

      state.pkg.addColumn(state.selectedTable!, newCol)
      state.selectedColumn = newCol
    }

    let removeTable = () => {
      Modal.confirm({
        title: '删除确认',
        icon: '',
        content: '请确认是否继续',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          state.pkg.removeTable(state.selectedTable!)
          if (state.pkg.definition.tables.length > 0) {
            state.selectedTable = state.pkg.definition.tables[0]
          } else {
            state.selectedTable = undefined
          }
        }
      })
    }

    let removeColumn = () => {
      Modal.confirm({
        title: '删除确认',
        icon: '',
        content: '请确认是否继续',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          state.pkg.removeColumn(state.selectedTable!, state.selectedColumn!)
          state.selectedColumn = undefined
        }
      })
    }

    let downColumn = () => {
      state.pkg.downColumn(state.selectedTable!, state.selectedColumn!)
    }

    return {
      state,
      activeKey,
      filters,
      tableName,
      columnName,
      change,
      changedTableName,
      isFormula,
      createColumn,
      createTable,
      removeTable,
      removeColumn,
      downColumn
    }
  }
})
</script>

<style lang="less">
.c-data-actions {
  .c-action {
    margin: 5px 0px;
    .ant-select {
      width: 100%;
    }
  }
  .ant-collapse-content .ant-collapse-content-active {
    height: 100%;
  }
  .ant-collapse-content-box {
    overflow-y: auto;
  }
}
</style>
