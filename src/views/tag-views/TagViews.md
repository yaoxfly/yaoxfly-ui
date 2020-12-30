  # TagViews 
    显示当前打开的页面名称，快速切换之前打开的任意页面。
  # 基础用法
 <template>
  <div>
    <Example/>
  </div>
</template>
<script>
import Example from './Example'
import ScrollExample from './ScrollExample'
export default {
  components: {
    Example,
    ScrollExample
  }
}
</script>

# 演示代码

```html
<template>
  <div>
    <eve-tag-views></eve-tag-views>
  </div>
</template>
<script>

export default {
  name: 'TagViews',
  data () {
    return {}
  },
}
</script>

```

# 滚动的页签
 <template>
  <div>
    <ScrollExample/>
  </div>
</template>

# 演示代码

```html
<template>
  <div>
    <eve-tag-views scroll :slides-per-view="6" width="1000px"></eve-tag-views>
  </div>
</template>
<script>

export default {
  name: 'TagViews',
  data () {
    return {}
  },
}
</script>


```


### Attributes
| 参数   | 说明 | 类型  | 可选值 | 默认值 |
| ----- | ------ | ----- | ----- | - |
| cache  | 是否开启缓存  | boolean| — |  true | 
| cache-name | 设置缓存名称 | string | — |  tagViewsDatas | 
| disable-transitions| 是否禁用渐变动画 |  boolean | — | false |
| custom | 是否开启自定义模式(没有使用配套的菜单组件且不想用当前组件内部封装的添加方法时，可使用自定义模式)|  boolean | — | false |
| data | 自定义模式的页签数据(开启自定义模式后才能使用) |   array | — | [] |
| icon-class | 左边字体图标类，详细参数见下表 |  object | — |  —  |
| icon | 是否显示图标 |  boolean | — |  true  |
| icon-left |  图标、图片等离左边的距离 |  number, string | — |  10  |
| height |  高度 |  number, string | — | 50 |
| config |  配置菜单、面包屑数据的text、path、children等key值--支持只修改某个key值,其他配置默认,详细参数见下表 |  object | — |   —   |
| scroll |  是否开始滚动 |  boolean | — |   false   |
| scroll-width |  滚动菜单的宽度,开启滚动必须设置固定值  |  string | — |   100%   |
| slides-per-view |  滚动显示的个数 |  number | — |   5   |
| background-color |  滚动背景颜色 |  string | —  |  transparent  |
| swiper-button-color |  滚动两边按钮的颜色 |  string | swiper-button-white (白)，swiper-button-black(黑)  |  black  |默认蓝 |


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
| click | 点击页签的回调事件 | function(emit) 包含当前路由，和当前页签数据  |
| close | 关闭页签时的回调 | function(emit) 包含当前路由，和当前页签数据  |

### Function
| 方法名 | 说明 | 参数  |
| ----| ----| --- | 
| setCacheData |  设置缓存数据|  function (cacheName=tagViewsDatas)； cacheName 缓存名称， 默认是 tagViewsDatas| 
| getCacheData | 从缓存中获取数据 |  function ( cacheName=tagViewsDatas)； cacheName 缓存的名字， 默认是tagViewsDatas| 
| addData | 添加页签数据 |  function ( data)； data 单个页签数据， 模式格式{text:"",path:""}| 

### Slot
| 方法名 | 说明 
| ----| ----| 
| left | 左边收缩展开小图标 |  

