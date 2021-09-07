<template>
  <div class="c-formatter-select" :title="color">
    <a-button @click="openModal()" size="small">
      <span v-html="displayText"></span>
    </a-button>
    <a-modal
      title="格式化"
      placement="right"
      :closable="true"
      class="c-formatter-select-modal"
      v-model:visible="visible"
      width="500px"
    >
      <div>
        <a-tabs size="small" tab-position="left" v-model:activeKey="activeKey">
          <a-tab-pane
            v-for="sample in samples"
            :key="sample.category"
            :tab="sample.title"
          >
            <div v-if="sample.category != 'code'" class="c-formatter-list">
              <div v-if="sample.category == 'nomal'">
                显示原始数据值，不进行格式化
              </div>
              <a-tag v-if="sample.getCode()">
                <strong>代码：</strong>
                {{ sample.getCode() }}
              </a-tag>
              <div v-if="sample.decimal >= 0">
                小数位数
                <a-input-number
                  size="small"
                  v-model:value="sample.decimal"
                  :min="0"
                  :max="50"
                ></a-input-number>
              </div>
              <div v-if="sample.thousands != null">
                <a-checkbox size="small" v-model:checked="sample.thousands">
                  使用千分位分隔符（,）
                </a-checkbox>
              </div>
              <div v-if="sample.currencyChar != null">
                货币符号
                <a-select
                  :dropdown-match-select-width="false"
                  size="small"
                  :options="sample.currencyChars"
                  v-model:value="sample.currencyChar"
                ></a-select>
              </div>
              <div v-if="sample.getList().length > 0">
                <a-list size="small" bordered :data-source="sample.getList()">
                  <template #renderItem="{index, item}">
                    <a-list-item
                      :class="{
                        'c-list-selected':
                          sample.listIndex == sample.getList().indexOf(item)
                      }"
                      @click="sample.listIndex = sample.getList().indexOf(item)"
                    >
                      <span v-if="sample.getLabels && sample.getLabels()">
                        {{ sample.getLabels()[index] }}
                      </span>
                      <span
                        v-else
                        v-html="formatHtml(item, sample.value)"
                      ></span>
                    </a-list-item>
                  </template>
                </a-list>
              </div>
            </div>
            <div v-else class="c-formatter-list">
              <CodeEditor height="350px" v-model="sample.value"></CodeEditor>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
      <template #footer>
        <a-button key="save" type="primary" @click="save()">确定</a-button>
        <a-button key="cancel" @click="visible = false">取消</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts">
