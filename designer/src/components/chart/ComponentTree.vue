<template>
  <div class="c-component-tree">
    <a-tree
      :tree-data="treeData"
      show-icon
      :selectedKeys="selectedKeys"
      v-model:expandedKeys="expandedKeys"
      @select="select"
    >
      <template #title="node">
        <a-dropdown :trigger="['contextmenu']">
          <span>
            {{ node.title }}
          </span>

          <template #overlay>
            <a-menu v-if="!menuHandler(node).root">
              <a-menu-item
                v-if="menuHandler(node).proxy"
                @click="menuHandler(node).proxy.switchLock()"
                key="1"
              >
                <icon
                  :type="menuHandler(node).proxy.lock ? 'lock' : 'unlock'"
                />
                {{ menuHandler(node).proxy.lock ? '解锁' : '锁定' }}
              </a-menu-item>
              <a-menu-item
                v-if="menuHandler(node).proxy"
                @click="menuHandler(node).proxy.refreshChart()"
                key="2"
              >
                <icon type="refresh" />
                刷新
              </a-menu-item>
              <a-menu-item
                v-if="menuHandler(node).proxy"
                @click="menuHandler(node).proxy.switchLevel(-1)"
                key="3"
              >
                <icon type="down" />
                置底
              </a-menu-item>
              <a-menu-item
                v-if="menuHandler(node).proxy"
                @click="menuHandler(node).proxy.switchLevel(1)"
                key="4"
              >
                <icon type="up" />
                置顶
              </a-menu-item>
              <a-menu-item
                v-if="menuHandler(node).proxy"
                @click="menuHandler(node).proxy.onCopy(false)"
                key="5"
              >
                <icon type="copy" />
                复制
              </a-menu-item>
              <a-menu-item
                v-if="menuHandler(node).proxy"
                @click="menuHandler(node).proxy.onCopy(true)"
                key="6"
              >
                <icon type="cut" />
                剪切
              </a-menu-item>
              <a-menu-item
                v-if="menuHandler(node).proxy"
                @click="menuHandler(node).proxy.onFormatPainterFrom()"
                key="7"
              >
                <icon type="formatpainter" />
                格式刷
              </a-menu-item>
              <a-menu-item @click="remove(node)" key="8">
                <icon type="close" />
                删除
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </a-tree>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  onMounted,
  computed,
  createVNode,
  Ref
} from 'vue'
import {getColumnIcon} from '../common/icon/Icons'
import {useI18n, useLanguage, useState, DragTargetType} from '../../use/state'
import {
  TableOutlined,
  CaretDownOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons-vue'
import http from '../../use/http'
import {message, Modal} from 'ant-design-vue'
import CodeEditor from '../control/CodeEditor.vue'
import {
  DataMergeType,
  PackageHelper,
  IChartDefinition,
  IColumnDefinition,
  ITableDefinition,
  Util
} from '@datahu/core'
import {userChartState} from '@datahu/component-base'
import {DownOutlined} from '@ant-design/icons-vue'
export default defineComponent({
  name: 'TableTree',
  components: {CodeEditor, DownOutlined},
  props: ['modelValue', 'hoverField'],
  setup(props, {emit}) {
    onMounted(async () => {})

    let state = useState()
    let language = useLanguage()
    let chartState = userChartState()

    let chartComs: any = {}
    for (let comClass in state.components) {
      chartComs[comClass] = new state.components[comClass](language.value)
    }

    let buildNode = (children: Array<any>, chart: IChartDefinition) => {
      let innerEachChart = (children: Array<any>, charts: Array<any>) => {
        for (let chart of charts) {
          let node = null
          if (typeof chart == 'object' && chart.option) {
            let com = chartComs[chart.type]

            node = {
              key: chart.id,
              title: com ? com.title : '页面',
              children: [],
              chart: chart
            }
            if (chart.option.title && chart.option.title.name != '标题') {
              node.title += `[${chart.option.title.name}]`
            }
            children.push(node)
          }
          if (chart.children && chart.children.length > 0) {
            innerEachChart(node ? node.children : children, chart.children)
          }
          if (chart.length > 0) {
            innerEachChart(node ? node.children : children, chart)
          }
        }
      }
      innerEachChart(children, [chart])
    }

    let treeData = computed(() => {
      let trees: Array<any> = []
      let root = state.pkg.definition.chart
      buildNode(trees, root)
      return trees
    })

    let expandedKeys = ref([state.pkg.definition.chart.id])

    let selectedKeys = computed(() => {
      if (state.focusItem) {
        return [state.focusItem.item.id]
      } else {
        return []
      }
    })

    let select = (keys: any, e: any) => {
      let proxy = getChartProxy(e.node.dataRef.chart)
      if (proxy) {
        state.focusItem = proxy.chart
      }
    }

    let getChartProxy = (chart: IChartDefinition) => {
      let instance = chartState.chartHandler.getInstance(chart)
      if (instance) {
        return instance.proxy
      }
      return null
    }

    let menuHandler = (node: any) => {
      let proxy = getChartProxy(node.dataRef.chart)
      return {proxy, root: state.pkg.definition.chart == node.dataRef.chart}
    }

    let remove = (node: any) => {
      let handler = menuHandler(node)
      if (handler.proxy) {
        handler.proxy.removeChart()
      } else {
        Modal.confirm({
          title: '删除确认',
          icon: '',
          content: '',
          okText: '确认',
          cancelText: '取消',
          onOk() {
            let parent: IChartDefinition | null = null
            PackageHelper.eachChart(
              state.pkg.definition.chart,
              (chart: IChartDefinition, p: IChartDefinition) => {
                if (chart == node.dataRef.chart) {
                  parent = p
                }
              }
            )
            if (parent) {
              state.pkg.removeChart(parent, node.dataRef.chart)
            }
          }
        })
      }
    }
    return {
      state,
      treeData,
      selectedKeys,
      select,
      menuHandler,
      remove,
      expandedKeys
    }
  }
})
</script>

<style lang="less">
.c-component-tree {
  .ant-tree li .ant-tree-node-content-wrapper.ant-tree-node-selected {
    background-color: var(--primary-color);
    color: white;
    border-radius: 24px;
  }
}
</style>
