import * as Url from './Url'
import moment from 'moment'
import axios from 'axios'
let http = axios.create({
  baseURL: '', // api的base_url
  timeout: 120000 // 请求超时时间
})
export class Util {
  private static __global = {__sequence: 1}
  static groupBy(value: Array<any>, props: Array<any> | string | Function) {
    let eqFunction = null
    if (typeof props == 'function') {
      eqFunction = props
    } else {
      var properties = props
      if (typeof props == 'string') {
        properties = [props as string]
      }
      eqFunction = (a: any, b: any) => {
        var equal = true

        for (var j = 0; j < properties.length; j++) {
          var property = properties[j]
          if (a[property] !== b[property]) {
            equal = false
            break
          }
        }
        return equal
      }
    }
    var arr = value
    var groups = []

    for (var i = 0, len = arr.length; i < len; i += 1) {
      var obj = arr[i]
      if (groups.length == 0) {
        groups.push([obj])
      } else {
        var equalGroup: any = false
        for (var a = 0, glen = groups.length; a < glen; a += 1) {
          var group = groups[a]
          var equal = eqFunction(group[0], obj)
          if (equal) {
            equalGroup = group
          }
        }
        if (equalGroup) {
          equalGroup.push(obj)
        } else {
          groups.push([obj])
        }
      }
    }
    return groups
  }

  static orderBy(arr: Array<any>, pro: string, desc: boolean = false) {
    if (pro) {
      return arr.sort((a: any, b: any) => {
        if (!desc) {
          return (
            (((a[pro] as any) > b[pro]) as any) -
            (((b[pro] as any) > a[pro]) as any)
          )
        } else {
          return (
            (((b[pro] as any) > a[pro]) as any) -
            (((a[pro] as any) > b[pro]) as any)
          )
        }
      })
    } else {
      return arr.sort()
    }
  }

  static orderByMultiple(arr: Array<any>, orders: Array<any>) {
    if (orders && orders.length > 0) {
      return arr.sort((a: any, b: any) => {
        for (let order of orders) {
          let pro = order.pro
          let desc = order.desc
          if (a[pro] != b[pro]) {
            if (!desc) {
              let r =
                (((a[pro] as any) > b[pro]) as any) -
                (((b[pro] as any) > a[pro]) as any)
              return r
            } else {
              let r =
                (((b[pro] as any) > a[pro]) as any) -
                (((a[pro] as any) > b[pro]) as any)
              return r
            }
          }
        }
        return 0
      })
    } else {
      return arr
    }
  }

  static copy(v: any, replacer?: any): any {
    let skips = ['string', 'number', 'boolean']
    if (!v || skips.indexOf(typeof v) >= 0) {
      return v
    }
    return JSON.parse(JSON.stringify(v, replacer))
  }

  static cloneTo(from: any, to: any, deep: boolean = false): any {
    if (null == from || 'object' != typeof from) return from
    for (let attr in from) {
      if (from.hasOwnProperty(attr)) {
        let v = from[attr]

        if (deep) {
          let toV = to[attr]
          if (
            v != null &&
            v != undefined &&
            typeof v == 'object' &&
            toV != null &&
            toV != undefined
          ) {
            Util.cloneTo(v, toV, deep)
            continue
          }
        }
        to[attr] = v
      }
    }
    return to
  }

  static convertPropertyFunctionToString(
    from: any,
    copyedObjects: Array<any> = []
  ) {
    if (
      null == from ||
      'object' != typeof from ||
      copyedObjects.indexOf(from) >= 0
    )
      return from
    copyedObjects.push(from)
    for (let attr in from) {
      if (from.hasOwnProperty(attr)) {
        let v = from[attr]
        if (typeof v == 'function') {
          from[attr] = v.toString()
        } else {
          if (v instanceof Array) {
            for (let i = 0; i < v.length; i++) {
              Util.convertPropertyFunctionToString(v[i], copyedObjects)
            }
            continue
          } else {
            if (
              v != null &&
              v != undefined &&
              typeof v == 'object' &&
              v != from
            ) {
              Util.convertPropertyFunctionToString(v, copyedObjects)
              continue
            }
          }
        }
      }
    }
    return from
  }

  static filter(items: Array<any>, expression: any | Function) {
    if (!items || items.length == 0) {
      return items
    }
    let filterFunction = null
    if (typeof expression == 'function') {
      filterFunction = expression
    } else {
      filterFunction = (item: any): boolean => {
        for (let key in expression) {
          if (expression[key] != item[key]) {
            return false
          }
        }
        return true
      }
    }
    let results = []
    for (let item of items) {
      if (filterFunction(item)) {
        results.push(item)
      }
    }
    return results
  }

