<template>
  <div class="c-formula-editor">
    <CodeEditor
      :start-line="0"
      :end-line="0"
      :disabled="!getFormula()"
      v-model="formula"
      @change="change"
      :auto-complete="autoComplete"
      :code-description="codeDescription"
    ></CodeEditor>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  reactive,
  watchEffect,
  computed
} from 'vue'
import {useI18n, useState, useLanguage} from '../../use/state'
import http from '../../use/http'
import CodeEditor from '../control/CodeEditor.vue'
import {ColumnType} from '@datahu/core'

export default defineComponent({
  name: 'FormulaEditor',
  components: {CodeEditor},
  props: ['connector', 'table'],
  setup(props: any, {emit}) {
    let i18n = useI18n()
    let state = useState()
    let language = useLanguage()

    let innerFormula: string = ''
    let getFormula = (): string | undefined => {
      if (state.selectedColumn) {
        return state.selectedColumn.formula
      } else if (state.selectedTable) {
        return state.selectedTable.formula
      }
      return ''
    }

    let codeDescription = computed(() => {
      let desc = null
      if (state.selectedColumn) {
        desc = {
          params: [{name: 'row', description: '当前行对象'}],
          return: '新栏目值'
        }
      } else {
        desc = {params: [], return: '对象数组'}
      }
      return desc
    })

    let autoComplete = computed(() => {
      if (state.selectedColumn) {
        let opts = [
          {
            label: 'row',
            type: 'property',
            detail: '当前行数据'
          }
        ]
        for (let col of state.selectedTable!.columns) {
          opts.push({
            label: `row['${col.alias || col.name}']`,
            type: 'property',
            detail: `当前行列名为${col.alias || col.name}的值`
          })
        }
        return opts
      }
      return null
    })

    let formula = computed({
      get() {
        innerFormula = getFormula() || ''
        return innerFormula
      },
      set(v: string) {
        innerFormula = v
      }
    })

    let change = () => {
      let defaultFormula = getFormula()
      if (innerFormula != defaultFormula) {
        if (state.selectedColumn) {
          state.selectedColumn.formula = innerFormula
          state.pkg.editColumnFormula(
            state.selectedTable!,
            state.selectedColumn
          )
        } else if (state.selectedTable) {
          state.selectedTable.formula = innerFormula
          state.pkg.editTableFormula(state.selectedTable)
        }
      }
    }

    return {formula, change, getFormula, autoComplete, codeDescription}
  }
})
</script>

<style lang="less">
.c-formula-editor {
  width: 100%;
}
</style>
