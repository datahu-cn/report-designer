<template>
  <DragResize
    class="c-chart-panel"
    :class="[
      chart.com.isLayout ? 'c-component-layout' : 'c-component-chart',
      state.preview ? 'c-component-preview' : ''
    ]"
    :unit="chartState.unit"
    :w="chart.item.option.pos.width"
    :h="chart.item.option.pos.height"
    :x="chart.item.option.pos.left"
    :y="chart.item.option.pos.top"
    :fix-width="chart.item.option.pos.fixWidth"
    :fix-height="chart.item.option.pos.fixHeight"
    :parent="true"
    :isConflictCheck="false"
    :drag-cancel="'.drag-cancel'"
    :min-width="5"
    :min-height="5"
    :snap="true"
    v-model:active="isActive"
    :prevent-deactivation="true"
    :snapTolerance="1"
    @size-change="sizeChange($event, chart)"
    @refLineParams="getRefLineParams"
    :resizable="
      !chart.item.option.disableResize &&
      !lock &&
      !state.preview &&
      !isFullScreen
    "
    :draggable="
      !chart.item.option.disableDrag && !lock && !state.preview && !isFullScreen
    "
    @keydown="onKeyDown"
    @keyup="onKeyUp"
    :style="chartPanelStyle"
    @click="chartPanelClick()"
  >
    <div
      v-if="isActive && !state.preview"
      draggable="true"
      class="drag-cancel c-drag-to-other-panel"
    >
      <a-button
        v-if="parent"
        @click="switchLock"
        size="small"
        shape="circle"
        type="link"
        :title="lock ? '解锁' : '锁定'"
      >
        <template #icon>
          <ComponentIcon :type="lock ? 'lock' : 'unlock'" />
        </template>
      </a-button>
      <a-button
        v-if="parent"
        @click="refreshChart()"
        size="small"
        shape="circle"
        type="link"
        title="刷新"
      >
        <template #icon><ComponentIcon type="refresh" /></template>
      </a-button>
      <a-button
        v-if="parent"
        @click="switchLevel(-1)"
        size="small"
        shape="circle"
        type="link"
        title="置底"
      >
        <template #icon><ComponentIcon type="down" /></template>
      </a-button>
      <a-button
        v-if="parent"
        @click="switchLevel(1)"
        size="small"
        shape="circle"
        type="link"
        title="置顶"
      >
        <template #icon><ComponentIcon type="up" /></template>
      </a-button>
      <a-button
        v-if="parent"
        @click="onCopy(false)"
        size="small"
        shape="circle"
        type="link"
        title="复制"
      >
        <template #icon><ComponentIcon type="copy" /></template>
      </a-button>
      <a-button
        v-if="parent"
        @click="onCopy(true)"
        size="small"
        shape="circle"
        type="link"
        title="剪切"
      >
        <template #icon><ComponentIcon type="cut" /></template>
      </a-button>
      <a-button
        v-if="parent"
        @click.stop="onFormatPainterFrom()"
        size="small"
        shape="circle"
        type="link"
        title="格式刷"
      >
        <template #icon><ComponentIcon type="formatpainter" /></template>
      </a-button>
      <a-button
        v-if="parent"
        @click="removeChart()"
        size="small"
        shape="circle"
        type="link"
        title="删除"
      >
        <template #icon><ComponentIcon type="close" /></template>
      </a-button>
    </div>
    <div class="c-drag-resize-panel" :style="panelStyle">
      <div
        v-if="chart.item && chart.item.option && isActive"
        class="drag-cancel c-data-operation-actions"
        :style="{fill: optionAfterTheme.title.style.color}"
      >
        <template
          v-if="
            chartData.drillStatus.level > 1 &&
            chart.item.option.dataOperation &&
            chart.item.option.dataOperation.showDrillDown
          "
        >
          <a-button
            v-if="chartData.drillStatus.index != 0"
            @click="drillDown(0)"
            size="small"
            shape="circle"
            type="link"
            title="下钻"
          >
            <template #icon>
              <ComponentIcon type="restore" />
            </template>
          </a-button>
          <a-button
            v-if="chartData.drillStatus.index < chartData.drillStatus.level - 1"
            @click="drillDown(1)"
            size="small"
            shape="circle"
            type="link"
            title="下钻"
          >
            <template #icon>
              <ComponentIcon type="down" />
            </template>
          </a-button>
          <a-button
            v-if="chartData.drillStatus.index > 0"
            @click="drillDown(-1)"
            size="small"
            shape="circle"
            type="link"
            title="上钻"
          >
            <template #icon>
              <ComponentIcon type="up" />
            </template>
          </a-button>
        </template>
        <a-button
          v-if="
            chart.item.option.dataOperation &&
            chart.item.option.dataOperation.showDataViewer
          "
          @click="openChartDataViewer()"
          size="small"
          shape="circle"
          type="link"
          title="数据"
        >
          <template #icon>
            <ComponentIcon type="data" />
          </template>
        </a-button>
        <a-button
          v-if="
            chart.item.option.dataOperation &&
            chart.item.option.dataOperation.showFullScreen
          "
          @click="isFullScreen = !isFullScreen"
          size="small"
          shape="circle"
          type="link"
          title="全屏缩放"
        >
          <template #icon>
            <ComponentIcon
              :type="isFullScreen ? 'smallscreen' : 'fullscreen'"
            />
          </template>
        </a-button>
      </div>
      <div
        v-if="chart.item.option.title.show"
        :style="titleStyle"
        class="c-component-title"
        @dblclick="handleEvent('title_dblclick')"
        @click="handleEvent('title_click')"
      >
        <span>{{ chart.item.option.title.name }}</span>
      </div>
      <div class="c-component-content">
        <component
          class="c-component-item"
          :chart="chart.item"
          :pkg="state.pkg"
          :is="chart.com.getComponent()"
          :data="chartData"
          :option-after-theme="optionAfterTheme"
          :view="state.preview"
          :language="language"
          v-if="!refreshing"
          @dblclick="handleEvent('body_dblclick')"
          @click="handleEvent('body_click')"
          @mousedown="checkHandleEvent()"
          ref="chartComponent"
        ></component>
      </div>
    </div>
    <ChartDataViewer
      :data="chartData"
      v-model:visible="chartDataViewerVisible"
    />
    <a-modal
      wrapClassName="c-chart-panel-full-modal"
      width="100%"
      v-model:visible="isFullScreen"
      title="全屏"
    >
      <component
        class="c-component-item"
        :chart="chart.item"
        :pkg="state.pkg"
        :is="chart.com.getComponent()"
        :data="chartData"
        :option-after-theme="optionAfterTheme"
        :view="state.preview"
        :language="language"
        v-if="!refreshing"
        @dblclick="handleEvent('body_dblclick')"
        @click="handleEvent('body_click')"
        @mousedown="checkHandleEvent()"
      ></component>
      <template #footer>
        <span></span>
      </template>
    </a-modal>
  </DragResize>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  reactive,
  watchEffect,
  watch,
  computed,
  createVNode,
  nextTick,
  onUnmounted,
  getCurrentInstance,
  Ref
} from 'vue'
import {Modal} from 'ant-design-vue'
import {applyTheme, CodeExpression} from '@datahu/core'
import {Util} from '@datahu/core'
import DragResize from './DragResize.vue'
import {ChartData} from '@datahu/core'
import ChartDataViewer from './ChartDataViewer.vue'
import {getContext, gotoPage, goBack, userChartState} from './chartState'
import {IChartEvent} from './ChartHandler'
import ComponentIcon from '../components/ComponentIcon.vue'

