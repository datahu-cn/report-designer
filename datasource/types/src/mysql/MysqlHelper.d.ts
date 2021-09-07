import * as mysql from 'mysql'
import {ITableDefinition} from '@datahu/core'
export interface IMysqlConfig {
  title: string
  host: string
  port: number
  user: string
  password: string
  charset: string
  database: string
  ssl: boolean
  sslCa: string
  sslKey: string
  sslCert: string
  sslRejectUnauthorized: boolean
}
export declare class MysqlHelper {
  config: IMysqlConfig
  pool?: mysql.Pool
  constructor(config: IMysqlConfig)
  createPool(): void
  query(sql: string): any
  private getColumnType
  getTables(): Promise<Array<ITableDefinition>>
  private getSql
  getData(tables: Array<ITableDefinition>): Promise<Array<object>>
  end(): void
}
