import {createApp} from 'vue'
import Antd from 'ant-design-vue'
import './assets/css/app.less'
// import 'ant-design-vue/dist/antd.less'
import App from './App.vue'
import Icon from './components/common/icon/Icon.vue'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

import router from '/@/router'

import VXETablePluginExportXLSX from 'vxe-table-plugin-export-xlsx'

VXETable.use(VXETablePluginExportXLSX)

createApp(App)
  .use(router)
  .use(Antd)
  .use(VXETable)
  .component('icon', Icon)
  .mount('#app')
