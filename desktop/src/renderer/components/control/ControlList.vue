<template>
  <div class="c-control-list">
    <template v-if="expand">
      <template v-for="control in controls" :key="control.name">
        <a-form-item
          :class="{
            'c-form-item-required': fieldFunction(
              control.required,
              formData,
              false
            ),
            'c-bold-form-item': control.children && control.children.length > 0
          }"
          :name="control.name"
          v-bind="validateInfos[control.name]"
          :label="control.title"
          :title="control.description"
          v-if="fieldFunction(control.show, formData, true)"
        >
          <Field
            @change="change"
            size="small"
            v-if="!control.array"
            :field-function="fieldFunction"
            :disabled="fieldFunction(control.disabled, formData, false)"
            v-model="formData[control.name]"
            :data="formData"
            :config="control"
          ></Field>
          <span class="c-field-array" v-if="control.array">
            <template v-if="formData[control.name]">
              <div v-for="(v, index) in formData[control.name]" :key="index">
                <Field
                  @change="change"
                  size="small"
                  :field-function="fieldFunction"
                  :disabled="fieldFunction(control.disabled, formData, false)"
                  v-model="formData[control.name][index]"
                  :index="index"
                  :data="formData"
                  :config="control"
                ></Field>
              </div>
            </template>
            <icon
              @click="updateField(control, false)"
              v-if="
                fieldFunction(control.addable, formData, false) &&
                formData[control.name] &&
                formData[control.name].length > 0
              "
              type="subtract"
            />
            <icon
              @click="updateField(control, true)"
              v-if="fieldFunction(control.addable, formData, false)"
              type="plus"
            />
          </span>
        </a-form-item>
        <span
          v-if="
            control.children &&
            control.children.length > 0 &&
            formData[control.name] &&
            fieldFunction(control.show, formData, true)
          "
          class="c-control-list-line"
        >
          <template v-if="control.array && formData[control.name]">
            <div v-for="(v, index) in formData[control.name]" :key="index">
              <ControlList
                :field-function="fieldFunction"
                @change="change"
                :parent="control"
                v-model="formData[control.name][index]"
              ></ControlList>
            </div>
          </template>
          <ControlList
            :field-function="fieldFunction"
            v-if="!control.array"
            @change="change"
            :parent="control"
            v-model="formData[control.name]"
          ></ControlList>
        </span>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import {defineComponent, computed, ref, reactive} from 'vue'
import {useI18n, useState} from '../../use/state'
import {ControlType, IControl, Util} from '@datahu/core'
import {Form} from 'ant-design-vue'
const useForm = Form.useForm
import Field from './Field.vue'
export default defineComponent({
  name: 'ControlList',
  components: {Field},
  props: ['parent', 'modelValue', 'fieldFunction'],
  setup(props: any, {emit}) {
    let i18n = useI18n()

    let formData = computed(() => {
      return props.modelValue
    })
    let controls = computed(() => {
      return props.parent.children
    })

    let validateInfos = computed(() => {
      var rules: any = {}
      let ruleRef = reactive(rules)
      for (let control of props.parent.children) {
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
              required: props.fieldFunction(
                con.required,
                formData.value,
                false
              ),
              validator: (rule: any, v: any) => {
                var required = props.fieldFunction(
                  rule.control.required,
                  formData.value,
                  false
                )
                if (required && (v == null || v === '' || v == undefined)) {
                  return Promise.reject(i18n.value.common_required_message)
                }
                var result = props.fieldFunction(
                  rule.control.validate,
                  formData.value,
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
      return useForm(formData.value, ruleRef).validateInfos
    })

    let init = () => {}

    let change = (arg: any) => {
      emit('change', arg)
    }

    let updateField = (control: IControl, isAdd: boolean) => {
      let v = formData.value[control.name!]
      if (isAdd) {
        if (!v) {
          v = []
          formData.value[control.name!] = v
        }
        v.push(Util.copy(control.defaultValue))
      } else {
        v.splice(v.length - 1, 1)
      }
      console.log('update field', formData.value)
    }

    let expand = ref(true)

    return {
      i18n,
      controls,
      formData,
      validateInfos,
      change,
      updateField,
      expand
    }
  }
})
</script>

<style lang="less">
.c-control-list {
  border: 1px solid var(--border-color-base);
  padding: 4px;
  position: relative;
  min-height: 33px;
  .c-bold-form-item {
    &.ant-form-item {
      margin-bottom: 0px;
      margin-top: 5px;
    }
    font-weight: bold;
  }
  .c-field-array {
    display: inline-block;

    > div {
      display: inline-block;
      position: relative;
    }
    > span.c-icon {
      display: inline-block;
      margin: 3px;
      cursor: pointer;
    }
  }
}
</style>
