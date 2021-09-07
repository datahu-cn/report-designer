export class Formula {
  /**
   * 等于
   * @param a
   * @param b
   * @returns
   */
  static eq(a: any, b: any) {
    return a == b
  }

  /**
   * 不等于
   * @param a
   * @param b
   * @returns
   */

  static notEq(a: any, b: any) {
    return a != b
  }

  /**
   * 大于
   * @param a
   * @param b
   * @returns
   */

  static gt(a: any, b: any) {
    return a > b
  }

  /**
   * 大于等于
   * @param a
   * @param b
   * @returns
   */

  static gtOrEq(a: any, b: any) {
    return a >= b
  }

  /**
   * 小于
   * @param a
   * @param b
   * @returns
   */

  static lt(a: any, b: any) {
    return a < b
  }

  /**
   * 小于等于
   * @param a
   * @param b
   * @returns
   */

  static ltOrEq(a: any, b: any) {
    return a <= b
  }

  /**
   * 为空
   * @param a
   * @param b
   * @returns
   */
  static isNull(a: any) {
    return !a && a !== 0
  }

  /**
   * 不为空
   * @param a
   * @param b
   * @returns
   */
  static isNotNull(a: any) {
    return !Formula.isNull(a)
  }

  /**
   * 包含
   * @param a
   * @param b
   * @returns
   */
  static contains(a: any, b: any) {
    if (a != undefined && a != null && b != undefined && b != null) {
      return ('' + a).toLowerCase().indexOf(('' + b).toLowerCase()) >= 0
    }
    return false
  }

  /**
   * 不包含
   * @param a
   * @param b
   * @returns
   */
  static notContains(a: any, b: any) {
    return !Formula.contains(a, b)
  }

  /**
   * 开头是
   * @param a
   * @param b
   * @returns
   */
  static startsWith(a: any, b: any) {
    return a.toString().startsWith(b)
  }

  /**
   * 开头不是
   * @param a
   * @param b
   * @returns
   */
  static notStartsWith(a: any, b: any) {
    return !a.toString().startsWith(b)
  }

  /**
   * 是否存在， 字符、数字、时间等格式需要单独处理
   * @param a
   * @param b
   * @returns
   */
  static in(a: any, b: Array<any>) {
    if (b && b.length > 0) {
      for (let v of b) {
        if (v == a) {
          return true
        }
      }
    }
    return false
  }

  /**
   * 去掉重复值后的集合
   * @param items
   * @param field
   * @returns
   */
  static distinct(items: Array<any>, field: string = ''): Array<any> {
    if (items && items.length > 0) {
      let distinct: Array<any> = []
      let seen = new Set()
      for (let item of items) {
        let v = item
        if (field) {
          v = item[field]
        }
        if (!seen.has(v)) {
          distinct.push(v)
          seen.add(v)
        }
      }
      return distinct
    }
    return []
  }

  /**
   * 唯一计数， 排除了重复值
   * @param items
   * @param field
   * @returns
   */
  static distinctCount(items: Array<any>, field: string = ''): number {
    return Formula.distinct(items, field).length
  }

  /**
   * 计数， 没有排除重复值
   * @param items
   * @param field
   * @returns
   */
  static count(items: Array<any>, field: string = ''): number {
    return items && items.length ? items.length : 0
  }

  /**
   * 求和
   * @param items
   * @param field
   * @returns
   */
  static sum(items: Array<any>, field: string = ''): number {
    if (items && items.length > 0) {
      let total = 0
      for (let item of items) {
        let v = item
        if (field) {
          v = item[field]
        }
        total += v
      }
      return total
    }
    return 0
  }

  /**
   * 最大值
   * @param items
   * @param field
   * @returns
   */
  static max(items: Array<any>, field: string = ''): any {
    if (items && items.length > 0) {
      let max = null
      for (let item of items) {
        let v = item
        if (field) {
          v = item[field]
        }
        if (max == null || max < v) {
          max = v
        }
      }
      return max
    }
    return null
  }

  /**
   * 最小值
   * @param items
   * @param field
   * @returns
   */
  static min(items: Array<any>, field: string = ''): any {
    if (items && items.length > 0) {
      let min = null
      for (let item of items) {
        let v = item
        if (field) {
          v = item[field]
        }
        if (min == null || min > v) {
          min = v
        }
      }
      return min
    }
    return null
  }

  /**
   * 最小值
   * @param items
   * @param field
   * @returns
   */
  static first(items: Array<any>, field: string = ''): any {
    if (items && items.length > 0) {
      if (field) {
        return items[0][field]
      } else {
        return items[0]
      }
    }
    return null
  }

  /**
   * 最小值
   * @param items
   * @param field
   * @returns
   */
  static last(items: Array<any>, field: string = ''): any {
    if (items && items.length > 0) {
      if (field) {
        return items[items.length - 1][field]
      } else {
        return items[items.length - 1]
      }
    }
    return null
  }

  /**
   * 平均值
   * @param items
   * @param field
   * @returns
   */
  static avg(items: Array<any>, field: string = ''): number {
    if (items && items.length > 0) {
      let total = 0
      for (let item of items) {
        let v = item
        if (field) {
          v = item[field]
        }
        total += v
      }
      return total / items.length
    }
    return 0
  }

  /**
   * 集合
   * @param items
   * @param field
   * @returns
   */
  static collection(items: Array<any>, field: string = ''): any {
    let coll: Array<any> = []
    if (items && items.length > 0) {
      if (field) {
        for (let item of items) {
          coll.push(item[field])
        }
      } else {
        coll = items
      }
    }
    return coll
  }
}
