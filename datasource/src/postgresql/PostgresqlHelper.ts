import {Pool} from 'pg'
import {
  ITableDefinition,
  IColumnDefinition,
  ColumnType,
  Util,
  Crypto,
  ITableQueryPager
} from '@datahu/core'
import {escape} from 'sqlstring'

export class PostgresqlHelper {
  config: any
  pool?: Pool
  constructor(config: any) {
    this.config = config
  }

  async createPool() {
    var option = {
      host: this.config.host,
      port: this.config.port,
      user: this.config.user,
      password: Crypto.Decrypt(this.config.password, 'sjwkdjsklwjfdlks'),
      database: this.config.database
    } as any
    if (this.config.ssl) {
      option.ssl = {
        ca: this.config.sslCa,
        cert: this.config.sslCert,
        key: this.config.sslKey,
        rejectUnauthorized: this.config.sslRejectUnauthorized
      }
    }
    this.pool = new Pool(option)
  }

  async query(sql: string): Promise<any> {
    if (!this.pool) {
      await this.createPool()
    }
    return await this.pool!.query(sql)
  }

  private getColumnType(dataType: string): ColumnType {
    dataType = dataType.toLowerCase()
    switch (dataType) {
      case 'bigint':
      case 'bigserial':
      case 'integer':
      case 'smallint':
      case 'numeric':
      case 'double precision':
      case 'real':
      case 'smallserial':
      case 'serial':
      case 'money':
      case 'interval':
        return ColumnType.Number
      case 'date':
      case 'timestamp':
        return ColumnType.DateTime
      case 'boolean':
        return ColumnType.Boolean
      default:
        if (dataType.startsWith('timestamp')) {
          return ColumnType.DateTime
        }
        if (dataType.startsWith('interval')) {
          return ColumnType.Number
        } else {
          return ColumnType.String
        }
    }
  }

  async getTables(pager: ITableQueryPager): Promise<any> {
    let startNum = (pager.current - 1) * pager.pageSize

    let tableSql = `   from information_schema.tables ${
      pager.searchText
        ? " where   (table_schema || '.' || table_name) like " +
          escape('%' + pager.searchText + '%')
        : ''
    } `

    let sql = ` select (t1.table_schema || '.' || t1.table_name) table_name, t2.column_name, t2.data_type from 
     ( select table_schema, table_name ${tableSql}  order by (table_schema || '.' || table_name) ${
      pager.desc ? 'desc' : ''
    }  limit ${pager.pageSize} offset ${startNum} )
     t1 inner join information_schema.columns t2 on t1.table_schema = t2.table_schema and t1.table_name = t2.table_name 
    `
    let data: any = await this.query(sql)
    var groupColumns = Util.groupBy(data.rows as Array<any>, ['table_name'])
    var tables: Array<ITableDefinition> = []
    for (let t of groupColumns) {
      let cols = t as Array<any>
      let table = {
        id: '',
        name: cols[0]['table_name'],
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
          name: c['column_name'],
          description: '',
          type: this.getColumnType(c['data_type'])
        } as IColumnDefinition
        table.columns.push(col)
      }
    }

    let totalSql = `select count(*) count_total  ${tableSql}  `
    let totalData = await this.query(totalSql)
    let total = totalData.rows[0]['count_total']
    return {tables, total}
  }

  private getSql(table: ITableDefinition): string {
    let sql = 'select '
    for (let col of table.columns) {
      if (!col.formula) {
        sql += '"' + col.name + '"' + ','
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
      let items: Array<any> = data.rows
      results.push(items)
    }
    return results
  }

  async end() {
    if (this.pool) {
      await this.pool.end()
    }
  }
}
