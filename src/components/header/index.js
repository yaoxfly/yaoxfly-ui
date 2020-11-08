import Header from './src/Main.vue'
Header.install = function (Vue) {
    Vue.component(Header.name, Header)
}
export default Header
