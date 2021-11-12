import axios from 'axios'
import {
  ITableDefinition,
  IColumnDefinition,
  ColumnType,
  Util,
  Crypto,
  DataSourceHelper
} from '@datahu/core'
const path = require('path')
// 创建axios实例
axios.defaults.adapter = require('axios/lib/adapters/http')
const http = axios.create({
  baseURL: '', // api的base_url
  timeout: 120000 // 请求超时时间
})

// request拦截器
http.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    config.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
    return config
  },
  (error) => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone拦截器
http.interceptors.response.use(
  (response) => response,
  (error) => {
    error.detail = error.response ? error.response.data : null
    console.error('err', error)
    return Promise.reject(error.detail || error)
  }
)

export interface IDominoConfig {
  url: string
  username: string
  password: string
  database: string
  view: string
  queryAll: boolean
  params: Array<any>
}

export class DominoHelper {
  config: IDominoConfig
  constructor(config: any) {
    this.config = config
  }

  getAxiosConig() {
    let axiosConfig: any = {
      headers: {
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'keep-alive'
      }
    }
    axiosConfig.auth = {
      username: this.config.username,
      password: Crypto.Decrypt(this.config.password, 'sjwkdjsklwjfdlks')
    }

    return axiosConfig
  }

  formatData(datas: any): Array<ITableDefinition> {
    const tables: ITableDefinition[] = []
    if (datas && datas.length > 0) {
      let table = DataSourceHelper.getTableDefinitionFromArray(datas)
      table.name = this.config.view
      tables.push(table)
    }

    return tables
  }

  private getUrl(start: number = 0) {
    let result
    let params: any = {}
    if (this.config.url.endsWith('/')) {
      result =
        this.config.url +
        this.config.database +
        '/api/data/collections/name/' +
        this.config.view
    } else {
      result =
        this.config.url +
        '/' +
        this.config.database +
        '/api/data/collections/name/' +
        this.config.view
    }
    if (this.config.params && this.config.params.length > 0) {
      for (let p of this.config.params) {
        params[p.key] = p.value
      }
    }
    if (this.config.queryAll) {
      params['count'] = 100
    }
    params['start'] = start

    result = Util.Url.setQuery(result, params)
    return result
  }

  async getTables(): Promise<Array<ITableDefinition>> {
    let config = this.getAxiosConig()
    let result = await http.get(this.getUrl(0), config)
    var tables = this.formatData(result.data)
    return tables
  }

  async getAllData(config: any) {
    let start = 0
    let allData = []
    while (true) {
      let result = await http.get(this.getUrl(start), config)
      if (result && result.data && result.data.length > 0) {
        start += result.data.length
        for (let item of result.data) {
          allData.push(item)
        }
      } else {
        break
      }
    }
    return allData
  }

  async getData(tables: Array<ITableDefinition>): Promise<Array<object>> {
    var results = []
    let config = this.getAxiosConig()

    for (let t of tables) {
      let url = this.getUrl()
      let result = await this.getAllData(config)
      results.push(result)
    }
    return results
  }
}
