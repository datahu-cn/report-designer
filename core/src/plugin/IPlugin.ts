import {IComponent} from '../component'
import {IDataSource} from '../dataSource'
export interface IPlugin {
  name: string
  description: string
  version: string
}

export interface IComponentPlugin {
  name: string
  description: string
  version: string
  components: {
    [propName: string]: ThisType<IComponent>
  }
}

export interface IDataSourcePlugin {
  name: string
  description: string
  version: string
  dataSources: {
    [propName: string]: ThisType<IDataSource>
  }
}
