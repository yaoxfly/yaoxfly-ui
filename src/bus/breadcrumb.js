import Bus from './index.js'
/*发送*/
const send = {
   //点击面包屑的收缩按钮向菜单布局组件等发送是否收缩
   breadcrumbCollapse: data => {
      Bus.$emit('eve-breadcrumb-container-menu-collapse', data)
   }
}
export { send }