  static assignTo(
    from: any,
    to: any,
    deep: boolean = false,
    copyedObjects: Array<any> = []
  ): any {
    if (
      null == from ||
      'object' != typeof from ||
      copyedObjects.indexOf(from) >= 0
    )
      return from
    copyedObjects.push(from)
    for (let attr in from) {
      if (from.hasOwnProperty(attr)) {
        let v = from[attr]
        if (deep && to[attr] != null && to[attr] != undefined) {
          let toV = to[attr]
          if (v instanceof Array) {
            if (toV.length == 0) {
              to[attr] = v
            } else {
              for (let i = 0; i < v.length; i++) {
                if (toV && toV.length > i) {
                  Util.assignTo(v[i], toV[i], deep)
                }
              }
            }
            continue
          } else {
            if (
              v != null &&
              v != undefined &&
              typeof v == 'object' &&
              toV != null &&
              toV != undefined &&
              v != from
            ) {
              Util.assignTo(v, toV, deep)
              continue
            }
          }
        }
        if (
          to[attr] === null ||
          to[attr] === undefined ||
          (to[attr] === '' && v != null && v != undefined)
        ) {
          to[attr] = v
        }
      }
    }
    return to
  }

  static uniqueId(prefix?: string) {
    var id =
      new Date().getTime().toString() +
      Math.floor(Math.random() * 10000).toString() +
      Util.sequence().toString()
    if (prefix) {
      id = prefix + id
    }
    return id
  }

  static isNode() {
    return typeof window === 'undefined'
  }

  static sequence() {
    return (this.__global['__sequence']++).toString()
  }

  static getRow(data: Array<any>, row: string) {
    let arr = []
    if (data) {
      for (let item of data) {
        arr.push(item[row])
      }
    }
    return arr
  }

  /**
   * set has 操作访问的性能比 Array indexOf 好很多
   * @param data
   * @param row
   * @returns
   */
  static getSet(data: Array<any>, row: string): Set<any> {
    let arr = new Set()
    if (data) {
      for (let item of data) {
        arr.add(item[row])
      }
    }
    return arr
  }

  static format = function (result: string, ...args: any) {
    if (!result) {
      return result
    }
    if (arguments.length > 0) {
      if (arguments.length == 2 && typeof args == 'object') {
        for (var key in args) {
          if (args[key] != undefined) {
            var reg = new RegExp('({' + key + '})', 'g')
            result = result.replace(reg, args[key])
          }
        }
      } else {
        for (var i = 0; i < arguments.length - 1; i++) {
          if (arguments[i + 1] != undefined) {
            //var reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题
            var reg = new RegExp('({)' + i + '(})', 'g')
            result = result.replace(reg, arguments[i + 1])
          }
        }
      }
    }
    return result
  }

  static Url = Url

  static loadScript(url: any) {
    return new Promise((resolve: any) => {
      let id = encodeURIComponent(url)
      if (document.getElementById(id)) {
        resolve()
        return
      }
      let script: any = document.createElement('script'),
        src = url

      script.type = 'text/javascript'
      script.id = id

      if (script.readyState) {
        // ie
        script.onreadystatechange = function () {
          if (
            script.readyState == 'loaded' ||
            script.readyState == 'complete'
          ) {
            script.onreadystatechange = null
            resolve()
          }
        }
      } else {
        script.onload = function () {
          resolve()
        }
      }

      if (src) {
        script.src = src
      }

      document.body.appendChild(script)
    })
  }

  /**
   * 将表格列转换为行
   * @param rows
   * @param columns :参与转换的列
   * @param categoryColumnName ：存储列名称
   * @param valueColumnName ：存储列的值
   * @returns
   */
  static columnToRows(
    rows: Array<any>,
    columns: Array<string>,
    categoryColumnName: string = 'category',
    valueColumnName: string = 'value'
  ): Array<any> {
    let result: Array<any> = []
    if (rows && rows.length > 0) {
      for (let row of rows) {
        for (let column of columns) {
          let newRow: any = {}
          result.push(newRow)
          for (let key in row) {
            if (columns.indexOf(key) < 0) {
              newRow[key] = row[key]
            }
          }
          newRow[categoryColumnName] = column
          newRow[valueColumnName] = row[column]
        }
      }
    }
    return result
  }

  /**
   * 获取集合的前几个元素
   * @param items  集合
   * @param number 元素数量
   * @param pro 排序属性
   * @param desc 是否降序
   * @returns
   */
  static top(
    items: Array<any>,
    number: number,
    pro: string = '',
    desc: boolean = false
  ) {
    let array = items
    if (pro) {
      array = Util.orderBy(items, pro, desc)
    }
    let result = []
    for (let i = 0; i < array.length && i < number; i++) {
      result.push(array[i])
    }
    return result
  }

  static http = http

  static moment = moment

  static getServerUrl() {
    return 'https://datahu.cn'
  }
}
