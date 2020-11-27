<!--
* @Author: yx
* @Description: 下拉选择树
* @Date: 2020-11-19
-->
<template>
  <div>
    <el-select
      v-model="tempValue"
      placeholder="请选择"
      :style="{ width: `${checkString(width)}` }"
      clearable
      :multiple="multiple"
      :collapse-tags="collapseTags"
      ref="select"
      @clear="clear"
      @visible-change="visibleChange"
      @remove-tag="removeTag"
    >
      <el-option
        :label="label"
        :value="tempValue"
        disabled
        class="eve-drop-down-tree__option"
        :style="{ width: checkString(width), height: checkString(height) }"
      >
        <el-scrollbar style="width: 100%; height: 100%">
          <section class="eve-drop-down-tree__content">
            <el-input
              placeholder="请输入关键字进行过滤"
              v-model="filterText"
              class="eve-drop-down-tree__select-input"
              ref="input"
            >
            </el-input>

            <el-tree
              :data="data"
              :props="props"
              class="eve-drop-down-tree__item"
              :class="[!onlyLeaf && 'eve-drop-down-tree__is-active']"
              :node-key="nodeKey"
              :highlight-current="true"
              :expand-on-click-node="false"
              :default-expand-all="defaultExpandAll"
              :filter-node-method="filterNodeMethod"
              :show-checkbox="showCheckbox"
              :check-strictly="checkStrictly"
              :default-expanded-keys="defaultExpandedKeys"
              :accordion="accordion"
              :auto-expand-parent="autoExpandParent"
              @check="check"
              @node-click="nodeClick"
              ref="tree"
            ></el-tree>
          </section>
        </el-scrollbar>
      </el-option>
      <!-- 隐藏域 让多选显示名称-->
      <div v-show="false">
        <template v-for="item in option">
          <el-option
            :key="item[nodeKey]"
            :value="item[nodeKey]"
            :label="item[props.label]"
          >
            {{ item[props.label] }}
          </el-option>
        </template>
      </div>
    </el-select>
  </div>
</template>
<script>

