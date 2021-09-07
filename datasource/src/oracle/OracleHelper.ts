import * as oracledb from 'oracledb'
import {
  ITableDefinition,
  IColumnDefinition,
  ColumnType,
  Util,
  Crypto
} from '@datahu/core'

let db: any = (oracledb as any).initOracleClient
  ? oracledb
  : (oracledb as any).default

let isInit = false

export class OracleHelper {
  config: any
  pool?: oracledb.Connection
  constructor(config: any) {
    this.config = config
    if (this.config.oracleClient && !isInit) {
      db.initOracleClient({
        libDir: this.config.oracleClient
      })
      isInit = true
    }
  }

  async createPool() {
    this.pool = await db.getConnection({
      user: this.config.username,
      password: Crypto.Decrypt(this.config.password, 'sjwkdjsklwjfdlks'),
      connectString: `${this.config.host}:${this.config.port}/${this.config.database}`
    })
  }

  async query(sql: string): Promise<any> {
    if (!this.pool) {
      await this.createPool()
    }
    return await this.pool!.execute(sql)
  }

  private getColumnType(dataType: string): ColumnType {
    dataType = dataType.toLowerCase()
    switch (dataType) {
      case 'number':
      case 'long':
      case 'binary_double':
      case 'binary_float':
      case 'interval day to second':
      case 'interval year to month':
      case 'long raw':
        return ColumnType.Number
      case 'date':
      case 'timestamp':
        return ColumnType.DateTime
      case 'bit':
        return ColumnType.Boolean
      default:
        if (dataType.startsWith('timestamp')) {
          return ColumnType.DateTime
        } else {
          return ColumnType.String
        }
    }
  }

  async getTables(): Promise<Array<ITableDefinition>> {
    var data: any = await this
      .query(`select  (col.OWNER || '.' || col.TABLE_NAME)  TABLE_NAME, 
       col.column_name COLUMN_NAME, 
       col.data_type DATA_TYPE
from sys.all_tab_columns col
inner join sys.all_objects t on col.owner = t.owner and (t.object_type = 'TABLE' or t.object_type = 'VIEW')
and col.table_name = t.object_name and instr(col.table_name, '$') = 0`)
    var groupColumns = Util.groupBy(data.rows as Array<any>, [0])
    var tables: Array<ITableDefinition> = []
    for (let t of groupColumns) {
      let cols = t as Array<any>
      let table = {
        id: '',
        name: cols[0][0],
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
          name: c[1],
          description: c.COLUMN_COMMENT,
          type: this.getColumnType(c[2])
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
        sql += '' + col.name + '' + ','
      }
    }
    sql = sql.substring(0, sql.length - 1)
    sql += ` from ${table.name}`
    return sql
  }

  async getData(tables: Array<ITableDefinition>): Promise<Array<any>> {
    var results = []
    for (let t of tables) {
      let sql = ''
      if (t.useSourceCode) {
        sql = t.sourceCode!
      } else {
        sql = this.getSql(t)
      }
      var data = await this.query(sql)
      let items: Array<any> = []
      for (let row of data.rows) {
        let item: any = {}
        let i = 0
        for (let col of t.columns) {
          item[col.name] = row[i]
          i++
        }
        items.push(item)
      }
      results.push(items)
    }
    return results
  }

  async end() {
    if (this.pool) {
      await this.pool.close()
    }
  }
}
