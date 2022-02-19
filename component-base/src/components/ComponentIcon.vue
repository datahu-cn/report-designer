<template>
  <span
    v-html="svg"
    :style="style"
    :class="['c-icon-' + type]"
    class="c-icon anticon"
  ></span>
</template>

<script lang="ts">
import {defineComponent, computed, ref, onMounted, watch} from 'vue'
import {Icons} from './ComponentIcons'
export default defineComponent({
  name: 'ComponentIcon',
  components: {},
  props: ['type', 'width', 'height'],
  setup(props: any, {emit}) {
    let svg = computed(() => {
      return Icons[props.type]
    })
    let style = computed(() => {
      let s: any = {}
      if (props.width) {
        s.width = props.width
      }
      if (props.height) {
        s.height = props.height
      }
      return s
    })
    return {svg, style}
  }
})
</script>

<style lang="less">
.c-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  fill: var(--text-color);
}
</style>
