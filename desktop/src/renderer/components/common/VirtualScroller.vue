<template>
  <div
    class="c-virtual-scroller-container"
    ref="root"
    :style="`height:${
      itemSize * (data.length > poolBuffer ? poolBuffer : data.length)
    }px;`"
    @scroll.passive="handleScroll"
  >
    <div
      class="c-virtual-scroller-scroll"
      :style="`height: ${scrollHeight}px;padding-top: ${paddingTop}px`"
    >
      <div
        class="c-virtual-scroller-item-container"
        v-for="item in pool"
        :key="getDataKey(item)"
        :style="`height: ${itemSize}px`"
      >
        <slot :item="item"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {ref, toRefs, defineComponent, onMounted, watch} from 'vue'
interface Props {
  data: any[]
  dataKey?: string
  itemSize: number
  poolBuffer: number
}
export default defineComponent({
  name: 'VirtualScroller',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    dataKey: {
      type: String
    },
    itemSize: {
      type: Number,
      default: () => 40
    },
    poolBuffer: {
      type: Number,
      default: () => 50
    }
  },
  setup(props: Props): any {
    const {data, poolBuffer, itemSize} = toRefs(props)
    const root = ref<HTMLElement | null>(null)
    const pool = ref<any[]>([])
    const scrollHeight = ref(data.value.length * itemSize.value)
    let containerSize = 0
    const paddingTop = ref(0)
    let isScrollBusy = false
    const handleScroll = () => {
      if (!root.value) return
      if (isScrollBusy) return
      isScrollBusy = true
      requestAnimationFrame(() => {
        isScrollBusy = false
        if (!root.value) return
        const range: number[] = []
        range[0] =
          Math.floor(root.value.scrollTop / itemSize.value) -
          Math.floor(poolBuffer.value / 2)
        range[0] = Math.max(range[0], 0)
        range[1] =
          range[0] +
          Math.floor(root.value.clientHeight / itemSize.value) +
          poolBuffer.value
        range[1] = Math.min(range[1], data.value.length)
        pool.value = data.value.slice(range[0], range[1])
        //   .map((v: any, i: number) => ({...v, _index: range[0] + i}))
        paddingTop.value = range[0] * itemSize.value
      })
    }
    watch(() => {
      return props.data
    }, handleScroll)
    onMounted(() => {
      if (!root.value) return
      containerSize = root.value.clientHeight
      const contentLines = Math.ceil(containerSize / itemSize.value)
      const totalLines = contentLines + poolBuffer.value
      const range = [0, totalLines]
      pool.value = data.value.slice(range[0], range[0] + range[1])
      // .map((v: any, i: number) => ({...v, _index: range[0] + i}))
    })

    let getDataKey = (item: any) => {
      let v = props.dataKey ? item[props.dataKey!] : item
      return v
    }
    return {pool, scrollHeight, root, handleScroll, paddingTop, getDataKey}
  }
})
</script>

<style scoped>
.c-virtual-scroller-container {
  width: 100%;
  height: 100%;
  min-width: 100px;
  min-height: 100px;
  overflow: overlay;
}
.c-virtual-scroller-scroll {
  box-sizing: border-box;
}
.c-virtual-scroller-item-container {
  overflow: hidden;
}
</style>
