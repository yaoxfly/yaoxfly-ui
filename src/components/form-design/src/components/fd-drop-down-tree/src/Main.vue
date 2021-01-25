<template>
  <div>
    <eve-drop-down-tree
      :data="data"
      :width="width"
      v-model="curValue"
      :column-collapse-tags="columnCollapseTags"
      :multiple="multiple"
      :only-leaf="onlyLeaf"
      :props="props"
      :node-key="nodeKey"
      :check-strictly="checkStrictly"
      :height="height"
      :accordion="accordion"
      :auto-expand-parent="autoExpandParent"
      @node-click="nodeClick"
      @check="check"
    ></eve-drop-down-tree>
  </div>
</template>

<script>
import VModelMixin from '../../../mixins/fd-mixin'

export default {
  name: 'FdDropDownTree',
  mixins: [VModelMixin],
  props: {
    data: {
      type: Array,
      default: () => []
    },
    width: {
      type: [String, Number],
      default: () => ''
    },

    columnCollapseTags: {
      type: Boolean,
      default: () => false
    },
    multiple: {
      type: Boolean,
      default: () => false
    },

    onlyLeaf: {
      type: Boolean,
      default: () => true
    },

    props: {
      type: Object,
      default: () => ({
        children: 'children', //指定子树为节点对象的某个属性值
        label: 'label', //指定节点标签为节点对象的某个属性值(下拉菜单显示值的key)
      })
    },

    nodeKey: {
      type: String,
      default: () => 'id'
    },

    checkStrictly: {
      type: Boolean,
      default: () => true
    },

    height: {
      type: [String, Number],
      default: () => 200
    },

    accordion: {
      type: Boolean,
      default: () => false
    },

    autoExpandParent: {
      type: Boolean,
      default: () => true
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
    },
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
