import {IDataSource} from '@datahu/core'
import axios from 'axios'
import {
  ITableDefinition,
  IColumnDefinition,
  ColumnType,
  Util
} from '@datahu/core'
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

export interface ICDataConfig {
  user: any
  tables: Array<string>
}

export class CDataHelper {
  config: ICDataConfig
  constructor(config: ICDataConfig) {
    this.config = config
  }

  async request(arg: any): Promise<any> {
    if (this.config.user.server && this.config.user.token) {
      let result = await http.post(
        this.config.user.server + arg.url,
        arg.data,
        {
          headers: {authorization: this.config.user.token}
        }
      )
      return result.data
    }
    throw new Error('没有用户认证信息')
  }

  async getTables(): Promise<Array<ITableDefinition>> {
    if (this.config.tables.length > 0) {
      var data = await this.request({
        url: '/desktop/getTableColumns',
        data: {tables: this.config.tables}
      })
      var groupColumns = Util.groupBy(data as Array<any>, 'tableName')
      var tables: Array<ITableDefinition> = []
      for (let t of groupColumns) {
        let cols = t as Array<any>
        let table = {
          id: '',
          name: cols[0].tableName,
          alias: '',
          useSourceCode: false,
          sourceCode: '',
          columns: [],
          connectorId: '',
          isFormula: false
        } as ITableDefinition
        tables.push(table)
        for (let c of cols) {
          let col = {
            name: c.columnName,
            description: c.description,
            type: c.columnType
          } as IColumnDefinition
          table.columns.push(col)
        }
      }
      return tables
    }
    return []
  }

  async getData(tables: Array<ITableDefinition>): Promise<Array<object>> {
    var results = []
    for (let t of tables) {
      let dataName = t.name
      let columnNames = []
      for (let col of t.columns) {
        columnNames.push(col.name)
      }
      var data = await this.request({
        url: '/desktop/getDataByTable',
        data: {dataName, columnNames}
      })
      results.push(data)
    }
    return results
  }
}
