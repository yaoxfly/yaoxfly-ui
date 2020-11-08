<!--
* @Author: yx
* @Description: 树的封装
* @Date: 2020-10-19
-->
<template>
  <div class="eve-tree">
    <div class="eve-tree__filter">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText" clearable>
      </el-input>
    </div>
    <el-tree
      ref="tree"
      :props="props"
      :data="data"
      :load="load"
      :lazy="lazy"
      :node-key="nodeKey"
      :show-checkbox="showCheckbox"
      :default-expanded-keys="defaultExpandedKeys"
      :default-checked-keys="defaultCheckedKeys"
      :default-expand-all="defaultExpandAll"
      :expand-on-click-node="expandOnClickNode"
      :filter-node-method="filterNodeMethod"
      :accordion="accordion"
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
      :draggable="draggable"
      @node-drag-start="nodeDragStart"
      @node-drag-enter="nodeDragEnter"
      @node-drag-leave="nodeDragLeave"
      @node-drag-over="nodeDragOver"
      @node-drag-end="nodeDragEnd"
      @node-drop="nodeDrop"
      @check-change="checkChange"
      @node-click="nodeClick"
    >
      <span class="eve-tree__custom-tree-node" slot-scope="{ node, data }">
        <slot :node="node" :data="data">
          <span>{{ node.label }}</span>
          <span>
            <el-button type="text" size="mini" @click="append(data)">
              Append
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click="() => remove(node, data)"
            >
              Delete
            </el-button>
          </span>
        </slot>
      </span>
    </el-tree>
  </div>
