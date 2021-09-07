import * as Axios from 'axios'
const axios = require('axios')
import {
  ITableDefinition,
  IColumnDefinition,
  ColumnType,
  Util
} from '@datahu/core'
import {DataSourceHelper} from '@datahu/core'
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

export class RestfulHelper {
  config: IRestfulConfig
  constructor(config: any) {
    this.config = config
  }

  getAxiosConig() {
    let axiosConfig: Axios.AxiosRequestConfig = {
      url: this.config.url,
      method: this.config.method
    }

    if (this.config.method === 'post') {
      axiosConfig.data = this.config.requestBody
    }

    //params
    if (this.config.params.length > 0 && this.config.params[0]['key']) {
      const params: any = {}
      this.config.params.forEach((param) => {
        if (param.key && param.value) {
          params[param.key] = param.value
        }
      })
      axiosConfig.params = params
    }

    //headers
    if (this.config.headers.length > 0 && this.config.headers[0]['key']) {
      const headers: any = {}
      this.config.headers.forEach((header) => {
        if (header.key && header.value) {
          headers[header.key] = header.value
        }
      })
      axiosConfig.headers = headers
    }

    //basic auth
    if (this.config.openAuth) {
      axiosConfig.auth = {
        username: this.config.username,
        password: this.config.password
      }
    }

    return axiosConfig
  }

  query(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      axios(this.getAxiosConig())
        .then(function (response: Axios.AxiosResponse) {
          resolve(response.data)
        })
        .catch(function (error: Axios.AxiosError) {
          reject(error)
        })
    })
  }

  formatData(datas: any): Array<ITableDefinition> {
    const field = this.config.resultField
    if (field) {
      datas = datas[field]
    }
    const tables: ITableDefinition[] = []
    if (this.config.resultType === 'Object<String,Array<String,Object>>') {
      for (const tablename in datas) {
        if (datas[tablename] && datas[tablename].length > 0) {
          let table = DataSourceHelper.getTableDefinitionFromObject(
            datas[tablename][0]
          )
          table.name = tablename
          tables.push(table)
        }
      }
    }

    if (this.config.resultType === 'Array<String,Object>') {
      if (datas && datas.length > 0) {
        let table = DataSourceHelper.getTableDefinitionFromObject(datas[0])
        table.name = 'default'
        tables.push(table)
      }
    }

    return tables
  }

  async getTables(): Promise<Array<ITableDefinition>> {
    const result = await this.query()
    const finallyData = this.formatData(result)
    var tables = this.formatData(result)
    return tables
  }

  async getData(tables: Array<ITableDefinition>): Promise<Array<object>> {
    var results = []
    for (let t of tables) {
      var data = await this.query()
      var result = this.getTableDataByTableName(data, t)
      results.push(result)
    }
    return results
  }

  private getTableDataByTableName(datas: any, selectTable: ITableDefinition) {
    const field = this.config.resultField
    if (field) {
      datas = datas[field]
    }
    if (this.config.resultType === 'Object<String,Array<String,Object>>') {
      for (const tablename in datas) {
        if (tablename === selectTable.name) {
          return datas[tablename]
        }
      }
    }

    if (this.config.resultType === 'Array<String,Object>') {
      return datas
    }
  }
}
