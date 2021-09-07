<template>
  <div class="c-field-selector">
    <div
      @drop.stop="dropHandle()"
      @dragover.stop="dragoverHandle($event)"
      @dragleave.stop="dragleave($event)"
      :class="{'c-dragover': isDragover, 'c-candrop': canDrop}"
    >
      <div class="c-droped-fields">
        <div
          v-for="(field, index) in modelValue"
          :key="field.columnId"
          :draggable="editField != field"
          @dragend="dragendHandle"
          @dragstart="dragstartHandle(field)"
          @drop.stop="dropHandle(index)"
          @mouseenter="mouseenter(field)"
          @mouseleave="mouseleave(field)"
        >
          <span v-if="editField != field">
            {{ getFieldName(field) }}
          </span>
          <input
            v-if="editField == field"
            @change="renameField($event)"
            @blur="renameField($event)"
            @keydown.enter="renameField($event)"
            :value="getFieldName(field)"
            type="text"
          />

          <a-dropdown :trigger="['click']" class="c-dropdown">
            <a class="ant-dropdown-link" @click.prevent>
              <icon type="alignDown" />
            </a>
            <template #overlay>
              <a-menu class="c-dropdown-menu">
                <a-menu-item>
                  <a href="javascript:;" @click="menuClick('rename', field)">
                    重命名
                  </a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;" @click="menuClick('remove', field)">
                    删除
                  </a>
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item>
                  格式化
                  <FormatterSelect
                    @change="changeFormatter"
                    v-model="field.formatter"
                  />
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item v-for="merge in mergeOptions" :key="merge.value">
                  <a
                    href="javascript:;"
                    @click.stop="menuClick('mergeType', field, merge.value)"
                  >
                    <icon
                      v-if="field.mergeType == merge.value"
                      type="checked"
                      class="c-menu-success-checked"
                    />
                    {{ merge.label }}
                  </a>
                </a-menu-item>
                <a-menu-item v-if="field.mergeType == 'code'">
                  <CodeEditor
                    @click.stop="emptyClick($event)"
                    v-model="field.mergeCode"
                  />
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </div>
      <div class="c-drop-placeholder">
        <icon type="plus" />
        拖拽栏目到此处
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, computed, ref, onMounted, Ref} from 'vue'
import {useI18n, useState, DragTargetType} from '../../use/state'
import {DataMergeType, IFieldInfo, Util} from '@datahu/core'
import FormatterSelect from './FormatterSelect.vue'
import CodeEditor from './CodeEditor.vue'
import {FieldSelectType} from '@datahu/core'
import {filter} from 'jszip'
export default defineComponent({
  name: 'FieldSelect',
  components: {FormatterSelect, CodeEditor},
  props: ['modelValue', 'config', 'disabled', 'size', 'same'],
  setup(props: any, {emit}) {
    let i18n = useI18n()
    let state = useState()

    let mergeOptions = computed(() => {
      let opts = [{label: '不汇总', value: DataMergeType.none}]
      let mergeOpts = [
        {label: '计数', value: DataMergeType.count},
        {label: '唯一计数', value: DataMergeType.distinctCount},
        {label: '求和', value: DataMergeType.sum},
        {label: '最小值', value: DataMergeType.min},
        {label: '最大值', value: DataMergeType.max},
        {label: '第一个', value: DataMergeType.first},
        {label: '最后一个', value: DataMergeType.last},
        {label: '平均值', value: DataMergeType.avg},
        {label: '集合', value: DataMergeType.collection},
        {label: '自定义代码', value: DataMergeType.code}
      ]
      if (props.config.fieldSelectType == FieldSelectType.disableMerge) {
        return opts
      } else if (props.config.fieldSelectType == FieldSelectType.mustMerge) {
        return mergeOpts
      } else {
        return [...opts, ...mergeOpts]
      }
    })

    let setDefaultMergeType = (field: IFieldInfo) => {
      if (!field.mergeType) {
        field.mergeType = DataMergeType.none
      }
      if (props.config.mergeType) {
        field.mergeType = props.config.mergeType
      }
      if (props.config.fieldSelectType == FieldSelectType.disableMerge) {
        field.mergeType = DataMergeType.none
      } else if (props.config.fieldSelectType == FieldSelectType.mustMerge) {
        if (field.mergeType == DataMergeType.none) {
          field.mergeType = DataMergeType.first
        }
      }
    }

    let getFieldName = (field: IFieldInfo) => {
      if (field.displayName) {
        return field.displayName
      } else {
        return Util.format(
          (i18n.value as any)['merge_type_' + field.mergeType],
          state.pkg.dataContext.getDataStructure()[field.tableId],
          state.pkg.dataContext.getDataStructure()[field.columnId]
        )
      }
    }

    let dropHandle = (index: number) => {
      let values = props.modelValue
      if (!values) {
        values = []
      }
      let dragField = state.dragContext.target
      if (state.dragContext.type == DragTargetType.filter) {
        dragField = state.dragContext.target.field
      }
      if (dragField && isDragover.value) {
        if (values.indexOf(dragField) < 0) {
          let has = false
          if (!props.same) {
            // 是否允许重复的栏目
            for (let item of values) {
              if (
                item.tableId == dragField.tableId &&
                item.columnId == dragField.columnId
              ) {
                has = true
                break
              }
            }
          }
          if (!has) {
            setDefaultMergeType(dragField)
            if (props.config.multiple) {
              // 允许多选时才会进入
              if (index != undefined) {
                values.splice(index, 0, dragField)
              } else {
                values.push(dragField)
              }
            } else {
              values.splice(0, 1, dragField)
            }
            if (!props.modelValue) {
              emit('update:modelValue', values)
            }
            emit('change', values)
          }
        } else {
          if (props.config.multiple) {
            // 允许多选时才会进入
            // 调整栏目顺序
            if (values.length > 1) {
              let dragIndex = values.indexOf(dragField)
              // 数值元素对换
              if (index == undefined) {
                values.splice(dragIndex, 1)
                values.push(dragField)
              } else if (dragIndex != index) {
                let indexField = values[index]
                values[index] = dragField
                values[dragIndex] = indexField
              }
              emit('change', values)
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
        state.dragContext.target
      )
    })

    let isDragover = computed(() => {
      return canDrop.value && state.dragContext.dropTarget === props.config
    })

    let dragleave = (e: MouseEvent) => {
      state.dragContext.dropTarget = null
      e.preventDefault()
    }
    let dragoverHandle = (e: MouseEvent) => {
      if (state.dragContext.dropTarget != props.config) {
        state.dragContext.dropTarget = props.config
      }
      e.preventDefault()
    }

    let dragendHandle = () => {
      state.dragContext.target = null
    }

    let dragstartHandle = (field: IFieldInfo) => {
      state.dragContext.target = field
      state.dragContext.type = DragTargetType.field
      state.dragContext.from = props.modelValue
    }

    let editField: Ref<any> = ref(null)
    let renameField = (e: Event) => {
      if (e && e.target && editField.value) {
        editField.value.displayName = (e.target as any).value
        emit('change', props.modelValue)
        editField.value = null
      }
    }

    let changeFormatter = (v: any) => {
      emit('change', props.modelValue)
    }

    let menuClick = (action: string, field: IFieldInfo, value: any = null) => {
      if (action == 'remove') {
        props.modelValue.splice(props.modelValue.indexOf(field), 1)
        emit('change', props.modelValue)
      } else if (action == 'rename') {
        editField.value = field
      } else if (action == 'mergeType' && value) {
        field.mergeType = value
        emit('change', props.modelValue)
      }
    }

    let mouseenter = (field: IFieldInfo) => {
      state.dragContext.hoverField = field
    }
    let mouseleave = (field: IFieldInfo) => {
      state.dragContext.hoverField = null
    }

    let emptyClick = () => {}

    return {
      i18n,
      emptyClick,
      dropHandle,
      isDragover,
      dragleave,
      dragoverHandle,
      menuClick,
      dragstartHandle,
      getFieldName,
      renameField,
      editField,
      DataMergeType,
      dragendHandle,
      canDrop,
      mergeOptions,
      changeFormatter,
      mouseenter,
      mouseleave
    }
  }
})
</script>

<style lang="less">
.c-field-selector {
  > div {
    min-height: 25px;
    margin: 0px;
    border: 1px dashed var(--border-color-base);
    cursor: pointer;
    text-align: center;
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

    .c-droped-fields {
      input {
        width: 100%;
        height: 22px;
        border-width: 0px;
        color: var(--text-color);
      }
      > div {
        // border: 1px solid var(--border-color-base);

        margin-bottom: 4px;
        padding: 3px 16px 3px 7px;
        position: relative;
        background-color: var(--primary-color);
        color: white;
        fill: white;
        border-radius: 18px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        height: 28px;
        > span {
          width: 100%;
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        &:hover {
          // color: var(--primary-color);
          // fill: var(--primary-color);
        }
        .anticon {
          position: absolute;
          right: 3px;
          top: 7px;
          border-radius: 50%;
          padding: 2px;
          &:hover {
            fill: white;
            background-color: var(--error-color);
          }
        }
      }
    }
  }
}
.c-menu-success-checked {
  fill: var(--success-color);
}
</style>
