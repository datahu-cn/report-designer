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
import {RestfulHelper} from './RestfulHelper'

let i18n = I18n.get('zh-cn')

export class RestfulDataSourceOption extends BaseDataSourceOption {
  static controls: Array<IControl> = []

  @ComponentControl({
    type: ControlType.text,
    title: i18n.restful_url
  })
  url: string = ''

  @ComponentControl({
    type: ControlType.text,
    title: i18n.restful_result_field
  })
  resultField: string = 'data'

  @ComponentControl({
    type: ControlType.select,
    title: i18n.restful_result_type,
    options: [
      {value: 'Array<String,Object>', label: '单表数组'},
      {
        value: 'Object<String,Array<String,Object>>',
        label: '多表对象'
      }
    ]
  })
  resultType: string = 'Array<String,Object>'

  @ComponentControl({
    type: ControlType.select,
    title: i18n.restful_method,
    options: [
      {value: 'get', label: 'GET'},
      {value: 'post', label: 'POST'}
    ]
  })
  method: string = 'get'

  @ComponentControl({
    type: ControlType.boolean,
    title: i18n.restful_open_auth
  })
  openAuth: boolean = false

  @ComponentControl({
    type: ControlType.select,
    name: 'authMode',
    title: i18n.restful_auth_mode,
    options: [{value: 'basicAuth', label: 'Basic Auth'}],
    show: ((data: any) => {
      return data.openAuth
    }).toString()
  })
  authMode: string = ''

  @ComponentControl({
    type: ControlType.text,
    title: i18n.restful_username,
    show: ((data: any) => {
      return data.authMode === 'basicAuth'
    }).toString()
  })
  username: string = ''

  @ComponentControl({
    type: ControlType.password,
    title: i18n.restful_password,
    show: ((data: any) => {
      return data.authMode === 'basicAuth'
    }).toString()
  })
  password: string = ''

  @ComponentControl({
    type: ControlType.textarea,
    title: i18n.restful_request_body,
    show: ((data: any) => {
      return data.method === 'post'
    }).toString()
  })
  requestBody: string = ''

  @ComponentControl({
    type: ControlType.objectSet,
    title: i18n.restful_params
  })
  params: Array<any> = [
    {
      key: '',
      value: ''
    }
  ]

  @ComponentControl({
    type: ControlType.objectSet,
    title: i18n.restful_headers
  })
  headers: Array<any> = [
    {
      key: '',
      value: ''
    }
  ]
}

export class RestfulDataSource extends BaseDataSource {
  helper?: RestfulHelper
  constructor(language: string, config?: RestfulDataSourceOption) {
    super(language, config)
    this.title = 'Restful'
    this.description = 'Restful API'
    if (config) {
      this.helper = new RestfulHelper(config)
    }
  }

  // 数据源默认配置值
  config: RestfulDataSourceOption = new RestfulDataSourceOption()

  icon: string =
    '<svg t="1618199301568" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3049" width="64" height="64" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"></style></defs><path d="M251.2 395.2h33.6c9.6 0 16 1.6 19.2 4.8 3.2 3.2 4.8 11.2 4.8 20.8v16c0 4.8 0 9.6 1.6 14.4 0 1.6 1.6 4.8 1.6 9.6h38.4v-4.8c-3.2-1.6-4.8-4.8-6.4-9.6 0-3.2-1.6-8-1.6-16v-11.2c0-11.2-1.6-20.8-4.8-25.6-3.2-6.4-8-9.6-16-12.8 9.6-3.2 16-8 19.2-16s6.4-16 6.4-24c0-6.4-1.6-12.8-3.2-17.6s-4.8-9.6-8-14.4c-4.8-4.8-9.6-9.6-16-11.2-6.4-3.2-14.4-4.8-25.6-4.8h-80v166.4h33.6v-64z m0-72h38.4c6.4 0 12.8 1.6 16 3.2 6.4 3.2 9.6 9.6 9.6 20.8 0 9.6-3.2 16-9.6 19.2-3.2 1.6-9.6 3.2-16 3.2h-36.8v-46.4zM419.2 387.2h80v-28.8h-80v-35.2h88v-30.4H384v168h126.4v-30.4h-91.2zM624 364.8l-28.8-6.4c-11.2-3.2-19.2-4.8-22.4-6.4-4.8-3.2-8-8-8-12.8 0-6.4 3.2-11.2 8-14.4 4.8-3.2 12.8-4.8 22.4-4.8 8 0 14.4 1.6 20.8 4.8 8 4.8 12.8 11.2 12.8 20.8h33.6c0-17.6-8-32-19.2-40-12.8-9.6-27.2-14.4-44.8-14.4-20.8 0-36.8 4.8-48 14.4-11.2 9.6-16 22.4-16 36.8 0 16 6.4 28.8 17.6 36.8 6.4 4.8 19.2 9.6 36.8 12.8l17.6 3.2c11.2 1.6 17.6 4.8 22.4 8 4.8 3.2 8 8 8 12.8 0 9.6-4.8 16-14.4 19.2-4.8 1.6-12.8 3.2-20.8 3.2-14.4 0-24-3.2-30.4-9.6-3.2-3.2-4.8-9.6-6.4-17.6h-33.6c0 17.6 6.4 30.4 19.2 41.6s30.4 14.4 51.2 14.4c20.8 0 38.4-4.8 49.6-14.4s17.6-22.4 17.6-38.4c0-14.4-4.8-25.6-14.4-33.6-8-8-17.6-12.8-30.4-16zM678.4 323.2h49.6v137.6h35.2v-137.6h49.6v-30.4h-134.4zM264 571.2l-59.2 166.4h36.8l11.2-33.6h60.8l11.2 33.6h38.4L304 571.2h-40z m-1.6 104l22.4-65.6 20.8 65.6h-43.2zM456 571.2H384v166.4h35.2v-59.2h35.2c17.6 0 32-4.8 41.6-12.8s14.4-22.4 14.4-41.6c0-17.6-4.8-32-14.4-40-11.2-8-24-12.8-40-12.8z m12.8 72c-4.8 3.2-11.2 6.4-19.2 6.4h-32v-49.6h32c8 0 14.4 1.6 19.2 4.8 4.8 3.2 6.4 9.6 6.4 19.2s-1.6 16-6.4 19.2zM534.4 571.2h35.2v166.4h-35.2z" fill="#1296db" p-id="3050"></path></svg>'
  title: string = ''
  description: string = ''
  sourceCode: SourceCode = SourceCode.None
  getTables(): Promise<Array<ITableDefinition>> {
    return this.helper!.getTables()
  }
  getData(tables: Array<ITableDefinition>): Promise<Array<object>> {
    return this.helper!.getData(tables)
  }
}
