import Menu from './src/Main.vue'
Menu.install = function (Vue) {
    Vue.component(Menu.name, Menu)
}
export default Menu
