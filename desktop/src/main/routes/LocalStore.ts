import fs from 'fs'
import Store from 'electron-store'
import {Util} from '@datahu/core'
import {dialog} from 'electron'
import path from 'path'
const store = new Store()

export function getStore(arg: any = null): Promise<any> {
  return Promise.resolve(store.store)
}

/**
 * 登陆或选择一个当前登录的用户
 * @param arg
 * @returns
 */
export function setUserStore(arg: any): Promise<any> {
  store.set('user', arg)
  let users: Array<any> = store.store.users as Array<any>
  if (!users) {
    users = []
  }
  for (let u of users) {
    if (u.user.id == arg.user.id && u.server == arg.server) {
      users.splice(users.indexOf(u), 1)
      break
    }
  }
  users.push(arg)
  store.set('users', users)
  return Promise.resolve(store.store)
}

// 注销或移除一个登陆的用户
export function removeUserStore(arg: any): Promise<any> {
  let users: Array<any> = store.store.users as Array<any>
  if (!users) {
    users = []
  }
  for (let u of users) {
    if (u.user.id == arg.user.id && u.server == arg.server) {
      users.splice(users.indexOf(u), 1)
      break
    }
  }
  let currentUser: any = store.store.user
  if (
    currentUser &&
    currentUser.server == arg.server &&
    currentUser.user.id == arg.user.id
  ) {
    if (users.length > 0) {
      store.set('user', users[users.length - 1])
    } else {
      store.set('user', null)
    }
  }
  store.set('users', users)
  return Promise.resolve(store.store)
}

export function setLanguageStore(arg: any): Promise<any> {
  store.set('language', arg.language)
  return Promise.resolve(store.store)
}

export function storeRecenty(filePath: string) {
  let recenty = store.get('recenty') as Array<any>
  if (!recenty) {
    recenty = []
  }

  let has = false
  let now = new Date().toISOString()
  for (let r of recenty) {
    if (r.path == filePath) {
      r.time = now
      has = true
    }
  }
  if (!has) {
    recenty.push({path: filePath, time: now})
  }

  recenty = Util.orderBy(recenty, 'time', true)
  if (recenty.length > 10) {
    recenty.length = 10
  }
  store.set('recenty', recenty)
}

export async function openDirectorySelect(arg: any, mainWindow: any) {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  })
  return result.filePaths
}

export function addPlugin(arg: any) {
  let plugins = store.get(arg.type) as Array<any>
  if (!plugins) {
    plugins = []
  }
  for (let item of plugins) {
    if (item.name == arg.plugin.name) {
      plugins.splice(plugins.indexOf(item), 1)
      break
    }
  }
  plugins.push(arg.plugin)
  store.set(arg.type, plugins)
}

export function removePlugin(arg: any) {
  let plugins = store.get(arg.type) as Array<any>
  if (plugins) {
    for (let item of plugins) {
      if (item.name == arg.plugin.name) {
        plugins.splice(plugins.indexOf(item), 1)
        break
      }
    }
  }
  store.set(arg.type, plugins)
}
