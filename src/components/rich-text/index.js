import RichText from './src/Main.vue'
RichText.install = function (Vue) {
    Vue.component(RichText.name, RichText)
}
export default RichText
