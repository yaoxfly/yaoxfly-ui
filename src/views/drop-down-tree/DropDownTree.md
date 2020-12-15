# DropDownTree

下拉选择树，用清晰的层级结构展示信息，用下拉菜单来选择信息

# 基础用法
单选
<template>
  <div>
    <Example/>
  </div>
  
</template>

<script>

import Example from './Example'
import MultipleExample from './MultipleExample'

export default {
  components: {
    Example,
    MultipleExample,
  }
}
</script>

# 演示代码

``` html
<template>
  <div>
    <eve-drop-down-tree
      :data="data"
      :width="250"
      v-model="value"
      @node-click="nodeClick"
    ></eve-drop-down-tree>
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
          children: [{
            id: 2,
            label: '二级 1-1',
            children: [{
              id: 3,
              label: '三级 1-1-1'
            }
            ]
          }]
        }, {
          id: 4,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1',
            children: [{
              id: 6,
              label: '三级 2-1-1'
            }]
          }, {
            id: 7,
            label: '二级 2-2',
            children: [{
              id: 8,
              label: '三级 2-2-1'
            }]
          }]
        }, {
          id: 9,
          label: '一级 3',
          children: [{
            id: 10,
            label: '二级 3-1',
            children: [{
              id: 11,
              label: '三级 3-1-1'
            }]
          }, {
            id: 12,
            label: '二级 3-2',
            children: [{
              id: 13,
              label: '三级 3-2-1'
            }]
          }]
        }
      ],
      //双向绑定的值--如果初始就有值可回显
      value: ''
    }
  },
  methods: {
    /**@description  节点被点击时的回调
     * @author yx
     * @param  {Object}  data 递给 data 属性的数组中该节点所对应的对象
     * @param  {Object}  node 节点对应的 Node
     * @param  {Object}  indeterminate 节点组件本身
    */
    nodeClick (data, node, indeterminate) {
      console.log(data, node, indeterminate, 'nodeClick')
    }
  }
}
</script>
```

多选

<template>
  <div>
    <MultipleExample/>
  </div>
</template>

# 演示代码

```html
<template>
  <div>
    <eve-drop-down-tree
      :data="data"
      :width="250"
      v-model="values"
      column-collapse-tags
      multiple
      @check="check"
    ></eve-drop-down-tree>
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
          children: [{
            id: 2,
            label: '二级 1-1',
            children: [{
              id: 3,
              label: '三级 1-1-1'
            }
            ]
          }]
        }, {
          id: 4,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1',
            children: [{
              id: 6,
              label: '三级 2-1-1'
            }]
          }, {
            id: 7,
            label: '二级 2-2',
            children: [{
              id: 8,
              label: '三级 2-2-1'
            }]
          }]
        }, {
          id: 9,
          label: '一级 3',
          children: [{
            id: 10,
            label: '二级 3-1',
            children: [{
              id: 11,
              label: '三级 3-1-1'
            }]
          }, {
            id: 12,
            label: '二级 3-2',
            children: [{
              id: 13,
              label: '三级 3-2-1'
            }]
          }]
        }
      ],
      //双向绑定的值
      values: []
    }
  },
  methods: {
    /**@description 当复选框被点击的时候触发
       * @param  {Object}  data  //传递给 data 属性的数组中该节点所对应的对象(当前点击)
       * @param  {Object}  checked //树目前的选中状态对象，包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性
      * @author yx
     */
    check (data, checked) {
      console.log(data, checked, 'check')
    }
  }
}
</script>
```

###  Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ----| ----| --- | ---- | ----- |
| data  | 展示数据 | array | — | — |
| value / v-model  | 绑定值|  string / array | — | — |
| only-leaf  | 是否只选中和高亮叶子节点 | boolean | — | true |
| props  | 配置选项，具体看下表 | object | — |  — |
| node-key  | 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的 | string | — |  — |
| default-expand-all	  | 是否默认展开所有节点 | boolean | — |  false |
| multiple|  节点是否多选| boolean | — |  false |
| check-strictly|   在显示复选框的情况下，是否严格的遵循父子不互相关联的做法| boolean | — |  true |
| collapse-tags|   多选时是否将选中值按文字的形式展示(是否添加+number)--注意：这个属性设置true会覆盖columnCollapseTags属性| boolean | — |  false |
| column-collapse-tags |(推荐)多选时是否将选中值按文字的形式自适应展示(是否自适应添加+number),可展示多个页签,collapseTag非自适应展示,只展示一个页签后面就跟着一个number。| boolean | — |   false |
| width |select宽度| string/number | — |  300 |
| height |option高度| string/number | — |   200 |
| accordion |是否每次只打开一个同级树节点| boolean | — |   false |
| auto-expand-parent |展开子节点的时候是否自动展开父节点| boolean | — |   true |

### props
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ----| ----| --- | ---- | ----- |
| label | 指定节点标签为节点对象的某个属性值 | string | — |— |
| children | 指定子树为节点对象的某个属性值 | string | — |— |

###  Events
| 事件名称 | 说明 | 回调参数  |
| ----| ----| --- | 
| node-click | 节点被点击时的回调 |  共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。 | 
| clear | 清空选择的数据 | — | 
| remove-tag |   多选模式下移除tag时触发 | 返回一个key值 | 

### Function
DropDownTree 内部使用了 Node 类型的对象来包装用户传入的数据，用来保存目前节点的状态。 DropDownTree 拥有如下方法：
| 方法名 | 说明 | 参数  |
| ----| ----| --- | 
| setCurrentKey| 设置当前选中(高亮)的节点，使用此方法必须设置 node-key 属性，若没有节点被选中则返回 null | 节点的key一般是id |
| setCheckedKeys| 通过 keys 设置目前勾选的节点，使用此方法必须设置 node-key 属性  |(keys, leafOnly) 接收两个参数，1. 勾选节点的 key 的数组 2. boolean 类型的参数，若为 true 则仅设置叶子节点的选中状态，默认值为 false |
| getCheckedNodes|若节点可被选择，则返回目前被选中的节点所组成的数组, 通过node获取节点。| (leafOnly, includeHalfChecked) 接收两个 boolean 类型的参数，1. 是否只是叶子节点，默认值为 false 2. 是否包含半选节点，默认值为 false|
| getCheckedKeys|若节点可被选择则返回目前被选中的节点的 key 所组成的数组,通过key获取节点| (leafOnly) 接收一个 boolean 类型的参数，若为 true 则仅返回被选中的叶子节点的 keys，默认值为 false|
| getHalfCheckedNodes|多选--若节点可被选择，则返回目前半选中的节点所组成的数组| —|
| getCurrentKey|获取当前被选中节点的 key，使用此方法必须设置 node-key 属性，若没有节点被选中则返回 null| —|
| getCurrentNode|单选--获取当前被选中节点的 data，若没有节点被选中则返回 null| —|

### Slot
| name | 说明 | 
| ----| ----|  
| filter | 关键字过滤的插槽  |