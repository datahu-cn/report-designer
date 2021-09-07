import {IControl, IDataSource, SourceCode, ITableDefinition} from '@datahu/core'
import {ISqlServerConfig, SqlServerHelper} from './SqlServerHelper'
export declare class SqlServerDataSource implements IDataSource {
  language: string
  helper: SqlServerHelper
  constructor(language: string, config?: object)
  controls: IControl[]
  config: ISqlServerConfig
  icon: string
  title: string
  description: string
  sourceCode: SourceCode
  getTables(): Promise<Array<ITableDefinition>>
  getData(tables: Array<ITableDefinition>): Promise<Array<object>>
}