export default {
  name: 'EveDropDownTree',
  //双向绑定
  model: {
    prop: 'value', //要存在于props
    event: 'change' //当组件的值发生改变时要emit的事件名
  },
  props: {
    //树的数据
    data: {
      type: Array,
      default: () => [{
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
      }]
    },

    //绑定的值
    value: {
      default: () => ''
    },

    //是否只选中和高亮叶子节点
    onlyLeaf: {
      type: Boolean,
      default: () => true
    },

    //配置选项
    props: {
      type: Object,
      default: () => ({
        children: 'children', //指定子树为节点对象的某个属性值
        label: 'label', //指定节点标签为节点对象的某个属性值(下拉菜单显示值的key)
      })
    },

    //每个树节点用来作为唯一标识的属性，整棵树应该是唯一的(下拉菜单真实值的key)
    nodeKey: {
      type: String,
      default: () => 'id'
    },

    //是否默认展开所有节点
    defaultExpandAll: {
      type: Boolean,
      default: () => false
    },

    //节点是否多选
    multiple: {
      type: Boolean,
      default: () => true
    },

    // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法
    checkStrictly: {
      type: Boolean,
      default: () => true
    },

    //多选时是否将选中值按文字的形式展示
    collapseTags: {
      type: Boolean,
      default: () => false
    },

    //select宽度
    width: {
      type: [String, Number],
      default: () => 250
    },

    //option高度
    height: {
      type: [String, Number],
      default: () => 200
    },

    //是否每次只打开一个同级树节点
    accordion: {
      type: Boolean,
      default: () => false
    },

    //展开子节点的时候是否自动展开父节点
    autoExpandParent: {
      type: Boolean,
      default: () => true
    }
  },

  data () {
    return {
      id: '', //被选中节点的id或者唯一值
      tempValue: this.multiple ? [] : '', //组件内部v-model绑定的值
      label: '', //被选中节点的label值
      filterText: '', //过滤的值
      option: [], //多选时选中的lable和key组合的数组
      showCheckbox: this.multiple, //节点是否可被选择--多选默认可选择
      defaultExpandedKeys: [] //默认展开的节点的 key 的数组

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
      if (this.multiple) return
      this.setCurrentKey(this.id) //onlyLeaf为true时,在点击父亲爷爷的时候也只高亮叶子节点
      if (this.onlyLeaf && data[this.props.children]) return
      this.id = data[this.nodeKey]
      this.label = data[this.props.label]
      this.tempValue = data[this.nodeKey]
      this.setCurrentKey(this.id)
      this.$refs.select.blur() //自动收缩
      this.$emit('node-click', data, node, indeterminate)
    },

    /**@description  设置当前选中(高亮)的节点
     * @author yx
     * @param  {mixins}  key //节点的key一般是id
     */
    setCurrentKey (key) {
      this.$refs.tree ? this.$refs.tree.setCurrentKey(key) : this.$nextTick(() => {
        this.$refs.tree.setCurrentKey(key)
      })
    },

    /**@description 设置选中值 
     * @author yx
     * @param  {Array}  keyArr //节点的key数组一般是id数组
     */
    setCheckedKeys (keyArr) {
      this.$refs.tree ? this.$refs.tree.setCheckedKeys(keyArr) : this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(keyArr)
      })
    },

    /**@description  单选--清空选择的数据
      * @author yx
      */
    clear () {
      this.tempValue = '' //清空真实值
      this.label = '' //清空select框里的label值
      this.id = null
      this.filterText = ''
      this.setCurrentKey(null)
      this.setCheckedKeys([])
      this.defaultExpandedKeys = []
      this.$emit('clear')
    },

    /** @description  下拉框出现/隐藏时触发
      * @author yx
     */
    visibleChange () {
      this.filterText = ''
    },

    /** @description  多选模式下移除tag时触发
      * @author yx
    */
    removeTag (key) {
      this.tempValue.slice(key, 1)
      this.setCheckedKeys(this.tempValue)
      this.$emit('remove-tag', key)
    },

    /**@description 节点过滤
     * @param  {String}  value //过滤的值
     * @param  {Object}  data //节点的值
     * @author yx
    */
    filterNodeMethod (value, data) {
      if (!value) return true
      return data[this.props.label].indexOf(value) !== -1
    },


    /**@description 当复选框被点击的时候触发
       * @param  {Object}  data  //传递给 data 属性的数组中该节点所对应的对象(当前点击)
       * @param  {Object}  checked //树目前的选中状态对象，包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性
      * @author yx
     */
    check (data, checked) {
      this.tempValue = checked.checkedKeys
      this.option = checked.checkedNodes
      this.$emit('check', data, checked)
    },

    /**@description 多选--若节点可被选择（即 show-checkbox 为 true），则返回目前被选中的节点所组成的数组
      * @author yx
      * @param  {Boolean}  leafOnly 是否只是叶子节点
      * @param  {Boolean}  includeHalfChecked 是否包含半选节点
    */
    getCheckedNodes (leafOnly = false, includeHalfChecked = false) {
      return this.$refs.tree.getCheckedNodes(leafOnly, includeHalfChecked)
    },

    /**@description 多选--若节点可被选择（即 show-checkbox 为 true），则返回目前被选中的节点的 key 所组成的数组
     * @author yx
     * @param  {Boolean}  leafOnly 仅返回被选中的叶子节点的 keys
   */
    getCheckedKeys (leafOnly = false) {
      return this.$refs.tree.getCheckedKeys(leafOnly)
    },

    /**@description 多选--若节点可被选择（即 show-checkbox 为 true），则返回目前半选中的节点所组成的数组
     * @author yx
    */
    getHalfCheckedNodes () {
      return this.$refs.tree.getHalfCheckedNodes()
    },

    /**@description 若节点可被选择（即 show-checkbox 为 true），则返回目前半选中的节点的 key 所组成的数组
      * @author yx
     */
    getHalfCheckedKeys () {
      return this.$refs.tree.getHalfCheckedKeys()
    },

    /**@description 单选-- 获取当前被选中节点的 key，使用此方法必须设置 node-key 属性，若没有节点被选中则返回 null
      * @author yx
     */
    getCurrentKey () {
      return this.$refs.tree.getCurrentKey()
    },

    /**@description 单选--获取当前被选中节点的 data，若没有节点被选中则返回 null
      * @author yx
     */
    getCurrentNode () {
      return this.$refs.tree.getCurrentNode()
    },

    /*自定义方法 */

    /**@description 判断是否是字符串
   * @author yx
   * @param  {String}  str 高度、宽度、left等类型的值
   */
    checkString (str) {
      return typeof str === 'string' ? str : `${str}px`
    },
  },

  watch: {
    // v-model绑定的值(select)--父修改-子接收
    value: {
      handler (newValue) {
        //单选
        const radio = () => {
          newValue = newValue || null
          this.tempValue = newValue
          this.defaultExpandedKeys = []
          newValue && this.defaultExpandedKeys.push(newValue)
          this.id = newValue
          this.setCurrentKey(newValue)
          this.$nextTick(() => {
            this.label = this.getCurrentNode() ? this.getCurrentNode()[this.props.label] : newValue
          })
        }
        //多选
        const checkbox = () => {
          newValue = newValue || []
          this.tempValue = newValue
          this.defaultExpandedKeys = newValue
          this.setCheckedKeys(newValue)
          this.$nextTick(() => {
            this.option = []//防止重复的key
            this.getCheckedNodes().forEach(element => {
              this.option.push({
                label: element[this.props.label],
                id: element[this.nodeKey]
              })
            })
          })
        }
        this.multiple ? checkbox() : radio()
      },
      immediate: true
    },
    // v-model绑定的值(内部用)--子修改-父接收
    tempValue (newValue) {
      //获取值
      this.$emit('change', newValue)
    },

    filterText (val) {
      //对树节点进行筛选操作
      this.$refs.tree.filter(val)
    }
  }
}
</script>

<style lang='scss' scoped >
.eve-drop-down-tree {
  &__select-input {
    margin: 10px 0;
  }
  &__content {
    padding: 0 20px;
  }
  &__option {
    background-color: #fff;
  }
}

::v-deep .eve-drop-down-tree__item {
  user-select: none;
}

//全部
.eve-drop-down-tree__is-active::v-deep.el-tree--highlight-current {
  .el-tree-node.is-current > .el-tree-node__content {
    background-color: transparent;
    color: #409eff;
  }
}

//only叶子
::v-deep.el-tree--highlight-current {
  .el-tree-node.is-current > .el-tree-node__content {
    background-color: transparent;
    .is-leaf + .el-tree-node__label {
      color: #409eff;
    }
  }
}

::v-deep.el-select-dropdown__item.is-disabled {
  cursor: default;
  padding: 0;
}
//隐藏滚动条的横向滚动条
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
::v-deep .el-scrollbar__bar.is-vertical > div {
  width: 120%;
}
:v-deep .el-scrollbar__bar.is-horizontal > div {
  height: 120%;
}
</style>