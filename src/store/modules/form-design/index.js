import state from './state.js'
import mutations from './mutations'
import actions from './actions.js'
import getters from './getters'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}