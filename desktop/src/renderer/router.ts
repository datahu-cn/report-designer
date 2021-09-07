import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '/@/components/Home.vue'

const routes = [
  {path: '/', name: 'home', redirect: '/chart'},
  {
    path: '/options',
    name: 'options',
    component: () => import('/@/views/Options.vue')
  },
  {
    path: '/chart',
    name: 'chart',
    component: () => import('/@/views/Chart.vue')
  },
  {
    path: '/table',
    name: 'table',
    component: () => import('/@/views/Table.vue')
  },
  {
    path: '/relationship',
    name: 'relationship',
    component: () => import('/@/views/Relationship.vue')
  },
  {
    path: '/dataSource',
    name: 'dataSource',
    component: () => import('/@/views/DataSource.vue')
  } // Lazy load route component
]

export default createRouter({
  routes,
  history: createWebHashHistory()
})
