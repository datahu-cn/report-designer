function parserForArrayFormat(options: any) {
  let result

  switch (options.arrayFormat) {
    case 'index':
      return (key: any, value: any, accumulator: any) => {
        result = /\[(\d*)\]$/.exec(key)

        key = key.replace(/\[\d*\]$/, '')

        if (!result) {
          accumulator[key] = value
          return
        }

        if (accumulator[key] === undefined) {
          accumulator[key] = {}
        }

        accumulator[key][result[1]] = value
      }
    case 'bracket':
      return (key: any, value: any, accumulator: any) => {
        result = /(\[\])$/.exec(key)
        key = key.replace(/\[\]$/, '')

        if (!result) {
          accumulator[key] = value
          return
        }

        if (accumulator[key] === undefined) {
          accumulator[key] = [value]
          return
        }

        accumulator[key] = [].concat(accumulator[key], value)
      }
    default:
      return (key: any, value: any, accumulator: any) => {
        if (accumulator[key] === undefined) {
          accumulator[key] = value
          return
        }

        accumulator[key] = [].concat(accumulator[key], value)
      }
  }
}

function keysSorter(input: any): any {
  if (Array.isArray(input)) {
    return input.sort()
  }

  if (typeof input === 'object') {
    return keysSorter(Object.keys(input))
      .sort((a: any, b: any) => Number(a) - Number(b))
      .map((key: any) => input[key])
  }

  return input
}

function parse(input: any, options: any = undefined) {
  options = Object.assign({arrayFormat: 'none'}, options)

  const formatter = parserForArrayFormat(options)

  // Create an object with no prototype
  const ret = Object.create(null)

  if (typeof input !== 'string') {
    return ret
  }

  input = input.trim().replace(/^[?#&]/, '')

  if (!input) {
    return ret
  }

  for (const param of input.split('&')) {
    let [key, value] = param.replace(/\+/g, ' ').split('=')

    // Missing `=` should be `null`:
    // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
    value = value === undefined ? null : value

    formatter(key, value, ret)
  }

  return Object.keys(ret)
    .sort()
    .reduce((result, key) => {
      const value = ret[key]
      if (
        Boolean(value) &&
        typeof value === 'object' &&
        !Array.isArray(value)
      ) {
        // Sort object keys, not values
        result[key] = keysSorter(value)
      } else {
        result[key] = value
      }

      return result
    }, Object.create(null))
}

/**
 *   TODO
 *   deep parse object/arrays
 */

class URLQueryBuilder {
  /**
   *   @constructor
   *   @param {string} url
   *   @param {string|object|undefined} queries
   */
  url: string = ''
  queries: any
  constructor(url = '', queries: any = {}) {
    this.url = URLQueryBuilder.clearUrl(url)
    this.queries = Object.assign(
      URLQueryBuilder.parseQueriesFromUrl(url),
      URLQueryBuilder.parseQueries(queries)
    )
  }

  /**
   *  Get a clear url without query
   *    @param {string} url
   *    @return {string} url without query string
   */
  static clearUrl(url: any) {
    let clearedUrl = ''

    if (typeof url === 'string') {
      ;[clearedUrl] = url.split('?')
    } else {
      throw new Error(
        `Param 'url' in method 'clearUrl' must be a string got ${url}`
      )
    }

    return clearedUrl
  }

  /**
   *    Parse queries from inital url string
   *    @param {string} url
   */
  static parseQueriesFromUrl(url: any) {
    let queries = {}

    if (typeof url === 'string') {
      ;[, queries] = url.split('?')
      queries = URLQueryBuilder.parseQueries(queries)
    } else {
      throw new Error(
        `Param 'url' in method 'parseQueriesFromUrl' must be a string got ${url}`
      )
    }

    return queries
  }

  /**
   *   Parse queries
   *   @param {Object|string} queries
   *   @return {Object} parsed queries
   */
  static parseQueries(queries: any = {}) {
    let parsedQueries: any = {}
    const typeOfQueries = typeof queries

    if (typeOfQueries === 'string') {
      let queriesArray = queries.split('&')
      for (let i = 0; i < queriesArray.length; i++) {
        let [prop, value] = queriesArray[i].split('=')
        parsedQueries[prop] = value
      }
    } else if (typeOfQueries === 'object' && queries !== null) {
      parsedQueries = queries
    }

    return parsedQueries
  }

  /**
   *    Get a current url with queries
   *  @return {string} url with queries
   */
  get() {
    const {url, queries} = this
    let queriesStr = ''
    for (let prop in queries) {
      const value = queries[prop]
      if (value !== undefined && value !== null) {
        queriesStr += `${prop}=${value}&`
      }
    }

    // delete last unnecessary &
    queriesStr = queriesStr.slice(0, -1)
    if (queriesStr) {
      return `${url}?${queriesStr}`
    } else {
      return url
    }
  }

  /**
   *    Get clear url without queries
   *  @return {string} url without queries
   */
  getClearUrl() {
    return this.url
  }

  /**
   *    Delete query by name
   *    @param {string} name, query that will be deleted
   */
  delete(name: any) {
    delete this.queries[name]

    return this
  }

  /**
   *     Add new query
   *     @param {string} name, name of new query
   *     @param {string|number} value, value for new query
   */
  set(name = '', value: any = undefined) {
    if (typeof name === 'string') {
      this.queries[name] = value
    } else if (typeof name === 'object' && name !== null) {
      const queries: any = name
      for (let i in queries) {
        this.set(i, encodeURIComponent(queries[i]))
      }
    } else {
      throw new Error(`Param 'name' must be a string or an object, got ${name}`)
    }

    return this
  }

  /**
   *     Clear query string
   *     @param {string|object} queries
   */
  reset(queries = '') {
    this.queries = URLQueryBuilder.parseQueries(queries)

    return this
  }

  /**
   *     Check if queries has specific query
   *     @return {boolean} true if has, false if not
   */
  has(name: any) {
    return this.queries.hasOwnProperty(name)
  }
}

export function query(url: string, decode: boolean = false) {
  var startIndex = url.indexOf('?')
  if (startIndex >= 0) {
    var search = url.substring(startIndex)
    var hashIndex = url.indexOf('#')
    if (hashIndex >= 0) {
      search = search.substring(0, hashIndex)
    }
    var params = parse(search)
    if (decode) {
      for (var p in params) {
        params[p] = decodeURIComponent(params[p])
      }
    }
    return params
  }
  return {}
}

export function setQuery(url: string, params: any, encode: boolean = false) {
  var temp = url
  var hash = ''
  var hashIndex = url.indexOf('#')
  if (hashIndex >= 0) {
    temp = temp.substring(0, hashIndex)
    hash = url.substring(hashIndex)
  }
  var builder = new URLQueryBuilder(temp)
  if (encode) {
    for (var p in params) {
      params[p] = encodeURIComponent(params[p])
    }
  }
  builder.set(params)
  return builder.get() + hash
}