import {Util, Formatter} from '@datahu/core'
import {
  defineComponent,
  computed,
  ref,
  Ref,
  onMounted,
  watchEffect,
  watch
} from 'vue'
import CodeEditor from './CodeEditor.vue'
interface ISample {
  category: string
  decimal?: number
  value?: any
  thousands?: boolean
  codes?: any
  getCode(): string
  parse(code: string): ISample | boolean
  display(): string
  getList(): Array<any>
}
let getSamples = () => {
  return [
    {
      category: 'nomal',
      title: '常规',
      getCode() {
        return ''
      },
      parse(code: string) {
        let match = code == null || code == undefined || code == ''
        if (match) {
          return this
        }
        return false
      },
      display() {
        return '常规'
      },
      getList() {
        return []
      }
    },
    {
      category: 'number',
      title: '数值',
      decimal: 2,
      thousands: false,
      value: -1234.0999755859400000000001,
      listIndex: 0,
      getCode() {
        return this.getList()[this.listIndex]
      },
      parse(code: string) {
        if (code && code.indexOf('return') < 0) {
          let split = code.split(';')
          let excludes = ['%', '/', 'E+', '" B"', '" K"', '" M"', '" G"']
          if (split.length >= 1) {
            for (let ex of excludes) {
              if (code.indexOf(ex) >= 0) {
                return false
              }
            }
            if (split[0].startsWith('0') || split[0].startsWith('#')) {
              if (split[0].startsWith('#,##')) {
                this.thousands = true
              } else {
                this.thousands = false
              }
              let pointIndex = split[0].indexOf('.')
              if (pointIndex < 0) {
                this.decimal = 0
              } else {
                if (split[0].indexOf(')') >= 0) {
                  this.decimal = split[0].indexOf(')') - pointIndex - 1
                } else {
                  this.decimal = split[0].length - pointIndex - 1
                }
              }
              if (split.length == 1) {
                this.listIndex = 3
              } else if (
                split[1].indexOf('"#FD0101#"') >= 0 &&
                split[1].indexOf('(') >= 0
              ) {
                this.listIndex = 0
              } else if (
                split[1].indexOf('"#FD0101#"') >= 0 &&
                split[1].indexOf('-') >= 0
              ) {
                this.listIndex = 4
              } else if (split[1].indexOf('"#FD0101#"') >= 0) {
                this.listIndex = 2
              } else {
                this.listIndex = 1
              }
              return this
            }
          }
        }
        return false
      },
      getList() {
        let thousandstr = ''
        if (this.thousands) {
          thousandstr += '#,##'
        }
        let decimalstr = ''
        if (this.decimal == 0) {
          decimalstr += '0'
        } else {
          decimalstr += '0.'
          for (let i = 0; i < this.decimal; i++) {
            decimalstr += '0'
          }
        }

        let code1 = `${thousandstr}${decimalstr};"#FD0101#"(${thousandstr}${decimalstr})`
        let code2 = `${thousandstr}${decimalstr};(${thousandstr}${decimalstr})`
        let code3 = `${thousandstr}${decimalstr};"#FD0101#"${thousandstr}${decimalstr}`
        let code4 = `${thousandstr}${decimalstr}`
        let code5 = `${thousandstr}${decimalstr};"#FD0101#"-${thousandstr}${decimalstr}`
        return [code1, code2, code3, code4, code5]
      },
      display() {
        return Formatter.formatHtml(this.getCode(), this.value)
      }
    },
    {
      category: 'percent',
      title: '百分比',
      decimal: 2,
      value: -0.5999755859400000000001,
      parse(code: string) {
        if (code && code.indexOf('return') < 0) {
          if (code.indexOf('%') == code.length - 1) {
            let pointIndex = code.indexOf('.')
            if (pointIndex < 0) {
              this.decimal = 0
            } else {
              this.decimal = code.indexOf('%') - pointIndex - 1
            }
            return this
          }
        }
        return false
      },
      getList() {
        return []
      },
      getCode() {
        let decimalstr = ''
        if (this.decimal == 0) {
          decimalstr += '0'
        } else {
          decimalstr += '0.'
          for (let i = 0; i < this.decimal; i++) {
            decimalstr += '0'
          }
        }
        return decimalstr + '%'
      },
      display() {
        return Formatter.formatHtml(this.getCode(), this.value)
      }
    },
    {
      category: 'currency',
      title: '货币',
      decimal: 2,
      value: -1234.0999755859400000000001,
      listIndex: 0,
      currencyChar: '[$￥]',
      currencyChars: [
        {label: '￥', value: '[$￥]'},
        {label: '€', value: '€'},
        {label: '$', value: '$'},
        {label: '人民币', value: '[$人民币]'},
        {label: 'USD', value: '[$USD]'}
      ],
      parse(code) {
        if (code && code.indexOf('return') < 0) {
          let split = code.split(';')
          if (split.length >= 1) {
            let currencyChar
            for (let currencyCharOpt of this.currencyChars) {
              if (split[0].startsWith(currencyCharOpt.value)) {
                currencyChar = currencyCharOpt.value
                break
              }
            }
            if (currencyChar) {
              this.currencyChar = currencyChar
              let pointIndex = split[0].indexOf('.')
              if (pointIndex < 0) {
                this.decimal = 0
              } else {
                if (split[0].indexOf(')') >= 0) {
                  this.decimal = split[0].indexOf(')') - pointIndex - 1
                } else {
                  this.decimal = split[0].length - pointIndex - 1
                }
              }
              if (split.length == 1) {
                this.listIndex = 3
              } else if (
                split[1].indexOf('"#FD0101#"') >= 0 &&
                split[1].indexOf('(') >= 0
              ) {
                this.listIndex = 0
              } else if (
                split[1].indexOf('"#FD0101#"') >= 0 &&
                split[1].indexOf('-') >= 0
              ) {
                this.listIndex = 4
              } else if (split[1].indexOf('"#FD0101#"') >= 0) {
                this.listIndex = 2
              } else {
                this.listIndex = 1
              }
              return this
            }
          }
        }
        return false
      },
      getList() {
        let thousandstr = '#,##'

        let decimalstr = ''
        if (this.decimal == 0) {
          decimalstr += '0'
        } else {
          decimalstr += '0.'
          for (let i = 0; i < this.decimal; i++) {
            decimalstr += '0'
          }
        }

        let code1 = `${this.currencyChar}${thousandstr}${decimalstr};"#FD0101#"(${this.currencyChar}${thousandstr}${decimalstr})`
        let code2 = `${this.currencyChar}${thousandstr}${decimalstr};(${this.currencyChar}${thousandstr}${decimalstr})`
        let code3 = `${this.currencyChar}${thousandstr}${decimalstr};"#FD0101#"${this.currencyChar}${thousandstr}${decimalstr}`
        let code4 = `${this.currencyChar}${thousandstr}${decimalstr}`
        let code5 = `${this.currencyChar}${thousandstr}${decimalstr};"#FD0101#"-${this.currencyChar}${thousandstr}${decimalstr}`
        return [code1, code2, code3, code4, code5]
      },
      getCode() {
        return this.getList()[this.listIndex]
      },
      display() {
        return Formatter.formatHtml(this.getCode(), this.value)
      }
    },
    {
      category: 'largeNumber',
      title: '科学计数',
      decimal: 2,
      value: 1000000000000,
      parse(code) {
        if (code) {
          if (code.indexOf('E+0') >= 0 && code.indexOf('return') < 0) {
            let pointIndex = code.indexOf('.')
            if (pointIndex < 0) {
              this.decimal = 0
            } else {
              this.decimal = code.indexOf('E') - pointIndex - 1
            }
            return this
          }
        }
        return false
      },
      getList() {
        return []
      },
      getCode() {
        let decimalstr = ''
        if (this.decimal == 0) {
          decimalstr += '0'
        } else {
          decimalstr += '0.'
          for (let i = 0; i < this.decimal; i++) {
            decimalstr += '0'
          }
        }
        return decimalstr + 'E+0'
      },
      display() {
        return Formatter.formatHtml(this.getCode(), this.value)
      }
    },
    {
      category: 'date',
      title: '日期',
      value: new Date(2001, 3, 7, 8, 9, 6),
      listIndex: 0,
      getCode() {
        return this.getList()[this.listIndex]
      },
      parse(code) {
        if (code && code.indexOf('return') < 0) {
          let list = this.getList()
          if (list.indexOf(code) >= 0) {
            this.listIndex = list.indexOf(code)
            return this
          }
        }
        return false
      },
      getList() {
        let list = [
          'yyyy"年"mm"月"dd"日"',
          'yyyy-mm-dd',
          'yyyy/mm/dd',
          'yyyy"年"mm"月"',
          'yyyy"年"mm"月"dd"日" h:mm AM/PM',
          'yyyy"年"mm"月"dd"日" hh:mm',
          'yyyy-mm-dd h:mm AM/PM',
          'yyyy-mm-dd hh:mm',
          'yyyy/mm/dd h:mm AM/PM',
          'yyyy/mm/dd hh:mm',
          'yyyy-mm',
          'yyyy/mm',
          'mm"月"dd"日"',
          'mm-dd',
          'mm/dd',
          'yy',
          'yyyy',
          'm',
          'mm',
          'mmm',
          'mmmm',
          'd',
          'dd',
          'ddd',
          'dddd'
        ]
        return list
      },
      display() {
        return Formatter.formatHtml(this.getCode(), this.value)
      }
    },
    {
      category: 'time',
      title: '时间',
      value: new Date(2001, 3, 7, 8, 9, 6),
      listIndex: 0,
      getCode() {
        return this.getList()[this.listIndex]
      },
      parse(code) {
        if (code && code.indexOf('return') < 0) {
          let list = this.getList()
          if (list.indexOf(code) >= 0) {
            this.listIndex = list.indexOf(code)
            return this
          }
        }
        return false
      },
      getList() {
        let list = [
          'h:mm:ss AM/PM',
          'hh:mm:ss',
          'h:mm AM/PM',
          'hh:mm',
          'h',
          'hh',
          's',
          'ss',
          '[h]',
          '[m]',
          '[s]'
        ]
        return list
      },
      display() {
        return Formatter.formatHtml(this.getCode(), this.value)
      }
    },
    {
      category: 'fraction',
      title: '分数',
      value: 0.5,
      listIndex: 0,
      getCode() {
        return this.getList()[this.listIndex]
      },
      parse(code: string) {
        if (code && code.indexOf('return') < 0) {
          let list = this.getList()
          if (list.indexOf(code) >= 0) {
            this.listIndex = list.indexOf(code)
            return this
          }
        }
        return false
      },
      getList() {
        let list = ['##0/##0', '# ?/2', '# ?/4', '# ?/8', '# ?/16']
        return list
      },
      getLabels() {
        return [
          '自动计算分母',
          '以 2 为分母 (1/2)',
          '以 4 为分母 (2/4)',
          '以 8 为分母 (4/8)',
          '以 16 为分母 (8/16)'
        ]
      },
      display() {
        return Formatter.formatHtml(this.getCode(), this.value)
      }
    },
    // {
    //   category: 'fileSize',
    //   title: '文件大小',
    //   value: 1234567890,
    //   listIndex: 0,
    //   getCode() {
    //     return this.getList()[this.listIndex]
    //   },
    //   parse(code) {
    //     if (code && code.indexOf('return') < 0) {
    //       let list = this.getList()
    //       if (list.indexOf(code) >= 0) {
    //         this.listIndex = list.indexOf(code)
    //         return this
    //       }
    //     }
    //     return false
    //   },
    //   getList() {
    //     let list = ['#,##0" B"', '#,##0," K"', '#,##0,," M"', '#,##0,,," G"']
    //     return list
    //   },
    //   display() {
    //     return Formatter.formatHtml(this.getCode(), this.value)
    //   }
    // },
    {
      category: 'code',
      title: '代码',
      value: `DataHu.formatter.formatHtml(
  '0.00;"#FD0101#"(0.00)', 
  value)`,
      listIndex: 0,
      getCode() {
        let code = this.value
        if (code.indexOf('return') < 0) {
          code = 'return ' + code
        }
        return code
      },
      parse(code: string) {
        if (code) {
          if (code.indexOf(`return`) >= 0) {
            this.value = code
            return this
          }
        }
        return false
      },
      getList() {
        return []
      },
      display() {
        return '自定义代码'
      }
    }
  ]
}
export default defineComponent({
  name: 'FormatterSelect',
  components: {CodeEditor},
  props: ['modelValue', 'disabled', 'label'],
  setup(props: any, {emit}) {
    let visible = ref(false)
    let formatHtml = (code, value) => {
      return Formatter.formatHtml(code, value)
    }

    let samples: Ref<Array<any>> = ref(getSamples())

    let codeToSample = (code: string, samples) => {
      for (let sample of samples) {
        if (sample.parse(code)) {
          return sample
        }
      }
      return null
    }

    let defaultSamples = getSamples()
    let displayText = computed(() => {
      let sample = codeToSample(props.modelValue, defaultSamples)
      if (sample) {
        return sample.display()
      }
      return props.modelValue
    })

    let selectedSample: Ref<ISample> = ref(samples.value[0])
    let activeKey = computed({
      get() {
        return selectedSample.value.category
      },
      set(v) {
        for (let sample of samples.value) {
          if (sample.category == v) {
            selectedSample.value = sample
          }
        }
      }
    })

    let openModal = () => {
      selectedSample.value = codeToSample(props.modelValue, samples.value)
      visible.value = true
    }

    let save = () => {
      visible.value = false
      let code = selectedSample.value.getCode()
      emit('update:modelValue', code)
      emit('change', code)
    }

    return {
      visible,
      displayText,
      save,
      samples,
      activeKey,
      openModal,
      formatHtml,
      selectedSample
    }
  }
})
</script>

<style lang="less">
.c-formatter-select {
  width: 100%;
  > button {
    width: 100%;
    text-align: center;
  }
}
.c-formatter-select-modal {
  .c-formatter-list {
    .ant-tag {
      width: 100%;
      padding: 4px 8px;
    }
    > div {
      margin-top: 10px;
      .ant-list {
        max-height: 500px;
        overflow: auto;
        .ant-list-item {
          padding: 4px 8px;
        }
      }
    }

    .c-list-selected {
      background-color: var(--border-color-base);
    }
  }
  .ant-tabs .ant-tabs-left-bar .ant-tabs-tab,
  .ant-tabs .ant-tabs-right-bar .ant-tabs-tab {
    margin: 0px;
  }
}
</style>
