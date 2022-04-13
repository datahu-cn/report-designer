import {message} from 'ant-design-vue'
import {Util} from '@datahu/core'
import {
  HeaderToolbarMenu,
  IDataHuDesignerOption
} from '../IDataHuDesignerOption'

class http {
  public static option: IDataHuDesignerOption
  public static async request(method, data, disabledError?: boolean) {
    console.log('in request')
    if (data) {
      data = Util.copy(data) //vue3 绑定的对象，此处不能正常传值，需解除绑定
    }
    try {
      let r: any = null
      if (http.option[method.name]) {
        r = await http.option[method.name](data)
      } else if (http.option.localStorage[method.name]) {
        r = await http.option.localStorage[method.name](data)
      }
      return r
    } catch (e: any) {
      if (e instanceof ArrayBuffer) {
        e = new TextDecoder().decode(e)
        if (e) {
          try {
            e = JSON.parse(e)
          } catch {}
        }
      }
      console.error(e)
      if (!disabledError) message.error(e.message)
      else {
        throw e
      }
    }
  }

  public static showToolbarMenu(...menus: Array<HeaderToolbarMenu>) {
    for (let menu of menus) {
      if (http.option.toolbars.indexOf(menu) >= 0) {
        return true
      }
    }
    return false
  }
}

export default http
