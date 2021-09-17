import * as dataSources from '@datahu/datasource'
import {IDataSource, Util} from '@datahu/core'
import {getDataSourceTables, getDataSourceData} from './ServerRequest'
export function getSupportDataSources(arg: any): Promise<any> {
  var results = []
  for (let d in dataSources) {
    var dsClass = (dataSources as any)[d] as any
    var ds = new dsClass(arg.language) as IDataSource
    results.push({
      type: dsClass.name,
      config: ds.config,
      controls: Util.convertPropertyFunctionToString(ds.getControls()),
      title: ds.title,
      description: ds.description,
      icon: ds.icon,
      sourceCode: ds.sourceCode,
      disableNew: ds.disableNew
    })
  }
  return Promise.resolve(results)
}

export async function getTables(arg: any): Promise<any> {
  if (arg.connector.proxy && arg.connector.proxy.designEnabled) {
    if (arg.connector.proxy.url && arg.connector.proxy.secret) {
      let results = await getDataSourceTables(
        arg.connector.proxy.url,
        arg,
        arg.connector.proxy.secret
      )
      return results
    }
    throw new Error('代理网关地址或密钥未设置')
  } else {
    let type = arg.connector.type
    for (let d in dataSources) {
      var dsClass = (dataSources as any)[d] as any
      if (dsClass.name == type) {
        var ds = new dsClass(arg.language, arg.connector.config) as IDataSource
        let results = await ds.getTables()
        return results
      }
    }
  }
  return
}

export async function getData(arg: any): Promise<any> {
  if (arg.connector.proxy && arg.connector.proxy.designEnabled) {
    if (arg.connector.proxy.url && arg.connector.proxy.secret) {
      let results = await getDataSourceData(
        arg.connector.proxy.url,
        arg,
        arg.connector.proxy.secret
      )
      return results
    }
    throw new Error('代理网关地址或密钥未设置')
  } else {
    let type = arg.connector.type

    for (let d in dataSources) {
      var dsClass = (dataSources as any)[d] as any
      if (dsClass.name == type) {
        var ds = new dsClass(arg.language, arg.connector.config) as IDataSource
        let results = await ds.getData(arg.tables)
        return results
      }
    }
  }
  return
}
