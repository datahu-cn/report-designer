import * as mssql from 'mssql'
import {
  ITableDefinition,
  IColumnDefinition,
  ColumnType,
  Util,
  Crypto
} from '@datahu/core'
export interface ISqlServerConfig {
  title: string
  server: string
  port: number
  user: string
  password: string
  database: string
  options: object
}
export class SqlServerHelper {
  config: ISqlServerConfig
  pool?: mssql.ConnectionPool
  constructor(config: ISqlServerConfig) {
    this.config = config
  }

  createPool() {
    var option = {
      server: this.config.server,
      port: this.config.port,
      user: this.config.user,
      password: Crypto.Decrypt(this.config.password, 'sjwkdjsklwjfdlks'),
      database: this.config.database,
      options: this.config.options
    } as any

    this.pool = new mssql.ConnectionPool(option)
  }

  query(sql: string): any {
    return new Promise((resolve, reject) => {
      if (!this.pool) {
        this.createPool()
      }
      this.pool!.connect()
        .then((pool) => {
          pool.query(sql, function (error: any, results: any) {
            if (error) {
              console.error(error)
              reject(error)
            } else {
              resolve(results)
            }
          })
        })
        .catch((err) => {
          reject(err)
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
    var result: any = await this
      .query(`Select T1.NAME TABLE_NAME, t2.name COLUMN_NAME,t3.name DATA_TYPE,t4.value COLUMN_COMMENT FROM sysobjects t1 
      inner join syscolumns t2 on t1.id = t2.id
      inner join systypes t3 on t2.xtype = t3.xusertype
      left join sys.extended_properties  t4 on t2.id = t4.major_id and t4.minor_id = t2.colid
      Where (t1.XType='U' OR  t1.XType='V') `)
    var {recordset} = result
    var groupColumns = Util.groupBy(recordset as Array<any>, 'TABLE_NAME')
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
        sql += ' ' + col.name + ' ' + ','
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
      var {recordset} = await this.query(sql)
      results.push(recordset)
    }
    return results
  }

  end() {
    if (this.pool) {
      this.pool.close()
    }
  }
}
