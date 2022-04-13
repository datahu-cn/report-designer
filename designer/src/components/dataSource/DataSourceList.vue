<template>
  <a-menu class="c-datasource-list">
    <a-menu-item
      v-if="showToolbarMenu(HeaderToolbarMenu.DataList)"
      @click="onSelectTable(item)"
      v-for="item in list"
      :key="item.title"
    >
      <span class="c-datasource-list-svg" v-html="item.ds.icon"></span>
      {{ item.connector.config.title }}
    </a-menu-item>
    <a-menu-item
      v-if="showToolbarMenu(HeaderToolbarMenu.DataOnline)"
      @click="newOnlineDataSource()"
      key="online"
    >
      <icon type="plus" />
      在线数据
    </a-menu-item>
    <a-menu-item
      v-if="showToolbarMenu(HeaderToolbarMenu.DataNew)"
      @click="newDataSource"
    >
      <icon type="plus" />
      {{ i18n.dataSource_new_text }}
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
    </a-menu-item>
    <slot></slot>
  </a-menu>
</template>

<script lang="ts">
import {ref, watch, onMounted, computed, Ref, nextTick} from 'vue'
import {useLanguage, useState, useI18n} from '../../use/state'
import EditDataSource from '../../components/dataSource/EditDataSource.vue'
import SelectTables from '../../components/dataSource/SelectTables.vue'
import EditOnlineDataSource from './EditOnlineDataSource.vue'
import http from '../../use/http'
import {message} from 'ant-design-vue'
import {Util} from '@datahu/core'
import {useRouter} from 'vue-router'
import {HeaderToolbarMenu} from '../../IDataHuDesignerOption'
export default {
  components: {
    EditDataSource,
    EditOnlineDataSource,
    SelectTables
  },
  setup(props: any) {
    let dataSources: Ref<Array<any>> = ref([])
    let language = useLanguage()
    let state = useState()
    let router = useRouter()
    let loadDS = async () => {
      var result = await http.request(http.option.getSupportDataSources, {
        language: language.value
      })
      dataSources.value = result as any
      console.log(dataSources)
    }

    onMounted(async () => {
      loadDS()
    })

    watch(language, () => {
      loadDS()
    })

    let i18n = useI18n()

    let list: Ref<Array<any>> = ref([])
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

    let onEdit = (v: any) => {
      if (v.connector.type == 'CDataDataSource') {
        onlineEditItem.value = v.connector
      } else {
        editItem.value = v.connector
      }
    }

    let onSubmit = async (v: any) => {
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
        onSelectTable(item)
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
      selectTableItem,
      onSelectTable,
      onSelectTableSubmit,
      editItem,
      onSubmit,
      newDataSource,
      i18n,
      dataSources,
      list,
      onlineEditItem,
      newOnlineDataSource,
      onEdit,
      HeaderToolbarMenu,
      showToolbarMenu: http.showToolbarMenu
    }
  }
}
</script>

<style lang="less">
.c-datasource-list {
  .c-datasource-list-svg {
    svg {
      vertical-align: middle;
      width: 15px;
      height: 15px;
    }
  }
}
</style>
