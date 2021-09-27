import * as mysql from 'mysql'
import {
  ITableDefinition,
  IColumnDefinition,
  ColumnType,
  Util,
  Crypto
} from '@datahu/core'
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
export class MysqlHelper {
  config: IMysqlConfig
  pool?: mysql.Pool
  constructor(config: IMysqlConfig) {
    this.config = config
  }

  createPool() {
    var option = {
      host: this.config.host,
      port: this.config.port,
      user: this.config.user,
      password: Crypto.Decrypt(this.config.password, 'sjwkdjsklwjfdlks'),
      database: this.config.database,
      typeCast: function castField(
        field: any,
        useDefaultTypeCasting: Function
      ) {
        // We only want to cast bit fields that have a single-bit in them. If the field
        // has more than one bit, then we cannot assume it is supposed to be a Boolean.
        if (field.type === 'BIT' && field.length === 1) {
          let buffer = field.buffer()
          return buffer && buffer[0] === 1
        }

        return useDefaultTypeCasting()
      }
    } as any
    if (this.config.ssl) {
      option.ssl = {
        ca: this.config.sslCa,
        cert: this.config.sslCert,
        key: this.config.sslKey,
        rejectUnauthorized: this.config.sslRejectUnauthorized
      }
    }
    this.pool = mysql.createPool(option)
  }

  query(sql: string): any {
    return new Promise((resolve, reject) => {
      if (!this.pool) {
        this.createPool()
      }
      this.pool!.query(sql, function (error: any, results: any, fields: any) {
        if (error) {
          console.error(error)
          reject(error)
        } else {
          resolve({results, fields})
        }
      })
    })
  }

  private getColumnType(dataType: string): ColumnType {
    dataType = dataType.toLowerCase()
    switch (dataType) {
      case 'int':
      case 'float':
      case 'double':
      case 'bigint':
      case 'decimal':
      case 'numeric':
      case 'tinyint':
      case 'smallint':
      case 'mediumint':
        return ColumnType.Number
      case 'date':
      case 'datetime':
      case 'time':
      case 'year':
      case 'timestamp':
        return ColumnType.DateTime
      case 'bit':
        return ColumnType.Boolean
      default:
        return ColumnType.String
    }
  }

  async getTables(): Promise<Array<ITableDefinition>> {
    var data: any = await this
      .query(`SELECT DISTINCT TABLE_NAME, COLUMN_NAME, DATA_TYPE,COLUMN_COMMENT
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = '${this.config.database}'`)
    var groupColumns = Util.groupBy(data.results as Array<any>, 'TABLE_NAME')
    var tables: Array<ITableDefinition> = []
    for (let t of groupColumns) {
      let cols = t as Array<any>
      let table = {
        id: '',
        name: cols[0].TABLE_NAME,
        alias: '',
        useSourceCode: false,
        sourceCode: '',
        columns: [],
        connectorId: '',
        isFormula: false
      } as ITableDefinition
      tables.push(table)
      for (let c of cols) {
        let col = {
          name: c.COLUMN_NAME,
          description: c.COLUMN_COMMENT,
          type: this.getColumnType(c.DATA_TYPE)
        } as IColumnDefinition
        table.columns.push(col)
      }
    }
    return tables
  }

  private getSql(table: ITableDefinition): string {
    let sql = 'select '
    for (let col of table.columns) {
      if (!col.formula) {
        sql += '`' + col.name + '`' + ','
      }
    }
    sql = sql.substring(0, sql.length - 1)
    sql += ` from ${table.name}`
    return sql
  }

  async getData(tables: Array<ITableDefinition>): Promise<Array<object>> {
    var results = []
    for (let t of tables) {
      let sql = ''
      if (t.useSourceCode) {
        sql = t.sourceCode!
      } else {
        sql = this.getSql(t)
      }
      var data = await this.query(sql)
      results.push(data.results)
    }
    return results
  }

  end() {
    if (this.pool) {
      this.pool.end()
    }
  }
}
