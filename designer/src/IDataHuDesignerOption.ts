import {ILocalStorage} from './ILocalStorage'
export interface IDesignerUser {
  token?: string
  user: {name: string; avatar: string; id: any}
  server?: string
}

export enum HeaderToolbarMenu {
  New,
  Developer,
  Open,
  Recent,
  Save,
  SaveAs,
  DataRefresh,
  DataNew,
  DataOnline,
  DataList,
  Relationship,
  Role,
  Publish,
  Preview,
  Theme
}

export interface IDataHuDesignerOption {
  getData?: Function
  getSupportDataSources?: Function
  sms?: Function
  login?: Function
  logout?: Function
  publishCheck?: Function
  publish?: Function
  getUserinfo?: Function
  searchTables?: Function
  openLink?: Function
  getTables?: Function
  load?: Function
  loadFrom?: Function
  loadFromServer?: Function
  save?: Function
  saveAs?: Function
  openAndReadFile?: Function
  localStorage?: ILocalStorage
  useHandle?: Function
  language?: string
  toolbars: Array<HeaderToolbarMenu>
}
