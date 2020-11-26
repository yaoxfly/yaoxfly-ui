 import Bus from './index.js'
 /*发送*/
const send = {
    //点击menu，把当前菜单的数据传给页签组件
   menuTagViewsData: data => { 
       Bus.$emit('eve-menu-tag-views-data', data)
    }
}
 /*接收*/
 const receive = {
    //接收面包屑、tag是否收缩的数据
    breadcrumbCollapse: calkback => {
        Bus.$on('eve-breadcrumb-container-menu-collapse', collapse => {
            calkback(collapse)
        })
    }
}
export { send, receive }