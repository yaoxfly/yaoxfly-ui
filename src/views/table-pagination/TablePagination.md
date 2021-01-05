# TablePagination 表格&分页

用于展示多条结构类似的数据，可对数据进行排序、筛选、对比，分页或其他自定义操作。

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
    <eve-table-pagination
      class="home-table-pagination"
      @btn-operate="btnOperate"
      :delete-message-box="deleteMessageBox"
      @current-change="currentChange"
      :page-size="pageSize"
      :columns="columns"
      :data="data"
      :button="button"
    >
    </eve-table-pagination>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      //删除提示
      deleteMessageBox: {
        center: false, //是否居中
        message: '代码是写给人看的，顺便在程序里运行', //消息
        text: '删除' //删除提示框的标识，当与表格的删除按钮的文本一致时,会弹出提示框
      },
      pageSize: 20, //一页显示几条
      //表格数据
      data: [
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
      ],

      //表头 prop 对应着表格数据的key，序号和操作默认都有可不需添加。
      columns: [
        {
          type: 'index', // 序号
          width: 75,
          label: '序号',
        },
        {
          label: 'Name',
          prop: 'name'
        },
        {
          label: 'Age',
          prop: 'age',
        },
        {
          label: 'Address',
          prop: 'address',
          render: (h, data) => {
            const { row: { address } = {} } = data
            return h('div', {
              //和`v-bind:style`一样的 API
              style: {
                fontSize: '14px'
              },
              // DOM 属性
              domProps: {
                innerHTML: address + '我是被转换的数据1'
              },
            })
          },
          // formatData: (data) => {
          //   console.log(data, 11)
          //   return data + '我是被转换的数据1'
          // }
        },
        {
          label: '操作',
          type: 'operate',
          width: 285
        },
      ],

      //按钮--组件内部已经内置了这四个按钮,而且样式统一,以下只是范例,需要修改文本、颜色时再传这个数组
      button: [
        {
          value: '新增',
          type: 'text'
        },
        {
          value: '查看',
          type: 'primary'
        },

        {
          value: '修改',
          plain: true
        },
        {
          value: '删除',
          round: true,
          type: 'success'
        }
      ]
    }
  },

  methods: {
    //操作按钮  
    btnOperate (emit) {
      console.log(emit)
      // this.visible = !this.visible
    },

    //页面切换
    currentChange (emit) {
      console.log(emit)
    }
  }
}
</script>
```

### Table Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ----| ----| --- | ---- | ----- |
| data  | 显示的数据 |array| —| — |
| height | 通过设置属性 height, 会自动固定表头。 | string/number  | —   | —   |
| max-height   | Table 的最大高度。  | string/number  | —  | —   |
| stripe   | 是否为斑马纹 table   | boolean  | —   | false  |
| border   | 是否带有纵向边框  | boolean   | —   | false |
| size    | Table 的尺寸   | string  | medium / small / mini | — |
| fit  | 列的宽度是否自撑开   | boolean  | —  | true   |
| show-header   | 是否显示表头      | boolean    | —   | true  |
| highlight-current-row   | 是否要高亮当前行  | boolean     | —   | false   |
| row-class-name    | 给某一行指定一个样式   | Function({row, rowIndex})/String   | —  | — |
| cell-class-name  | 给某一列指定一个样式 | Function({row, column, rowIndex, columnIndex})/String | —  |— |
| header-row-class-name  | 表头行的 className 的回调方法   | Function({row, rowIndex})/String   | — | —  |
| empty-text  | 空数据时显示的文本内容，也可以通过 slot="empty" 设置 | string  | —  | 暂无数据  |
| row-key   | 行数据的 Key，用来优化 Table 的渲染--一般传主键值，在使用 reserve-selection 功能与显示树形数据时，该属性是必填的   | String, Function | — | id  |
| tree-props   | 渲染嵌套数据(树)的配置选项,hasChildren用来懒加载   | Object | — | { children: 'children', hasChildren: 'hasChildren' }  |
| lazy   | 是否懒加载子节点数据   | Boolean | — | false |
| load   | 加载子节点数据的函数,lazy为true时生效,函数第二个参数包含了节点的层级信息--树懒加载用   | Function | — | — |
| default-sort   | 默认的排序列的 prop 和顺序。它的prop属性指定默认的排序的列，order指定默认排序的顺序   | Object | order: ascending, descending | 如果只指定了prop, 没有指定order, 则默认顺序是ascending |

> `element-ui`的`table`的属性和事件(不包括`Table-column Attributes`)都可传入,内置了接收方法。

###  Table  Attributes (自定义)
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ----| ----| --- | ---- | ----- |
| columns  | 通过给列 columns 设置字段，表格数据渲染，详细参数看下表  | array  | —   | []  |
| button   | 增删改查等，按钮数组，详细参数看下表  | array  | —   | []   |
| id  | 后端返回的数据的 id 的 key, 默认是 id  | string  | —   | id   |
| is-only-get-id-arr  | 当用户 Checkbox 时触发的事件, 是否只返回 id 数组 | boolean | —  | true  |
| is-only-get-id   | 当用户点击按钮的时候触发的事件, 是否只返回 id        | boolean  | —  | false  |
| delete-message-box    | 删除弹出框设置, 该属性较多，看下表  | object | —  | {  message: '此操作将永久删除该条记录, 是否继续?',title: '提示',confirmButtonText: '确定',cancelButtonText: '取消',text: '删除'isCanclePrompt: true,showClose: true,closeOnClickModal: false,closeOnPressEscape: false,center: false } |
| is-show-index  | 是否显示默认的序号 |boolean| — |true|
| is-show-selection  | 是否显示默认多选框/选择框(checkbox) |boolean| — |false|
| is-show-operate  | 是否显示默认的操作(增删改查等按钮) |boolean| — |true|
| z-index | 代表数据在第n层，当传进来的数据是树结构时，并开启了表格数据转换时要配置的一个属性，默认是zIndex | string| — |zIndex|
| is-format-data | 是否开启表格数据转换，主要用于树结构数据添加zIndex时用 | boolean| — |false|


### columns 
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ----| ----| --- | ---- | ----- |
| prop   | 表格要渲染的key值  | string  |— | —  |
| label  | 表头显示的值   | number | — | 24  |
| width  | 当前列的宽度   | number | — | —  |
| fixed  | 列是否固定在左侧或者右侧，true 表示固定在左侧   | string, boolean | true, left, right | — |
| type   | 列的类型 | string |  selection(选择框)、index(序号)、operate(操作)、tree(下拉树)  | 普通内容 |
| show-overflow-tooltip  | 当内容过长被隐藏时显示 tooltip   | boolean |  — | true  |
| formatData | 简单改变当前列的文本值,复杂用render或者插槽    | Function(data) |  — | —  |
| render  |  使用render函数自定义内容 |  Function(h,data)  | — | —  |
| sortable  |  对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件 |  boolean, string  | true, false, 'custom' | false  |
| filters  |  数据过滤的选项，数组格式，数组中的元素需要有 text 和 value 属性。 |  Array[{ text, value }] | — | — |
| filter-method  |  数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示。 |  Function(value, row, column) | — | — |


>  表头配置属性, 其中 `formatData` 方法只对`type`是普通内容列有效 ,`render`只对普通内容和操作列有效

###  Pagination Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ----| ----| --- | ---- | ----- |
| current-page    | 当前页数，支持 .sync 修饰符      | number   | —  | 1  |
| page-sizes    | 每页显示个数选择器的选项设置  | number[]   | —  | [10, 20, 30, 40, 50, 100] |
| page-size    | 每页显示条目个数，支持 .sync 修饰符  | number   | — | 10 |
| total    | 总条目数  | number   | — | — |
| layout   | 组件布局，子组件名用逗号分隔  | string |sizes, prev, pager, next, jumper, ->, total, slot|total,prev,pager,next,sizes,jumper |
| small  | 在空间有限的情况下，可以使用简单的小型分页  | boolean  | —   | false   |
| hide-on-single-page   | 只有一页时是否隐藏   | boolean | — | true  |


###  Pagination Attributes(自定义)
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ----| ----| --- | ---- | ----- |
| is-show-pagination  | 是否显示分页  | boolean  |— | true |
| top  | 分页距离表格的距离   | number | — | 24  |
| align  | 分页的位置   | string | center、left、right | center  |


###  Button  Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ----| ----| --- | ---- | ----- |
| value  | 文本 |string| — | 查看、新增、修改、删除|
| type  |  类型 |string| text、primary、success、info、warning、danger | primary |
| plain  | 是否朴素按钮 |boolean| — | false|
| round  | 是否圆角按钮 |boolean| — | false|
| icon  |  图标类名 |string| — | — |

>  操作列的按钮配置, `type`属性中,除了`text`是文本类型的按钮，其他都是普通按钮类型,不同参数分别代表不同颜色。

###  Delete-Message-Box Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ----| ----| --- | ---- | ----- |
| message  | 提示内容 |string| —| 此操作将永久删除该条记录, 是否继续?|
| title |提示 | string  | —   | 提示 |
| confirmButtonText   | 确认的文字  | string  | —  | 确定  |
| cancelButtonText   | 取消的文字  | string  | —   | 取消  |
| text   | 删除的文字  | string   | —   | 删除 |
| isCanclePrompt    |  是否显示取消操作的提示 | boolean  |  — |true |
| showClose  | 是否显示删除图标   | boolean  | —    |  true   |
| closeOnClickModal  | 点击模态框隐藏对话框   | boolean  | —   | false   |
| closeOnPressEscape   | 点击Esc隐藏对话框 |   boolean | —  | false |
| center  | 居中 | boolean | —  |false |


###  Table Event
| 事件名称 | 说明 | 回调参数 | 
| ----| ----| --- | 
| btn-operate  |当用户手动勾选全选 Checkbox 时触发的事件 | [] (id数组或者当前行数据的数组) |
| select  |当用户手动勾选数据行的 Checkbox 时触发的事件 | [] (id数组或者当前行数据的数组) |
| select-all  |当用户手动勾选全选 Checkbox 时触发的事件 | [] (id数组或者当前行数据的数组) |
| current-row-change  | 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性 |currentRow, oldCurrentRow|
| sortChange  |当表格的排序条件发生变化的时候会触发该事件 |{ column, prop, order }|


###  Pagination Event
| 事件名称 | 说明 | 回调参数 | 
| ----| ----| --- | 
| current-change  |当前页切换 | 当前页 |
| size-change | 每页显示的条数切换  | 页面切换的条数 |


###  Slot
| name                 | 说明                       |
| -------------------- | ---------------------------|
| —                    | Table 的内容                |
| empty                | Table 内容为空时的文本       |

### Scoped Slot
| name                 | 说明                       
| -------------------- | ---------------------------|
| prop                  |表格数据要渲染的key,表头数据的prop,动态的插槽名,参数为 {name,row,data} |