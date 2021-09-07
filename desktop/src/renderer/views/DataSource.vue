<template>
  <div class="c-datasource">
    <h2>{{ i18n.dataSource_header }}</h2>
    <div>
      <a-button type="primary" @click="newDataSource()">
        <template #icon>
          <icon type="plus" style="fill: white" />
        </template>
        {{ i18n.dataSource_new_text }}
      </a-button>
      <a-button class="c-ml3" type="primary" @click="newOnlineDataSource()">
        <template #icon>
          <icon type="plus" style="fill: white" />
        </template>
        在线数据源
      </a-button>
      <a-list item-layout="horizontal" :data-source="list">
        <template #renderItem="{item}">
          <a-list-item>
            <template #actions>
              <a @click="onSelectTable(item)">
                {{ i18n.dataSource_select_tables_text }}
              </a>
              <a @click="onEdit(item)">{{ i18n.common_edit }}</a>
              <a @click="onDelete(item)">{{ i18n.common_delete }}</a>
            </template>
            <a-list-item-meta :description="item.ds.description">
              <template #title>
                {{ item.connector.config.title }}
                <a-tag color="blue">{{ item.ds.title }}</a-tag>
              </template>
              <template #avatar>
                <span v-html="item.ds.icon"></span>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
      <EditDataSource
        v-if="editItem"
        v-model="editItem"
        :data-sources="dataSources"
        @submit="onSubmit"
      ></EditDataSource>
      <SelectTables
        v-if="selectTableItem"
        v-model="selectTableItem"
        @submit="onSelectTableSubmit"
        @edit="onEdit(selectTableItem)"
      ></SelectTables>
      <EditOnlineDataSource
        v-if="onlineEditItem"
        v-model="onlineEditItem"
        @submit="onSubmit"
      ></EditOnlineDataSource>
    </div>
  </div>
</template>

<script lang="ts">
import {PlusOutlined, ExclamationCircleOutlined} from '@ant-design/icons-vue'
import {message, Modal} from 'ant-design-vue'
import {
  defineComponent,
  ref,
  createVNode,
  watch,
  onMounted,
  computed,
  Ref,
  nextTick
} from 'vue'
import http from '../use/http'
import {useI18n, useLanguage, useState} from '../use/state'
import EditDataSource from '../components/dataSource/EditDataSource.vue'
import SelectTables from '../components/dataSource/SelectTables.vue'
import {Util} from '@datahu/core'
import {useRoute, useRouter} from 'vue-router'
import EditOnlineDataSource from '../components/dataSource/EditOnlineDataSource.vue'
export default defineComponent({
  name: 'DataSource',
  components: {EditDataSource, SelectTables, EditOnlineDataSource},
  setup() {
    let dataSources: Ref<Array<any>> = ref([])
    let language = useLanguage()
    let state = useState()

    let loadDS = async () => {
      var result = await http.request('DataSource/getSupportDataSources', {
        language: language.value
      })
      dataSources.value = result as any
    }

    let i18n = useI18n()

    let list: Ref<Array<any>> = ref([])

    let openDefaultOnlineTable = () => {
      if (state.usedata) {
        let connector = {
          config: {
            user: state.usedata.user,
            title: state.usedata.table,
            tables: [state.usedata.table]
          },
          type: 'CDataDataSource',
          id: Util.uniqueId()
        }
        state.usedata = null

        onSubmit(connector, connector.config.tables[0])
      }
    }

    let initList = async () => {
      await loadDS()
      let data = []
      if (dataSources.value && dataSources.value.length > 0) {
        for (let connector of state.pkg.definition.connectors) {
          let item = {connector, ds: null}
          data.push(item)
          for (let ds of dataSources.value) {
            if (ds.type == item.connector.type) {
              item.ds = ds
            }
          }
        }
      }
      list.value = data

      openDefaultOnlineTable()
    }
    initList()

    let editItem: any = ref(null)

    let newDataSource = () => {
      editItem.value = {
        type: '',
        id: Util.uniqueId(),
        config: {
          title: i18n.value.dataSource_new_text + '1'
        }
      }
    }

    let onSubmit = async (v: any, defaultSelectedTable = '') => {
      let isNew = true
      for (let i = 0; i < state.pkg.definition.connectors.length; i++) {
        let ds = state.pkg.definition.connectors[i]
        if (ds.id == v.id) {
          state.pkg.definition.connectors[i] = v
          isNew = false
          break
        }
      }
      let item: any = null
      if (isNew) {
        state.pkg.definition.connectors.push(v)
        item = {connector: v, ds: null}
        for (let ds of dataSources.value) {
          if (ds.type == item.connector.type) {
            item.ds = ds
          }
        }
        list.value.push(item)
        state.pkg.addAction('new_datasource', v)
      } else {
        for (let it of list.value) {
          if (it.connector.id == v.id) {
            item = it
            break
          }
        }
        item.connector = v
        state.pkg.addAction('edit_datasource', v)
      }
      editItem.value = null
      onlineEditItem.value = null
      selectTableItem.value = null

      // 提交后自动打开该数据源
      nextTick(() => {
        if (defaultSelectedTable) {
          item.defaultSelectedTable = defaultSelectedTable
        }
        console.log('-----open----', item)
        onSelectTable(item)
      })
    }

    let onEdit = (v: any) => {
      if (v.connector.type == 'CDataDataSource') {
        onlineEditItem.value = v.connector
      } else {
        editItem.value = v.connector
      }
    }

    let onDelete = (v: any) => {
      let remindString = ''
      for (let table of state.pkg.definition.tables) {
        if (table.connectorId == v.connector.id) {
          remindString += (table.alias || table.name) + ', '
        }
      }
      remindString = remindString
        ? `将同步删除关联的表格${remindString}，请确认是否继续`
        : `请确认是否继续`
      Modal.confirm({
        title: '删除确认',
        icon: createVNode(ExclamationCircleOutlined),
        content: remindString,
        okText: '确认',
        cancelText: '取消',
        onOk() {
          state.pkg.removeConnector(v.connector)
          list.value.splice(list.value.indexOf(v), 1)
        }
      })
    }

    let selectTableItem = ref(null)
    let onSelectTable = (v: any) => {
      selectTableItem.value = v
    }
    let onSelectTableSubmit = (v: any) => {
      message.success('设置成功')
      selectTableItem.value = null
    }

    let onlineEditItem: Ref<any> = ref(null)
    let newOnlineDataSource = () => {
      onlineEditItem.value = {
        type: 'CDataDataSource',
        id: Util.uniqueId(),
        config: {
          title: '',
          user: null,
          tables: []
        }
      }
    }

    return {
      dataSources,
      list,
      i18n,
      newDataSource,
      editItem,
      selectTableItem,
      onSubmit,
      onEdit,
      onDelete,
      onSelectTable,
      onSelectTableSubmit,
      onlineEditItem,
      newOnlineDataSource
    }
  }
})
</script>

<style lang="less">
.c-datasource {
  padding: 20px;
  .ant-list-items {
    margin-top: 20px;
    padding: 0px 10px;
    background-color: white;
    .ant-list-item-meta-avatar {
      svg {
        width: 48px;
        height: 48px;
      }
    }
    .ant-tag {
      margin-left: 10px;
    }
  }
}
</style>
