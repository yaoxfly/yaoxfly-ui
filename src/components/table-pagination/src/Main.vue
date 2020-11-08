<!--
* @Author: yx
* @Description:表格-分页组件
* @Date: 2020-09-24
-->

<template>
  <div class="eve-table-pagination">
    <el-table
      :data="tableData"
      :stripe="stripe"
      :border="border"
      :row-class-name="rowClassName"
      :cell-class-name="cellClassName"
      :height="height"
      :max-height="maxHeight"
      :size="size"
      :fit="fit"
      :show-header="showHeader"
      :highlight-current-row="highlightCurrentRow"
      :header-row-class-name="headerRowClassName"
      :empty-text="emptyText"
      :row-key="rowKey"
      :tree-props="treeProps"
      :lazy="lazy"
      @current-change="currentRowChange"
      @sort-change="sortChange"
      @select="select"
      @select-all="selectAll"
    >
      <!--暂无数据 -->
      <template #empty>
        <slot name="empty">暂无数据</slot>
      </template>
      <slot>
        <!--表头 && 内容-->
        <template v-for="(item, index) in columnsData" style="width: 100%">
          <slot :name="item.prop" :row="item" :data="columnsData">
            <!-- 序号-->
            <el-table-column
              :label="item.label"
              :width="item.width"
              :key="`eve-table-pagination${index}`"
              :fixed="item.fixed"
              :type="item.type"
              :align="item.align"
              v-if="item.type === 'index'"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <span> {{ indexMethod(scope.$index) }} </span>
              </template>
            </el-table-column>

            <!-- 全选 -->
            <el-table-column
              :label="item.label"
              :width="item.width"
              :key="`eve-table-pagination${index}`"
              :fixed="item.fixed"
              :type="item.type"
              :align="item.align"
              v-else-if="item.type === 'selection'"
              :show-overflow-tooltip="true"
            >
            </el-table-column>

            <!-- 操作 -->
            <el-table-column
              :label="item.label"
              :width="item.width"
              :key="`eve-table-pagination${index}`"
              :fixed="item.fixed"
              :type="item.type"
              :align="item.align"
              v-else-if="item.type === 'operate'"
            >
              <template slot-scope="scope">
                <template v-if="!item.render">
                  <template
                    v-for="(element, index) in button"
                    class="eve-table-pagination__button"
                  >
                    <!-- 文本 -->
                    <span
                      v-if="element.type === 'text'"
                      :key="`eve-table-pagination-button${index}`"
                      class="eve-table-pagination__button-text"
                      @click.stop="
                        btnOperate({
                          index: index,
                          value: element.value,
                          data: scope.row,
                        })
                      "
                    >
                      {{ element.value }}
                    </span>

                    <!-- 按钮 -->
                    <el-button
                      v-else
                      :key="`eve-table-pagination-button${index}`"
                      :type="element.type"
                      :plain="element.plain"
                      :round="element.round"
                      :icon="element.icon"
                      @click.stop="
                        btnOperate({
                          index: index,
                          value: element.value,
                          data: scope.row,
                        })
                      "
                    >
                      {{ element.value }}</el-button
                    >
                  </template>
                </template>

                <template v-else>
                  <render
                    :item="item"
                    :row="scope.row"
                    :render="item.render"
                    :index="index"
                    :data="data"
                  ></render>
                </template>
              </template>
            </el-table-column>

            <!--内容-->
            <el-table-column
              :ref="item.prop"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :key="`eve-table-pagination${index}`"
              :fixed="item.fixed"
              :type="item.type"
              :sortable="item.sortable"
              :show-overflow-tooltip="
                item.showOverflowTooltip ? item.showOverflowTooltip : true
              "
              v-else
            >
              <template slot-scope="scope">
                <template v-if="!item.render">
                  <span v-if="item.formatData"
                    >{{ item.formatData(scope.row[item.prop]) }}
                  </span>
                  <span v-else>{{ scope.row[item.prop] }}</span>
                </template>
                <template v-else>
                  <render
                    :item="item"
                    :row="scope.row"
                    :render="item.render"
                    :index="index"
                    :data="data"
                  ></render>
                </template>
              </template>
            </el-table-column>
          </slot>
        </template>
      </slot>
    </el-table>
    <el-pagination
      background
      :layout="layout"
      :total="total"
      :small="small"
      :page-size="pageSize"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :hide-on-single-page="hideOnSinglePage"
      @size-change="sizeChange"
      @current-change="currentChange"
      v-if="isShowPagination"
      :style="{ marginTop: `${top}px`, float: align }"
    >
    </el-pagination>
    <div style="clear: both"></div>
  </div>
