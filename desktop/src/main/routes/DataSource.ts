import * as dataSources from '@datahu/datasource'
import {IDataSource, Util} from '@datahu/core'
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
  let type = arg.connector.type

  for (let d in dataSources) {
    var dsClass = (dataSources as any)[d] as any
    if (dsClass.name == type) {
      var ds = new dsClass(arg.language, arg.connector.config) as IDataSource
      let results = await ds.getTables()
      return results
    }
  }
  return
}

export async function getData(arg: any): Promise<any> {
  let type = arg.connector.type

  for (let d in dataSources) {
    var dsClass = (dataSources as any)[d] as any
    if (dsClass.name == type) {
      var ds = new dsClass(arg.language, arg.connector.config) as IDataSource
      let results = await ds.getData(arg.tables)
      return results
    }
  }
  return
}