export default defineComponent({
  name: 'ComponentPanel',
  components: {DragResize, ChartDataViewer, ComponentIcon},
  props: ['chart', 'parent', 'resizeData'],
  setup(props: any, {emit}) {
    let context = getContext()
    let i18n = context.i18n
    let state = context.state
    let language = context.language
    let chartState = userChartState()

    let chart = props.chart

    let chartComponent: Ref<any> = ref(null)

    let initChartOption = () => {
      let defaultOption = chart.com.option
      Util.assignTo(defaultOption, chart.item.option, true)
    }
    initChartOption()

    let optionAfterTheme = computed(() => {
      let option = Util.copy(chart.item.option)
      applyTheme(option, state.pkg.getTheme(), chart.com)
      return option
    })

    // 窗体大小变化时，百分比计算值有微小变化，但此时应不算修改变更
    let minNumber = 0.0000001
    let sizeChange = (pos: any) => {
      if (
        (chart.item.option.pos.width.endsWith &&
          chart.item.option.pos.width.endsWith('px')) ||
        (chart.item.option.pos.height.endsWith &&
          chart.item.option.pos.height.endsWith('px')) ||
        Math.abs(chart.item.option.pos.width - pos.percent.width) > minNumber ||
        Math.abs(chart.item.option.pos.height - pos.percent.height) >
          minNumber ||
        Math.abs(chart.item.option.pos.left - pos.percent.left) > minNumber ||
        Math.abs(chart.item.option.pos.top - pos.percent.top) > minNumber
      ) {
        if (
          !state.preview &&
          pos.percent.width != 0 &&
          pos.percent.height != 0
        ) {
          chart.item.option.pos.width = pos.percent.width
          chart.item.option.pos.height = pos.percent.height
          chart.item.option.pos.left = pos.percent.left
          chart.item.option.pos.top = pos.percent.top

          chart.item.option.pos.px = pos.px
          state.pkg.updateOption(chart.item)
          emit('size-change', chart)
        }
      }
    }

    let isActive = computed({
      get() {
        return state.focusItem == chart
      },
      set(v) {
        if (v) {
          state.focusItem = chart
        }
      }
    })

    let removeChart = (isCut: boolean) => {
      let remove = () => {
        state.pkg.removeChart(props.parent, chart.item)
        if (chart == state.focusItem) {
          state.focusItem = state.root
        }
        emit('remove', chart)
      }
      if (isCut) {
        remove()
      } else {
        Modal.confirm({
          title: '删除确认',
          icon: '',
          content: '',
          okText: '确认',
          cancelText: '取消',
          onOk() {
            remove()
          }
        })
      }
    }

    // 辅助线回调事件
    let getRefLineParams = (params: any) => {
      if (props.resizeData) {
        const {vLine, hLine} = params
        let id = 0
        props.resizeData.vLine = vLine.map((item: any) => {
          item['id'] = ++id
          return item
        })
        props.resizeData.hLine = hLine.map((item: any) => {
          item['id'] = ++id
          return item
        })
      }
    }

    onMounted(() => {
      if (chart.isNew) {
        state.focusItem = chart
      }
    })

    let chartData = computed(() => {
      let cd = new ChartData(i18n, state.pkg.dataContext, chart.item)
      chart.data = cd
      return cd
    })

    let drillDown = (level: number) => {
      chartData.value.drillDownLevel(level)
    }

    let titleStyle = computed(() => {
      let opt = optionAfterTheme.value
      let style: any = {}
      if (opt.title && opt.title.show) {
        Util.cloneTo(opt.title.style, style)
        if (opt.title.position == 'top') {
          style.order = -1
        } else if (opt.title.position == 'bottom') {
          style.order = 1
        } else if (opt.title.position == 'left') {
          style.order = -1
        } else {
          style.order = 1
        }
      }
      return style
    })
    let panelStyle = computed(() => {
      let opt = optionAfterTheme.value
      let style: any = {}
      if (opt.body && opt.body.style) {
        Util.cloneTo(opt.body.style, style)
      }

      if (opt.title && opt.title.show) {
        if (opt.title.position == 'top') {
          style.flexFlow = 'column'
        } else if (opt.title.position == 'bottom') {
          style.flexFlow = 'column'
        } else if (opt.title.position == 'left') {
          style.flexFlow = 'row'
        } else {
          style.flexFlow = 'row'
        }
      }
      if (opt.body.overflow) {
        style.overflow = opt.body.overflow
      }
      return style
    })

    let switchLevel = (level: number) => {
      let parent = props.parent
      if (level == 1) {
        parent.children.push(
          parent.children.splice(parent.children.indexOf(chart.item), 1)[0]
        )
      } else {
        parent.children.unshift(
          parent.children.splice(parent.children.indexOf(chart.item), 1)[0]
        )
      }
      state.pkg.switchLevel(props.parent, chart.item, level)
      if (chart == state.focusItem) {
        state.focusItem = state.root
      }
      emit('switchLevel', {level, chart})
    }

    let onCopy = (isCut: boolean) => {
      state.copyedCharts = [chart.item]
      if (isCut) {
        removeChart(isCut)
      }
    }

    // 启用格式刷
    let onFormatPainterFrom = () => {
      state.formatPainterChart = chart.item
    }

    let canFormatPainterTo = () => {
      return (
        !state.preview &&
        state.formatPainterChart &&
        state.formatPainterChart.id != chart.item.id &&
        state.formatPainterChart.type == chart.item.type &&
        chart != state.root
      )
    }

    let chartPanelStyle = computed(() => {
      let style: any = {}
      if (canFormatPainterTo()) {
        style.cursor = 'context-menu'
      }
      return style
    })

    let chartPanelClick = () => {
      // 应用格式刷格式
      if (canFormatPainterTo()) {
        for (let key in state.formatPainterChart.option) {
          if (
            [
              '_enabled',
              'mergeMethod',
              'event',
              'disableResize',
              'disableDrag',
              'pos',
              'fields',
              'title'
            ].indexOf(key) < 0
          ) {
            chart.item.option[key] = Util.copy(
              state.formatPainterChart.option[key]
            )
          }
          if (key == 'title') {
            let copyTitle: any = Util.copy(state.formatPainterChart.option[key])
            copyTitle.name = chart.item.option.title.name
            chart.item.option[key] = copyTitle
          }
          if (key == 'pos') {
            for (let posKey in state.formatPainterChart.option.pos) {
              if (['left', 'top'].indexOf(posKey) < 0) {
                chart.item.option[key] = state.formatPainterChart.option[key]
              }
            }
          }
          if (key == 'fields') {
            for (let fieldKey in state.formatPainterChart.option.fields) {
              let fields = state.formatPainterChart.option.fields[fieldKey]
              let toFields = chart.item.option.fields[fieldKey]
              if (
                fields &&
                fields.length > 0 &&
                toFields &&
                toFields.length > 0
              ) {
                for (let i = 0; i < fields.length && i < toFields.length; i++) {
                  toFields[i].formatter = fields[i].formatter
                }
              }
            }
          }
        }
        state.pkg.updateOption(chart.item)
      }
      state.formatPainterChart = null
    }

    let lock = ref(false)

    // onPaste 事件有时无效，自己监听组合事件
    let pressedKey: any = {}
    let onKeyDown = (e: any) => {
      if (state.preview) return
      pressedKey[e.key] = true
      if (
        (pressedKey['Meta'] || pressedKey['Control']) &&
        pressedKey['Shift']
      ) {
        if (e.key == 'f' || e.key == 'F') {
          // 格式刷
          onFormatPainterFrom()
          e.preventDefault()
          e.stopPropagation()
        }
      } else if (pressedKey['Meta'] || pressedKey['Control']) {
        if (e.key == 'c' || e.key == 'C') {
          // copy
          onCopy(false)
        } else if (e.key == 'x' || e.key == 'X') {
          // cut
          onCopy(true)
        }
        e.preventDefault()
        e.stopPropagation()
      } else {
        if (e.key == 'Backspace' || e.key == 'backspace') {
          if (chart != state.root && !lock.value) {
            if (!(e.srcElement && e.srcElement.nodeName == 'INPUT')) {
              removeChart(false)
            }
          }
        }
        // e.preventDefault()
        e.stopPropagation()
      }
    }
    let onKeyUp = (e: any) => {
      console.log('key up', e.key)
      pressedKey[e.key] = false
    }

    let refreshing = ref(false)
    let refreshChart = () => {
      refreshing.value = true
      nextTick(() => {
        refreshing.value = false
      })
    }

    let chartDataViewerVisible = ref(false)
    let openChartDataViewer = () => {
      chartDataViewerVisible.value = true
    }

    let canHandle = false

    const instance = getCurrentInstance()
    let checkHandleEvent = () => {
      if (!state.preview) {
        // 在编辑模式下，只有active 的组件才会触发事件， 避免编辑操作获取焦点和事件冲突
        // 因为 mousedown focus click 事件的执行顺序是 mousedown focus click， 所以在 mousedown 事件中检查
        if (!isActive.value) {
          canHandle = false
          return
        }
      }
      canHandle = true
    }
    let handleEvent = async (trigger: string) => {
      if (!canHandle) {
        return
      }
      if (chart.item.option.event && chart.item.option.event.actions) {
        for (let action of chart.item.option.event.actions) {
          if (action.trigger == trigger) {
            if (action.handler == 'goto_page') {
              if (action.page) {
                gotoPage(action.page)
              }
            } else if (action.handler == 'goto_back') {
              goBack()
            } else if (action.handler == 'open_link') {
              if (action.link) {
                await state.openLink(action.link)
              }
            } else if (action.handler == 'run_code') {
              if (action.code) {
                CodeExpression.runCode(
                  action.code,
                  ['chart', 'chartData', 'instance', 'chartState'],
                  chart,
                  chartData.value,
                  instance,
                  chartState
                )
              }
            }
          }
        }
      }
    }

    let switchLock = () => {
      lock.value = !lock.value
      return lock.value
    }

    let events: Array<IChartEvent> = []
    chartState.chartHandler.addEvents(events)
    chartState.chartHandler.addInstance(instance)
    onUnmounted(() => {
      chartState.chartHandler.removeEvents(events)
      chartState.chartHandler.removeInstance(instance)
    })

    let isFullScreen = ref(false)

    return {
      chartState,
      chart,
      sizeChange,
      isActive,
      removeChart,
      getRefLineParams,
      state,
      chartData,
      drillDown,
      panelStyle,
      titleStyle,
      switchLevel,
      onCopy,
      onFormatPainterFrom,
      onKeyDown,
      onKeyUp,
      lock,
      switchLock,
      refreshChart,
      refreshing,
      optionAfterTheme,
      openChartDataViewer,
      chartDataViewerVisible,
      language,
      checkHandleEvent,
      handleEvent,
      isFullScreen,
      chartPanelStyle,
      chartPanelClick,
      chartComponent
    }
  }
})
</script>

