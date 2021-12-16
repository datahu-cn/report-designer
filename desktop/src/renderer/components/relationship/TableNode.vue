<template>
  <DragResize
    class="c-table-node"
    unit="px"
    :w="node.table.position.width"
    :h="node.table.position.height"
    :x="node.table.position.left"
    :y="node.table.position.top"
    :z="100"
    :enable-native-drag="true"
    :parent="true"
    :isConflictCheck="false"
    :drag-cancel="'.drag-cancel'"
    :snap="true"
    v-model:active="isActive"
    :prevent-deactivation="true"
    :snapTolerance="1"
    @size-change="sizeChange($event)"
    @refLineParams="getRefLineParams"
    ref="el"
  >
    <div class="c-table-node-container">
      <div class="c-table-header">
        <icon type="table" />
        {{ node.table.alias || node.table.name }}
      </div>
      <div class="c-table-columns drag-cancel" :class="{'c-candrop': canDrop}">
        <div
          class="c-column-item"
          :class="{
            'c-selected': columnFocused(column),
            'c-dragover': isDragover(column)
          }"
          v-for="column in node.table.columns"
          :key="column.id"
          draggable="true"
          @dragend="dragendHandle"
          @dragstart="dragstartHandle(node.table, column)"
          @drop="dropHandle($event, column)"
          @dragover="dragoverHandle($event, column)"
          @dragleave="dragleave($event)"
        >
          <span>
            <icon :type="getColumnIcon(column)" />
            {{ column.alias || column.name }}
          </span>
        </div>
      </div>
    </div>
  </DragResize>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  defineEmit,
  onMounted,
  reactive,
  ref,
  Ref,
  nextTick
} from 'vue'
import {useI18n, useState, DragTargetType} from '../../use/state'
import http from '../../use/http'
import Field from '../control/Field.vue'
import Form from '../control/Form.vue'
import {config} from 'process'
import Table from '../../views/Table.vue'
import {MinusCircleOutlined} from '@ant-design/icons-vue'
import {
  DataMergeType,
  IColumnDefinition,
  IRelationshipDefinition,
  ITableDefinition,
  RelationshipType
} from '@datahu/core'
import DragResize from '../common/DragResize.vue'
import {getColumnIcon} from '../common/icon/Icons'
import {message} from 'ant-design-vue'
export default defineComponent({
  name: 'TableNode',
  components: {Field, DragResize},
  props: ['node', 'resizeData', 'focusedLine'],
  setup(props: any, {emit}) {
    let i18n = useI18n()
    let state = useState()

    let isActive = computed({
      get() {
        return state.selectedTable == props.node.table
      },
      set(v) {
        if (v) {
          state.selectedTable = props.node.table
        }
      }
    })

    // 窗体大小变化时，百分比计算值有微小变化，但此时应不算修改变更
    let minNumber = 0.0000001
    let sizeChange = (pos: any) => {
      if (
        Math.abs(props.node.table.position.width - pos.px.width) > minNumber ||
        Math.abs(props.node.table.position.height - pos.px.height) >
          minNumber ||
        Math.abs(props.node.table.position.left - pos.px.left) > minNumber ||
        Math.abs(props.node.table.position.top - pos.px.top) > minNumber
      ) {
        props.node.table.position.width = pos.px.width
        props.node.table.position.height = pos.px.height
        props.node.table.position.left = pos.px.left
        props.node.table.position.top = pos.px.top
        state.pkg.updateTablePosition(props.node.table)
        emit('sizeChange', props.node)
      }
    }

    // 辅助线回调事件
    let getRefLineParams = (params: any) => {
      if (props.resizeData) {
        const {vLine, hLine} = params
        let id = 0
        props.resizeData.vLine = vLine.map((item: any) => {
          item['id'] = ++id
          return item
        })
        props.resizeData.hLine = hLine.map((item: any) => {
          item['id'] = ++id
          return item
        })
      }
    }

    let el = ref(null)
    onMounted(async () => {
      nextTick(() => {
        props.node.component = el.value
        emit('nodeMounted', props.node)
      })
    })

    let columnFocused = (column: IColumnDefinition) => {
      return (
        props.focusedLine &&
        props.focusedLine.relationship &&
        (props.focusedLine.relationship.from[1] == column.id ||
          props.focusedLine.relationship.to[1] == column.id)
      )
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
        mergeType: DataMergeType.none
      }
      state.dragContext.type = DragTargetType.column
    }

    let canDrop = computed(() => {
      return (
        state.dragContext.type == DragTargetType.column &&
        state.dragContext.target &&
        state.dragContext.target.tableId != props.node.table.id
      )
    })

    let isDragover = (column: IColumnDefinition): boolean => {
      return canDrop.value && state.dragContext.dropTarget === column
    }

    let dragleave = (e: MouseEvent) => {
      state.dragContext.dropTarget = null
      e.preventDefault()
    }
    let dragoverHandle = (e: MouseEvent, column: IColumnDefinition) => {
      if (state.dragContext.dropTarget != column) {
        state.dragContext.dropTarget = column
      }
      e.preventDefault()
    }

    let dropHandle = (e: MouseEvent, column: IColumnDefinition) => {
      if (state.dragContext.target && isDragover(column)) {
        let relation: IRelationshipDefinition = {
          from: [
            state.dragContext.target.tableId,
            state.dragContext.target.columnId
          ],
          to: [props.node.table.id, column.id],
          type: RelationshipType.OneWay
        }
        let relations = []
        for (let r of state.pkg.definition.relationships) {
          relations.push(r)
        }
        relations.push(relation)
        let result = state.pkg.checkRelations(relations)
        if (result) {
          message.error('关系中有循环冲突，不能关联')
        } else {
          state.pkg.updateRelations(relations)
        }
      }
      state.dragContext.dropTarget = null
    }

    return {
      i18n,
      isActive,
      sizeChange,
      getRefLineParams,
      el,
      getColumnIcon,
      columnFocused,
      dragstartHandle,
      dragendHandle,
      canDrop,
      isDragover,
      dragleave,
      dragoverHandle,
      dropHandle
    }
  }
})
</script>

<style lang="less">
.c-table-node {
  min-height: 30px;
  min-width: 30px;
  border: 1px solid var(--border-color-base);
  background-color: white;

  .c-icon {
    vertical-align: middle;
    display: inline-block;
    // fill: var(--primary-color);
    width: 19px;
    height: 19px;
  }
  .c-table-node-container {
    height: 100%;
    overflow: hidden;
  }
  .c-table-header {
    padding: 4px 20px 4px 8px;
    cursor: move;
    text-overflow: ellipsis;
    overflow: hidden;
    background-color: #fafafa;
    border-right: 3px solid transparent;
    border-bottom: 1px solid var(--border-color-base);
    &:hover {
      .c-dropdown {
        display: inline-block;
      }
    }
  }
  .c-table-columns {
    overflow: overlay;
    height: calc(100% - 32px);
    .c-column-item {
      padding: 4px 16px 4px 16px;
      background-color: white;
      border-bottom: 1px solid transparent;
      border-top: 1px solid transparent;
      cursor: move;
      &:hover {
        background-color: var(--table-row-hover-bg);
        .c-dropdown {
          display: inline-block;
        }
      }
      &.c-selected {
        background-color: var(--select-background-color);
        color: var(--select-color);
        border-bottom-color: var(--select-color);
        border-top-color: var(--select-color);
        svg {
          fill: var(--select-color);
        }
      }

      &.c-dragover {
        background-color: var(--light-warning-color);
      }
    }

    &.c-candrop {
      border: 1px solid var(--warning-color);
    }
  }
}
</style>
