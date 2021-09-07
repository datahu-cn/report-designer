import * as Axios from 'axios'
import {ITableDefinition} from '@datahu/core'
export interface IRestfulConfig {
  title: string
  url: string
  resultField: string
  resultType: string
  params: Array<any>
  headers: Array<any>
  method: Axios.Method
  openAuth: boolean
  authMode: string
  username: string
  password: string
  requestBody: string
}
export declare class RestfulHelper {
  config: IRestfulConfig
  constructor(config: IRestfulConfig)
  getAxiosConig(): Axios.AxiosRequestConfig
  query(): Promise<Array<any>>
  private getColumnType
  formatData(datas: any): Array<Object>
  getTables(): Promise<Array<ITableDefinition>>
  getData(tables: Array<ITableDefinition>): Promise<Array<object>>
  private getTableDataByTableName
}
