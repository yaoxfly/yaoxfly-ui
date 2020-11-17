import main from './src/Main.vue'
main.install = function (Vue) {
    Vue.component(main.name, main)
}
export default main
