import Vue from 'vue'
import Vuex from 'vuex'
import FormDesign from './modules/form-design'
import modules from './modules'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    FormDesign,
    ...modules
  }
})
