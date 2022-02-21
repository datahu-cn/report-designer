<template>
  <div>
    <a-drawer
      :title="'在线数据'"
      placement="right"
      :closable="false"
      class="c-edit-online-datasource-drawer"
      width="80%"
      v-model:visible="visible"
    >
      <div class="c-edit-online-datasources">
        <div class="c-layouts">
          <div class="c-layout-body" v-if="currentUser">
            <a-spin :spinning="loading">
              <div v-if="loaded" class="c-layout-left">
                <div class="c-layout-left-item">
                  <UserSelect
                    v-model="currentUser"
                    @change="currentUserChange"
                  ></UserSelect>
                </div>
                <div class="c-layout-left-item">
                  <span>最大条目数: {{ query.max }}</span>
                  <a-slider
                    :marks="{10: '10', 50: '50'}"
                    v-model:value="query.max"
                    :min="10"
                    :max="50"
                  />
                </div>
                <div class="c-layout-left-item">
                  <CategoryTree
                    :hidden-zero="true"
                    v-model="query.paths"
                    :categories="categories"
                    @change="onSearch"
                  ></CategoryTree>
                </div>
              </div>
              <div class="c-layout-right">
                <div class="c-layout-search">
                  <a-input-search
                    v-if="currentUser"
                    v-model:value="query.text"
                    placeholder="搜索您想要的数据..."
                    class="c-layout-header-search"
                    size="large"
                    enter-button
                    @search="onSearch"
                  />
                </div>
                <a-list
                  size="large"
                  item-layout="horizontal"
                  :data-source="tables"
                >
                  <template #renderItem="{item}">
                    <a-list-item>
                      <a-list-item-meta :description="item.description">
                        <template #title>
                          <a-tag size="small">
                            {{ item.categoryName }}
                          </a-tag>
                          <a href="javascript:;" @click="openDetail(item)">
                            {{ item.title }}
                          </a>
                        </template>
                      </a-list-item-meta>
                      <template #extra></template>
                      <template #actions>
                        <span>
                          <icon type="view" />
                          {{ item.viewCount || 0 }}
                        </span>
                        <span>
                          <icon type="like" />
                          {{ item.likeCount || 0 }}
                        </span>
                        <span>
                          <a
                            v-if="source.config.tables.indexOf(item.title) < 0"
                            href="javascript:;"
                            @click="add(item)"
                          >
                            添加
                          </a>
                          <a
                            v-else
                            href="javascript:;"
                            @click="remove(item)"
                            class="c-danger-link"
                          >
                            移除
                          </a>
                        </span>
                      </template>
                    </a-list-item>
                  </template>
                </a-list>
              </div>
            </a-spin>
          </div>
        </div>
        <div class="c-drawer-footer">
          <a-select
            :dropdown-match-select-width="false"
            mode="multiple"
            v-if="source.config.tables.length > 0"
            style="margin-right: 8px"
            :size="size"
            v-model:value="source.config.tables"
          >
            <a-select-option
              :value="item"
              v-for="item in source.config.tables"
              :key="item"
            >
              {{ item }}
            </a-select-option>
          </a-select>
          <a-button style="margin-right: 8px" @click="visible = null">
            {{ i18n.common_cancel }}
          </a-button>
          <a-button
            type="primary"
            style="margin-right: 8px"
            @click="onSubmit()"
            :disabled="source.config.tables.length == 0"
          >
            {{ i18n.common_submit }}
          </a-button>
        </div>
      </div>
    </a-drawer>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  defineEmit,
  onMounted,
  reactive,
  toRefs,
  unref,
  Ref,
  ref
} from 'vue'
import {useI18n, useState, useLanguage} from '../../use/state'
import http from '../../use/http'
import DataSourceTableViewer from './DataSourceTableViewer.vue'
import DataSourceTableColumn from './DataSourceTableColumn.vue'
import {message} from 'ant-design-vue'
import {ITableDefinition, Util} from '@datahu/core'
import UserSelect from '../common/UserSelect.vue'
import CategoryTree from '../common/CategoryTree.vue'
export default defineComponent({
  name: 'SelectTables',
  components: {
    DataSourceTableViewer,
    DataSourceTableColumn,
    UserSelect,
    CategoryTree
  },
  props: ['modelValue'],
  setup(props: any, {emit}) {
    let i18n = useI18n()
    let state = useState()
    let language = useLanguage()

    let loading = ref(false)
    let source = reactive(Util.copy(props.modelValue))
    let loaded = ref(false)

    let visible = computed({
      get() {
        return !!props.modelValue
      },
      set(v) {
        emit('update:modelValue', null)
      }
    })

    let query = reactive({paths: '', text: '', max: 20})
    let tables = ref([])
    let categories = ref([])
    let searchTables = async () => {
      loading.value = true
      try {
        let result: any = await http.request('ServerRequest/searchTables', {
          user: currentUser.value,
          query: query
        })
        tables.value = result.tables
        categories.value = result.categories
        loading.value = false
      } catch (e) {
        loading.value = false
      }
      loaded.value = true
    }

    if (!source.id && state.store.user) {
      // 新建数据源前， 检查是否存在相同用户下的数据源，直接使用相同的数据源
      for (let connector of state.pkg.definition.connectors) {
        if (connector.type == 'CDataDataSource') {
          if (
            connector.config.user.server == state.store.user.server &&
            connector.config.user.user.id == state.store.user.user.id
          ) {
            source.id = connector.id
            source.config = Util.copy(connector.config)
          }
        }
      }
    }

    let currentUser: Ref<any> = ref(null)
    if (source.config.user) {
      // 刷新数据源连接的用户信息， 用于用户token失效后刷新token
      for (let user of state.store.users) {
        if (
          source.config.user.server == user.server &&
          source.config.user.id == user.user.id
        ) {
          currentUser.value = user
          source.config.user = user
        }
      }
      if (currentUser.value == null) {
        currentUser.value = source.config.user
      }
    } else {
      currentUser.value = state.store.user
    }

    let currentUserChange = () => {
      if (currentUser.value) {
        searchTables()
      }
    }
    currentUserChange()

    let onSubmit = async () => {
      source.config.title = source.config.tables.join()
      source.config.user = currentUser.value
      emit('submit', source)
    }

    let onSearch = () => {
      currentUserChange()
    }

    let add = (item: any) => {
      if (source.config.tables.indexOf(item.title) < 0) {
        source.config.tables.push(item.title)
      }
    }
    let remove = (item: any) => {
      source.config.tables.splice(source.config.tables.indexOf(item.title), 1)
    }

    let openDetail = async (item: any) => {
      await http.request('ServerRequest/openLink', {
        url: currentUser.value.server + '/data/detail/' + item.id
      })
    }

    return {
      loading,
      visible,
      i18n,
      onSubmit,
      currentUser,
      currentUserChange,
      onSearch,
      query,
      tables,
      categories,
      add,
      remove,
      source,
      openDetail,
      loaded
    }
  }
})
</script>

