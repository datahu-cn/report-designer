<template>
  <div class="c-form">
    <a-form
      class="c-controls-form"
      v-if="controls"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <template v-for="control in controls">
        <a-form-item
          :key="control.name"
          :class="{
            'c-form-item-required': fieldFunction(
              control.required,
              formRef,
              false
            )
          }"
          :name="control.name"
          v-bind="validateInfos[control.name]"
          :label="control.title"
          :title="control.description"
          v-if="fieldFunction(control.show, formRef, true)"
        >
          <Field
            :disabled="fieldFunction(control.disabled, formRef, false)"
            v-model="formRef[control.name]"
            :field-function="fieldFunction"
            :data="formRef"
            :config="control"
          ></Field>
        </a-form-item>
      </template>
    </a-form>
  </div>
</template>

<script lang="ts">
import {defineComponent, computed, ref, reactive} from 'vue'
import {useI18n} from '../../use/state'
import Field from '../control/Field.vue'
import {ControlType, Util} from '@datahu/core'
import {Form} from 'ant-design-vue'
const useForm = Form.useForm
export default defineComponent({
  name: 'Form',
  components: {Field},
  props: ['modelValue', 'controls'],
  setup(props: any, {emit}) {
    let i18n = useI18n()

    let fieldFunction = (fun: any, formData: any, defaultValue: any) => {
      if (!fun) {
        return defaultValue
      }
      if (typeof fun == typeof defaultValue) {
        return fun
      }
      if (typeof fun == 'function') {
        return fun(formData)
      }
      let funCode: Function = new Function('return ' + fun)()
      return funCode(formData)
    }

    let formRef = computed(() => {
      return props.modelValue
    })
    var rules: any = {}
    for (let control of props.controls) {
      var con = control as any
      if (con.validate || con.required) {
        let validateType = 'string'
        switch (con.type) {
          case ControlType.number:
            validateType = 'number'
            break
          case ControlType.boolean:
            validateType = 'boolean'
            break
          case ControlType.datetime:
            validateType = 'date'
            break
          default:
            break
        }
        rules[con.name] = [
          {
            control: con,
            type: validateType,
            required: fieldFunction(con.required, formRef, false),
            validator: (rule: any, v: any) => {
              var required = fieldFunction(
                rule.control.required,
                formRef.value,
                false
              )
              if (required && (v == null || v == '' || v == undefined)) {
                return Promise.reject(i18n.value.common_required_message)
              }
              var result = fieldFunction(
                rule.control.validate,
                formRef.value,
                true
              )
              if (result === true) {
                return Promise.resolve(v)
              }
              return Promise.reject(result)
            },
            trigger: 'change'
          }
        ]
      }
    }

    let ruleRef = reactive(rules)
    const {validate, validateInfos} = useForm(formRef, ruleRef)

    return {
      labelCol: {span: 4},
      wrapperCol: {span: 14},
      i18n,
      formRef,
      fieldFunction,
      validate,
      validateInfos
    }
  }
})
</script>

<style lang="less">
.c-form {
  .c-form-item-required {
    label::before {
      display: inline-block;
      margin-right: 4px;
      color: #ff4d4f;
      font-size: 14px;
      font-family: SimSun, sans-serif;
      line-height: 1;
      content: '*';
    }
  }
}
</style>
