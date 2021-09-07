<template>
  <div
    class="c-multi-panel"
    :class="classnames"
    :style="{cursor, userSelect}"
    :ref="panelRef"
    @mousedown="onMouseDown"
    @dblclick="onDblclick"
  >
    <slot></slot>
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
  createVNode,
  Ref
} from 'vue'
import {isExpand, isResizeExpand, switchExpand} from './multipaneState'
const LAYOUT_HORIZONTAL = 'horizontal'
const LAYOUT_VERTICAL = 'vertical'

export default defineComponent({
  name: 'multipane',

  props: {
    layout: {
      type: String,
      default: LAYOUT_VERTICAL
    }
  },

  data() {
    return {
      isResizing: false,
      isExpand: true
    }
  },
  computed: {
    classnames(): any {
      return [
        'c-multipane',
        'layout-' + this.layout.slice(0, 1),
        this.isResizing ? 'is-resizing' : ''
      ]
    },
    cursor(): any {
      return this.isResizing
        ? this.layout == LAYOUT_VERTICAL
          ? 'col-resize'
          : 'row-resize'
        : ''
    },
    userSelect(): any {
      return this.isResizing ? 'none' : ''
    }
  },

  methods: {
    onDblclick(edown: any) {
      let {target: resizer, pageX: initialPageX, pageY: initialPageY} = edown
      if (
        resizer.className &&
        resizer.className.match &&
        resizer.className.match('c-multipane-resizer')
      ) {
        switchExpand(edown.target)
      }
    },
    onMouseDown(edown: any) {
      let {target: resizer, pageX: initialPageX, pageY: initialPageY} = edown
      if (
        resizer.className &&
        resizer.className.match &&
        resizer.className.match('c-multipane-resizer')
      ) {
        if (!isResizeExpand(resizer)) {
          return
        }
        edown.preventDefault()
        edown.stopPropagation()
        let self = this
        let {$el: container, layout} = self

        let pane = resizer.previousElementSibling
        let {offsetWidth: initialPaneWidth, offsetHeight: initialPaneHeight} =
          pane

        let usePercentage = !!(pane.style.width + '').match('%')

        const {addEventListener, removeEventListener} = window

        const resize: any = (initialSize: any, offset = 0) => {
          if (layout == LAYOUT_VERTICAL) {
            let containerWidth = container.clientWidth
            let paneWidth = initialSize + offset

            return (pane.style.width = usePercentage
              ? (paneWidth / containerWidth) * 100 + '%'
              : paneWidth + 'px')
          }

          if (layout == LAYOUT_HORIZONTAL) {
            let containerHeight = container.clientHeight
            let paneHeight = initialSize + offset

            return (pane.style.height = usePercentage
              ? (paneHeight / containerHeight) * 100 + '%'
              : paneHeight + 'px')
          }
        }

        // This adds is-resizing class to container
        self.isResizing = true

        // Resize once to get current computed size
        let size: any = resize()

        // Trigger paneResizeStart event
        self.$emit('paneResizeStart', pane, resizer, size)

        const onMouseMove = function (e: any) {
          let {pageX, pageY} = e
          size =
            layout == LAYOUT_VERTICAL
              ? resize(initialPaneWidth, pageX - initialPageX)
              : resize(initialPaneHeight, pageY - initialPageY)

          self.$emit('paneResize', pane, resizer, size)
          e.preventDefault()
          e.stopPropagation()
        }

        const onMouseUp = function (e: any) {
          e.preventDefault()
          e.stopPropagation()
          // Run resize one more time to set computed width/height.
          size =
            layout == LAYOUT_VERTICAL
              ? resize(pane.clientWidth)
              : resize(pane.clientHeight)

          // This removes is-resizing class to container
          self.isResizing = false

          removeEventListener('mousemove', onMouseMove)
          removeEventListener('mouseup', onMouseUp)

          self.$emit('paneResizeStop', pane, resizer, size)
        }

        addEventListener('mousemove', onMouseMove)
        addEventListener('mouseup', onMouseUp)
      }
    }
  },
  setup(props: any) {
    return {}
  }
})
</script>

<style lang="less">
.c-multipane {
  display: flex;
  &.layout-h {
    .c-multipane-notexpand {
      height: 20px !important;
      > div {
        display: none;
      }
    }
  }

  &.layout-v {
    .c-multipane-notexpand {
      width: 20px !important;
      > div {
        display: none;
      }
    }
  }

  &.layout-h {
    flex-direction: column;
    .c-pane {
      text-align: left;
      overflow: auto;
      // border-top: 1px solid var(--border-color-base);
      // border-bottom: 1px solid var(--border-color-base);
      > div {
        overflow-x: auto;
        width: 100%;
      }
    }
    .c-pane:first-child {
      border-top-width: 0px;
    }
    .c-pane:last-child {
      border-bottom-width: 0px;
    }
  }

  &.layout-v {
    flex-direction: row;
    .c-pane {
      text-align: left;
      overflow: auto;
      // border-right: 1px solid var(--border-color-base);
      // border-left: 1px solid var(--border-color-base);
      > div {
        overflow-y: auto;
        height: 100%;
      }
    }
    .c-pane:first-child {
      border-left-width: 0px;
    }
    .c-pane:last-child {
      border-right-width: 0px;
    }
  }
}

.c-multipane > div {
  position: relative;
  z-index: 1;
}

.c-multipane-resizer {
  display: block;
  position: relative;
  z-index: 2;
  margin: 0;
  left: 0;
  position: relative;

  &:hover {
    &:before {
      border-color: #999;
    }
  }
}

.layout-h > .c-multipane-resizer {
  width: 100%;
  height: 3px;
  margin-top: -10px;
  top: 0px;
  cursor: row-resize;

  margin: 0;
  left: 0;
  position: relative;
  z-index: 10;

  // &:before {
  //   display: block;
  //   content: '';
  //   width: 40px;
  //   height: 3px;
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   margin-left: -20px;
  //   margin-top: -1.5px;
  //   border-top: 1px solid #ccc;
  //   border-bottom: 1px solid #ccc;
  // }
}

.layout-v > .c-multipane-resizer {
  width: 3px;
  height: 100%;
  margin-left: -10px;
  //   left: 5px;
  cursor: col-resize;

  margin: 0;
  left: 0;
  position: relative;
  z-index: 10;

  // &:before {
  //   display: block;
  //   content: '';
  //   width: 3px;
  //   height: 40px;
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   margin-top: -20px;
  //   margin-left: -1.5px;
  //   border-left: 1px solid #ccc;
  //   border-right: 1px solid #ccc;
  // }
}
</style>
