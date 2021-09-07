<template>
  <div class="c-edit-datasource">
    <a-drawer
      :title="isNew ? i18n.dataSource_new_text : i18n.dataSource_edit_text"
      placement="right"
      :closable="false"
      width="80%"
      v-model:visible="visible"
    >
      <Form
        ref="form"
        v-if="dsConfig"
        v-model="source.config"
        :controls="dsConfig.controls"
      ></Form>
      <div class="c-drawer-footer">
        <a-button style="margin-right: 8px" @click="visible = null">
          {{ i18n.common_cancel }}
        </a-button>
        <a-button type="primary" style="margin-right: 8px" @click="onSubmit()">
          {{ i18n.common_submit }}
        </a-button>
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
import {
  computed,
  defineComponent,
  defineEmit,
  onMounted,
  reactive,
  ref,
  Ref
} from 'vue'
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
    if (!isNew.value && source.config.password) {
      source.config.password = Crypto.Decrypt(
        source.config.password,
        'sjwkdjsklwjfdlks'
      )
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

    let form: Ref<any> = ref(null)
    let onSubmit = async () => {
      try {
        await form.value.validate()
        if (source.config.password) {
          source.config.password = Crypto.Encrypt(
            source.config.password,
            'sjwkdjsklwjfdlks'
          )
        }
        emit('submit', source)
      } catch (e) {
        console.warn(e)
      }
    }

    let cancel = () => {
      emit('update:modelValue', null)
    }

    return {
      cancel,
      visible,
      isNew,
      i18n,
      source,
      form,
      dsConfig,
      onSubmit
    }
  }
})
</script>

<style lang="less">
.c-edit-datasource {
}
</style>
