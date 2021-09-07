<template>
  <div class="com-page-layout">
    <div
      class="com-page-layout-container"
      v-if="
        view &&
        chart.children.length == 1 &&
        !chart.option.pageContent.showTabWhenOnlyOne
      "
    >
      <div class="com-page-content" :style="chart.option.pageContent.style">
        <DropPanel
          v-if="chart.children[0].id == activeKey"
          :chart="chart.children[0]"
        ></DropPanel>
      </div>
    </div>
    <a-tabs
      v-else
      v-model:activeKey="activeKey"
      :type="getTabType()"
      :tab-bar-style="getTabBarStyle()"
      :tab-position="getTabPosition()"
      :hide-add="view"
      @edit="onEdit"
    >
      <a-tab-pane
        v-for="page in chart.children"
        :key="page.id"
        :closable="chart.children.length > 1 && !view"
      >
        <template #tab>
          <span @dblclick="startRenamePage(page)" v-if="editPage != page">
            {{ page.option.title.name }}
          </span>
          <input
            class="c-tab-edit-input"
            v-else
            @blur="renamePage($event, page)"
            @keydown.enter="renamePage($event, page)"
            :value="page.option.title.name"
            type="text"
          />
        </template>
        <div
          class="com-page-layout-container"
          :style="{zoom: view ? 1 : state.zoomRate + '%'}"
        >
          <div class="com-page-content" :style="chart.option.pageContent.style">
            <DropPanel v-if="page.id == activeKey" :chart="page"></DropPanel>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, createVNode, Ref, computed} from 'vue'
import {Modal} from 'ant-design-vue'
import {CloseOutlined, ExclamationCircleOutlined} from '@ant-design/icons-vue'
import {IChartDefinition, Util} from '@datahu/core'
import DropPanel from '../chart/DropPanel.vue'
import {userChartState, gotoPage, getContext} from '../chart/chartState'
export default defineComponent({
  name: 'PageLayout',
  props: ['chart', 'pkg', 'view', 'optionAfterTheme'],
  components: {DropPanel},
  setup(props) {
    let chart = props.chart
    let context = getContext()
    let state = context.state
    let chartSate = userChartState()
    if (chart.children.length == 0) {
      chart.children.push({
        id: Util.uniqueId(),
        type: 'DropPanel',
        filters: [],
        option: {
          title: {show: true, name: '新页面'}
        },
        children: []
      })
    }

    let getTabType = (): string => {
      if (props.view) {
        if (chart.option.pageContent.tabType) {
          return chart.option.pageContent.tabType
        }
        return 'line'
      } else {
        return 'editable-card'
      }
    }

    let getTabBarStyle = () => {
      if (props.view && props.optionAfterTheme.pageContent.tabBarStyle) {
        return props.optionAfterTheme.pageContent.tabBarStyle
      }
      return {}
    }
    let getTabPosition = () => {
      if (props.view && props.optionAfterTheme.pageContent.tabPosition) {
        return props.optionAfterTheme.pageContent.tabPosition
      }
      return 'top'
    }

    let selectPage = ref('')
    let activeKey = computed({
      get() {
        if (chart == props.pkg.getChart()) {
          let has = false
          for (let child of chart.children) {
            if (child.id == chartSate.currentPage) {
              has = true
              break
            }
          }
          if (!has) {
            gotoPage(chart.children[0].id)
          }
          return chartSate.currentPage
        } else {
          if (!selectPage.value) {
            selectPage.value = chart.children[0].id
          }
          return selectPage.value
        }
      },
      set(v: any) {
        if (chart == props.pkg.getChart()) {
          gotoPage(v)
        } else {
          selectPage.value = v
        }
      }
    })
    const add = () => {
      let newTab = {
        id: Util.uniqueId(),
        option: {title: {name: '新页面' + (chart.children.length + 1)}},
        children: []
      }
      activeKey.value = newTab.id
      chart.children.push(newTab)
    }

    const remove = (targetKey: string) => {
      if (chart.children == 1) {
        return
      }

      let removeTab: any = null
      for (let tab of chart.children) {
        if (tab.id == targetKey) {
          removeTab = tab
          break
        }
      }

      let realRemove = () => {
        if (activeKey.value == removeTab.id) {
          let removeIndex = chart.children.indexOf(removeTab)
          if (removeIndex == 0) {
            activeKey.value = chart.children[1].id
          } else {
            activeKey.value = chart.children[removeIndex - 1].id
          }
        }
        props.pkg.removeChart(chart, removeTab)
      }

      if (removeTab.children.length > 0) {
        Modal.confirm({
          title: '删除确认',
          icon: createVNode(ExclamationCircleOutlined),
          content: '',
          okText: '确认',
          cancelText: '取消',
          onOk() {
            realRemove()
          }
        })
      } else {
        realRemove()
      }
    }

    const onEdit = (targetKey: string | MouseEvent, action: string) => {
      if (action === 'add') {
        add()
      } else {
        remove(targetKey as string)
      }
    }

    let editPage: Ref<any> = ref(null)
    const startRenamePage = (page: IChartDefinition) => {
      if (!props.view) {
        editPage.value = page
      }
    }
    const renamePage = (e: Event, page: IChartDefinition) => {
      if (e && e.target) {
        page.option.title.name = (e.target as any).value
      }
      props.pkg.updateOption(page)
      editPage.value = null
    }

    return {
      chart,
      activeKey,
      onEdit,
      editPage,
      startRenamePage,
      renamePage,
      getTabType,
      getTabBarStyle,
      getTabPosition,
      state
    }
  }
})
</script>

<style lang="less">
.com-page-layout {
  width: 100%;
  height: 100%;
  > div.ant-tabs {
    height: 100%;
    width: 100%;
    .ant-tabs-new-tab {
      margin-right: 10px;
      color: var(--primary-color);
      border-color: var(--primary-color);
    }
    .ant-tabs-card-bar {
      .ant-tabs-tab-active {
        background-color: var(--primary-color);
        color: #ffffff;
        .ant-tabs-close-x {
          color: #ffffff;
        }
      }
    }

    &.ant-tabs-bottom .ant-tabs-bottom-bar {
      margin-top: 0px;
    }
    .c-tab-edit-input {
      height: 30px;
      border: 1px solid var(--border-color-base);
      border-radius: 3px;
      color: var(--text-color);
    }
    .ant-tabs-bar {
      margin-bottom: 1px;
      background-color: white;
    }
    > div.ant-tabs-content {
      height: calc(100% - 40px);
      .ant-tabs-tabpane-active {
        height: 100%;
      }
    }
  }
  .com-page-layout-container {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    .com-page-content {
      min-width: 20px;
      min-height: 20px;
    }
  }
}
</style>
