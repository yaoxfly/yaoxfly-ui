import Layout from './src/Main.vue'
Layout.install = function (Vue) {
    Vue.component(Layout.name, Layout)
}
export default Layout
