import {
  IControl,
  IDataSource,
  SourceCode,
  ITableDefinition,
  IComponent,
  ComponentControl,
  ControlType,
  StyleType,
  Util,
  IPackageDefinition,
  DataMergeMethod,
  ITableQueryPager
} from '@datahu/core'
import {I18n} from '../i18n'

export class BaseDataSourceOption {
  _enabled: boolean = true
  static controls: Array<IControl> = []
  constructor(defaultValues: any = null) {
    Util.cloneTo(defaultValues, this, true)
  }

  @ComponentControl({
    type: ControlType.text,
    title: '标题'
  })
  title: string = ''
}

export class BaseDataSource implements IDataSource {
  language: string = 'zh-cn'
  icon: string = ''
  constructor(language: string, config?: object) {
    this.language = language
    this.config = config
    var i18n = I18n.get(this.language)
    // 数据源配置界面的配置控件
  }

  getTables(
    pager: ITableQueryPager | null = null
  ): Promise<ITableDefinition[]> {
    throw new Error('Method not implemented.')
  }
  getData(tables: ITableDefinition[]): Promise<object[]> {
    throw new Error('Method not implemented.')
  }
  disableNew?: boolean | undefined

  title: string = ''
  description: string = ''

  sourceCode: SourceCode = SourceCode.Javascript

  config: any = new BaseDataSourceOption()

  private _controls: Array<IControl> = []

  private formatControls = (dataSourceOption: any) => {
    if (dataSourceOption && dataSourceOption.controls) {
      if (dataSourceOption.__proto__) {
        this.formatControls(dataSourceOption.__proto__)
      }
      for (let c of dataSourceOption.controls) {
        let has = null
        for (let exist of this._controls) {
          if (c.name == exist.name) {
            has = exist
            break
          }
        }
        if (has) {
          this._controls[this._controls.indexOf(has)] = c
        } else {
          this._controls.push(c)
        }
      }
    }
  }

  getControls(): Array<IControl> {
    if (this._controls.length == 0) {
      this.formatControls(this.config.constructor)
    }
    return this._controls
  }
  setOption(option: any) {
    this.config = option
  }
}
