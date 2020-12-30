  # Scroll
    滚动组件
  # 基础用法

 <template>
  <div>
    <Example/>
  </div>
</template>

<script>
import Example from './Example'
import SlotExample from './SlotExample'

export default {
  components: {
    Example,
    SlotExample
  }
}
</script>

# 演示代码

```html
<template>
  <div>
    <eve-scroll :data="data" @select="select" bottom-border> </eve-scroll>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: [
        {
          path: 'dialog', //唯一key值
          type: 'item', // 最底层的菜单
          text: '主页'// 菜单名
        },
        {
          path: 'dialog1',
          type: 'item',
          text: '行政许可'
        },
        {
          path: 'dialog2',
          type: 'item',
          text: '市场监管'
        },
        {
          path: 'dialog3',
          type: 'item',
          text: '行政执法'
        },
        {
          path: 'dialog4',
          type: 'item',
          text: '知识产权'
        },
        {
          path: 'dialog5',
          type: 'item',
          text: '质量监管'
        },
        {
          path: 'http://www.baidu.com1',
          type: 'item',
          text: '业务应用'
        },
        {
          path: 'http://www.baidu.com测试3',
          type: 'submenu',
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

        {
          path: 'http://www.baidu.com1211',
          type: 'submenu',
          text: '测试4',
          children: [
            {
              path: 'http://www.baidu.com33311',
              type: 'submenu',
              text: '测试2',
              children: [
                {
                  path: 'http://www.baidu.com3331qq1',
                  type: 'item',
                  text: '测试2'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  mounted () { },
  methods: {
    //点击菜单回调
    select (emit) {
      console.log(emit, 11)
    }
  }
}
</script>
```

# 自定义

 <template>
  <div>
    <SlotExample/>
  </div>
</template>

# 演示代码
```html
<template>
  <div>
    <eve-scroll :data="data" @select="select">
      <template slot-scope="{ data, index, row }">
        <img :src="row.img" />
      </template>
    </eve-scroll>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: [
        {
          img: require('../../assets/image/header/scroll-test.png')
        },
        {
          img: require('../../assets/image/header/scroll-test.png')
        },
        {
          img: require('../../assets/image/header/scroll-test.png')
        },
        {
          img: require('../../assets/image/header/scroll-test.png')
        },
        {
          img: require('../../assets/image/header/scroll-test.png')
        },
        {
          img: require('../../assets/image/header/scroll-test.png')
        }, {
          img: require('../../assets/image/header/scroll-test.png')
        },
        {
          img: require('../../assets/image/header/scroll-test.png')
        },
      ]
    }
  },
  mounted () { },
  methods: {
    //点击菜单回调
    select (emit) {
      console.log(emit, 11)
    }
  }
}
</script>
```


### Attributes
| 参数   | 说明 | 类型  | 可选值 | 默认值 |
| ----- | ------ | ----- | ----- | - |
| data | 是否开始滚动 |array | — | [] | 
| width  | 滚动菜单的宽度 | string | — | 100% | 
| scroll | 是否开始滚动 |boolean | — | true | 
| slides-per-view | 滚动显示的个数 |number | — |5| 
| background-color | 背景颜色 |string | — |transparent| 
| text-color | 字体颜色(中间菜单) | string | — | black |
| active-text-color | 当前激活菜单的文字颜色(中间菜单) | string | — | #409eff |
| swiper-button-color |  滚动两边按钮的颜色 |  string | swiper-button-white (白)，swiper-button-black(黑)| 默认蓝 |
| bottom-border |  是否显示底部的线 |  boolean | — | false |

### Events
| 事件名称 | 说明 | 回调参数  |
| ----| ----| --- | 
| select |菜单激活回调| function(index,indexPath,text,currentData,data) ; 包含index(当前路径)、indexPath(路径数组)、data(菜单数据),text(菜单文本)、currentData(当前菜单详细信息)| 

### Scoped Slot
| name  | 说明 |
|  - |   -     |
|  content | 中间按钮的内容,参数 { data, index, row}， data：整体数据；index：下标；row：一行数据 |


