import * as excel from 'exceljs'
const fs = require('fs')
import {
  ITableDefinition,
  IColumnDefinition,
  ColumnType,
  Util
} from '@datahu/core'

export class ExcelHelper {
  config: any
  workbook?: excel.Workbook
  constructor(config: any) {
    this.config = config
  }

  readBuffer() {
    const _this = this
    return new Promise((resolve, reject): any => {
      // C:\\Users\\kylin\\Desktop\\20210328-九麒报价.xlsx
      fs.readFile(_this.config.source[1], async function (err: any, data: any) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  async readFile() {
    const bufferData = (await this.readBuffer()) as Buffer
    const workbook = new excel.Workbook()
    this.workbook = await workbook.xlsx.load(bufferData)
  }

  async query(type: number, table: ITableDefinition | undefined) {
    if (!this.workbook) {
      await this.readFile()
    }
    if (type === 1) {
      return this.getFields()
    }
    if (type === 2) {
      return this.getDataBySheetName(table!)
    }
  }

  private getColumnType(dataType: any): ColumnType {
    if (typeof dataType === 'number') {
      return ColumnType.Number
    }

    if (typeof dataType === 'boolean') {
      return ColumnType.Boolean
    }

    if (dataType instanceof Date) {
      return ColumnType.DateTime
    }

    return ColumnType.String
  }

  private getStart(rows: any) {
    if (!this.config.customStart) {
      let rowIndex = 0
      let columnIndex = 0
      for (let row of rows) {
        let cells = row.values
        columnIndex = 0
        for (let cell of cells) {
          if (cell != undefined && cell != null && cell != '') {
            return {rowIndex, columnIndex}
          }
          columnIndex++
        }
        rowIndex++
      }
    } else {
      return {
        rowIndex: this.config.startRow,
        columnIndex: this.config.startColumn
      }
    }
  }

  private getFields(): any {
    const all: any = []
    if (
      this.workbook &&
      this.workbook.worksheets &&
      this.workbook.worksheets.length > 0
    ) {
      for (let item of this.workbook.worksheets) {
        const rows: excel.Row[] | undefined = item.getRows(0, item.rowCount)
        if (rows && rows.length > 0) {
          let start: any = this.getStart(rows)

          if (rows.length > start.rowIndex) {
            let headerRow = rows[start.rowIndex]
            let nextRow: any =
              rows.length > start.rowIndex + 1
                ? rows[start.rowIndex + 1].values
                : null
            let values: any = headerRow.values
            if (values && values.length > 0) {
              for (let colI = start.columnIndex; colI < values.length; colI++) {
                let value = values[colI]
                if (value) {
                  const result = {
                    TABLE_NAME: item.name,
                    COLUMN_NAME: value,
                    DATA_TYPE:
                      nextRow && nextRow.length > colI
                        ? this.getColumnType(nextRow[colI])
                        : ColumnType.String,
                    COLUMN_COMMENT: null
                  }
                  all.push(result)
                }
              }
            }
          }
        }
      }
    }
    return all
  }

  private getDataBySheetName = (selectInfo: ITableDefinition) => {
    let result = []
    if (
      this.workbook &&
      this.workbook.worksheets &&
      this.workbook.worksheets.length > 0
    ) {
      for (let sheet of this.workbook.worksheets) {
        if (sheet.name === selectInfo.name) {
          const rows: excel.Row[] | undefined = sheet.getRows(
            0,
            sheet.rowCount + 1
          )
          if (rows && rows.length > 0) {
            let start: any = this.getStart(rows)
            const columns: IColumnDefinition[] = selectInfo.columns
            let headerRow = rows[start.rowIndex]
            let values: any = headerRow.values
            for (let rowI = start.rowIndex + 1; rowI < rows.length; rowI++) {
              let currentValues: any = rows[rowI].values

              if (currentValues && currentValues.length > 0) {
                let item: any = {}
                let hasValue = false
                for (let column of columns) {
                  let colIndex = values.indexOf(column.name)
                  if (colIndex >= 0 && colIndex < currentValues.length) {
                    let v = currentValues[colIndex]
                    if (v != undefined && v != null && v != '') {
                      item[column.name] = v
                      hasValue = true
                    }
                  }
                }
                if (hasValue) result.push(item)
              }
            }
          }
        }
      }
    }
    return result
  }

  async getTables(): Promise<Array<ITableDefinition>> {
    const result = await this.query(1, undefined)
    const groupColumns = Util.groupBy(result, 'TABLE_NAME')
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
          type: c.DATA_TYPE
        } as IColumnDefinition
        table.columns.push(col)
      }
    }
    return tables
  }

  async getData(tables: Array<ITableDefinition>): Promise<Array<object>> {
    var results = []
    for (let t of tables) {
      var result = await this.query(2, t)
      results.push(result)
    }
    return results
  }

  end() {
    if (this.workbook) {
      this.workbook = undefined
    }
  }
}
