import {createApp, reactive, defineComponent} from 'vue'
import {useLanguage, useAntLocale, loadStore, IState} from './use/state'
import {ILocalStorage} from './ILocalStorage'
import http from './use/http'
import router from './router'
import {IDataHuDesignerOption} from './IDataHuDesignerOption'
import {useState} from './use/state'

export class DataHuDesigner {
  public static Components: any
  private app: any = null
  private root: any = null
  private option: IDataHuDesignerOption
  private state = useState()

  constructor(option: IDataHuDesignerOption) {
    this.option = option

    http.option = option
  }

  async render(
    el: string | Element,
    filePath: string,
    createEmpty = false,
    defaultCompanyId = 0
  ) {
    await loadStore()
    if (this.option.language) {
      useLanguage().value = this.option.language
    }
    let state = this.state
    state.filePath = filePath
    state.createEmpty = createEmpty
    state.defaultCompanyId = defaultCompanyId
    let option = this.option
    this.root = defineComponent({
      extends: DataHuDesigner.Components.App,
      setup() {
        let locale = useAntLocale()
        return {locale, option, state}
      }
    })
    this.app = createApp(this.root)
      .use(router)
      // .use(DataHuDesigner.Components.Antd)
      .use(DataHuDesigner.Components.VXETable)
      .component('icon', DataHuDesigner.Components.Icon)
    this.app.mount(el)
  }

  useState(): IState {
    return this.state
  }
}
