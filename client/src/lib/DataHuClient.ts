import {createApp, reactive, defineComponent} from 'vue'

export class DataHuClient {
  public static Components: any
  private app: any = null
  private root: any = null
  private state = reactive({
    filePath: ''
  })
  render(el: string, filePath: string) {
    let state = this.state
    state.filePath = filePath
    this.root = defineComponent({
      extends: DataHuClient.Components.Index,
      setup() {
        return {state}
      }
    })
    this.app = createApp(this.root)
      .use(DataHuClient.Components.Antd)
      .use(DataHuClient.Components.VXETable)
    this.app.mount(el)
  }

  useState() {
    return this.state
  }
}
