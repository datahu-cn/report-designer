import {IControl, IDataSource, SourceCode, ITableDefinition} from '@datahu/core'
import {IExcelConfig, ExcelHelper} from './ExcelHelper'
export declare class ExcelDataSource implements IDataSource {
  language: string
  helper: ExcelHelper
  constructor(language: string, config?: object)
  controls: IControl[]
  config: IExcelConfig
  icon: string
  title: string
  description: string
  sourceCode: SourceCode
  getTables(): Promise<Array<ITableDefinition>>
  getData(tables: Array<ITableDefinition>): Promise<Array<object>>
}
