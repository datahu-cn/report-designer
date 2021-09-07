import {IControl} from '../control'
import {ITableDefinition} from '../common'

export enum SourceCode {
  None,
  SQL,
  Javascript,
  JSON,
  Text
}

export interface IDataSource {
  /** 当前环境语言，在构造数据源实例时传入 */
  language: string

  /** 数据源的配置信息，包括服务器地址、登录用户名、密码等 */
  config: object

  /** 128x128 大小的 svg 格式图片 */
  icon: string

  /** 连接显示名称，例如：mysql 数据库 */
  title: string

  /** 数据的的说明信息，包括支持的版本范围等 */
  description: string

  /** 获取数据表时，是否支持自定义代码，例如： mysql支持 sql */
  sourceCode: SourceCode

  /** 获取该数据源下所有的表格定义 */
  getTables(): Promise<Array<ITableDefinition>>

  /** 获取指定表格下的数据 */
  getData(tables: Array<ITableDefinition>): Promise<Array<object>>

  getControls(): Array<IControl>

  /** 是否禁用新建 */
  disableNew?: boolean
}
