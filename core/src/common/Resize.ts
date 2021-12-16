/**
 * Detect Element Resize
 *
 * https://github.com/sdecima/javascript-detect-element-resize
 * Sebastian Decima
 *
 * version: 0.5.3
 **/

let _document = (typeof window === 'undefined' ? {} : document) as any
let _window = (typeof window === 'undefined' ? {} : window) as any

var attachEvent = _document.attachEvent,
  stylesCreated = false

function resetTriggers(element: any) {
  var triggers = element.__resizeTriggers__,
    expand = triggers.firstElementChild,
    contract = triggers.lastElementChild,
    expandChild = expand.firstElementChild
  contract.scrollLeft = contract.scrollWidth
  contract.scrollTop = contract.scrollHeight
  expandChild.style.width = expand.offsetWidth + 1 + 'px'
  expandChild.style.height = expand.offsetHeight + 1 + 'px'
  expand.scrollLeft = expand.scrollWidth
  expand.scrollTop = expand.scrollHeight
}

function checkTriggers(element: any) {
  return (
    element.offsetWidth != element.__resizeLast__.width ||
    element.offsetHeight != element.__resizeLast__.height
  )
}

function scrollListener(this: any, e: any) {
  var element = this
  resetTriggers(element)
  if (element.__resizeRAF__) cancelFrame(element.__resizeRAF__)
  element.__resizeRAF__ = requestFrame(function () {
    if (checkTriggers(element)) {
      element.__resizeLast__.width = element.offsetWidth
      element.__resizeLast__.height = element.offsetHeight
      element.__resizeListeners__.forEach(function (fn: any) {
        fn.call(element, e)
      })
    }
  })
}

let _resize_init = false
let animationstartevent: any = null
let animationName: any = null
let animationKeyframes: any = null
let animationStyle: any = null
let requestFrame: any = null
let cancelFrame: any = null
function init() {
  if (_resize_init) return
  _resize_init = true
  if (!attachEvent) {
    requestFrame = (function () {
      var raf =
        _window.requestAnimationFrame ||
        _window.mozRequestAnimationFrame ||
        _window.webkitRequestAnimationFrame ||
        function (fn: any) {
          return _window.setTimeout(fn, 1)
        }
      return function (fn: any) {
        return raf(fn)
      }
    })()

    cancelFrame = (function () {
      var cancel =
        _window.cancelAnimationFrame ||
        _window.mozCancelAnimationFrame ||
        _window.webkitCancelAnimationFrame ||
        _window.clearTimeout
      return function (id: any) {
        return cancel(id)
      }
    })()

    /* Detect CSS Animations support to detect element display/re-attach */
    var animation = false,
      animationstring = 'animation',
      keyframeprefix = '',
      animationstartevent = 'animationstart',
      domPrefixes = 'Webkit Moz O ms'.split(' '),
      startEvents = 'webkitAnimationStart animationstart oAnimationStart MSAnimationStart'.split(
        ' '
      ),
      pfx = ''
    {
      var elm = _document.createElement('fakeelement')
      if (elm.style.animationName !== undefined) {
        animation = true
      }

      if (animation === false) {
        for (var i = 0; i < domPrefixes.length; i++) {
          if (elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
            pfx = domPrefixes[i]
            animationstring = pfx + 'Animation'
            keyframeprefix = '-' + pfx.toLowerCase() + '-'
            animationstartevent = startEvents[i]
            animation = true
            break
          }
        }
      }
    }

    animationName = 'resizeanim'
    animationKeyframes =
      '@' +
      keyframeprefix +
      'keyframes ' +
      animationName +
      ' { from { opacity: 0; } to { opacity: 0; } } '
    animationStyle = keyframeprefix + 'animation: 1ms ' + animationName + '; '
  }
}

function createStyles() {
  if (!stylesCreated) {
    //opacity:0 works around a chrome bug https://code.google.com/p/chromium/issues/detail?id=286360
    var css =
        (animationKeyframes ? animationKeyframes : '') +
        '.resize-triggers { ' +
        (animationStyle ? animationStyle : '') +
        'visibility: hidden; opacity: 0; } ' +
        '.resize-triggers, .resize-triggers > div, .contract-trigger:before { content: " "; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .resize-triggers > div { background: #eee; overflow: overlay; } .contract-trigger:before { width: 200%; height: 200%; }',
      head = _document.head || _document.getElementsByTagName('head')[0],
      style = _document.createElement('style')

    style.type = 'text/css'
    if (style.styleSheet) {
      style.styleSheet.cssText = css
    } else {
      style.appendChild(_document.createTextNode(css))
    }

    head.appendChild(style)
    stylesCreated = true
  }
}

if (typeof window != 'undefined') {
  init()
}
export function addResizeListener(element: any, fn: any) {
  if (attachEvent) element.attachEvent('onresize', fn)
  else {
    if (!element.__resizeTriggers__) {
      if (getComputedStyle(element).position == 'static')
        element.style.position = 'relative'
      createStyles()
      element.__resizeLast__ = {}
      element.__resizeListeners__ = []
      ;(element.__resizeTriggers__ = _document.createElement('div')).className =
        'resize-triggers'
      element.__resizeTriggers__.innerHTML =
        '<div class="expand-trigger"><div></div></div>' +
        '<div class="contract-trigger"></div>'
      element.appendChild(element.__resizeTriggers__)
      resetTriggers(element)
      element.addEventListener('scroll', scrollListener, true)

      /* Listen for a css animation to detect element display/re-attach */
      animationstartevent &&
        element.__resizeTriggers__.addEventListener(
          animationstartevent,
          function (e: any) {
            if (e.animationName == animationName) resetTriggers(element)
          }
        )
    }
    element.__resizeListeners__.push(fn)
  }
}

export function removeResizeListener(element: any, fn: any) {
  if (attachEvent) element.detachEvent('onresize', fn)
  else {
    element.__resizeListeners__.splice(
      element.__resizeListeners__.indexOf(fn),
      1
    )
    if (!element.__resizeListeners__.length) {
      element.removeEventListener('scroll', scrollListener)
      element.__resizeTriggers__ = !element.removeChild(
        element.__resizeTriggers__
      )
    }
  }
}
