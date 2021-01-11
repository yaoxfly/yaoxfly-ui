import Vue from 'vue'
import Vuex from 'vuex'
import FormDesign from './modules/form-design'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    test: 1
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    FormDesign
  }
})
