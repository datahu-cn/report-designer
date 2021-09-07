import {ContextBridge, contextBridge, ipcRenderer} from 'electron'

const apiKey = 'electron'

/**
 * @see https://github.com/electron/electron/issues/21437#issuecomment-573522360
 */
console.log('start preload')
let _cid = 0
const callbacks: any = {}
const mainCallbacks: Array<any> = []
const api: any = {
  versions: process.versions,
  invoke(bridgeName: string, data: any, callback: any) {
    // 如果不存在方法名或不为字符串，则提示调用失败
    if (typeof bridgeName !== 'string') {
      throw new Error('Invoke failed!')
    }
    // 与 Native 的通信信息
    const message: any = {bridgeName}
    if (typeof data !== 'undefined' || data !== null) {
      message.data = data
    }
    if (typeof callback !== 'function') {
      callback = () => null
    }
    _cid = _cid + 1
    // 存储回调函数
    callbacks[_cid] = callback
    message.cid = _cid
    console.log('end message', message)
    ipcRenderer.send('postMessage', message)
    ipcRenderer.once('receiveMessage-' + message.cid, (_, message): void => {
      console.log('receiveMessage', message)
      const {data, cid, error} = message
      // 如果存在方法名，则调用对应函数
      if (typeof cid === 'number' && cid >= 1) {
        if (typeof error !== 'undefined') {
          callbacks[cid](error)
          delete callbacks[cid]
        } else if (callbacks[cid]) {
          callbacks[cid](JSON.parse(data))
          delete callbacks[cid]
        } else {
          throw new Error('Invalid callback id ' + cid)
        }
      } else {
        throw new Error('message format error')
      }
    })
  },
  handle(callback: any) {
    if (mainCallbacks.indexOf(callback) < 0) {
      mainCallbacks.push(callback)
    }
  },
  preloadReady() {
    ipcRenderer.send('preloaderReady', {})
  }
} as const

ipcRenderer.on('mainSendMessage', (_, message) => {
  console.log('ipcRenderer on mainSendMessage')
  for (let c of mainCallbacks) {
    c(message)
  }
})

export type ExposedInMainWorld = Readonly<typeof api>

if (import.meta.env.MODE !== 'test') {
  /**
   * The "Main World" is the JavaScript context that your main renderer code runs in.
   * By default, the page you load in your renderer executes code in this world.
   *
   * @see https://www.electronjs.org/docs/api/context-bridge
   */
  contextBridge.exposeInMainWorld(apiKey, api)
} else {
  type API = Parameters<ContextBridge['exposeInMainWorld']>[1]

  /**
   * Recursively Object.freeze() on objects and functions
   * @see https://github.com/substack/deep-freeze
   * @param obj Object on which to lock the attributes
   */
  function deepFreeze<T extends API>(obj: T): Readonly<T> {
    Object.freeze(obj)

    Object.getOwnPropertyNames(obj).forEach((prop) => {
      if (
        obj.hasOwnProperty(prop) &&
        obj[prop] !== null &&
        (typeof obj[prop] === 'object' || typeof obj[prop] === 'function') &&
        !Object.isFrozen(obj[prop])
      ) {
        deepFreeze(obj[prop])
      }
    })

    return obj
  }

  deepFreeze(api)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-var-requires
  ;(window as any).electronRequire = require

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(window as any)[apiKey] = api
}

console.log('end preload')
