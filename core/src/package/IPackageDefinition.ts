import {IFilterInfo} from '../data'
import {ITableDefinition} from '../common'
export interface IConnectorDefinition {
  type: string
  id: string
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
}

export interface IPackageDefinition {
  id: string
  /** 报表描述信息，发布时可设置 */
  description?: string
  /** 报表行业分类，发布时可设置 */
  category?: number
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
}

export function eachChart(chart: IChartDefinition, handle: Function) {
  let innerEachChart = (
    charts: Array<any>,
    parent: IChartDefinition | null = null
  ) => {
    for (let chart of charts) {
      if (typeof chart == 'object' && chart.option) {
        handle(chart, parent)
      }
      if (chart.children && chart.children.length > 0) {
        innerEachChart(chart.children, chart)
      }
      if (chart.length > 0) {
        innerEachChart(chart, parent)
      }
    }
  }
  innerEachChart([chart])
}
