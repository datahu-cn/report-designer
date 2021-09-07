import * as mssql from 'mssql'
import {ITableDefinition} from '@datahu/core'
export interface ISqlServerConfig {
  title: string
  server: string
  port: number
  user: string
  password: string
  database: string
  options: object
}
export declare class SqlServerHelper {
  config: ISqlServerConfig
  pool?: mssql.ConnectionPool
  constructor(config: ISqlServerConfig)
  createPool(): void
  query(sql: string): any
  private getColumnType
  getTables(): Promise<Array<ITableDefinition>>
  private getSql
  getData(tables: Array<ITableDefinition>): Promise<Array<object>>
  end(): void
}
