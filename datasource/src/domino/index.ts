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
import {DominoHelper} from './DominoHelper'

export class DominoDataSourceOption extends BaseDataSourceOption {
  static controls: Array<IControl> = []

  @ComponentControl({
    type: ControlType.text,
    title: 'Domino Web 地址'
  })
  url: string = 'http://localhost'

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
    title: '数据库文件'
  })
  database: string = ''

  @ComponentControl({
    type: ControlType.text,
    title: '视图'
  })
  view: string = ''

  @ComponentControl({
    type: ControlType.boolean,
    title: '查询所有数据'
  })
  queryAll: boolean = true

  @ComponentControl({
    type: ControlType.objectSet,
    title: '自定义查询参数'
  })
  params: Array<any> = [
    {
      key: '',
      value: ''
    }
  ]
}

export class DominoDataSource extends BaseDataSource {
  helper?: DominoHelper
  constructor(language: string, config?: DominoDataSourceOption) {
    super(language, config)
    this.title = 'Domino Lotus'
    this.description = 'Domino Lotus'
    if (config) {
      this.helper = new DominoHelper(config)
    }
  }

  // 数据源默认配置值
  config: DominoDataSourceOption = new DominoDataSourceOption()

  icon: string =
    '<svg t="1636083588417" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1847"><path d="M304.28 247.72a39.984 39.984 0 0 1 0 56.56 39.984 39.984 0 0 1-56.56 0 39.984 39.984 0 0 1 0-56.56 39.984 39.984 0 0 1 56.56 0z m-152.56 100a39.984 39.984 0 0 0 0 56.56 39.984 39.984 0 0 0 56.56 0 39.984 39.984 0 0 0 0-56.56 39.984 39.984 0 0 0-56.56 0z m254.56-198a39.984 39.984 0 0 0-56.56 0 39.984 39.984 0 0 0 0 56.56 39.984 39.984 0 0 0 56.56 0 39.984 39.984 0 0 0 0-56.56z m-148.56 570a39.984 39.984 0 0 0 0 56.56 39.984 39.984 0 0 0 56.56 0 39.984 39.984 0 0 0 0-56.56 39.984 39.984 0 0 0-56.56 0zM944 664V160c0-44.112-35.888-80-80-80h-13.52A159.008 159.008 0 0 1 872 160v704c0 29.136-7.864 56.448-21.52 80H864c44.112 0 80-35.888 80-80a40 40 0 1 1 80 0c0 88.224-71.776 160-160 160H160c-88.224 0-160-71.776-160-160V160C0 71.776 71.776 0 160 0h704c88.224 0 160 71.776 160 160v504a40 40 0 1 1-80 0z m-534 280c44.112 0 80-35.888 80-80V160c0-44.112-35.888-80-80-80H160c-44.112 0-80 35.888-80 80v312h290a40 40 0 1 1 0 80H80v312c0 44.112 35.888 80 80 80h250zM560 944c44.112 0 80-35.888 80-80V160c0-44.112-35.888-80-80-80h-11.52a159.008 159.008 0 0 1 21.52 80v704c0 29.136-7.864 56.448-21.52 80H560zM712 80h-13.52A159.008 159.008 0 0 1 720 160v704c0 29.136-7.864 56.448-21.52 80H712c44.112 0 80-35.888 80-80V160c0-44.112-35.888-80-80-80z" fill="#4A90E2" p-id="1848"></path></svg>'
  sourceCode: SourceCode = SourceCode.Javascript
  getTables(): Promise<Array<ITableDefinition>> {
    return this.helper!.getTables()
  }
  getData(tables: Array<ITableDefinition>): Promise<Array<object>> {
    return this.helper!.getData(tables)
  }
}