</template>
<script>
export default {
  name: 'EveTree',
  props: {
    // 展示数据
    data: {
      type: Array,
      default: () => [{
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
      }],
    },
    //配置选项
    props: {
      type: Object,
      default: () => ({
        label: 'label', //指定节点标签为节点对象的某个属性值--可自定义
        children: 'children', //指定子树为节点对象的某个属性值--可自定义
        isLeaf: 'leaf' //指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效，叶子节点不能再有子节点了
      })
    },

    //节点是否可被选择
    showCheckbox: {
      type: Boolean,
      default: true
    },

    //是否懒加载子节点，需与load方法结合使用 --当同时有data和lazy的情况下，lazy优先级更高，会覆盖data的配置
    lazy: {
      type: Boolean,
      default: false
    },

    //加载子树数据的方法，仅当 lazy 属性为true 时生效
    load: {
      type: Function,
      default: (node, resolve) => {
        console.log(node)
        let count = 1
        //第一级别要展示的数据 label对应props中的label
        if (node.level === 0) {
          return resolve([{ id: 1, label: 'region1' }, { id: 2, label: 'region2' }])
        }
        //懒加载最大级别，此处max=3,当达到最大值就没有懒加载的节点了，没有这个判断就没有限制
        if (node.level > 3) return resolve([])

        //是否有孩子
        let hasChild

        //只是个例子--判定是否有孩子
        if (node.data.label === 'region1') {
          hasChild = true
        } else if (node.data.label === 'region2') {
          hasChild = false
        } else {
          hasChild = Math.random() > 0.5
        }

        //懒加载的数据
        setTimeout(() => {
          let data
          //如果有孩子就返回数据
          if (hasChild) {
            data = [
              {
                id: 3 + count++,
                label: 'children' + count++,
                leaf: true, //指定某个孩子是否为叶子节点，
                disabled: true
              },
              {
                id: 3 + count++,
                label: 'children' + count++
              }]
          } else {
            data = []
          }
          resolve(data)
        }, 500)
      }
    },
    //每个树节点用来作为唯一标识的属性，整棵树应该是唯一的(一般是id) ,设置默认展开和默认选中的节点必须设置
    nodeKey: {
      type: String,
      default: 'id'
    },
    //默认勾选的节点的 key 的数组--要设置nodeKey
    defaultExpandedKeys: {
      type: Array,
      default: () => [1, 2]
    },
    //默认勾选的节点的 key 的数组--要设置nodeKey
    defaultCheckedKeys: {
      type: Array,
      default: () => [1, 2, 3, 4]
    },

    //是否默认展开所有节点
    defaultExpandAll: {
      type: Boolean,
      default: false
    },

    //是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。
    expandOnClickNode: {
      type: Boolean,
      default: false
    },

    //是否每次只打开一个同级树节点展开
    accordion: {
      type: Boolean,
      default: false
    },

    //是否可以拖拽
    draggable: {
      type: Boolean,
      default: false
    },

    //判断节点能否被拖拽
    allowDrop: {
      type: Function,
      default: (draggingNode, dropNode, type) => {
        // if (dropNode.data.label === '二级 2-2') {
        //   console.log(2, type)
        //   return false
        // } else {
        //   return true
        // }
        return true
      }
    },

    //拖拽时判定目标节点能否被放置
    allowDrag: {
      type: Function,
      default: (draggingNode) => {
        // return draggingNode.data.label.indexOf('二级 2-2') === -1 --节点2-2就不能被放置
        return true
      }
    },

  },

  mounted () {

  },

  data () {
    return {
      filterText: ''
    }
  },

  methods: {

    /**@description  节点选中状态发生变化时的回调
     * @author yx
     * @param  {Object}  data  传递给data属性的数组中该节点所对应的对象
     * @param  {Boolean}  checked 节点本身是否被选中
     * @param  {Boolean}  isChecked 节点的子树中是否有被选中的节点
     */
    checkChange (data, checked, isChecked) {
      console.log(data, checked, isChecked)
      this.$emit('check-change', data, checked, isChecked)
    },

    /**@description  节点被点击时的回调
     * @author yx
     * @param  {Object}  data 递给 data 属性的数组中该节点所对应的对象
     * @param  {Object}  node 节点对应的 Node
     * @param  {Object}  indeterminate 节点组件本身
     */
    nodeClick (data, node, indeterminate) {
      console.log(data, node, indeterminate, 111111)
      this.$emit('node-click', data, node, indeterminate)
    },

    /**@description  通过node获取节点
     * @author yx
     */
    getCheckedNodes () {
      this.$refs.tree.getCheckedNodes()
    },

    /**@description  通过key获取节点
     * @author yx
     */
    getCheckedKeys () {
      this.$refs.tree.getCheckedKeys()
    },

    /**@description  通过node设置节点
     * @param  {Array}  param 设置节点的参数
     * @author yx
     */
    setCheckedNodes (param) {
      this.$refs.tree.setCheckedNodes(param)
    },

    /**@description  通过key设置节点
      * @param  {Array}  param 设置节点的参数
      * @author yx
    */
    setCheckedKeys (param) {
      this.$refs.tree.setCheckedKeys(param)
    },

    /**@description 清空节点
     * @author yx
    */
    resetChecked () {
      this.$refs.tree.setCheckedKeys([])
      // this.$refs.tree.setCheckedNodes([])
    },

    /**@description 添加节点
      * @author yx
      * @param  {Object}  data 当前节点的数据
     */
    append (data) {
      /*
       label: 指定节点标签为节点对象的某个属性值
       children: 指定子树为节点对象的某个属性值
       */
      const { label, children } = this.props || {}
      const newChild = { [label]: '新增的节点', [children]: [] }
      //初始化孩子数组，防止没有孩子数组无法新增节点
      !data[children] && this.$set(data, [children], [])
      data[children].push(newChild)
      this.$emit('append', { data: data, label: label, children: children })
    },

    /**@description  删除节点
     * @author yx
     * @param  {String}  node 当前节点的 Node 对象
     * @param  {Object}  data 当前节点的数据
     */
    remove (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(item => item.id === data.id)
      children.splice(index, 1)
      this.$emit('remove', { node: node, data: data })
    },

    /**@description  关键字进行过滤--根据节点名称
     * @author yx
     * @param  {String}  value 当前查找的值
     * @param  {Object}  data 当前节点的数据
     */
    filterNodeMethod (value, data) {
      console.log(value)
      const { label } = this.props || {}
      if (!value) return true
      return data[label].indexOf(value) !== -1
    },

    /**@description 节点开始拖拽时触发的事件
     * @author yx
     * @param  {Object}  node 被拖拽节点对应的 Node
     * @param  {Object}  ev event
     */
    nodeDragStart (node, ev) {
      // console.log('drag start', node)
      this.$emit('node-drag-start', node, ev)
    },

    /**@description  拖拽进入其他节点时触发的事件
     * @author yx
     * @param  {Object}  draggingNode 被拖拽节点对应的 Node
     * @param  {Object}  dropNode 所进入节点对应的 Node
     * @param  {Object}  ev event
     */
    nodeDragEnter (draggingNode, dropNode, ev) {
      // console.log('tree drag enter: ', dropNode.label)
      this.$emit('node-drag-enter', draggingNode, dropNode, ev)
    },

    /**@description  拖拽离开某个节点时触发的事件
      * @author yx
      * @param  {Object}  draggingNode 被拖拽节点对应的 Node
      * @param  {Object}  dropNode 所进入节点对应的 Node
      * @param  {Object}  ev event
    */
    nodeDragLeave (draggingNode, dropNode, ev) {
      // console.log('tree drag leave: ', dropNode.label)
      this.$emit('node-drag-leave', draggingNode, dropNode, ev)
    },

    /**@description  在拖拽节点时触发的事件（类似浏览器的 mouseover 事件）
      * @author yx
      * @param  {Object}  draggingNode 被拖拽节点对应的 Node
      * @param  {Object}  dropNode 所进入节点对应的 Node
      * @param  {Object}  ev event
    */
    nodeDragOver (draggingNode, dropNode, ev) {
      // console.log('tree drag over: ', dropNode.label)
      this.$emit('node-drag-over', draggingNode, dropNode, ev)
    },

    /**@description  拖拽结束时（可能未成功）触发的事件
      * @author yx
      * @param  {Object}  draggingNode 被拖拽节点对应的 Node
      * @param  {Object}  dropNode 结束拖拽时最后进入的节点（可能为空）
      * @param  {String}  dropType 被拖拽节点的放置位置
      * @param  {Object}  ev event
    */
    nodeDragEnd (draggingNode, dropNode, dropType, ev) {
      // console.log('tree drag end: ', dropNode && dropNode.label, dropType)
      this.$emit('node-drag-end', draggingNode, dropNode, dropType, ev)
    },


    /**@description 拖拽成功完成时触发的事件
      * @author yx
      * @param  {Object}  draggingNode 被拖拽节点对应的 Node
      * @param  {Object}  dropNode 结束拖拽时最后进入的节点（可能为空）
      * @param  {String}  dropType 被拖拽节点的放置位置
      * @param  {Object}  ev event
    */
    nodeDrop (draggingNode, dropNode, dropType, ev) {
      // console.log('tree drop: ', dropNode.label, dropType)
      this.$emit('node-drop', draggingNode, dropNode, dropType, ev)
    },


  },

  watch: {

    filterText (val) {
      this.$refs.tree.filter(val)
    }

  }
}
</script>

<style lang="scss" scoped>
.eve-tree {
  user-select: none;
  &__custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  &__filter {
    margin-bottom: 28px;
  }
}
</style>