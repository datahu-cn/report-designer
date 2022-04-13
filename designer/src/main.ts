import {DataHuDesigner, IDataHuDesignerOption} from './index'
let opt: IDataHuDesignerOption = {
  language: 'zh-cn',
  getData() {},
  toolbars: []
}
new DataHuDesigner(opt).render('#app', '/第七次全国人口普查.datahu')
