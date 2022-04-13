import {IPackageDefinition} from '@datahu/core'
import {
  HeaderToolbarMenu,
  IDataHuDesignerOption,
  IDesignerUser
} from './IDataHuDesignerOption'
import {ILocalStorage} from './ILocalStorage'
import {WebLocalStorage} from './WebLocalStorage'
import {ZipHelper} from './ZipHelper'

export abstract class WebDataHuDesignerOption implements IDataHuDesignerOption {
  toolbars: HeaderToolbarMenu[]
  language = 'zh-cn'
  localStorage = new WebLocalStorage('datahu_online_designer')

  constructor(user: IDesignerUser | null = null) {
    if (user) {
      if (!user.server) {
        user.server = location.protocol + '//' + location.host
      }
      this.localStorage.setUserStore(user)
    }
  }
  async getPublishFormData(arg: any) {
    var localFile = await ZipHelper.packageBlob(arg.definition)

    var formData = new FormData()
    if (!arg.chart.category) {
      throw new Error('请选择一个分类')
    }
    if (!arg.chart.name) {
      throw new Error('请设置报表名称')
    }
    formData.append('overwrite', arg.chart.overwrite.toString())
    formData.append('companyId', arg.chart.companyId.toString())
    formData.append('description', arg.chart.description || '')
    formData.append('keywords', arg.chart.keywords || '')
    formData.append('name', arg.chart.name)
    formData.append('chartCode', arg.chart.chartCode || '')
    formData.append('category', arg.chart.category)
    formData.append('scope', arg.chart.scope)
    formData.append(
      'previewImage',
      arg.chart.manualPreviewImage || arg.chart.autoPreviewImage || ''
    )
    formData.append('file', localFile)
    return formData
  }

  async openLink(arg: any) {
    window.open(arg.url)
  }

  async unpackage(buffer: Buffer) {
    let data = await ZipHelper.unpackage(buffer)
    return data
  }

  async save(arg: any) {
    return null
  }

  async saveAs(arg: any) {
    return null
  }

  async openAndReadFile() {
    let promise = new Promise((resove) => {
      var inputElement = document.createElement('input')
      inputElement.type = 'file'
      inputElement.accept = '*/*'
      inputElement.addEventListener('change', (e: any) => {
        if (e.files && e.files.length > 0) {
          var fr = new FileReader()
          fr.onload = function () {
            resove(fr.result)
          }
          fr.readAsText(e.files[0])
        }
      })
      inputElement.dispatchEvent(new MouseEvent('click'))
    })
    return await promise
  }
  useHandle(fun: Function) {}
}
