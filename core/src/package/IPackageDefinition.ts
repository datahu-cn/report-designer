import {IFilterInfo} from '../data'
import {ITableDefinition} from '../common'
export interface IConnectorProxy {
  designEnabled: boolean
  publishEnabled: boolean
  url: string
  secret: string
}

export interface IConnectorDefinition {
  type: string
  id: string
  proxy: IConnectorProxy
  config: object
}
export enum RelationshipType {
  TwoWay = 'TwoWay',
  OneWay = 'OneWay'
}
export interface IRelationshipDefinition {
  from: string[]
  to: string[]
  type: RelationshipType
}

export interface IChartDefinition {
  id: string
  type: string
  option: any
  filters: Array<IFilterInfo>
  children: Array<IChartDefinition>
  pluginName?: string
}

export interface IPackagePlugin {
  name: string
  description: string
  version: string
  content: string
}

export interface IPackageDefinition {
  id: string
  /** 报表描述信息，发布时可设置 */
  description?: string
  /** 报表行业分类，发布时可设置 */
  category?: number
  /** 报表发布所属组织id， 发布时可设置 */
  companyId?: number
  /** 报表搜索关键词， 发布时可设置 */
  keywords?: string
  /** 报表预览时自动生成的预览图片 */
  autoPreviewImage?: string
  /** 手动设置的预览图片， 发布时可设置 */
  manualPreviewImage?: string
  /** 发布报表时的可见范围 1：公开， 2：组织内可见 3：部分可见 */
  scope?: number
  /** 行级数据权限控制，模拟的角色名称 */
  mockRoles?: Array<string>
  theme: string
  filters: Array<IFilterInfo>
  chart: IChartDefinition
  connectors: Array<IConnectorDefinition>
  tables: Array<ITableDefinition>
  relationships: Array<IRelationshipDefinition>
  /** 数据缓存功能，在报表发布时，将数据表中已经处理后的数据缓存下来，优化报表发布后的数据加载速度，设计器中不使用缓存，无优化 */
  cacheData?: any

  plugins?: Array<IPackagePlugin>
}
