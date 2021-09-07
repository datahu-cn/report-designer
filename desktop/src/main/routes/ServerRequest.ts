import * as dataSources from '@datahu/datasource'
import {IDataSource} from '@datahu/core'
import {setUserStore, getStore, removeUserStore} from './LocalStore'
import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'

import {shell} from 'electron'
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

export async function login(arg: any): Promise<any> {
  let result = await http.post(arg.server + '/desktop/login', arg)
  let user = result.data
  user.server = arg.server
  let store = await setUserStore(user)
  return store
}

export async function logout(arg: any) {
  let store = await removeUserStore(arg)
  return store
}

export async function switchTo(params: any) {
  let store = await setUserStore(params)
  return store
}

export async function getUserinfo(arg: any) {
  if (arg.user && arg.user.token) {
    let result = await http.get(arg.user.server + '/desktop/userinfo', {
      headers: {authorization: arg.user.token}
    })
    return result.data
  }
}

export async function sms(arg: any): Promise<any> {
  let result = await http.post(arg.server + '/desktop/sms', arg)

  return result.data
}

export async function publish(arg: any) {
  var localFile = fs.createReadStream(arg.path)

  var formData = new FormData()
  if (!arg.chart.category) {
    throw new Error('请选择一个分类')
  }
  if (!arg.chart.name) {
    throw new Error('请设置报表名称')
  }
  formData.append('overwrite', arg.chart.overwrite.toString())
  formData.append('companyId', arg.chart.companyId.toString())
  formData.append('description', arg.chart.description || '')
  formData.append('keywords', arg.chart.keywords || '')
  formData.append('name', arg.chart.name)
  formData.append('chartCode', arg.chart.chartCode || '')
  formData.append('category', arg.chart.category)
  formData.append('scope', arg.chart.scope)
  formData.append(
    'previewImage',
    arg.chart.manualPreviewImage || arg.chart.autoPreviewImage || ''
  )

  formData.append('file', localFile)
  let headers = formData.getHeaders()
  headers['authorization'] = arg.user.token
  let result = await http.post(
    arg.user.server + '/desktop/publish/' + arg.chart.companyId,
    formData,
    {
      headers
    }
  )
  return result.data
}

export async function publishCheck(arg: any) {
  let result = await http.post(
    arg.user.server + '/desktop/publishCheck/' + arg.chart.companyId,
    arg.chart,
    {
      headers: {authorization: arg.user.token}
    }
  )
  return result.data
}

export async function downloadFromServer(params: any) {
  let result = await http.get(
    params.user.server + '/desktop/download/' + params.query.key,
    {headers: {authorization: params.user.token}, responseType: 'arraybuffer'}
  )
  let contentDisposition = result.headers['content-disposition']
  let filename = contentDisposition.substring(
    contentDisposition.indexOf('filename=') + 9
  )
  filename = decodeURIComponent(filename)
  return {data: result.data, filename}
}

export async function openLink(arg: any) {
  let store = await getStore()
  let url = arg.url.toLowerCase()
  if (url.indexOf('http://') == 0 || url.indexOf('https://') == 0) {
    shell.openExternal(arg.url)
  } else {
    shell.openExternal(store.server + arg.url)
  }
}

/**
 *
 * @param arg 搜索服务端的数据表格
 * @returns
 */
export async function searchTables(arg: any) {
  let result = await http.post(
    arg.user.server + '/desktop/searchTables',
    arg.query,
    {
      headers: {authorization: arg.user.token}
    }
  )
  return result.data
}

/**
 * 获取服务端表格详情
 * @param arg
 * @returns
 */
export async function getTableDetail(arg: any) {
  let result = await http.post(
    arg.user.server + '/desktop/getTableDetail',
    arg.query,
    {
      headers: {authorization: arg.user.token}
    }
  )
  return result.data
}