</template>
<script>

export default {
  name: 'EveTablePagination',
  props: {
    /* --------饿了么自带属性---------- */
    // 表格数据
    data: {
      type: Array,
      default: () => [
        {
          id: 1,
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03',
          children: [{
            id: 31,
            name: 'John Brown',
            age: 200,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03',
            children: [{
              id: 313333,
              name: 'John Brown',
              age: 200,
              address: 'New York No. 1 Lake Park',
              date: '2016-10-03',
              children: [{
                id: 3133333333,
                name: 'John Brown',
                age: 200,
                address: 'New York No. 1 Lake Park',
                date: '2016-10-03',
              }, {
                id: 2003344333,
                name: 'John Brown',
                age: 18,
                address: 'New York No. 1 Lake Park',
                date: '2016-10-03',
              }]
            }, {
              id: 2003344,
              name: 'John Brown',
              age: 18,
              address: 'New York No. 1 Lake Park',
              date: '2016-10-03',
            }]
          }, {
            id: 200,
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03',
          }]

        },
        {
          id: 2,
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01',

        },
        {
          id: 3,
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          id: 4,
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        },
        {
          id: 5,
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        },
        {
          id: 6,
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04',
          children: [{
            id: 3133,
            name: 'John Brown',
            age: 200,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03',
          }, {
            id: 20033,
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park',
            date: '2016-10-03',
          }]
        },
        {
          id: 7,
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        },
        {
          id: 8,
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        },

      ]
    },

    // 通过设置属性 height 给表格指定高度后，会自动固定表头。当纵向内容过多时可以使用
    height: {
      type: [Number, String]
    },

    // 超过最大高度才显示滚动条
    maxHeight: {
      type: [Number, String]
    },

    // 是否为斑马纹 table
    stripe: {
      type: Boolean,
      default: () => false
    },
    // 是否带有纵向边框
    border: {
      type: Boolean,
      default: () => true
    },

    // Table 的尺寸
    size: {
      type: String,
      default: () => 'medium'
    },

    // 列的宽度是否自撑开
    fit: {
      type: Boolean,
      default: () => true
    },

    // 是否显示表头
    showHeader: {
      type: Boolean,
      default: () => true
    },

    // 选择单行数据时使用色块表示
    highlightCurrentRow: {
      type: Boolean,
      default: () => false
    },

    // 传递个方法修改样式 通过属性 row-class-name 可以给某一行指定一个样式。
    rowClassName: {
      type: [Function, String],
      default: ({ row, rowIndex }) => {
        if (rowIndex === 1) {
          return 'warning-row'
        } else if (rowIndex === 3) {
          return 'success-row'
        }
        return ''
      }
    },
    // 传递个方法修改样式 通过属性cell-class-name 可以给某一行的某一列指定一个样式。
    cellClassName: {
      type: [Function, String],
      default: ({ row, column, rowIndex, columnIndex }) => {
        // console.log(row, column, rowIndex, columnIndex)
        if (rowIndex === 4 && columnIndex === 2) {
          // return 'red'
        }
      }
    },
    // 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。
    headerRowClassName: {
      type: [Function, String],
      default: ({ row, rowIndex }) => {
        // console.log(rowIndex)
        if (rowIndex === 0) {
          return 'warning-row'
        } else if (rowIndex === 1) {
          return 'success-row'
        }
        return ''
      }
    },

    // 空数据时显示的文本内容，也可以通过 slot="empty" 设置
    emptyText: {
      type: String,
      default: () => '暂无数据'
    },

    // fixed固定左右列  sortable排序

    // 分页-布局属性
    layout: {
      type: String,
      default: () => 'total,prev,pager,next,sizes,jumper'
    },
    // 分页-总数
    total: {
      type: Number,
      default: () => 100
    },

    // 分页-在空间有限的情况下，可以使用简单的小型分页。
    small: {
      type: Boolean,
      default: () => false
    },

    // 分页-每页显示个数选择器的选项设置
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 40, 50, 100]
    },

    // 分页-每页显示条目个数，支持 .sync 修饰符
    pageSize: {
      type: Number,
      default: () => 10
    },

    // 分页-当前页数，支持.sync 修饰符
    currentPage: {
      type: Number,
      default: () => 1
    },

    // 分页-只有一页时是否隐藏
    hideOnSinglePage: {
      type: Boolean,
      default: () => false
    },

    // 行数据的 Key，用来优化 Table 的渲染--一般传主键值，在使用 reserve-selection 功能与显示树形数据时，该属性是必填的
    rowKey: {
      type: [String, Function],
      default: () => 'id'
    },

    //渲染嵌套数据(树)的配置选项,hasChildren用来懒加了
    treeProps: {
      type: Object,
      default: () => ({ children: 'children', hasChildren: 'hasChildren' })
    },

    //是否懒加载子节点数据
    lazy: {
      type: Boolean,
      default: () => false
    },

    // 加载子节点数据的函数,lazy为true时生效,函数第二个参数包含了节点的层级信息--树懒加载用
    load: {
      type: Function,
      default: () => { }
    },

    /* ----------自定义属性----------- */
    // 后端返回的数据的id的key,默认是id
    id: {
      type: String,
      default: 'id'
    },

    /* 表格表头，通过给列 columns 设置字段;  
    这个字段里值如果有index、selection、operate类型的值,
    会覆盖: isShowIndex、isShowSelection、isShowOperate的判断*/
    columns: {
      type: Array,
      default: () => [
        {
          label: 'Name',
          prop: 'name'
        },
        {
          label: 'Age',
          prop: 'age',
          sortable: 'custom', // 接受一个Boolean，默认为false,如果需要后端排序，需将sortable设置为custom
          filters: [{ text: 18, value: 18 }, { text: 19, value: 19 }, { text: 20, value: 20 }]
        },
        {
          label: 'Address',
          prop: 'address',
          formatData: (data) => {
            console.log(data, 11)
            return data + '我是被转换的数据'
          }
        }
      ]
    },
    // 当用户Checkbox时触发的事件, 是否只返回id数组
    isOnlyGetIdArr: {
      type: Boolean,
      default: () => true
    },

    // 当用户点击按钮的时候触发的事件, 是否只返回id
    isOnlyGetId: {
      type: Boolean,
      default: () => false
    },

    // 按钮数组 type ：text是文本， 不设置或者primary(等其他参考element-ui的按钮类型)是按钮
    button: {
      type: Array,
      default: () => [{
        value: '查看',
        type: 'primary',
        plain: false,
        round: false,
        icon: ''
      },
      {
        value: '新增',
        type: 'primary',
        plain: false,
        round: false,
        icon: ''
      },
      {
        value: '修改',
        type: 'primary',
        plain: false,
        round: false,
        icon: ''
      },
      {
        value: '删除',
        type: 'primary',
        plain: false,
        round: false,
        icon: ''
      }]
    },

    // 删除弹出框设置
    deleteMessageBox: {
      type: Object,
      default: () => ({
        // 删除的内容文本
        message: '此操作将永久删除该条记录, 是否继续?',
        // 删除的标题文本
        title: '提示',
        // 删除提示框的确定
        confirmButtonText: '确定',
        // 删除提示框的取消
        cancelButtonText: '取消',
        // 删除弹出框的条件
        text: '删除',
        // 是否显示删除取消的提示
        isCanclePrompt: true,
        //  是否显示右上角关闭按钮
        showClose: true,
        //  是否可通过点击遮罩关闭 MessageBox
        closeOnClickModal: false,
        // 是否可通过按下 ESC 键关闭 MessageBox
        closeOnPressEscape: false,
        // 是否居中
        center: false
      })
    },

    // 是否显示默认的序号
    isShowIndex: {
      type: Boolean,
      default: true
    },

    // 是否显示默认多选框/选择框(checkbox)
    isShowSelection: {
      type: Boolean,
      default: false
    },

    // 是否显示默认的操作(增删改查等按钮)
    isShowOperate: {
      type: Boolean,
      default: true
    },

    //代表数据在第n层，当传进来的数据是树结构时，并开启了表格数据转换时要配置的一个属性，默认是zIndex
    zIndex: {
      type: String,
      default: 'zIndex'
    },

    //是否开启表格数据转换，主要用于树结构数据添加zIndex时用
    isFormatData: {
      type: Boolean,
      default: false
    },

    // 分页-是否显示分页
    isShowPagination: {
      type: Boolean,
      default: true
    },

    // 分页-分页距离表格的距离
    top: {
      type: Number,
      default: 24
    },

    // 分页-分页的位置，center/居中、left/居左、right/居右
    align: {
      type: String,
      default: 'right'
    },
  },

  data () {
    return {}
  },

  mounted () {
    console.log(this.tableData, 33)
  },

  components: {
    //render组件
    render: {
      functional: true,
      props: {
        row: Object, // 表格的某一行数据
        render: Function, //render方法
        index: Number, //下标
        item: {
          type: Object,
          default: null
        },
        data: Array //表格里所有数据
      },
      render: (h, ctx) => {
        const params = {
          row: ctx.props.row,
          index: ctx.props.index,
          data: ctx.props.data
        }
        if (ctx.props.item) params.item = ctx.props.item
        return ctx.props.render(h, params)
      }
    }
  },

  methods: {
    /* ---------饿了么回调的函数----------- */
    // 选中当前行,饿了么自带方法，自定义包装，防止和下面的分页的方法冲突
    currentRowChange (val) {
      // console.log(val)
      this.$emit('current-row-change', val)
    },
    // 排序回调
    sortChange (emit) {
      // console.log(emit)
      this.$emit('sort-change', emit)
    },

    // 当用户手动勾选数据行的 Checkbox 时触发的事件
    select (emit) {
      emit = this.isOnlyGetIdArr ? this.getIdArr(emit) : emit
      // console.log(emit)
      this.$emit('select', emit)
    },
    // 当用户手动勾选全选 Checkbox 时触发的事件
    selectAll (emit) {
      emit = this.isOnlyGetIdArr ? this.getIdArr(emit) : emit
      // console.log(emit)
      this.$emit('select-all', emit)
    },

    /** @description 自定义序号
     * @author yx
     * @param  {Number} index //数组下标
     */
    indexMethod (index) {
      return index + (this.currentPage - 1) * this.pageSize + 1
    },

    /** @description 分页-每页显示的条数切换
     * @author yx
     * @param  {Number}  val 页面切换的条数
     */

    sizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.$emit('size-change', val)
    },

    /** @description 分页-当前页切换
       * @author yx
       * @param  {Number}  val 当前页
    */
    currentChange (val) {
      // console.log(`当前页: ${val}`)
      this.$emit('current-change', val)
    },

    /* ---------自定义的函数----------- */

    /** @description 获取id数组
     * @author yx
     * @param  {Array}  value 从这个数组中获取id
     */
    getIdArr (value) {
      let arr
      if (Array.isArray(value)) {
        arr = []
        value.forEach(item => arr.push(item[this.id]))
      } else {
        arr = value[this.id]
      }
      return arr
    },

    /** @description  按钮的操作
     * @author yx
     * @param  {Object}  param 参数
     */
    btnOperate (param) {
      let { value, data } = param || {}
      param.data = this.isOnlyGetId ? this.getIdArr(data) : param.data
      const {
        message = '此操作将永久删除该条记录, 是否继续?',
        title = '提示',
        confirmButtonText = '确定',
        cancelButtonText = '取消',
        text = '删除',
        isCanclePrompt = true,
        showClose = true,
        closeOnClickModal = false,
        closeOnPressEscape = false,
        center = false

      } = this.deleteMessageBox || {}
      const keyMap = {
        [text]: () => {
          this.$confirm(message, title, {
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText,
            type: 'warning',
            showClose: showClose,
            closeOnClickModal: closeOnClickModal,
            closeOnPressEscape: closeOnPressEscape,
            center: center
          }).then(() => {
            // this.$message({
            //   type: 'success',
            //   message: '删除成功!'
            // })
            // console.log(param)
            this.$emit('btn-operate', param)
          }).catch(() => {
            isCanclePrompt && this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        },
        default: () => {
          this.$emit('btn-operate', param)
        }
      }
      value = keyMap[value] && text === value ? value : 'default'
      keyMap[value]()
    },

    /**@description  用来重新格式化传进来的columns字段
     * @author yx
     * @param  {Array}  columns 表头数据
     */
    formatColumns (columns) {
      const arr = []
      let indexFlag = true //是否自动添加序号
      let selectionFlag = true //是否自动添加全选
      let operateFlag = true //是否自动添加操作
      let treeFlag = false //是否有下拉树类型
      columns.forEach(item => {
        indexFlag = item.type === 'index' ? false : indexFlag
        selectionFlag = item.type === 'selection' ? false : selectionFlag
        operateFlag = item.type === 'operate' ? false : operateFlag
        treeFlag = item.type === 'tree' ? true : treeFlag
        arr.push(item)
      })
      // 自动添加默认的多选
      this.isShowSelection && selectionFlag && arr.unshift({
        type: 'selection', // 多选
        width: 55
      })
      // 自动添加默认的序号
      this.isShowIndex && indexFlag && arr.unshift({
        type: 'index', // 序号
        width: 55,
        label: '序号',
      })
      // 自动添加默认的操作
      this.isShowOperate && operateFlag && arr.push({
        label: '操作',
        type: 'operate',
        width: 270
      })
      //下拉树箭头位置不能在操作，序号，全选前
      treeFlag && arr.forEach(item => {
        if (item.type === 'tree') {
          //没有type这个字段，那么tree展开的箭头就会在那列
          delete item.type
        } else if (!item.type) {
          item.type = ''
        }
      })
      return arr
    },

    /**@description  用来重新格式化传进来的data字段
       * @author yx
       * @param  {Array}  data 表格数据
       * @param  {Boolean}  flag 是否添加孩子id--孩子id等于当前行的id，主要用来表示是否是孩子的
       * @param  {Number}  num 层级
       */
    formatData (data, flag = false, num = 1) {
      const { children } = this.treeProps || {}

      this.isFormatData && data.forEach(item => {
        item[this.zIndex] = num
        if (flag) {
          item[this.zIndex] = num
        }
        if (item[children]) {
          this.formatData(item[children], true, ++num)
          --num
        }
      })
      return data
    }
  },

  computed: {
    // 新的表格表头, 用来重新格式化传进来的columns字段，
    columnsData () {
      return this.formatColumns(this.columns)
    },
    //新的表格数据，用来重新格式化传进来的Data字段，
    tableData () {
      const arr = Array.from(JSON.parse(JSON.stringify(this.data)))
      return this.formatData(arr)
    }
  }
}
</script>

<style  lang='scss' scoped>
.eve-table-pagination {
  margin: 0 24px;
  text-align: center;
  &__filters ::v-deep .el-table__column-filter-trigger i {
    display: none;
  }
  &__button {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
  }
  &__button-text {
    color: #409eff;
    cursor: pointer;
    user-select: none;
    &:not(:first-child) {
      padding-left: 16px;
    }
  }
}
::v-deep .el-button {
  padding: 0;
  padding: 10px;
}

::v-deep .el-table .cell.el-tooltip {
  //防止使用插槽或render时tree的箭头会偏移
  display: flex;
  align-items: center;
}
//  ::v-deep .warning-row {
//   background: oldlace;
// }

//  ::v-deep .success-row {
//   background: #f0f9eb;
// }
//  ::v-deep .red {
//   background: red;
//   color: white;

// }
</style>
