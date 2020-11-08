import tablePagination from './components/table-pagination'
import dialog from './components/dialog'
import selectForm from './components/select-form'
import menu from './components/menu'
import header from './components/header'
import richText from './components/rich-text'
import tree from './components/tree'
import input from './components/eve-input'
import select from './components/eve-select'
import scroll from './components/scroll'
import breadcrumb from './components/breadcrumb'
import upload from './components/upload'
const components = [tablePagination, dialog, selectForm, menu, header, richText, tree, input, select, scroll, breadcrumb, upload]

// 定义 install 方法
const install = function (Vue) {
    if (install.installed) return
    install.installed = true
    // 遍历并注册全局组件
    components.forEach(component => Vue.component(component.name, component))
}
//  全局引用可自动安装
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    // 导出的对象必须具备一个 install 方法
    install,
    // 组件列表
    ...components
}
