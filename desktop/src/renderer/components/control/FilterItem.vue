<template>
  <div class="c-filter-item">
    <div class="c-filter-name" draggable="true">
      <a-checkbox @change="change()" v-model:checked="filter.enabled">
        {{ getFieldName() }}
      </a-checkbox>

      <icon type="close" @click="remove()" />
    </div>
    <div v-if="filter.enabled" class="c-filter-condition">
      <a-select
        :dropdown-match-select-width="false"
        @change="filterTypeChange()"
        size="small"
        v-model:value="filter.filterType"
      >
        <a-select-option value="basic">基本</a-select-option>
        <a-select-option value="advanced">高级</a-select-option>
        <a-select-option value="code">代码</a-select-option>
      </a-select>

      <!-- 基本 -->
      <div class="c-filter-basic" v-if="filter.filterType == 'basic'">
        <a-input
          placeholder="搜索"
          size="small"
          class="c-select-all"
          v-model:value="searchValue"
        ></a-input>
        <a-checkbox
          v-if="searchValue === '' || searchValue === undefined"
          class="c-select-all"
          v-model:checked="checkAll"
          :indeterminate="indeterminate"
        >
          全选
        </a-checkbox>
        <VirtualScroller
          :item-size="22"
          :pool-buffer="10"
          :data="options"
          :search-value="searchValue"
        >
          <template v-slot="{item}">
            <a-checkbox
              class="c-filter-item-checkbox"
              @change="updateChecked($event, item)"
              :checked="filter.values.indexOf(item) >= 0"
            >
              {{ item }}
            </a-checkbox>
          </template>
        </VirtualScroller>
      </div>

      <!-- 高级 -->
      <div class="c-filter-advanced" v-if="filter.filterType == 'advanced'">
        <AdvancedFilter
          :data="options"
          @advancedFilter="advancedFilter"
          :filter="filter"
        />
      </div>

      <!-- 代码 -->
      <div v-if="filter.filterType == 'code'" class="c-filter-code">
        <CodeEditor
          :code-description="{
            params: [{name: 'row', description: '当前行对象'}],
            return: '布尔值'
          }"
          v-model="code"
        />
        <div class="c-filter-code-apply">
          <a-button :disabled="!code" size="small" @click="codeFilter">
            应用筛选器
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, computed, ref, onMounted} from 'vue'
import {useI18n, useState} from '../../use/state'
import VirtualScroller from '../common/VirtualScroller.vue'
import AdvancedFilter from './AdvancedFilter.vue'
import {
  DataMergeType,
  FilterExpression,
  Formula,
  IFilterInfo,
  Util
} from '@datahu/core'
import CodeEditor from './CodeEditor.vue'
export default defineComponent({
  name: 'FieldItem',
  components: {VirtualScroller, AdvancedFilter, CodeEditor},
  props: ['filter', 'scope'],
  setup(props: any, {emit}) {
    let i18n = useI18n()
    let state = useState()
    // 基本
    let updateChecked = (e: MouseEvent, item: any) => {
      if ((e.target as any).checked) {
        props.filter.values.push(item)
      } else {
        props.filter.values.splice(props.filter.values.indexOf(item), 1)
      }
      change()
    }
    // 高级
    const advancedFilter = (expression: FilterExpression, value: any) => {
      props.filter.mergeExpression = expression
      props.filter.conditions = value
      change()
    }
    // 代码
    let code = ref(props.filter.code)
    const codeFilter = () => {
      console.log(code.value)
      if (code.value) {
        props.filter.code = code.value
        change()
      }
    }

    let getFieldName = () => {
      if (props.filter.field.displayName) {
        return props.filter.field.displayName
      } else {
        return Util.format(
          '{0}:{1}',
          state.pkg.dataContext.getDataStructure()[props.filter.field.tableId],
          state.pkg.dataContext.getDataStructure()[props.filter.field.columnId]
        )
      }
    }

    let filterTypeChange = () => {
      change()
    }

    let options = computed(() => {
      let values = []
      let data =
        props.scope == 'table'
          ? state.pkg.dataContext.getDataBeforeTableFilter()
          : state.pkg.dataContext.getData()
      let structure = state.pkg.dataContext.getStrctureNames(props.filter.field)
      values = Formula.distinct(data[structure[0]], structure[1])
      if (searchValue.value) {
        let searchValues = []
        for (let v of values) {
          if (v && v.toString && v.toString().indexOf(searchValue.value) >= 0) {
            searchValues.push(v)
          }
        }
        values = searchValues
      }
      return values
    })

    let checkAll = computed({
      get() {
        return (
          props.filter.values &&
          props.filter.values.length == options.value.length
        )
      },
      set(v) {
        if (v) {
          let values = []
          for (let opt of options.value) {
            values.push(opt)
          }
          props.filter.values = values
        } else {
          props.filter.values = []
        }
        change()
      }
    })
    let indeterminate = computed(() => {
      return (
        props.filter.values &&
        props.filter.values.length > 0 &&
        props.filter.values.length < options.value.length
      )
    })

    let remove = () => {
      emit('remove', props.filter)
    }
    let change = () => {
      emit('change', props.filter)
    }

    let searchValue = ref()

    return {
      i18n,
      remove,
      getFieldName,
      filterTypeChange,
      options,
      checkAll,
      indeterminate,
      change,
      updateChecked,
      searchValue,
      advancedFilter,
      code,
      codeFilter
    }
  }
})
</script>

<style lang="less">
.c-filter-item {
  border: 1px solid var(--border-color-base);
  margin-bottom: 4px;

  background-color: #fafafa;
  padding: 3px;
  .c-filter-name {
    padding: 0px 13px 5px 0px;
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    &:hover {
      color: var(--primary-color);
      fill: var(--primary-color);
    }
    .c-icon {
      position: absolute;
      right: 1px;
      top: 4px;
      border-radius: 50%;
      padding: 2px;
      &:hover {
        fill: white;
        background-color: var(--error-color);
      }
    }
  }

  .c-filter-condition {
    width: 100%;
    text-align: left;
    > div {
      width: 100%;
    }
    .c-select-all {
      margin: 5px 0px 5px;
    }
  }

  .c-filter-item-checkbox {
    overflow: hidden;
    white-space: nowrap;
  }

  .c-filter-code {
    padding: 10px 0;

    .c-filter-code-apply {
      padding: 10px 0 0 0;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
