import {useElectron, useHandle} from './electron'
import {isReactive, toRaw} from 'vue'
import {message} from 'ant-design-vue'
import {Util} from '@datahu/core'

var http = {
  request(url, data, disabledError?: boolean) {
    console.log('in request')
    return new Promise((resolve, reject) => {
      let errorFun = (e) => {
        if (!disabledError) message.error(e.message)
        reject(e)
      }
      if (data) {
        data = Util.copy(data) //vue3 绑定的对象，此处不能正常传值，需解除绑定
      }
      try {
        // // vue3 绑定的对象，此处不能正常传值，需解除绑定
        // if (isReactive(data)) {
        //   data = toRaw(data)
        // } else {
        //   for (var key in data) {
        //     if (isReactive(data[key])) {
        //       data[key] = toRaw(data[key])
        //     }
        //   }
        // }

        useElectron().invoke(url, data, (r) => {
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