<style lang="less">
.c-edit-online-datasource-drawer {
  .ant-drawer-wrapper-body {
    overflow: hidden;
  }
  .c-danger-link {
    color: var(--error-color);
  }
}

.c-edit-online-datasources {
  width: 100%;
  height: 100%;

  .c-layouts {
    width: 100%;
    height: 100%;
    padding-bottom: 100px;
    .c-layout-header {
      padding-bottom: 10px;
      .c-user-select {
        display: inline-block;
        width: 20%;
      }
      .c-layout-header-search {
        float: right;
        width: 79%;
        height: 42px;
      }
    }

    .c-layout-body {
      width: 100%;
      height: 100%;

      .c-layout-left {
        display: inline-block;
        width: 20%;
        height: 100%;
        overflow-y: overlay;
        background-color: #f8f9fe;
        .c-layout-left-item {
          padding: 20px;
          margin-bottom: 10px;
          border-radius: 2px;
        }
      }
      .c-layout-right {
        float: right;
        width: 79%;
        height: 100%;
        padding: 3px 20px;
        .ant-tag {
          fill: white;
        }
        .c-layout-search {
          margin-bottom: 20px;
        }
        .ant-list {
          padding: 10px;
          .ant-list-lg .ant-list-item {
            padding: 26px 0px;
          }
        }
      }
    }
  }
}
</style>
