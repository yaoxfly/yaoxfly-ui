import Main from './src/Main.vue'
Main.install = function (Vue) {
    Vue.component(Main.name, Main)
}
export default Main
