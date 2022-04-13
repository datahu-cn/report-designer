<template>
  <div class="c-component-list">
    <h3 class="c-panel-title">组件</h3>
    <Multipanel layout="horizontal" style="height: calc(100% - 50px)">
      <div style="height: 250px" class="c-pane">
        <div class="c-chart-items">
          <div
            v-for="com in components"
            :key="com.instance.id"
            draggable="true"
            @dragstart="dragstartHandle(com)"
            @dragend="dragendHandle(com)"
            class="c-chart-item"
            v-html="com.instance.icon"
            :title="com.instance.description || com.instance.title"
          ></div>
        </div>
      </div>
      <MultipaneResizer></MultipaneResizer>
      <div class="c-pane" style="height: calc(100% - 250px)">
        <TableTree :hover-field="state.dragContext.hoverField"></TableTree>
      </div>
    </Multipanel>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  reactive,
  watchEffect,
  watch,
  Ref
} from 'vue'
import {useI18n, useState, useLanguage, DragTargetType} from '../../use/state'
import http from '../../use/http'
import TableTree from '../table/TableTree.vue'
import Multipanel from '../common/multipanel/Multipanel.vue'
import MultipaneResizer from '../common/multipanel/MultipaneResizer.vue'
import {IComponent} from '@datahu/core'

export default defineComponent({
  name: 'ComponentList',
  components: {TableTree, Multipanel, MultipaneResizer},
  props: ['connector', 'table'],
  setup(props: any) {
    let i18n = useI18n()
    let state = useState()

    let language = useLanguage()

    let dragstartHandle = (com: IComponent) => {
      state.dragContext.type = DragTargetType.chart
      state.dragContext.target = com
    }
    let dragendHandle = (com: IComponent) => {
      state.dragContext.target = null
    }

    let components: Ref<Array<any>> = ref([])
    for (let comClass in state.components) {
      components.value.push({
        type: comClass,
        instance: new state.components[comClass](language.value)
      })
    }

    // It makes no sense to make "versions" reactive
    return {components, dragstartHandle, dragendHandle, state}
  }
})
</script>

<style lang="less">
.c-component-list {
  height: 100%;
  padding: 5px;
  .c-multipane.layout-h {
    .c-pane {
      border-right-width: 0px;
    }
  }
  .c-chart-items {
    .c-chart-item {
      cursor: pointer;
      padding: 3px;
      width: 39px;
      height: 39px;
      border-radius: var(--border-radius-base);
      display: inline-block;
      line-height: 0px;
      overflow: hidden;
      &:hover {
        padding: 0px;
        transition: 0.5s padding;
        background-color: var(--warning-color);
        svg {
          width: 37px;
          height: 37px;
          transition: 0.5s height, 0.5s width;
        }
      }
      svg {
        width: 31px;
        height: 31px;
      }
    }
  }
}
</style>
