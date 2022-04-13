<template>
  <div class="c-field-filter">
    <div
      @drop.stop="dropHandle()"
      @dragover.stop="dragoverHandle($event)"
      @dragleave.stop="dragleave($event)"
      :class="{'c-dragover': isDragover, 'c-candrop': canDrop}"
    >
      <div class="c-droped-fields">
        <template
          v-for="(filter, index) in modelValue"
          :key="filter.field.columnId"
        >
          <FilterItem
            v-if="filter.filterType != 'role'"
            class="c-filter-item"
            :scope="scope"
            @dragstart="dragstartHandle(filter)"
            @dragend="dragendHandle"
            @drop.stop="dropHandle(index)"
            :filter="filter"
            @remove="remove(filter)"
            @change="change(filter)"
          ></FilterItem>
        </template>
      </div>
      <div v-if="!disableDropable" class="c-drop-placeholder">
        <icon type="plus" />
        拖拽栏目到此处
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, computed, ref, onMounted} from 'vue'
import {useI18n, useState, DragTargetType} from '../../use/state'
import {
  DataMergeType,
  FilterExpression,
  FilterType,
  IFieldInfo,
  IFilterInfo,
  Util
} from '@datahu/core'
import FilterItem from './FilterItem.vue'
export default defineComponent({
  name: 'FieldFilter',
  components: {FilterItem},
  props: ['modelValue', 'disabled', 'size', 'scope', 'disableDropable'],
  setup(props: any, {emit}) {
    let i18n = useI18n()
    let state = useState()

    let dropHandle = (index: number) => {
      let dragField = state.dragContext.target
      if (state.dragContext.type == DragTargetType.filter) {
        dragField = state.dragContext.target.field
      }

      if (dragField && isDragover.value) {
        if (props.modelValue.indexOf(state.dragContext.target) < 0) {
          let has = false
          for (let item of props.modelValue) {
            if (
              item.field.tableId == dragField.tableId &&
              item.field.columnId == dragField.columnId
            ) {
              has = true
              break
            }
          }
          if (!has) {
            let filter: IFilterInfo = {
              field: dragField,
              enabled: true,
              mergeExpression: FilterExpression.and,
              filterType: FilterType.basic,
              conditions: [],
              values: [],
              code: ''
            }
            if (index != undefined) {
              props.modelValue.splice(index, 0, filter)
            } else {
              props.modelValue.push(filter)
            }
            emit('change', props.modelValue)
          }
        } else {
          // 调整栏目顺序
          if (props.modelValue.length > 1) {
            let dragIndex = props.modelValue.indexOf(state.dragContext.target)
            // 数值元素对换
            if (index == undefined) {
              props.modelValue.splice(dragIndex, 1)
              props.modelValue.push(state.dragContext.target)
            } else if (dragIndex != index) {
              let indexField = props.modelValue[index]
              props.modelValue[index] = state.dragContext.target
              props.modelValue[dragIndex] = indexField
            }
          }
        }
      }
      state.dragContext.dropTarget = null
    }

    let canDrop = computed(() => {
      return (
        (state.dragContext.type == DragTargetType.field ||
          state.dragContext.type == DragTargetType.column ||
          state.dragContext.type == DragTargetType.filter) &&
        state.dragContext.target &&
        !props.disableDropable
      )
    })

    let isDragover = computed(() => {
      return canDrop.value && state.dragContext.dropTarget === props.modelValue
    })
    let dragleave = (e: MouseEvent) => {
      state.dragContext.dropTarget = null
      e.preventDefault()
    }
    let dragoverHandle = (e: MouseEvent) => {
      if (state.dragContext.dropTarget != props.modelValue) {
        state.dragContext.dropTarget = props.modelValue
      }
      e.preventDefault()
    }

    let dragendHandle = () => {
      state.dragContext.target = null
    }

    let dragstartHandle = (filter: IFilterInfo) => {
      state.dragContext.target = filter
      state.dragContext.type = DragTargetType.filter
      state.dragContext.from = props.modelValue
    }

    let remove = (filter: IFilterInfo) => {
      props.modelValue.splice(props.modelValue.indexOf(filter), 1)
      emit('change', props.modelValue)
    }
    let change = () => {
      emit('change', props.modelValue)
    }

    return {
      i18n,
      dropHandle,
      isDragover,
      dragleave,
      dragoverHandle,
      remove,
      dragstartHandle,
      dragendHandle,
      canDrop,
      change
    }
  }
})
</script>

<style lang="less">
.c-field-filter {
  > div {
    min-height: 25px;
    margin: 0px;
    border: 1px dashed var(--border-color-base);
    cursor: pointer;
    padding: 4px;
    .c-drop-placeholder {
      color: rgb(161, 161, 161);
      fill: rgb(161, 161, 161);
      &:hover {
        color: var(--primary-color);
        fill: var(--primary-color);
      }
    }

    &.c-candrop {
      border: 2px solid var(--warning-color);
    }

    &.c-dragover {
      background-color: var(--light-warning-color);
    }
  }
}
</style>
