<template>
  <div class="c-edit-datasource">
    <a-drawer
      :title="isNew ? i18n.dataSource_new_text : i18n.dataSource_edit_text"
      placement="right"
      :closable="false"
      width="80%"
      v-model:visible="visible"
    >
      <div class="c-edit-datasource-body">
        <div>
          <h3>代理网关</h3>
          <a-form
            ref="proxyForm"
            :model="source.proxy"
            :rules="rules"
            class="c-controls-form"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-item label="开启代理网关">
              设计时
              <a-switch v-model:checked="source.proxy.designEnabled" />
              &nbsp;&nbsp; &nbsp; &nbsp; 发布后
              <a-switch v-model:checked="source.proxy.publishEnabled" />
            </a-form-item>
            <a-form-item
              v-if="source.proxy.designEnabled || source.proxy.publishEnabled"
              name="url"
              class="c-form-item-required"
              label="代理网关地址"
            >
              <a-input v-model:value="source.proxy.url" />
            </a-form-item>
            <a-form-item
              name="secret"
              class="c-form-item-required"
              v-if="source.proxy.designEnabled || source.proxy.publishEnabled"
              label="代理网关密钥"
            >
              <Field
                v-model="source.proxy.secret"
                :config="{type: 'password', title: ''}"
              />
            </a-form-item>
          </a-form>
        </div>

        <div class="c-mt10">
          <h3>数据源配置</h3>
          <Form
            ref="form"
            v-if="dsConfig"
            v-model="source.config"
            :controls="dsConfig.controls"
          ></Form>
        </div>
        <div class="c-drawer-footer">
          <a-button style="margin-right: 8px" @click="visible = null">
            {{ i18n.common_cancel }}
          </a-button>
          <a-button
            type="primary"
            style="margin-right: 8px"
            @click="onSubmit()"
          >
            {{ i18n.common_submit }}
          </a-button>
        </div>
      </div>
    </a-drawer>
    <SelectDataSource
      @cancel="cancel"
      v-if="isNew && !source.type"
      v-model="source.type"
      :data-sources="dataSources"
    ></SelectDataSource>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive, ref, Ref} from 'vue'
import {useI18n} from '../../use/state'
import http from '../../use/http'
import {Util, Crypto} from '@datahu/core'
import SelectDataSource from './SelectDataSource.vue'
import Field from '../control/Field.vue'
import Form from '../control/Form.vue'
import {config} from 'process'
export default defineComponent({
  name: 'EditDataSource',
  components: {SelectDataSource, Field, Form},
  props: ['modelValue', 'dataSources', 'visible'],
  setup(props: any, {emit}) {
    let i18n = useI18n()
    let isNew = ref(true)
    if (props.modelValue && props.modelValue.type) {
      isNew.value = false
    }

    let source = reactive(Util.copy(props.modelValue))
    if (!source.proxy) {
      source.proxy = {
        designEnabled: false,
        publishEnabled: false,
        url: '',
        secret: ''
      }
    }
    let dsConfig = computed(() => {
      if (source.type) {
        for (let ds of props.dataSources) {
          if (ds.type == source.type) {
            var defaultConfig = Util.copy(ds.config)
            Util.cloneTo(source.config, defaultConfig)
            source.config = defaultConfig
            return ds
          }
        }
      }
      return null
    })

    let visible = computed({
      get() {
        return !!props.modelValue
      },
      set() {
        emit('update:modelValue', null)
      }
    })

    let proxyForm: Ref<any> = ref(null)
    let form: Ref<any> = ref(null)
    let onSubmit = async () => {
      try {
        await form.value.validate()
        await proxyForm.value.validate()
        emit('submit', source)
      } catch (e) {
        console.warn(e)
      }
    }

    let cancel = () => {
      emit('update:modelValue', null)
    }

    const rules = {
      url: [{required: true, message: '不能为空', trigger: 'blur'}],
      secret: [{required: true, message: '不能为空', trigger: 'blur'}]
    }

    return {
      labelCol: {span: 5},
      wrapperCol: {span: 13},
      cancel,
      visible,
      isNew,
      i18n,
      source,
      form,
      dsConfig,
      onSubmit,
      proxyForm,
      rules
    }
  }
})
</script>

<style lang="less">
.c-edit-datasource-body {
  padding: 20px 40px;
  h3 {
    padding: 10px;
  }
}
</style>
