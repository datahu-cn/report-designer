<template>
  <div class="c-dev-component-list">开发：</div>
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

    return {state}
  }
})
</script>

<style lang="less">
.c-dev-component-list {
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
