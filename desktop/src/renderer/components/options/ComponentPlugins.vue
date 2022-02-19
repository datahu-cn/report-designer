<template>
  <div class="c-component-plugins">
    <a-button class="c-ml3" type="primary" @click="add()">
      <template #icon>
        <icon type="plus" style="fill: white" />
      </template>
      添加插件
    </a-button>
    <a-list item-layout="horizontal" :data-source="plugins">
      <template #renderItem="{item}">
        <a-list-item>
          <template #actions>
            <a @click="remove(item)">{{ i18n.common_delete }}</a>
          </template>
          <a-list-item-meta :description="item.description">
            <template #title>
              {{ item.name }}
              <a-tag color="blue">{{ item.name }}</a-tag>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script lang="ts">
import {Util} from '@datahu/core'
import {
  defineComponent,
  ref,
  reactive,
  onMounted,
  computed,
  createVNode
} from 'vue'
import http from '../../use/http'
import {useState, useI18n, useLanguage} from '../../use/state'
import {getPlugins, addPlugin, removePlugin} from '../../use/plugin'
import {message, Modal} from 'ant-design-vue'
import {ExclamationCircleOutlined} from '@ant-design/icons-vue'
export default defineComponent({
  name: 'ComponentPlugins',
  setup() {
    let i18n = useI18n()
    onMounted(async () => {})

    let plugins = getPlugins()

    let add = () => {
      addPlugin()
    }
    let remove = (item: any) => {
      Modal.confirm({
        title: '删除确认',
        icon: createVNode(ExclamationCircleOutlined),
        content: '删除插件后，使用该插件的组件将无法使用，请确认是否继续',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          removePlugin(item)
        }
      })
    }

    return {i18n, plugins, add, remove}
  }
})
</script>

<style lang="less">
.c-component-plugins {
  padding: 0px;
}
</style>
