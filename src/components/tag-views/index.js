import TagViews from './src/Main.vue'
TagViews.install = function (Vue) {
    Vue.component(TagViews.name, TagViews)
}
export default TagViews
