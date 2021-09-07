import {
  IControl,
  IDataSource,
  SourceCode,
  ITableDefinition,
  ComponentControl,
  ControlType
} from '@datahu/core'
import {I18n} from '../i18n'
import {BaseDataSource, BaseDataSourceOption} from '../base'
import {ExcelHelper} from './ExcelHelper'

export class ExcelDataSourceOption extends BaseDataSourceOption {
  static controls: Array<IControl> = []

  @ComponentControl({
    type: ControlType.filePath,
    title: '上传Excel文件'
  })
  source: string = ''

  @ComponentControl({
    type: ControlType.boolean,
    title: '指定表头起始位置'
  })
  customStart: boolean = false

  @ComponentControl({
    type: ControlType.number,
    title: '起始行',
    show: (opt: any) => {
      return opt.customStart
    }
  })
  startRow: number = 1

  @ComponentControl({
    type: ControlType.select,
    title: '起始列',
    show: (opt: any) => {
      return opt.customStart
    },
    options: () => {
      let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      let opts = []
      let i = 1
      for (let c of chars) {
        opts.push({label: c, value: i})
        i++
      }
      for (let c of chars) {
        opts.push({label: 'A' + c, value: i})
        i++
      }
      return opts
    }
  })
  startColumn: number = 1
}

export class ExcelDataSource extends BaseDataSource {
  helper?: ExcelHelper
  constructor(language: string, config?: ExcelDataSourceOption) {
    super(language, config)
    this.title = 'Excel'
    this.description = 'Excel文件'
    if (config) {
      this.helper = new ExcelHelper(config)
    }
  }

  // 数据源默认配置值
  config: ExcelDataSourceOption = new ExcelDataSourceOption()

  icon: string =
    '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1617700164658" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2112" width="64" height="64" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M682.666667 42.666667H298.666667c-25.6 0-42.666667 17.066667-42.666667 42.666666v213.333334l426.666667 213.333333 170.666666 64 170.666667-64V298.666667l-341.333333-256z" fill="#21A366" p-id="2113"></path><path d="M256 298.666667h426.666667v213.333333H256z" fill="#107C41" p-id="2114"></path><path d="M1024 85.333333v213.333334h-341.333333V42.666667h298.666666c21.333333 0 42.666667 21.333333 42.666667 42.666666z" fill="#33C481" p-id="2115"></path><path d="M682.666667 512H256v426.666667c0 25.6 17.066667 42.666667 42.666667 42.666666h682.666666c25.6 0 42.666667-17.066667 42.666667-42.666666v-213.333334l-341.333333-213.333333z" fill="#185C37" p-id="2116"></path><path d="M588.8 256H256v597.333333h324.266667c29.866667 0 59.733333-29.866667 59.733333-59.733333V307.2c0-29.866667-21.333333-51.2-51.2-51.2z" opacity=".5" p-id="2117"></path><path d="M546.133333 810.666667H51.2C21.333333 810.666667 0 789.333333 0 759.466667V264.533333C0 234.666667 21.333333 213.333333 51.2 213.333333h499.2c25.6 0 46.933333 21.333333 46.933333 51.2v499.2c0 25.6-21.333333 46.933333-51.2 46.933334z" fill="#107C41" p-id="2118"></path><path d="M145.066667 682.666667L256 512 153.6 341.333333h81.066667l55.466666 106.666667c8.533333 12.8 8.533333 21.333333 12.8 25.6l12.8-25.6L375.466667 341.333333h76.8l-102.4 170.666667 106.666666 170.666667h-85.333333l-64-119.466667c0-4.266667-4.266667-8.533333-8.533333-17.066667 0 4.266667-4.266667 8.533333-8.533334 17.066667L226.133333 682.666667H145.066667z" fill="#FFFFFF" p-id="2119"></path><path d="M682.666667 512h341.333333v213.333333h-341.333333z" fill="#107C41" p-id="2120"></path></svg>'

  sourceCode: SourceCode = SourceCode.None
  getTables(): Promise<Array<ITableDefinition>> {
    return this.helper!.getTables()
  }
  getData(tables: Array<ITableDefinition>): Promise<Array<object>> {
    return this.helper!.getData(tables)
  }
}
