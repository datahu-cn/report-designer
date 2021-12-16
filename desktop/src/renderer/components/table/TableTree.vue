<template>
  <div class="c-table-tree">
    <!-- <div class="c-table-header">表格</div> -->
    <div
      v-for="table in tables"
      :key="table.name"
      class="c-tables"
      :class="{'c-selected': table == state.selectedTable}"
    >
      <div
        class="c-table-name"
        @click="tableClick(table)"
        :title="table.alias ? table.alias + '[' + table.name + ']' : table.name"
        :class="{
          'c-hover-field-table': hoverField && hoverField.tableId == table.id
        }"
      >
        <icon type="table" />
        {{ table.alias || table.name }}
        <a-dropdown :trigger="['click']" class="c-dropdown">
          <a class="ant-dropdown-link" @click.prevent>
            <icon type="alignDown" />
          </a>
          <template #overlay>
            <a-menu class="c-dropdown-menu">
              <a-menu-item>
                <a
                  href="javascript:;"
                  @click="menuClick(table, 'table_rename')"
                >
                  重命名
                </a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;" @click="menuClick(table, 'add_column')">
                  新建字段
                </a>
              </a-menu-item>
              <a-menu-item>
                <a
                  href="javascript:;"
                  @click="menuClick(table, 'remove_table')"
                >
                  删除表格
                </a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>

      <div v-if="table == expandTable" class="c-columns">
        <div
          class="c-column-item"
          v-for="column in table.columns"
          :key="column.name"
          :title="
            column.alias ? column.alias + '[' + column.name + ']' : column.name
          "
          :class="{
            'c-selected': column == state.selectedColumn,
            'c-hover-field': hoverField && hoverField.columnId == column.id
          }"
        >
          <span
            draggable="true"
            @click="columnClick(table, column)"
            @dragend="dragendHandle"
            @dragstart="dragstartHandle(table, column)"
          >
            <icon :type="getColumnIcon(column)" />
            {{ column.alias || column.name }}
          </span>
          <a-dropdown :trigger="['click']" class="c-dropdown">
            <a class="ant-dropdown-link" @click.prevent>
              <icon type="alignDown" />
            </a>
            <template #overlay>
              <a-menu class="c-dropdown-menu">
                <a-menu-item>
                  <a
                    href="javascript:;"
                    @click="menuClick(column, 'edit_column', table)"
                  >
                    编辑字段
                  </a>
                </a-menu-item>
                <a-menu-item>
                  <a
                    href="javascript:;"
                    @click="menuClick(column, 'remove_column', table)"
                  >
                    删除字段
                  </a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>
    </div>
    <a-modal
      v-model:visible="modal.visible"
      :title="modal.title"
      @ok="modal.handleOk"
    >
      <div class="c-modal-content">
        <div v-if="modal.key == 'table_rename'">
          <div class="c-field">
            <a-input prefix="名称:" v-model:value="modal.value"></a-input>
          </div>
        </div>

        <div v-if="modal.key == 'add_column' || modal.key == 'edit_column'">
          <div class="c-field">
            <a-input prefix="名称:" v-model:value="modal.value.alias"></a-input>
          </div>
          <div
            v-if="modal.key == 'add_column' || modal.arg.formula"
            class="c-field"
          >
            <CodeEditor v-model="modal.value.formula"></CodeEditor>
          </div>
        </div>
        <a-alert
          v-if="modal.error"
          :message="modal.error"
          type="error"
          show-icon
        />
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
  Ref
} from 'vue'
import {getColumnIcon} from '../common/icon/Icons'
import {useI18n, useLanguage, useState, DragTargetType} from '../../use/state'
import {
  TableOutlined,
  CaretDownOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons-vue'
import http from '../../use/http'
import {message, Modal} from 'ant-design-vue'
import CodeEditor from '../control/CodeEditor.vue'
import {
  DataMergeType,
  IColumnDefinition,
  ITableDefinition,
  Util
} from '@datahu/core'
export default defineComponent({
  name: 'TableTree',
  components: {CodeEditor},
  props: ['modelValue', 'hoverField'],
  setup(props, {emit}) {
    onMounted(async () => {})

    let state = useState()
    let expandTable = ref(null)

    let tables = state.pkg.definition.tables
    if (tables.length > 0) {
      state.selectedTable = tables[0]
      state.selectedColumn = undefined
    }

    let tableClick = (t: any) => {
      if (state.selectedTable != t) {
        state.selectedTable = t
      }
      state.selectedColumn = undefined

      if (expandTable.value == t) {
        expandTable.value = null
      } else {
        expandTable.value = t
      }
    }

    let columnClick = (table: ITableDefinition, column: IColumnDefinition) => {
      state.selectedColumn = column
    }

    let modal = reactive({
      title: '',
      key: '',
      table: null,
      arg: null as any,
      visible: false,
      value: null as any,
      error: '',
      handleOk() {
        if (modal.key == 'table_rename') {
          if (!modal.value) {
            modal.error = '不能为空'
            return
          }
          modal.error = ''
          state.pkg.renameTable(modal.arg!, modal.value!)
          modal.visible = false
        } else if (modal.key == 'add_column') {
          if (!modal.value!.alias || !modal.value!.formula) {
            modal.error = '不能为空'
            return
          }
          modal.error = ''
          state.pkg.addColumn(modal.arg!, modal.value)
          modal.visible = false
        } else if (modal.key == 'edit_column') {
          if (modal.arg!.formula) {
            if (!modal.value!.alias || !modal.value!.formula) {
              modal.error = '不能为空'
              return
            }
          } else {
            if (!modal.value!.alias) {
              modal.error = '不能为空'
              return
            }
          }

          state.pkg.editColumn(modal.table!, modal.arg!, modal.value!)
          modal.visible = false
        }
      }
    })

    let menuClick = (arg: any, key: string, table: ITableDefinition) => {
      modal.error = ''
      modal.table = table as any
      if (key == 'table_rename') {
        modal.title = '重命名'
        modal.key = key
        modal.value = arg.alias || arg.name
        modal.arg = arg
        modal.visible = true
      } else if (key == 'add_column') {
        modal.title = '新建字段'
        modal.key = key
        modal.value = {name: Util.uniqueId(), alias: '列1', formula: ''} as any
        modal.arg = arg
        modal.visible = true
      } else if (key == 'edit_column') {
        modal.title = '编辑字段'
        modal.key = key
        modal.value = {
          alias: arg.alias || arg.name,
          formula: arg.formula
        } as any
        modal.arg = arg
        modal.visible = true
      } else if (key == 'remove_table') {
        Modal.confirm({
          title: '删除确认',
          icon: '',
          content: '请确认是否继续',
          okText: '确认',
          cancelText: '取消',
          onOk() {
            state.pkg.removeTable(arg)
            if (state.selectedTable == arg && tables.length > 0) {
              tableClick(tables[0])
            }
          }
        })
      } else if (key == 'remove_column') {
        Modal.confirm({
          title: '删除确认',
          icon: '',
          content: '请确认是否继续',
          okText: '确认',
          cancelText: '取消',
          onOk() {
            state.pkg.removeColumn(table, arg)
          }
        })
      }
    }

    let dragendHandle = () => {
      state.dragContext.target = null
    }

    let dragstartHandle = (
      table: ITableDefinition,
      column: IColumnDefinition
    ) => {
      state.dragContext.target = {
        tableId: table.id,
        columnId: column.id,
        mergeType: column.mergeType || DataMergeType.none,
        formatter: column.formatter
      }
      state.dragContext.type = DragTargetType.column
    }

    return {
      tables,
      state,
      tableClick,
      menuClick,
      modal,
      getColumnIcon,
      dragendHandle,
      dragstartHandle,
      columnClick,
      expandTable
    }
  }
})
</script>

<style lang="less">
.c-table-tree {
  height: 100%;
  line-height: 22px;
  white-space: nowrap;
  text-overflow: ellipsis;
  .c-icon {
    vertical-align: middle;
    display: inline-block;
    width: 19px;
    height: 19px;
  }
  .c-table-header {
    padding: 4px 8px;
    font-weight: bold;
  }
  .c-tables {
    transition: max-height 1s;
    overflow: overlay;
    cursor: pointer;
    text-overflow: ellipsis;

    .c-table-name {
      padding: 4px 20px 4px 8px;
      margin: 5px 0px;
      position: relative;
      text-overflow: ellipsis;
      overflow: hidden;
      &.c-hover-field-table {
        color: var(--primary-color);
        svg {
          fill: var(--primary-color);
        }
      }
      &:hover {
        background-color: var(--light-primary-color);
        .c-dropdown {
          display: inline-block;
        }
      }
    }
    .c-columns {
      overflow: overlay;
      .c-column-item {
        margin: 5px 0px;
        padding: 4px 16px 4px 16px;
        &.c-hover-field {
          background-color: var(--light-primary-color);
          border-radius: 18px;
        }
        &:hover {
          background-color: var(--primary-color);
          color: white;
          fill: white;
          border-radius: 18px;
          .c-dropdown {
            display: inline-block;
          }
          .c-icon {
            fill: white;
          }
        }
        &.c-selected {
          color: var(--select-color);
          svg {
            fill: var(--select-color);
          }
        }
        > span {
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }
    }

    .c-dropdown {
      display: none;
      position: absolute;
      right: 3px;
      width: 22px;
      height: 22px;
      text-align: center;
      border-radius: var(--border-radius-base);
      color: white;

      svg {
        width: 15px;
        height: 15px;
      }
    }

    &.c-selected {
      max-height: 1000px;
      .c-table-name {
        &:hover {
          color: var(--select-color);
        }
        color: var(--select-color);

        svg {
          fill: var(--select-color);
        }
      }
    }
  }
}
.c-modal-content {
  .c-field {
    margin: 10px;
  }
  .ant-alert {
    margin: 10px;
  }
}
</style>
