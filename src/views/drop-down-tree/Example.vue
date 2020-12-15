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