<template>
  <div ref="resizerRef" class="c-multipane-resizer">
    <slot></slot>
    <div
      v-if="showExpand"
      title="展开和收起"
      @click="expandClick()"
      class="c-multipane-resizer-btn c-is-expand"
    >
      <icon :type="iconType" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  reactive,
  watchEffect,
  computed,
  watch,
  Ref
} from 'vue'
import {isExpand, isResizeExpand, switchExpand} from './multipaneState'
const LAYOUT_HORIZONTAL = 'horizontal'
const LAYOUT_VERTICAL = 'vertical'

export default defineComponent({
  name: 'MultipaneResizer',
  props: ['layout', 'showExpand'],
  setup(props: any) {
    let resizerRef: Ref<any> = ref(null)
    let paneExpand = computed(() => {
      return isResizeExpand(resizerRef.value ? resizerRef.value : null)
    })
    let iconType = computed(() => {
      if (props.layout == LAYOUT_VERTICAL) {
        return paneExpand.value ? 'expandlf' : 'expandlf'
      } else {
        return paneExpand.value ? 'expandtb' : 'expandtb'
      }
    })

    let expandClick = () => {
      if (resizerRef.value) {
        switchExpand(resizerRef.value)
      }
    }
    return {iconType, isExpand, resizerRef, expandClick}
  }
})
</script>

<style lang="less">
.c-multipane-resizer {
  position: relative;
  .c-multipane-resizer-btn {
    position: absolute;
    cursor: pointer;
    top: 3px;
    left: -19px;
    // background-color: var(--light-primary-color);
    border-radius: 50%;
    width: 16px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    .c-icon {
      width: 14px;
      height: 14px;
      fill: var(--primary-color);
    }
  }
}
</style>
