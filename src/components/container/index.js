import container from './src/Main.vue'
container.install = function (Vue) {
    Vue.component(container.name, container)
}
export default container
