import * as excel from 'exceljs'
import {ITableDefinition} from '@datahu/core'
export interface IExcelConfig {
  title: string
  start: string
  source: string
}
export declare class ExcelHelper {
  config: IExcelConfig
  workbook?: excel.Workbook
  constructor(config: IExcelConfig)
  readBuffer(): Promise<unknown>
  readFile(): Promise<void>
  query(type: number, table: ITableDefinition | undefined): Promise<any>
  private getColumnType
  private getFields
  private getDataBySheetName
  getTables(): Promise<Array<ITableDefinition>>
  getData(tables: Array<ITableDefinition>): Promise<Array<object>>
  end(): void
}
