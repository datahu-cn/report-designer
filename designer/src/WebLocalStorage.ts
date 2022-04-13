import {Util} from '@datahu/core'
import {ILocalStorage} from './ILocalStorage'

export class WebLocalStorage implements ILocalStorage {
  public key: string
  constructor(key: string) {
    this.key = key
  }
  async getStore(): Promise<any> {
    let storeStr = localStorage.getItem(this.key)
    if (storeStr) {
      return JSON.parse(storeStr)
    }
    return {}
  }
  setStore(store: any) {
    localStorage.setItem(this.key, JSON.stringify(store))
  }
  async setUserStore(arg: any) {
    let store = await this.getStore()
    store.user = arg
    store.users = [store.user]
    this.setStore(store)
    return store
  }
  async removeUserStore(arg: any) {
    let store = await this.getStore()
    let users: Array<any> = store.users as Array<any>
    if (!users) {
      users = []
    }
    for (let u of users) {
      if (u.user.id == arg.user.id && u.server == arg.server) {
        users.splice(users.indexOf(u), 1)
        break
      }
    }
    let currentUser: any = store.user
    if (
      currentUser &&
      currentUser.server == arg.server &&
      currentUser.user.id == arg.user.id
    ) {
      if (users.length > 0) {
        store.user = users[users.length - 1]
      } else {
        store.user = null
      }
    }
    store.users = users
    this.setStore(store)
    return store
  }
  async setLanguageStore(arg: any) {
    let store = await this.getStore()
    store.language = arg.language
    this.setStore(store)
    return store
  }
  async storeRecenty(filePath: string) {
    let store = await this.getStore()
    let recenty = store.recenty as Array<any>
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
    store.recenty = recenty
    this.setStore(store)
    return store
  }
  async addPlugin(arg: any) {
    let store = await this.getStore()
    let plugins = store[arg.type] as Array<any>
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
    store[arg.type] = plugins

    this.setStore(store)
    return store
  }
  async removePlugin(arg: any) {
    let store = await this.getStore()
    let plugins = store[arg.type] as Array<any>
    if (plugins) {
      for (let item of plugins) {
        if (item.name == arg.plugin.name) {
          plugins.splice(plugins.indexOf(item), 1)
          break
        }
      }
    }
    store[arg.type] = plugins
    this.setStore(store)
    return store
  }
}
