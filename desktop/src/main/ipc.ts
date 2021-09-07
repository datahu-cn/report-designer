import {ipcMain} from 'electron'
import * as routes from './routes'

async function call(bridgeName: string, data: any, mainWindow: any) {
  let routeNames = bridgeName.split('/')
  if (routeNames.length != 2) {
    throw new Error('路由格式错误')
  }
  let routeCalls = routes as any
  if (routeCalls[routeNames[0]] && routeCalls[routeNames[0]][routeNames[1]]) {
    let callFun = routeCalls[routeNames[0]][routeNames[1]]
    var result = await callFun(data, mainWindow)
    return result
  } else {
    throw new Error('未找到该路由')
  }
}

async function postMessage(event: any, message: any, mainWindow: any) {
  try {
    console.log('postMessage', message)
    let result = await call(message.bridgeName, message.data, mainWindow)
    console.log('postMessage result', result)
    if (result == undefined || result == null) {
      result = ''
    }
    result = JSON.stringify(result) as any

    event.reply('receiveMessage-' + message.cid, {
      bridgeName: message.bridgeName,
      cid: message.cid,
      data: result
    })
  } catch (err) {
    if (err.buffer && err.length > 0) {
      let str = err.toString()
      if (str) {
        err = JSON.parse(str)
      }
    }
    console.error(err)
    event.reply('receiveMessage-' + message.cid, {
      bridgeName: message.bridgeName,
      cid: message.cid,
      error: {code: err.code || 500, message: err.message}
    })
  }
}

let promiseResolve: any
let promise: Promise<any> | null = null
let mainWindow: any = null
export default {
  mainWindow: null,
  init(mw: any) {
    mainWindow = mw
    promise = new Promise((resolve) => {
      promiseResolve = resolve
    })
    ipcMain.on('postMessage', (event: any, message: any) => {
      postMessage(event, message, mainWindow)
    })
    ipcMain.once('preloaderReady', () => {
      promiseResolve()
    })
  },
  async send(params: any) {
    await promise
    mainWindow.send('mainSendMessage', params)
  }
}
