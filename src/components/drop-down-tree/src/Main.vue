<!--
* @Author: yx
* @Description: 下拉选择树
* @Date: 2020-11-19
-->
<template>
  <div>
    <el-select v-model="value" placeholder="请选择" style="width: 560px">
      <el-option
        :label="label"
        :value="value"
        style="
          width: 560px;
          height: 200px;
          overflow: auto;
          background-color: #fff;
        "
      >
        <el-tree
          :data="data"
          :props="props"
          @node-click="nodeClick"
          class="eve-drop-down-tree__item"
          node-key="id"
          :highlight-current="true"
          ref="tree"
        ></el-tree>
      </el-option>
    </el-select>
  </div>
</template>
<script>

export default {
  name: 'EveDropDownTree',
  props: {

  },
  data () {
    return {
      value: '',
      label: '',
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 2,
          label: '二级 1-1',
          children: [{
            id: 3,
            label: '三级 1-1-1'
          }]
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
      }],
      props: {
        children: 'children',
        label: 'label',
        value: 'id', //自定义属性
      },
      onlyLeaf: true
    }
  },
  mounted () { },
  methods: {
    /**@description  节点被点击时的回调
       * @author yx
       * @param  {Object}  data 递给 data 属性的数组中该节点所对应的对象
       * @param  {Object}  node 节点对应的 Node
       * @param  {Object}  indeterminate 节点组件本身
       */
    nodeClick (data, node, indeterminate) {
      if (this.onlyLeaf && data[this.props.children]) return
      this.$emit('node-click', data, node, indeterminate)
      // console.log(data, node, indeterminate, 'node')
      this.label = data[this.props.label]
      this.value = data[this.props.value]
      this.$refs.tree.setCurrentKey(data[this.props.value])
      // this.welcomeReport.reportName = node.label
      // this.$refs.selectReport.blur()
      // console.log(this.welcomeReport.reportName, 'this.welcomeReport.reportName')
    }

  },
  watch: {}
}
</script>

<style lang='scss' scoped >
.eve-drop-down-tree {
}
::v-deep .eve-drop-down-tree__item {
  .el-tree--highlight-current
    .el-tree-node.is-current
    > .el-tree-node__content {
    background-color: transparent;
    color: yellow !important;
  }
}
</style>