import Bus from './index.js'

/*接收*/
const receive = {
    //接收菜单组件传过来的当前菜单的数据
    menuTagViewsData: calkback => {
        Bus.$on('eve-menu-tag-views-data', collapse => {
            calkback(collapse)
        })
    }
}
export { receive }