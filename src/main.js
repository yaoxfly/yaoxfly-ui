// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI)
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Highlight from './directive/highlight'
import '@/assets/style/initialize.scss'
import eveUi from './index.js'
import './assets/style/index.scss'
Vue.use(eveUi)
Vue.config.productionTip = false // from 路径是highlight.js的路径，纯属自定义
Vue.use(Highlight)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')