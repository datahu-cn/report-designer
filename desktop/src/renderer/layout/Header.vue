<template>
  <div class="c-header">
    <div class="c-action c-pkg-name">
      <span :title="state.pkg.path">{{ state.pkg.getName() }}</span>
    </div>
    <div class="c-right">
      <div class="c-action">
        <a-button type="link" @click="newPkgHandle()">
          <icon type="new" />
          新建
        </a-button>
      </div>
      <div class="c-action">
        <a-dropdown @click="loadPkg()">
          <a-button type="link">
            <icon type="open" />
            打开
            <DownOutlined />
          </a-button>
          <template #overlay>
            <a-menu>
              <a-menu-item @click="loadPkg()" key="2">
                <icon type="open" />
                浏览
              </a-menu-item>
              <a-sub-menu
                v-if="
                  state.store &&
                  state.store.recenty &&
                  state.store.recenty.length > 0
                "
                key="recent"
              >
                <template #title>
                  <span>
                    <icon class="c-mr4" type="open" />
                    <span>最近</span>
                  </span>
                </template>
                <a-menu-item
                  v-for="item in state.store.recenty"
                  @click="loadPkgFromPath(item)"
                >
                  <span :title="item.path">{{ item.path }}</span>
                </a-menu-item>
              </a-sub-menu>
            </a-menu>
          </template>
        </a-dropdown>
      </div>

      <div class="c-action">
        <a-dropdown @click="onSave()">
          <a-button type="link">
            <a-badge :dot="state.pkg.hasChange()">
              <icon type="save" />
              {{ i18n.common_save }}
            </a-badge>
            <DownOutlined />
          </a-button>

          <template #overlay>
            <a-menu>
              <a-menu-item @click="onSave()" key="1">
                <icon type="save" />
                {{ i18n.common_save }}
              </a-menu-item>
              <a-menu-item @click="onSave('1')" key="2">
                <icon type="save" />
                {{ i18n.common_save_as }}
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
      <div class="c-action">
        <a-dropdown>
          <a-button type="link">
            <icon type="datasource" />
            数据
            <DownOutlined />
          </a-button>
          <template #overlay>
            <DataSourceList>
              <a-menu-item @click="reloadData()">
                <ReloadOutlined />
                刷新数据
              </a-menu-item>
            </DataSourceList>
          </template>
        </a-dropdown>
      </div>
      <div class="c-action">
        <a-button type="link" @click="state.showEditRelationship = true">
          <icon type="ralation" />
          关系
        </a-button>
      </div>
      <div class="c-action">
        <a-button type="link" @click="showDataRole = true">
          <icon type="role" />
          角色
        </a-button>
      </div>
      <div class="c-action">
        <a-button type="link" @click="publish()">
          <icon type="publish" />
          发布
        </a-button>
      </div>
      <div class="c-action">
        <a-button type="link" @click="preview()">
          <icon type="preview" />
          预览
        </a-button>
      </div>

      <div class="c-action" v-if="currentChartProxy">
        <a-dropdown>
          <a-button type="link">
            <icon type="chart" />
            {{ '组件' }}
            <DownOutlined />
          </a-button>

          <template #overlay>
            <a-menu>
              <a-menu-item @click="currentChartProxy.switchLock()" key="1">
                <icon :type="currentChartProxy.lock ? 'lock' : 'unlock'" />
                {{ currentChartProxy.lock ? '解锁' : '锁定' }}
              </a-menu-item>
              <a-menu-item @click="currentChartProxy.refreshChart()" key="2">
                <icon type="refresh" />
                刷新
              </a-menu-item>
              <a-menu-item @click="currentChartProxy.switchLevel(-1)" key="3">
                <icon type="down" />
                置底
              </a-menu-item>
              <a-menu-item @click="currentChartProxy.switchLevel(1)" key="4">
                <icon type="up" />
                置顶
              </a-menu-item>
              <a-menu-item @click="currentChartProxy.onCopy(false)" key="5">
                <icon type="copy" />
                复制
              </a-menu-item>
              <a-menu-item @click="currentChartProxy.onCopy(true)" key="6">
                <icon type="cut" />
                剪切
              </a-menu-item>
              <a-menu-item
                @click="currentChartProxy.onFormatPainterFrom()"
                key="7"
              >
                <icon type="formatpainter" />
                格式刷
              </a-menu-item>
              <a-menu-item @click="currentChartProxy.removeChart()" key="8">
                <icon type="close" />
                删除
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
      <!-- <div class="c-action">
        <a-dropdown type="link" placement="bottomCenter">
          <a-button type="link">
            <icon :type="viewMode.icon" />
            {{ viewMode.name }}
            <DownOutlined />
          </a-button>
          <template #overlay>
            <a-menu>
              <template v-for="item in viewModes">
                <a-menu-item @click="switchViewMode(item)">
                  <a href="javascript:;">
                    <icon :type="item.icon" />
                    {{ item.description }}
                  </a>
                </a-menu-item>
              </template>
            </a-menu>
          </template>
        </a-dropdown>
      </div> -->
      <div class="c-action">
        <a-dropdown type="link" placement="bottomCenter">
          <div
            v-html="getThemeHtml(theme)"
            class="c-theme-item c-theme-selector"
          ></div>
          <template #overlay>
            <a-menu>
              <a-menu-item
                v-for="item in themes"
                :key="item.name"
                @click="theme = item.name"
              >
                <div v-html="getThemeHtml(item.opt)" class="c-theme-item"></div>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
    <EditRelationship
      v-if="state.showEditRelationship"
      v-model:visible="state.showEditRelationship"
    ></EditRelationship>
    <DataRole v-if="showDataRole" v-model:visible="showDataRole"></DataRole>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  nextTick,
  useCssModule
} from 'vue'
import {
  useState,
  useI18n,
  useLanguage,
  newPkg,
  loadPkg,
  loadPkgFromPath
} from '../use/state'
import {
  SaveOutlined,
  DownOutlined,
  FolderOpenOutlined,
  ReloadOutlined
} from '@ant-design/icons-vue'
import {message, Modal} from 'ant-design-vue'
import http from '../use/http'
import EditRelationship from '../components/relationship/EditRelationship.vue'
import DataSourceList from '../components/dataSource/DataSourceList.vue'
import {PackageManager} from '../use/PackageManager'
import {getThemes} from '@datahu/core'
import ReloadTables from '../components/table/ReloadTables.vue'
import {userChartState} from '@datahu/component'
import DataRole from '../components/actions/DataRole.vue'
export default defineComponent({
  components: {
    SaveOutlined,
    DownOutlined,
    FolderOpenOutlined,
    ReloadOutlined,
    EditRelationship,
    DataSourceList,
    ReloadTables,
    DataRole
  },
  setup() {
    let i18n = useI18n()
    let language = useLanguage()
    let state = useState()
    let chartState = userChartState()

    let newPkgHandle = async () => {
      Modal.confirm({
        title: '',
        icon: '',
        content: '新建将关闭当前报表，请确定是否继续。',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          newPkg()
        }
      })
    }

    let onSave = async (saveAs: any) => {
      if (!state.pkg.hasPath() || saveAs == '1') {
        await state.pkg.saveAs()
      } else {
        await state.pkg.save()
      }
    }

    let loading = ref(false)
    let reloadData = async () => {
      loading.value = true
      await state.pkg.loadData(language.value, true)
      // 定时器演示使用
      setTimeout(() => {
        loading.value = false
      }, 1000)
    }

    const loaded = () => {
      loading.value = false
    }

    let showDataRole = ref(false)

    let preview = () => {
      state.preview = true
    }
    let publish = async () => {
      state.publish = true
    }

    let themes = []
    for (let name in getThemes()) {
      themes.push({name, opt: getThemes()[name]})
    }
    let theme = computed({
      get() {
        return getThemes()[state.pkg.getTheme()]
      },
      set(v: string) {
        state.pkg.setTheme(v)
      }
    })

    let getThemeHtml = (theme: any) => {
      if (theme) {
        let color = theme.echarts.color
        let html = `<div style="background-color:${theme.echarts.backgroundColor}">`
        for (let i = 0; i < 4; i++) {
          html += `<div style="background-color:${
            color.length > i ? color[i] : '#ffffff'
          }"></div>`
        }
        html += '</div>'
        return html
      }
      return ''
    }

    let currentChartProxy = computed(() => {
      if (state.focusItem && state.focusItem != state.root) {
        let instance = chartState.chartHandler.getInstance(state.focusItem.item)
        if (instance) {
          return instance.proxy
        }
      }
      return null
    })

    let viewModes = [
      {
        id: 'lg',
        name: '大屏',
        width: 1200,
        description: '大屏(1200)',
        icon: 'pc'
      },
      {
        id: 'md',
        name: '中屏',
        width: 996,
        description: '中屏(996)',
        icon: 'pad'
      },
      {
        id: 'sm',
        name: '小屏',
        width: 768,
        description: '小屏(768)',
        icon: 'pad'
      },
      {
        id: 'xs',
        name: '手机',
        width: 480,
        description: '手机(480)',
        icon: 'phone'
      }
    ]
    let viewMode = ref(state.viewMode || viewModes[0])
    let switchViewMode = (mode: any) => {
      viewMode.value = mode
      state.viewMode = viewMode
    }

    return {
      i18n,
      state,
      onSave,
      loadPkg,
      loadPkgFromPath,
      reloadData,
      showDataRole,
      preview,
      publish,
      themes,
      theme,
      getThemeHtml,
      newPkgHandle,
      loading,
      loaded,
      currentChartProxy,
      viewModes,
      viewMode,
      switchViewMode
    }
  }
})
</script>
<style lang="less">
.c-header {
  border-bottom: 1px solid #f0f0f0;
  .c-pkg-name {
    font-size: 1.17em;
    font-weight: bold;
    max-width: 25%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .ant-modal-content-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .c-right {
    float: right;
    max-width: 75%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .c-action {
    position: relative;
    display: inline-block;
    padding: 2px 0px 0px 0px;
    .ant-btn {
      padding: 0 10px;
      > .anticon + span,
      > span + .anticon {
        margin-left: 5px;
      }
    }
    .ant-btn-link {
      color: var(--text-color);
    }
    .c-icon {
      fill: var(--text-color);
    }
    .ant-dropdown-button {
      .ant-btn {
        padding-right: 1px;
      }
      .ant-badge {
        padding-right: 3px;
        margin-right: 4px;
      }
    }
    .ant-select-focused:not(.ant-select-disabled).ant-select-single:not(.ant-select-customize-input)
      .ant-select-selector {
      border-color: transparent;
      background-color: transparent;
      box-shadow: none;
    }
    div.ant-select-selector {
      color: var(--link-color);
      border-color: transparent;
      background-color: transparent;
      box-shadow: none;
      &:hover {
        border-color: transparent;
        background-color: transparent;
        box-shadow: none;
      }
    }
  }
}
.c-theme-item {
  width: 30px;
  height: 30px;
  border-radius: var(--border-radius-base);
  display: inline-block;
  vertical-align: middle;
  border: 1px solid var(--border-color-base);
  white-space: pre-wrap;
  > div {
    width: 100%;
    height: 100%;
    line-height: 0px;
    border-radius: var(--border-radius-base);
    display: block;
    > div {
      display: inline-block;
      width: 10px;
      height: 10px;
      margin: 2.5px 0px 0px 2.5px;
    }
  }
}
</style>
