import {createApp, reactive} from 'vue'
import Index from './Index.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less' // 引入官方提供的 less 样式入口文件

import 'xe-utils'
import VXETable from 'vxe-table'
import VXETablePluginExportXLSX from 'vxe-table-plugin-export-xlsx'
import '../assets/main.less'
import 'vxe-table/lib/style.css'
VXETable.use(VXETablePluginExportXLSX)

import {DataHuClient} from './DataHuClient'
import ReportPanel from './ReportPanel.vue'

DataHuClient.Components = {Index, Antd, VXETable}
let w: any = window
w.DataHuClient = DataHuClient
export {ReportPanel, DataHuClient}
