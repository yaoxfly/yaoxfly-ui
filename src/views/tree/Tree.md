# Tree

用清晰的层级结构展示信息，可展开或折叠。

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

``` html
<template>
  <div>
     <eve-tree
      :data='data'
     ></eve-tree>
  </div>
</template>
<script>

export default {
  data () {
    return {
      data: [
        {
        id: 1,
        label: '一级 1',
        disabled: true, //设置某个节点不能被选择
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1',
          children: [{
            id: 6,
            label: '三级 2-1-1',

          }]
        }, {
          id: 3,
          label: '二级 2-2',

          children: [{
            id: 7,
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        id: 8,
        children: [{
          id: 10,
          label: '二级 3-1',
          children: [{
            id: 11,
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          id: 12,
          children: [{
            id: 13,
            label: '三级 3-2-1'
          }]
        }]
      }
      ],
    }
  },

  methods: {
  }
}
</script>
```

###  Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ----| ----| --- | ---- | ----- |
| data  | 展示数据 | array | — | — |
| props  | 配置选项，具体看下表 | object | — | — |
| show-checkbox  | 节点是否可被选择 | boolean | — | false |
| lazy  | 是否懒加载子节点，需与 load 方法结合使用 | boolean | — | false |
| load  | 加载子树数据的方法，仅当 lazy 属性为true 时生效 |function(node, resolve) | — |  — |
| node-key  | 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的 | string | — |  — |
| default-expanded-keys  | 默认展开的节点的 key 的数组 | array | — |  — |
| default-checked-keys	  | 默认勾选的节点的 key 的数组 | array | — |  — |
| default-expand-all	  | 是否默认展开所有节点 | boolean | — |  false |
| expand-on-click-node	  | 是否在点击节点的时候展开或者收缩节点， 默认值为 false，只有点箭头图标的时候才会展开或者收缩节点。 | boolean | — |  false |
| accordion  | 是否每次只打开一个同级树节点展开 | boolean | — | false |
| draggable  | 是否可以拖拽 | boolean | — | false |
| allow-drop  | 拖拽时判定目标节点能否被放置。type 参数有三种情况：'prev'、'inner' 和 'next'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后 | Function(draggingNode, dropNode, type) | — | — |
| allow-drag  |判断节点能否被拖拽 | Function(node) | — | — |
| highlight-current | 是否高亮当前选中节点 | boolean | — | true |
| filter-node-method | 对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏 | Function(value, data, node,prop) | — | — |


>   1.当同时有data和lazy的情况下，lazy优先级更高，会覆盖data的配置; 2.node-key属性，设置默认展开和默认选中的节点时必须设置

###  Attributes(自定义)

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ----| ----| --- | ---- | ----- |
| width |整颗树的宽度，固定宽度有横向滚动条，100%可向外自动扩伸(不出现横向滚动条)| string, number | — | 100% |
| only-leaf |是否只选中、高亮、编辑叶子节点(最底层的节点)| boolean | — | true |
| operate |是否显示 添加、删除、编辑等按钮| boolean | — | true |
| operate-color |设置添加、删除、编辑等按钮的颜色| string | — |  — |
| is-show-filter |是否开启节点过滤| boolean | — |  true |


###  Events
| 事件名称 | 说明 | 回调参数  |
| ----| ----| --- | 
| check-change  |  节点选中状态发生变化时的回调 |  共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点 | 
| node-click | 节点被点击时的回调 |  共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。 | 
| node-drag-start | 节点开始拖拽时触发的事件 |  共两个参数，依次为：被拖拽节点对应的 Node、event | 
| node-drag-enter | 拖拽进入其他节点时触发的事件 |  共三个参数，依次为：被拖拽节点对应的 Node、所进入节点对应的 Node、event | 
| node-drag-leave | 拖拽离开某个节点时触发的事件 |  共三个参数，依次为：被拖拽节点对应的 Node、所离开节点对应的 Node、event | 
| node-drag-over | 在拖拽节点时触发的事件（类似浏览器的 mouseover 事件） |  共三个参数，依次为：被拖拽节点对应的 Node、当前进入节点对应的 Node、event | 
| node-drag-end | 拖拽结束时（可能未成功）触发的事件 |  共四个参数，依次为：被拖拽节点对应的 Node、结束拖拽时最后进入的节点（可能为空）、被拖拽节点的放置位置（before、after、inner）、event | 
| node-drop | 拖拽成功完成时触发的事件 | 共四个参数，依次为：被拖拽节点对应的 Node、结束拖拽时最后进入的节点、被拖拽节点的放置位置（before、after、inner）、event | 

### props
| 参数 | 说明 | 类型  | 可选值 | 默认值|
| ----| ----| --- |--- | ---|
| label| 指定节点标签为节点对象的某个属性值 | string| —| —|
| children | 指定子树为节点对象的某个属性值 | string | —| —|
| isLeaf| 指定节点是否为叶子节点，仅在指定了lazy属性的情况下生效 |boolean |—| —|

###  Events (自定义)
| 事件名称 | 说明 | 回调参数  |
| ----| ----| --- | 
| append| 点击添加节点图标回调 | 返回一个对象，里面有两个参数， node： 当前节点的 Node 对象，data  当前节点的数据|
| remove| 删除节点图标回调 |返回一个对象，里面有两个参数， node： 当前节点的 Node 对象，data  当前节点的数据|
| edit|  修改节点图标回调 |返回一个对象，里面有两个参数， node： 当前节点的 Node 对象，data  当前节点的数据|


### Function
Tree 内部使用了 Node 类型的对象来包装用户传入的数据，用来保存目前节点的状态。 Tree 拥有如下方法：
| 方法名 | 说明 | 参数  |
| ----| ----| --- | 
| getCheckedNodes|若节点可被选择（即 show-checkbox 为 true），则返回目前被选中的节点所组成的数组, 通过node获取节点。| (leafOnly, includeHalfChecked) 接收两个 boolean 类型的参数，1. 是否只是叶子节点，默认值为 false 2. 是否包含半选节点，默认值为 false|
| getCheckedKeys|若节点可被选择（即 show-checkbox 为 true），则返回目前被选中的节点的 key 所组成的数组,通过key获取节点| (leafOnly) 接收一个 boolean 类型的参数，若为 true 则仅返回被选中的叶子节点的 keys，默认值为 false|
| setCheckedNodes|设置目前勾选的节点，使用此方法必须设置 node-key 属性|(nodes) 接收勾选节点数据的数组 |
| setCheckedKeys|通过 keys 设置目前勾选的节点，使用此方法必须设置 node-key 属性|(keys, leafOnly) 接收两个参数，1. 勾选节点的 key 的数组 2. boolean 类型的参数，若为 true 则仅设置叶子节点的选中状态，默认值为 false |


### Function (自定义)
| 方法名 | 说明 | 参数  |
| ----| ----| --- | 
| addNode| 添加节点数据--外部添加节点数据(默认添加孩子节点数据) | (data,newChild) 接收两个object类型的参数 1.当前节点的数据 2.新的节点数据 格式 {label:'',children:''} ,label和children属性值要和以上属性props的值一致|
| resetChecked| 清空节点 | — |


 ###  Scoped Slot
 | name | 说明 | 
 | ----| ----|  
 |—|自定义树节点的内容(添加、删除、修改等标)，参数为 { node, data }|