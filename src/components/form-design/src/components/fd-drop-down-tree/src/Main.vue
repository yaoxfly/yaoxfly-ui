<template>
  <div>
    <eve-drop-down-tree
      :data="data"
      :width="width"
      v-model="value"
      @node-click="nodeClick"
    ></eve-drop-down-tree>
  </div>
</template>

<script>
export default {
  name: 'FdDropDownTree',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    width: {
      type: [String, Number],
      default: () => ''
    }
  },
  data () {
    return {
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
