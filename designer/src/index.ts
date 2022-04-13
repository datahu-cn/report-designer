import './assets/css/app.less'
// import 'ant-design-vue/dist/antd.less'
import App from './App.vue'
import Icon from './components/common/icon/Icon.vue'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

// import VXETablePluginExportXLSX from 'vxe-table-plugin-export-xlsx'

// VXETable.use(VXETablePluginExportXLSX)

import * as Vue from 'vue'
import * as DatahuCore from '@datahu/core'
import * as DatahuComponentBase from '@datahu/component-base'
let _w: any = window
_w.Vue = Vue
_w.DatahuCore = DatahuCore
_w.DatahuComponentBase = DatahuComponentBase

import {DataHuDesigner} from './DataHuDesigner'

DataHuDesigner.Components = {App, VXETable, Icon}
let w: any = window
w.DataHuDesigner = DataHuDesigner
export {DataHuDesigner}
export * from './IDataHuDesignerOption'
export * from './ILocalStorage'
export * from './WebLocalStorage'
export * from './ZipHelper'
export * from './WebDataHuDesignerOption'
