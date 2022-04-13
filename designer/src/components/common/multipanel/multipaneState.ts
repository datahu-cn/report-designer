import {
  reactive,
  ref,
  computed,
  onMounted,
  ComputedRef,
  isReactive,
  isRef,
  UnwrapRef,
  nextTick
} from 'vue'

let panes = ref([])

export function useMultipaneState() {
  return panes
}

export function isExpand(el: any) {
  for (let pane of panes.value) {
    if (pane.el === el) {
      return pane.isExpand
    }
  }
  return true
}

export function isResizeExpand(resizeEl: any) {
  for (let pane of panes.value) {
    if (pane.resizeEl === resizeEl) {
      return pane.isExpand
    }
  }
  return true
}

export function switchExpand(resizeEl: any) {
  let parent: HTMLElement = resizeEl.parentNode
  let index = 0
  for (let i = 0; i < parent.children.length; i++) {
    if (parent.children[i] == resizeEl) {
      index = i
      break
    }
  }
  if (index > 0) {
    let el = parent.children[index - 1]
    let currentPane: any = null
    for (let pane of panes.value) {
      if (pane.resizeEl === resizeEl) {
        currentPane = pane
        pane.isExpand = !pane.isExpand
      }
    }
    if (!currentPane) {
      currentPane = {el, resizeEl, isExpand: false}
      panes.value.push(currentPane)
    }

    let paneEl = currentPane.el as HTMLElement
    if (currentPane.isExpand) {
      paneEl.classList.remove('c-multipane-notexpand')
    } else {
      paneEl.classList.add('c-multipane-notexpand')
    }
  }
}
