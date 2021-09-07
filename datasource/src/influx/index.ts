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
import {InfluxHelper} from './InfluxHelper'

export class InfluxDataSourceOption extends BaseDataSourceOption {
  static controls: Array<IControl> = []

  @ComponentControl({
    type: ControlType.text,
    title: '服务器'
  })
  host: string = 'localhost'

  @ComponentControl({
    type: ControlType.number,
    title: '端口'
  })
  port: number = 8086

  @ComponentControl({
    type: ControlType.select,
    title: '协议',
    options: [
      {label: 'http', value: 'http'},
      {label: 'https', value: 'https'}
    ]
  })
  protocol: string = 'http'

  @ComponentControl({
    type: ControlType.text,
    title: '用户名'
  })
  username: string = ''

  @ComponentControl({
    type: ControlType.password,
    title: '密码'
  })
  password: string = ''

  @ComponentControl({
    type: ControlType.text,
    title: '默认数据库'
  })
  database: string = ''

  @ComponentControl({
    type: ControlType.text,
    title: '路径'
  })
  path: string = ''
}

export class InfluxDataSource extends BaseDataSource {
  helper?: InfluxHelper
  constructor(language: string, config?: InfluxDataSourceOption) {
    super(language, config)
    this.title = 'Influx DB'
    this.description = '时序数据库'
    if (config) {
      this.helper = new InfluxHelper(config)
    }
  }

  // 数据源默认配置值
  config: InfluxDataSourceOption = new InfluxDataSourceOption()

  icon: string =
    '<svg t="1622533207845" class="icon" viewBox="0 0 1126 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1729" width="32" height="32"><path d="M959.999832 490.009416a334.310275 334.310275 0 0 0-198.054326-64.588776c-142.719946 0-264.639901 89.036767-313.267082 214.57912H140.800139a76.799971 76.799971 0 0 1-76.799971-76.799971v-102.399962a76.799971 76.799971 0 0 1 76.799971-76.799971h742.399722a76.799971 76.799971 0 0 1 76.799971 76.799971v29.209589zM430.97603 703.999736a338.009473 338.009473 0 0 0-4.863998 57.254379c0 74.367972 24.191991 143.103946 65.100776 198.745525H140.800139a76.799971 76.799971 0 0 1-76.799971-76.799971v-102.399962a76.799971 76.799971 0 0 1 76.799971-76.799971h290.175891zM140.800139 63.999976h742.399722a76.799971 76.799971 0 0 1 76.799971 76.799971v102.399962a76.799971 76.799971 0 0 1-76.799971 76.799971H140.800139a76.799971 76.799971 0 0 1-76.799971-76.799971v-102.399962a76.799971 76.799971 0 0 1 76.799971-76.799971z m608.345372 959.99964C604.031965 1023.999616 486.40001 906.36766 486.40001 761.254115c0-145.113546 117.631956-262.745501 262.745501-262.745502 145.113546 0 262.745501 117.631956 262.745502 262.745502C1011.891013 906.36766 894.259057 1023.999616 749.145511 1023.999616z" fill="#1989FA" fill-opacity=".3" p-id="1730"></path><path d="M746.124712 498.521413v242.175909l144.089546 242.265509A261.516702 261.516702 0 0 1 749.158311 1023.999616C604.031965 1023.999616 486.40001 906.36766 486.40001 761.254115c0-144.102346 116.006356-261.119902 259.724702-262.732702zM166.40013 127.999952a25.59999 25.59999 0 0 1 25.59999 25.59999v63.999976a25.59999 25.59999 0 1 1-51.199981 0v-63.999976a25.59999 25.59999 0 0 1 25.599991-25.59999z m0 332.799875a25.59999 25.59999 0 0 1 25.59999 25.599991v63.999976a25.59999 25.59999 0 1 1-51.199981 0v-63.999976a25.59999 25.59999 0 0 1 25.599991-25.599991z m0 319.99988a25.59999 25.59999 0 0 1 25.59999 25.599991v63.999976a25.59999 25.59999 0 1 1-51.199981 0v-63.999976a25.59999 25.59999 0 0 1 25.599991-25.599991z m102.399961-652.799755a25.59999 25.59999 0 0 1 25.599991 25.59999v63.999976a25.59999 25.59999 0 1 1-51.199981 0v-63.999976a25.59999 25.59999 0 0 1 25.59999-25.59999z m0 332.799875a25.59999 25.59999 0 0 1 25.599991 25.599991v63.999976a25.59999 25.59999 0 1 1-51.199981 0v-63.999976a25.59999 25.59999 0 0 1 25.59999-25.599991z m0 319.99988a25.59999 25.59999 0 0 1 25.599991 25.599991v63.999976a25.59999 25.59999 0 1 1-51.199981 0v-63.999976a25.59999 25.59999 0 0 1 25.59999-25.599991z" fill="#1989FA" p-id="1731"></path></svg>'

  sourceCode: SourceCode = SourceCode.Javascript
  getTables(): Promise<Array<ITableDefinition>> {
    return this.helper!.getTables()
  }
  getData(tables: Array<ITableDefinition>): Promise<Array<object>> {
    return this.helper!.getData(tables)
  }
}
