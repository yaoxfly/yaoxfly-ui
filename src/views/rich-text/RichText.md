  # RichText
   富文本
  # 基础用法

 <template>
  <div>
    <Example/>
  </div>
</template>

<script>
import Example from './Example'
export default {
  components: {
    Example,
  }
}
</script>

# 演示代码

```html
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
```

### Attributes
| 参数   | 说明 | 类型  | 可选值 | 默认值 |
| ----- | ------ | ----- | ----- | - |
| logo  | logo图片 | string | — | — | 
| title | 标题 | string | — | — | 
| sub-title | 副标题 |  string | — | — |
| left-width |  左边包含logo和系统名的宽度 |  number | — | 250 |
| background |  背景颜色 |  string | — | #409EFF |
| height |  header高度 |  number | — | 55 |
| swiper-button-color |  滚动两边按钮的颜色 |  string | swiper-button-white (白)，swiper-button-black(黑)| swiper-button-white |
| scroll |  是否开启滚动 |  boolean | — | false |
| navigation-width |  导航按钮的宽度--如果开启滚动必须固定一个宽度，不能使用百分比 | string | — | 100% |
| navigation-button | 导航按钮的数据 | array | — | [] |
| text-color | 字体颜色(中间菜单) | string | — | #fff |
| active-text-color | 当前激活菜单的文字颜色(中间菜单) | string | — | blue |
| right-content | 右边的内容：一般是图标或者是文本，详细配置见下表 | array | — | — |
| dialog-right |对话框的距离右边的距离 | number | — |  5 |
| dialog-title |对话框的标题 | string | — |  — |
| dialog-border |对话框的线,默认显示 | boolean | — |  true |
| dialog-button |对话框的按钮 | array | — |  [] |
| linkage-tag-menu |左边菜单数据：联动页签、左边菜单组件，配置后切换顶部菜单，页面默认跳转左侧菜单的第一个，如果存在二级，则跳转到二级菜单的第一个 | array | — |  [] |
| config |配置菜单的text、path、children等key值--支持只修改某个key值,其他配置默认,详细参数见下表 | object | — |   — |
| config |配置菜单的text、path、children等key值--支持只修改某个key值,其他配置默认,详细参数见下表 | object | — |   — |
| slides-per-view |滚动显示的个数 | number | — |   5 |
| background-color |滚动内容背景颜色 | string | — |   transparent |


### right-content
| 参数   | 说明 | 类型  | 可选值 | 默认值 |
| ----- | ------ | ----- | ----- | - |
| type | 类型 | string |  icon、text ,当是文本的时候可不需要填写 | text |
| value | 内容值 | string |  — |  — |
| number | 图标上显示数字 | string |  — | children |
| dialog | 设置这个属性后,点击这个按钮会弹出对话框 | boolean |  — | true |


### config
| 参数   | 说明 | 类型  | 可选值 | 默认值 |
| ----- | ------ | ----- | ----- | - |
| text | 菜单文本渲染的key值 | string |  — | text |
| path | 菜单路径渲染的key值 | string |  — | path |
| children | 树结构数据的孩子节点key值 | string |  — | children |


### Events
| 事件名称 | 说明 | 回调参数  |
| ----| ----| --- | 
| nav-button |中间部分导航按钮点击事件| function(param)  包含导航按钮的路径| 
| right-content-button |右边部分icon和用户信息等按钮的点击事件| function(param)  包含导航按钮的index(下标)和数据| 
| dialog-operate |右边dialog的按钮的点击事件| function(param)  包含dialog按钮的index(下标)和数据| 

### Function
| 方法名 | 说明 | 参数  |
| ----| ----| --- | 
| findlowestMenu | 查找最底层的菜单，当要实现联动页签、左边菜单组件，配置后切换顶部菜单，页面默认跳转左侧菜单的第一个，如果存在二级，则跳转到二级菜单的第一个的功能时使用 | function(menu) 传入菜单数组 |  

### Slot
| name                 | 说明        |
| -------------------- | ----------  |
| left                 |  左边内容    |
| center               | 中间的内容   |
| right                | 右边的内容   |
| dialog-title         | 对话框的标题 |
| dialog-content       | 对话框的内容 |
| dialog-footer        | 对话框的尾部 |

