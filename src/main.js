import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Highlight from './directive/highlight'
import ElementUI from 'element-ui'
import '@/assets/style/initialize.scss'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/index.scss'
import eveUi from './index.js'
Vue.use(ElementUI)
Vue.use(eveUi)
Vue.config.productionTip = false // from 路径是highlight.js的路径，纯属自定义
Vue.use(Highlight)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')