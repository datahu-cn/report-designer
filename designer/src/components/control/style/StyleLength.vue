<template>
  <div
    class="c-style-length"
    :class="{'c-style-length-number': !numberDiabled() || label}"
    size="small"
    compact
  >
    <a-input
      :addon-before="label"
      v-if="!numberDiabled() || label"
      :disabled="numberDiabled()"
      size="small"
      v-model:value="lengthValue"
      type="number"
    ></a-input>
    <a-select
      size="small"
      :dropdown-match-select-width="false"
      :options="options"
      v-model:value="lengthType"
    ></a-select>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  onMounted,
  watchEffect,
  watch
} from 'vue'
import {useI18n, useState} from '../../../use/state'
export default defineComponent({
  name: 'StyleLength',
  components: {},
  props: ['modelValue', 'auto', 'label', 'options'],
  setup(props: any, {emit}) {
    let i18n = useI18n()

    let defaultOptions = [
      {label: '自动', value: 'auto', number: false},
      {label: 'px', value: 'px', number: true},
      {label: '%', value: '%', number: true},
      {label: 'em', value: 'em', number: true}
    ]

    let options = computed(() => {
      if (props.options) {
        return props.options
      }
      if (props.auto) {
        return [
          {label: '自动', value: 'auto', number: false},
          {label: 'px', value: 'px', number: true},
          {label: '%', value: '%', number: true},
          {label: 'em', value: 'em', number: true}
        ]
      }
      return [
        {label: 'px', value: 'px', number: true},
        {label: '%', value: '%', number: true},
        {label: 'em', value: 'em', number: true}
      ]
    })

    let numberDiabled = () => {
      for (let opt of options.value) {
        if (opt.value == lengthType.value) {
          return !opt.number
        }
      }
      return true
    }

    let getNumber = () => {
      let v = props.modelValue
      let lengthValue = ''
      for (let opt of options.value) {
        if (isEndWith(v, opt.value)) {
          lengthValue = v.substring(0, v.length - opt.value.length)
          break
        }
      }
      return lengthValue
    }

    let isEndWith = (v: string, type: string) => {
      if (type != '') {
        return v && v.endsWith && v.endsWith(type)
      }
      if (v == type) {
        return true
      }
      if (v && v.endsWith && '1234567890'.indexOf(v[v.length - 1]) >= 0) {
        return true
      }
      return false
    }

    let getNumberType = () => {
      let v = props.modelValue
      let lengthType = ''
      for (let opt of options.value) {
        if (isEndWith(v, opt.value)) {
          lengthType = v.substring(v.length - opt.value.length)
          break
        }
      }
      return lengthType
    }

    let lengthValue = computed({
      get() {
        return getNumber()
      },
      set(v: any) {
        let changeValue = v + lengthType.value
        emit('update:modelValue', changeValue)
        emit('change', changeValue)
      }
    })

    let lengthType = computed({
      get() {
        return getNumberType()
      },
      set(v: any) {
        let changeValue = ''
        let currentOpt = null
        for (let opt of options.value) {
          if (opt.value == v) {
            currentOpt = opt
          }
        }
        if (currentOpt) {
          if (currentOpt.number) {
            changeValue = lengthValue.value + v
          } else {
            changeValue = v
          }
        }
        emit('update:modelValue', changeValue)
        emit('change', changeValue)
      }
    })

    return {i18n, lengthValue, lengthType, options, numberDiabled}
  }
})
</script>

<style lang="less">
.c-style-length {
  line-height: 0px;
  white-space: nowrap;
  input {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    border-right-width: 0px;
  }
  &.c-style-length-number {
    .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
    }
  }
  div.ant-input-number,
  input.ant-input,
  div.ant-select {
    width: 63px;
  }
  span.ant-input-group-wrapper {
    width: 98px;
    input.ant-input {
      width: 63px;
    }
  }
}
</style>
