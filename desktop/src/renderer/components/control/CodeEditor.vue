<template>
  <div class="c-code-editor">
    <div
      class="c-code-ref"
      :style="{height: height || 'auto'}"
      ref="codeRef"
    ></div>
    <icon
      class="c-code-editor-fullscreen"
      @click="fullscreen()"
      type="fullscreen"
    />
    <a-modal
      class="c-code-editor-modal"
      width="70%"
      v-model:visible="visible"
      title="代码"
      @ok="handleOk"
    >
      <div class="c-code-description">
        <div
          v-if="
            codeDescription &&
            codeDescription.params &&
            codeDescription.params.length > 0
          "
        >
          <h4>参数：</h4>
          <p v-for="param in codeDescription.params" :key="param.name">
            {{ param.name }}
            <span v-if="param.description">{{ param.description }}</span>
          </p>
        </div>
        <div v-if="codeDescription && codeDescription.return">
          <h4>返回值：</h4>
          <p>{{ codeDescription.return }}</p>
        </div>
      </div>
      <div class="c-code-editor">
        <div class="c-code-modal-ref" ref="codeModalRef"></div>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  onMounted,
  watchEffect,
  watch,
  nextTick
} from 'vue'
import {javascript, javascriptLanguage} from '@codemirror/lang-javascript'
import {completeFromList} from '@codemirror/autocomplete'
import {
  highlightSpecialChars,
  drawSelection,
  highlightActiveLine,
  keymap
} from '@codemirror/view'
import {EditorView} from '@codemirror/view'
import {EditorState, Prec} from '@codemirror/state'
import {history, historyKeymap} from '@codemirror/history'
import {foldGutter, foldKeymap} from '@codemirror/fold'
import {indentOnInput} from '@codemirror/language'
import {lineNumbers} from '@codemirror/gutter'
import {defaultKeymap} from '@codemirror/commands'
import {bracketMatching} from '@codemirror/matchbrackets'
import {closeBrackets, closeBracketsKeymap} from '@codemirror/closebrackets'
import {highlightSelectionMatches, searchKeymap} from '@codemirror/search'
import {autocompletion, completionKeymap} from '@codemirror/autocomplete'
import {commentKeymap} from '@codemirror/comment'
import {rectangularSelection} from '@codemirror/rectangular-selection'
import {defaultHighlightStyle} from '@codemirror/highlight'
import {lintKeymap} from '@codemirror/lint'
export default defineComponent({
  name: 'CodeEditor',
  components: {},
  props: [
    'modelValue',
    'config',
    'disabled',
    'startLine',
    'endLine',
    'autoComplete',
    'height',
    'codeDescription'
  ],
  setup(props: any, {emit}) {
    let codeRef = ref(undefined)
    let codeModalRef = ref(undefined)

    let codeContext: any = {
      default: {
        editor: null,
        value: null,
        parent: codeRef
      },
      modal: {
        editor: null,
        value: null,
        parent: codeModalRef
      }
    }
    let getContext = () => {
      return visible.value ? codeContext.modal : codeContext.default
    }

    let addCtxProperty = (options: Array<any>, obj: any, label: string) => {
      if (obj) {
        for (let key of Object.getOwnPropertyNames(obj)) {
          options.push({
            label: label ? `${label}.${key}` : key,
            type: 'property',
            detail: ``
          })
        }
      }
    }

    let initCTXOptions = () => {
      let ctx = (window as any)['DataHu']
      let options: Array<any> = [
        {
          label: 'DataHu',
          type: 'class',
          detail: '全局上下文信息'
        },
        {
          label: 'DataHu.formula',
          type: 'property',
          detail: '计算公式'
        },
        {
          label: 'DataHu.parameter',
          type: 'property',
          detail: '参数'
        },
        {
          label: 'DataHu.user',
          type: 'property',
          detail: '当前登录用户'
        },
        {
          label: 'DataHu.util',
          type: 'property',
          detail: '工具类'
        },
        {
          label: 'DataHu.tables',
          type: 'property',
          detail: '表格数据'
        },
        {
          label: 'Math',
          type: 'property',
          detail: ''
        }
      ]
      if (props.codeDescription && props.codeDescription.params) {
        for (let param of props.codeDescription.params) {
          options.push({
            label: param.name,
            type: 'property',
            detail: param.description || ''
          })
        }
      }
      addCtxProperty(options, Math, 'Math')
      addCtxProperty(options, ctx.user, 'DataHu.user')
      addCtxProperty(options, ctx.parameter, 'DataHu.parameter')
      addCtxProperty(options, ctx.formula, 'DataHu.formula')
      addCtxProperty(options, ctx.util, 'DataHu.util')
      if (props.autoComplete) {
        for (let o of props.autoComplete) {
          options.push(o)
        }
      }

      let constants = new Set()
      for (let key in ctx.tables) {
        options.push({
          label: `DataHu.tables['${key}']`,
          type: 'property',
          detail: `表格${key}的数据集合`
        })
        options.push({
          label: `DataHu.tables['${key}'][0]`,
          type: 'property',
          detail: `表格${key}的第1行数据`
        })
        if (!constants.has(key)) {
          constants.add(key)
          options.push({
            label: `'${key}`,
            type: 'text',
            detail: ''
          })
        }

        let rows = ctx.tables[key]
        if (rows.length > 0) {
          for (let col in rows[0]) {
            options.push({
              label: `DataHu.tables['${key}'][0][${col}]`,
              type: 'property',
              detail: `表格${key}的第1行列名为${col}的值`
            })
            if (!constants.has(col)) {
              constants.add(col)
              options.push({
                label: `'${col}`,
                type: 'text',
                detail: ''
              })
            }
          }
        }
      }
      return options
    }

    let visible = ref(false)
    let init = (force: boolean, modal = false) => {
      let context = getContext()
      if (
        context.parent.value &&
        (force || context.value !== props.modelValue)
      ) {
        if (context.editor) {
          context.editor.destroy()
        }

        let jsCompletion = completeFromList(initCTXOptions())
        let extensions = []
        if (modal) {
          extensions.push(lineNumbers())
          extensions.push(foldGutter())
        }
        let defaultExtensions = [
          // lineNumbers(),
          highlightSpecialChars(),
          history(),
          // foldGutter(),
          drawSelection(),
          EditorState.allowMultipleSelections.of(true),
          indentOnInput(),
          Prec.fallback(defaultHighlightStyle),
          bracketMatching(),
          closeBrackets(),
          autocompletion(),
          rectangularSelection(),
          highlightActiveLine(),
          highlightSelectionMatches(),
          keymap.of([
            ...closeBracketsKeymap,
            ...defaultKeymap,
            ...searchKeymap,
            ...historyKeymap,
            ...foldKeymap,
            ...commentKeymap,
            ...completionKeymap,
            ...lintKeymap
          ]),
          javascript(),
          javascriptLanguage.data.of({autocomplete: jsCompletion})
        ]
        extensions = [...extensions, ...defaultExtensions]
        context.editor = new EditorView({
          state: EditorState.create({
            doc: props.modelValue,
            extensions: extensions
          }),
          dispatch: (tr) => {
            if (!tr.changes.empty) {
              if (isReadonlyLine(tr.startState, tr.state)) {
                return
              }
              context.editor!.update([tr])
              let v = context.editor!.state.doc.toString() as any
              context.value = v
            } else {
              context.editor.update([tr])
            }
          },
          parent: context.parent.value
        })
        if (!force) {
          context.value = props.modelValue
        }
        if (props.disabled) {
          context.editor.contentDOM.setAttribute('contentEditable', 'false')
        } else {
          if (!visible.value) {
            context.editor.contentDOM.addEventListener('blur', () => {
              if (context.value !== props.modelValue && !visible.value) {
                updateValue(context.value)
              }
            })
          }
        }
      }
    }

    let isReadonlyLine = (startState: any, state: any) => {
      let startLine = props.startLine || -1
      let endLine = props.endLine || -1
      if (startLine >= 0) {
        if (
          startState.doc.lines < startLine + 1 ||
          state.doc.lines < startLine + 1
        ) {
          return true
        }
        for (let i = 0; i < startLine; i++) {
          if (startState.doc.text[i] != state.doc.text[i]) {
            return true
          }
        }
      }
      if (endLine >= 0) {
        if (
          startState.doc.lines < endLine + 1 ||
          state.doc.lines < endLine + 1
        ) {
          return true
        }
        for (let i = 0; i < endLine; i++) {
          if (
            startState.doc.text[startState.doc.lines - i - 1] !=
            state.doc.text[state.doc.lines - i - 1]
          ) {
            return true
          }
        }
      }
      return false
    }

    watch(
      () => props.modelValue,
      () => init(false)
    )
    onMounted(() => {
      codeContext.default.value = props.modelValue
      init(true)
    })

    let handleOk = () => {
      let v = getContext().value
      visible.value = false
      if (v != props.modelValue) {
        updateValue(v)
      } else {
        init(true)
      }
    }
    let fullscreen = async () => {
      codeContext.modal.value = codeContext.default.value
      visible.value = true
      await nextTick()
      init(true, true)
    }

    let updateValue = (v: string) => {
      emit('update:modelValue', v)
      emit('change', v)
    }
    return {
      codeRef,
      codeModalRef,
      handleOk,
      visible,
      fullscreen
    }
  }
})
</script>

<style lang="less">
.c-code-editor {
  display: inline-block;
  width: 100%;
  min-width: 120px;

  border: 1px solid var(--border-color-base);
  border-radius: var(--border-radius-base);
  position: relative;
  div.cm-wrap.cm-focused {
    outline: 1px solid var(--primary-color);
  }
  .c-code-modal-ref {
    min-height: 400px;
    .cm-gutters {
      height: 400px;
    }
  }
  &:hover {
    .c-code-editor-fullscreen {
      display: block;
    }
  }
  .c-code-editor-fullscreen {
    position: absolute;
    bottom: 5px;
    right: 5px;
    display: none;
  }
}
.c-code-editor-modal {
  .c-code-description {
    background-color: var(--light-primary-color);
    padding: 10px 10px 5px 10px;
    margin-bottom: 10px;
    border-radius: var(--border-radius-base);
    h4 {
      display: inline-block;
      width: auto;
    }
    p {
      display: inline-block;
      width: auto;
      margin-bottom: 7px;
    }
  }
}
</style>
