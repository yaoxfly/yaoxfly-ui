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
        path: '/install',
        name: '安装',
        component: () => import('../views/install/Install.vue'),
        meta: { title: '开发指南' }
      },
      {
        path: '/use',
        name: '快速上手',
        component: () => import('../views/use/Use.vue'),

      },
      {
        path: '/main',
        name: 'Main',
        component: () => import('../views/main/Main.vue'),
        meta: { title: '布局组件' }
      },
      {
        path: '/container',
        name: 'Container',
        component: () => import('../views/container/Container.vue')
      },
      {
        path: '/header',
        name: 'Header',
        component: () => import('../views/header/Header.vue'),
        meta: { title: '导航组件' }
      },
      {
        path: '/menu',
        name: 'Menu',
        component: () => import('../views/menu/Menu.vue'),
      },
      {
        path: '/breadcrumb',
        name: 'Breadcrumb',
        component: () => import('../views/breadcrumb/Breadcrumb.vue'),
      },
      {
        path: '/tagViews',
        name: 'TagViews',
        component: () => import('../views/tag-views/TagViews.vue'),
      },
      {
        path: '/dialog',
        name: 'Dialog',
        component: () => import('../views/dialog/Dialog.vue'),
        meta: { title: '常用组件' }
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
      },
      {
        path: '/tree',
        name: 'Tree',
        component: () => import('../views/tree/Tree.vue')
      },
      {
        path: '/dropDownTree',
        name: 'DropDownTree',
        component: () => import('../views/drop-down-tree/DropDownTree.vue')
      },
      {
        path: '/upload',
        name: 'Upload',
        component: () => import('../views/upload/Upload.vue')
      },

      {
        path: '/richText',
        name: 'RichText',
        component: () => import('../views/rich-text/RichText.vue'),
        meta: { title: '其他' }
      },
      {
        path: '/scroll',
        name: 'Scroll',
        component: () => import('../views/scroll/Scroll.vue'),
      },
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
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export { routes }
export default router
