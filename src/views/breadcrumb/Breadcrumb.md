  # Breadcrumb 面包屑
    显示当前页面的路径，快速返回之前的任意页面。
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
    <eve-breadcrumb :menu="menu"></eve-breadcrumb>
  </div>
</template>
<script>

export default {
  name: 'Breadcrumb',
  data () {
    //菜单数据
    return {
      menu: [{
        text: 'Breadcrumb',
        path: '/breadcrumb'
      },
      {
        text: '安装',
      }]
    }
  },
  mounted () {

  },

  methods: {

  }
}
</script>
```

### Attributes
| 参数   | 说明 | 类型  | 可选值 | 默认值 |
| ----- | ------ | ----- | ----- | - |
| separator  | 面包屑分割符  |string| — |  / | 
| separator-class | 图标分割符 el-icon-arrow-right 可使用相应的 iconfont 作为分隔符,注意这将使 separator 设置失效 | string | — |  —  | 
| menu| 菜单数据--内置了转换方法可自动转换成面包屑数据(推荐),刷新也不会没 |  array | — | [] |
| data | 自定义面包屑数据--自己转换而来的数据，如有传菜单数据会替换掉这个数据|  array | — | [] |
| width | 宽度 |   number, string | — | 100% |
| height |  高度 |  number, string | — | 50 |
| Left | 文本离左边的距离 |  number, string | — |  20 |
| icon-class | 左边字体图标类，详细参数见下表 |  object | — |  —  |
| icon | 是否显示图标 |  boolean | — |  true  |
| icon-left |  图标、图片等离左边的距离 |  number, string | — |  10  |
| config |  配置菜单、面包屑数据的text、path、children等key值--支持只修改某个key值,其他配置默认,详细参数见下表 |  object | — |   —   |

### icon-class
| 参数   | 说明 | 类型  | 可选值 | 默认值 |
| ----- | ------ | ----- | ----- | - |
| expand | 展开 | string | 参考element-ui字体图标库 | el-icon-s-fold |
| shrink | 收缩 | string | 参考element-ui字体图标库 | el-icon-s-unfold |

### config
| 参数   | 说明 | 类型  | 可选值 | 默认值 |
| ----- | ------ | ----- | ----- | - |
| text | 菜单文本渲染的key值 | string |  — | text |
| path | 菜单路径渲染的key值 | string |  — | path |
| children | 树结构数据的孩子节点key值 | string |  — | children |

> 当这里的配置修改时，为了联动，Menu组件的配置，也要进行同步修改。

### Events
| 事件名称 | 说明 | 回调参数  |
| ----| ----| --- | 
| icon-click | 左边图标的回调事件 | — |

### Function
| 方法名 | 说明 | 参数  |
| ----| ----| --- | 
| saveCache | 存储缓存--刷新时面包屑不刷新，传自定义数据时用|   function (data, name = 'breadcrumd');两个参数，data要存储的数据, name 缓存的名字默认是breadcrumd| 
| getCache | 获取缓存，传自定义数据时用 |  function ( name = 'breadcrumd');  name 缓存的名字 | 

### Slot
| 方法名 | 说明 
| ----| ----| 
| left | 左边收缩展开小图标 |  
