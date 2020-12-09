import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Layout from '@/layout/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/use',
    children: [
      {
        path: '/use',
        name: 'Use',
        component: () => import('../views/install/Install')
      },

      {
        path: '/dialog',
        name: 'Dialog',
        component: () => import('../views/dialog/Dialog.vue')
      },
      {
        path: '/tablePagination',
        name: 'TablePagination',
        component: () => import('../views/table-pagination/TablePagination.vue')
      },
      {
        path: '/selectForm',
        name: 'SelectForm',
        component: () => import('../views/select-form/SelectForm.vue')
      }
    ]
  },
  {
    path: '/form_design',
    name: 'FormDesign',
    component: () => import('../views/form-design/FormDesign.vue')
  },
  {
    path: '/test_page',
    name: 'coder',
    component: () => import('../views/form-design/test-page.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export { routes }
export default router
