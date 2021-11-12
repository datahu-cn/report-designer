<template>
  <div class="advanced-filter-container">
    <div class="advanced-filter-tip">显示值满足以下条件的项:</div>
    <!-- 第一条件类型 -->
    <a-select
      v-model:value="firstSelect"
      class="advanced-filter-select"
      size="small"
    >
      <a-select-option
        :value="option.value"
        v-for="option in conditionOptions"
        :key="option.value"
      >
        {{ option.label }}
      </a-select-option>
    </a-select>
    <!-- 第一条件内容 -->
    <a-input
      v-if="
        firstSelect !== FilterExpression.isNull &&
        firstSelect !== FilterExpression.isNotNull
      "
      placeholder=""
      size="small"
      class="c-select-all"
      v-model:value="firstInput"
    ></a-input>
    <!-- 集合类型 -->
    <a-radio-group
      class="dvanced-filter-radio"
      name="radioGroup"
      v-model:value="radioSelect"
    >
      <a-radio
        :value="radio.value"
        v-for="radio in radioOptions"
        :key="radio.value"
      >
        {{ radio.label }}
      </a-radio>
    </a-radio-group>
    <!-- 第二条件类型 -->
    <a-select
      v-model:value="secondSelect"
      class="advanced-filter-select"
      size="small"
    >
      <a-select-option
        :value="option.value"
        v-for="option in conditionOptions"
        :key="option.value"
      >
        {{ option.label }}
      </a-select-option>
    </a-select>
    <!-- 第二条件内容 -->
    <a-input
      v-if="
        secondSelect &&
        secondSelect !== FilterExpression.isNull &&
        secondSelect !== FilterExpression.isNotNull
      "
      placeholder=""
      size="small"
      class="c-select-all"
      v-model:value="secondInput"
    ></a-input>
    <div class="advanced-filter-apply">
      <a-button
        :disabled="
          (firstSelect !== FilterExpression.isNull &&
            firstSelect !== FilterExpression.isNotNull &&
            !firstInput &&
            firstInput !== '0') ||
          (secondSelect &&
            secondSelect !== FilterExpression.isNull &&
            secondSelect !== FilterExpression.isNotNull &&
            !secondInput &&
            secondInput !== '0')
            ? true
            : false
        "
        size="small"
        @click="runFilter"
      >
        应用筛选器
      </a-button>
    </div>
  </div>
</template>
<script lang="ts">
import {ref, toRefs, defineComponent, onMounted} from 'vue'
import {FilterExpression, IFilterCondition} from '@datahu/core'
export default defineComponent({
  name: 'AdvancedFilter',
  props: ['data', 'filter'],
  setup(props, {emit}) {
    const conditionOptions = [
      {
        label: '包含',
        value: FilterExpression.contains
      },
      {
        label: '不包含',
        value: FilterExpression.notContains
      },
      {
        label: '开头是',
        value: FilterExpression.startsWith
      },
      {
        label: '开头不是',
        value: FilterExpression.notStartsWith
      },
      {
        label: '等于',
        value: FilterExpression.eq
      },
      {
        label: '不等于',
        value: FilterExpression.notEq
      },
      {
        label: '为空',
        value: FilterExpression.isNull
      },
      {
        label: '不为空',
        value: FilterExpression.isNotNull
      },
      {
        label: '大于',
        value: FilterExpression.gt
      },
      {
        label: '大于等于',
        value: FilterExpression.gtOrEq
      },
      {
        label: '小于',
        value: FilterExpression.lt
      },
      {
        label: '小于等于',
        value: FilterExpression.ltOrEq
      }
    ]

    const radioOptions = [
      {
        label: '且',
        value: FilterExpression.and
      },
      {
        label: '或',
        value: FilterExpression.or
      }
    ]

    let firstSelect = ref(FilterExpression.contains)
    let firstInput = ref()
    let secondSelect = ref()
    let secondInput = ref()

    if (props.filter.conditions && props.filter.conditions.length > 0) {
      if (props.filter.conditions.length === 1) {
        firstSelect.value = props.filter.conditions[0].expression
        firstInput.value = props.filter.conditions[0].value
      }
      if (props.filter.conditions.length === 2) {
        firstSelect.value = props.filter.conditions[0].expression
        firstInput.value = props.filter.conditions[0].value
        secondSelect.value = props.filter.conditions[1].expression
        secondInput.value = props.filter.conditions[1].value
      }
    }

    let radioSelect = ref(FilterExpression.and)

    const runFilter = () => {
      // 数据不完整不执行筛选
      if (
        firstSelect.value !== FilterExpression.isNull &&
        firstSelect.value !== FilterExpression.isNotNull &&
        !firstInput.value
      )
        return
      if (secondSelect.value && !secondInput.value) return

      const conditions: Array<IFilterCondition> = [
        {
          expression: firstSelect.value,
          value: firstInput.value
        }
      ]
      const second: IFilterCondition = {
        expression: secondSelect.value,
        value: secondInput.value
      }

      if (secondSelect.value) {
        conditions.push(second)
      }
      emit('advancedFilter', radioSelect.value, conditions)
    }

    return {
      conditionOptions,
      firstSelect,
      firstInput,
      secondSelect,
      secondInput,
      radioOptions,
      radioSelect,
      runFilter,
      FilterExpression
    }
  }
})
</script>
<style lang="less">
.advanced-filter-container {
  .advanced-filter-tip {
    font-size: 12px;
    padding: 10px 0;
  }

  .advanced-filter-select {
    width: 100%;
  }
  .dvanced-filter-radio {
    padding: 10px 0;
  }

  .advanced-filter-apply {
    padding: 10px 0;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