<style lang="less">
.c-chart-panel {
  width: 100%;
  &.c-component-fullscreen {
    position: fixed !important;
    top: 0px !important;
    left: 0px !important;
    width: 100vw !important;
    height: 100vh !important;
    z-index: 10000 !important;
    transform: translate(0px, 0px) !important;
  }
  &:focus {
    outline: 1px solid var(--light-warning-color);
  }
  &.active {
    outline: 1px solid var(--light-warning-color);
  }
  &.c-component-preview {
    .c-drop-panel .c-drop-cell {
      border-style: none;
    }
  }
  .c-drag-resize-panel {
    width: 100%;
    height: 100%;
    // overflow: hidden;
    position: relative;
    display: flex;
    .c-data-operation-actions {
      width: auto;
      position: absolute;
      right: 0px;
      z-index: 100000;
      .ant-btn {
        .c-icon {
          fill: var(--text-color-secondary);
        }
      }
    }
    .c-drag-to-other-panel {
      position: absolute;
      top: -23px;
      right: 0px;
      z-index: 100000;
      background-color: #00000040;
      padding: 0px 7px;
      height: 22px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      white-space: nowrap;
      > button.ant-btn-icon-only.ant-btn-sm {
        height: 16px;
        width: 16px;
        line-height: 14px;
        font-size: 14px;
        min-width: 0px;
        min-height: 0px;
        margin-left: 7px;
        .c-icon {
          fill: white;
        }

        &:first-child {
          margin-left: 0px;
        }
      }
    }
    .c-component-title {
      flex: 0 0 auto;
      align-items: center;
      display: flex;
    }
    .c-component-content {
      width: 100%;
      margin: 0px;
      flex: 1 1 auto;
      // overflow: hidden;
      .c-component-item {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.c-chart-panel-full-modal {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }
  .ant-modal-body {
    flex: 1;
    height: 100%;
    .c-component-item {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
