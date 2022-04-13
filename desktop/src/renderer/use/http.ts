import {useElectron, useHandle} from './electron'
import {Util} from '@datahu/core'

var http = {
  request(url: any, data: any) {
    console.log('in request')
    return new Promise((resolve, reject) => {
      let errorFun = (e: any) => {
        reject(e)
      }
      if (data) {
        data = Util.copy(data) //vue3 绑定的对象，此处不能正常传值，需解除绑定
      }
      try {
        useElectron().invoke(url, data, (r: any) => {
          if (r.code) {
            errorFun(r)
            console.error(r)
          } else {
            resolve(r)
          }
        })
      } catch (e) {
        errorFun(e)
      }
    })
  }
}

export default http
