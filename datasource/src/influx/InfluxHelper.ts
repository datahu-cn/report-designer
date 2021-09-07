import * as Influx from 'influx'
import {
  ITableDefinition,
  IColumnDefinition,
  ColumnType,
  Util,
  Crypto
} from '@datahu/core'
import {InfluxDataSourceOption} from './index'
;(process as any).env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
export class InfluxHelper {
  config: InfluxDataSourceOption
  pool?: Influx.InfluxDB
  constructor(config: InfluxDataSourceOption) {
    this.config = config
  }

  async createPool() {
    let option = Util.copy(this.config)

    if (option.password) {
      option.password = Crypto.Decrypt(option.password, 'sjwkdjsklwjfdlks')
    }

    this.pool = new Influx.InfluxDB(option)
    let names = await this.pool.getDatabaseNames()
    console.log('My database names are: ' + names.join(', '))
  }

  async query(sql: string): Promise<any> {
    if (!this.pool) {
      await this.createPool()
    }
    let r = await this.pool!.query(sql)
    return r
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
    // var data: any = await this.query(`SHOW Tag KEYS`)
    // console.log('data', data)
    // console.log(data.groupRows[0].rows)
    // var groupColumns = Util.groupBy(data.results as Array<any>, 'name')
    // var tables: Array<ITableDefinition> = []
    // for (let t of groupColumns) {
    //   let cols = t as Array<any>
    //   let table = {
    //     id: '',
    //     name: cols[0].TABLE_NAME,
    //     alias: '',
    //     useSourceCode: false,
    //     sourceCode: '',
    //     columns: [],
    //     connectorId: '',
    //     isFormula: false
    //   } as ITableDefinition
    //   tables.push(table)
    //   for (let c of cols) {
    //     let col = {
    //       name: c.COLUMN_NAME,
    //       description: c.COLUMN_COMMENT,
    //       type: this.getColumnType(c.DATA_TYPE)
    //     } as IColumnDefinition
    //     table.columns.push(col)
    //   }
    // }
    return []
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
      let items: Array<any> = []
      for (let item of data) {
        let row: any = {}
        for (let key in item) {
          row[key] = item[key]
        }
        items.push(row)
      }
      results.push(items)
    }
    return results
  }

  end() {}
}
