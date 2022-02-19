import {isFunction} from './fns'

// 将选择器与父元素匹配
export function matchesSelectorToParentElements(
  el: any,
  selector: any,
  baseNode: any
) {
  let node = el

  const matchesSelectorFunc: any = [
    'matches',
    'webkitMatchesSelector',
    'mozMatchesSelector',
    'msMatchesSelector',
    'oMatchesSelector'
  ].find((func) => isFunction(node[func]))

  if (!isFunction(node[matchesSelectorFunc])) return false

  do {
    if (node[matchesSelectorFunc](selector)) return true
    if (node === baseNode) return false
    node = node.parentNode
  } while (node)

  return false
}

export function getComputedSize($el: any) {
  const style = window.getComputedStyle($el)

  return [
    parseFloat(style.getPropertyValue('width')),
    parseFloat(style.getPropertyValue('height'))
  ]
}
// 添加事件
export function addEvent(el: any, event: any, handler: any) {
  if (!el) {
    return
  }
  if (el.attachEvent) {
    el.attachEvent('on' + event, handler)
  } else if (el.addEventListener) {
    el.addEventListener(event, handler, true)
  } else {
    el['on' + event] = handler
  }
}

// 删除事件
export function removeEvent(el: any, event: any, handler: any) {
  if (!el) {
    return
  }
  if (el.detachEvent) {
    el.detachEvent('on' + event, handler)
  } else if (el.removeEventListener) {
    el.removeEventListener(event, handler, true)
  } else {
    el['on' + event] = null
  }
}

export function elementContains(
  container: HTMLElement,
  target: HTMLElement,
  excludeClass: string
) {
  let node: any = target
  while (node) {
    if (container == node) {
      return true
    }
    if (node.classList.contains(excludeClass)) {
      return false
    }
    node = node.parentElement
  }
}

export function pxToPercent(
  position: any,
  parentWidth: any,
  parentHeight: any
) {
  let widthRate = parentWidth / 100
  let heightRate = parentHeight / 100
  return {
    left: position.left / widthRate,
    top: position.top / heightRate,
    width: position.width == 'auto' ? 'auto' : position.width / widthRate,
    height: position.height == 'auto' ? 'auto' : position.height / heightRate
  }
}

export function percentToPx(
  position: any,
  parentWidth: any,
  parentHeight: any
) {
  let widthRate = parentWidth / 100
  let heightRate = parentHeight / 100
  return {
    left: position.left * widthRate,
    top: position.top * heightRate,
    width: position.width == 'auto' ? 'auto' : position.width * widthRate,
    height: position.height == 'auto' ? 'auto' : position.height * heightRate
  }
}
