
<template>
  <div>
    <eve-header
      title="X平台系统"
      sub-title="xxxxxxxxx子系统"
      :logo="require('../../assets/logo.png')"
      :navigation-button="navigationButton"
      :right-content="rightContent"
    >
      <template #dialog-content
        >这里是内容，可以用slot覆盖 ，slot名：dialog-content</template
      >
    </eve-header>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
      //中间按钮的数据
      navigationButton: [
        {
          path: 'dialog', //唯一key值
          type: 'item', // 最底层的菜单-没有子菜单的
          text: '主页'// 菜单名
        },
        {
          path: 'http://www.baidu.com1',
          type: 'item',
          text: '业务应用'
        },

        {
          path: 'http://www.baidu.com测试3',
          type: 'submenu', //有子菜单的
          text: '应用支撑',
          children: [
            {
              path: 'http://www.baidu.com3331',
              type: 'item',
              text: '测试1',
            },
            {
              path: 'http://www.baidu.com3332',
              type: 'item',
              text: '测试2',
            },
            {
              path: 'http://www.baidu.com3333',
              type: 'item',
              text: '测试3',

            }
          ]
        },
      ],

      //右边的内容：一般是图标或者是文本
      rightContent: [
        {
          type: 'icon',
          value: require('../../assets/image/header/help.png'),
        },
        {
          type: 'icon',
          value: require('../../assets/image/header/info.png'),
          number: 8, //在图标右上方添加number
        },
        {
          type: 'icon',
          value: require('../../assets/image/header/head_sculpture.png'),
        },
        {
          value: '李四',
          dialog: true //设置这个属性后,点击这个按钮会弹出对话框,默认是false
        }
      ],
    }
  },
}
</script>


