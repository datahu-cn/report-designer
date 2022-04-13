import {createRouter, createWebHashHistory} from 'vue-router'
import Option from './views/Options.vue'
import Chart from './views/Chart.vue'
import Table from './views/Table.vue'
import Relationship from './views/Relationship.vue'
import DataSource from './views/DataSource.vue'

const routes: any = [
  {path: '/', name: 'home', redirect: '/chart'},
  {
    path: '/options',
    name: 'options',
    component: Option
  },
  {
    path: '/chart',
    name: 'chart',
    component: Chart
  },
  {
    path: '/table',
    name: 'table',
    component: Table
  },
  {
    path: '/relationship',
    name: 'relationship',
    component: Relationship
  },
  {
    path: '/dataSource',
    name: 'dataSource',
    component: DataSource
  }
]

export default createRouter({
  routes,
  history: createWebHashHistory()
})
