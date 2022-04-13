import {
  DataHuDesigner,
  HeaderToolbarMenu,
  IDataHuDesignerOption,
  ILocalStorage
} from '@datahu/designer'
import {useHandle} from './use/electron'
import http from './use/http'
let baseUrl = ''
class DesktopLocalStorage implements ILocalStorage {
  async getStore(): Promise<any> {
    let result = await http.request('LocalStore/getStore', {})
    return result
  }
  async setStore(store: any) {
    let result = await http.request('LocalStore/setStore', store)
    return result
  }
  async setUserStore(arg: any) {
    let result = await http.request('LocalStore/setUserStore', arg)
    return result
  }
  async removeUserStore(arg: any) {
    let result = await http.request('LocalStore/removeUserStore', arg)
    return result
  }
  async setLanguageStore(arg: any) {
    let result = await http.request('LocalStore/setLanguageStore', arg)
    return result
  }
  async storeRecenty(filePath: string) {
    let result = await http.request('LocalStore/storeRecenty', filePath)
    return result
  }
  async addPlugin(arg: any) {
    let result = await http.request('LocalStore/addPlugin', arg)
    return result
  }
  async removePlugin(arg: any) {
    let result = await http.request('LocalStore/removePlugin', arg)
    return result
  }
}
class MyDataHuDesignerOption implements IDataHuDesignerOption {
  useHandle = useHandle
  language = 'zh-cn'
  localStorage = new DesktopLocalStorage()

  toolbars = [
    HeaderToolbarMenu.New,
    HeaderToolbarMenu.Developer,
    HeaderToolbarMenu.Open,
    HeaderToolbarMenu.Recent,
    HeaderToolbarMenu.Save,
    HeaderToolbarMenu.SaveAs,
    HeaderToolbarMenu.DataRefresh,
    HeaderToolbarMenu.DataNew,
    HeaderToolbarMenu.DataOnline,
    HeaderToolbarMenu.DataList,
    HeaderToolbarMenu.Relationship,
    HeaderToolbarMenu.Role,
    HeaderToolbarMenu.Publish,
    HeaderToolbarMenu.Preview,
    HeaderToolbarMenu.Theme
  ]

  async sms(arg: any) {
    let result = await http.request('ServerRequest/sms', arg)
    return result
  }

  async login(arg: any) {
    let result = await http.request('ServerRequest/login', arg)
    return result
  }

  async logout(arg: any) {
    let result = await http.request('ServerRequest/logout', arg)
    return result
  }

  async loadFrom(arg: any) {
    let result = await http.request('PackageManager/loadFrom', arg)
    return result
  }

  async loadFromServer(arg: any) {
    let result = await http.request('PackageManager/loadFromServer', arg)
    return result
  }

  async openAndReadFile(arg: any) {
    let result = await http.request('PackageManager/openAndReadFile', arg)
    return result
  }

  async load(arg: any) {
    let result = await http.request('PackageManager/load', arg)
    return result
  }

  async saveAs(arg: any) {
    let result = await http.request('PackageManager/saveAs', arg)
    return result
  }

  async save(arg: any) {
    let result = await http.request('PackageManager/save', arg)
    return result
  }

  async publishCheck(arg: any) {
    let result = await http.request('ServerRequest/publishCheck', arg)
    return result
  }
  async publish(arg: any) {
    let result = await http.request('ServerRequest/publish', arg)
    return result
  }
  async getUserinfo(arg: any) {
    let result = await http.request('ServerRequest/getUserinfo', arg)
    return result
  }
  async searchTables(arg: any) {
    let result = await http.request('ServerRequest/searchTables', arg)
    return result
  }
  async openLink(arg: any) {
    let result = await http.request('ServerRequest/openLink', arg)
    return result
  }

  async getData(arg: any) {
    let result = await http.request('DataSource/getData', arg)
    return result
  }
  async getSupportDataSources(arg: any) {
    let result = await http.request('DataSource/getSupportDataSources', arg)
    return result
  }
  async getTables(arg: any) {
    let result = await http.request('DataSource/getTables', arg)
    return result
  }
}

let init = async () => {
  let opt: IDataHuDesignerOption = new MyDataHuDesignerOption()
  let designer = new DataHuDesigner(opt)
  designer.render('#app', '', false, 0)
}

init()
