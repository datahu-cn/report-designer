import {IControl, IDataSource, SourceCode, ITableDefinition} from '@datahu/core'
import {IRestfulConfig, RestfulHelper} from './RestfulHelper'
export declare class RestfulDataSource implements IDataSource {
  language: string
  helper: RestfulHelper
  constructor(language: string, config?: object)
  controls: IControl[]
  config: IRestfulConfig
  icon: string
  title: string
  description: string
  sourceCode: SourceCode
  getTables(): Promise<Array<ITableDefinition>>
  getData(tables: Array<ITableDefinition>): Promise<Array<object>>
}
