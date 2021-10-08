import {message} from 'ant-design-vue'
import axios from 'axios'
// 创建axios实例
const axiosInstance = axios.create({
  baseURL: '', // api的base_url
  timeout: 35000 // 请求超时时间
})

// request拦截器
axiosInstance.interceptors.request.use(
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
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    error.detail = error.response ? error.response.data : null
    console.error('err', error)
    return Promise.reject(error.detail || error)
  }
)

export class Helper {
  static get globalData() {
    return (window as any)._global_data
  }

  static async get(
    url: string,
    showError = false,
    config: any = null
  ): Promise<any> {
    try {
      let result = await axiosInstance.get(url, config)
      return result
    } catch (e) {
      if (showError) {
        message.error(e.message)
      }
      throw e
    }
  }

  static async post(
    url: string,
    data: any,
    showError = false,
    config: any = null
  ): Promise<any> {
    try {
      let result = await axiosInstance.post(url, data, config)
      return result
    } catch (e) {
      if (showError) {
        message.error(e.message)
      }
      throw e
    }
  }
}
