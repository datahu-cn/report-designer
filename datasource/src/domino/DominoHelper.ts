import axios from 'axios'
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
import {
  ITableDefinition,
  IColumnDefinition,
  ColumnType,
  Util,
  Crypto
} from '@datahu/core'
import {DataSourceHelper} from '@datahu/core'
export interface IDominoConfig {
  url: string
  username: string
  password: string
  database: string
  view: string
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
      table.rows = datas
      tables.push(table)
    }

    return tables
  }

  private getUrl(url: string) {
    if (this.config.url.endsWith('/')) {
      return this.config.url + this.config.database + url
    } else {
      return this.config.url + '/' + this.config.database + url
    }
  }

  async getTables(): Promise<Array<ITableDefinition>> {
    let config = this.getAxiosConig()
    let result = await http.get(
      this.getUrl('/api/data/collections/name/' + this.config.view),
      config
    )
    var tables = this.formatData(result.data)
    return tables
  }

  async getData(tables: Array<ITableDefinition>): Promise<Array<object>> {
    var results = []
    let config = this.getAxiosConig()

    for (let t of tables) {
      let url = this.getUrl('/api/data/collections/name/' + this.config.view)
      var result = await http.get(url, config)
      results.push(result.data)
    }
    return results
  }
}
