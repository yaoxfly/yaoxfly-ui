# TablePagination 表格&分页

用于展示多条结构类似的数据，可对数据进行排序、筛选、对比，分页或其他自定义操作。

# 基础表格

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
    <eve-table-pagination class="home-table-pagination" @btn-operate="btnOperate" :delete-message-box="deleteMessageBox" @current-change="currentChange" :page-size="pageSize" :columns="columns" :data="data">
    </eve-table-pagination>
  </div>
</template>

<script>
  // @ is an alias to /src
  export default {
    name: 'Home',
    data() {
      return {
        deleteMessageBox: {
          center: false,
          message: '代码是写给人看的，顺便在程序里运行',
          text: '删除',
        },
        pageSize: 20,
        data: [{
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
                      },
                      {
                        id: 2003344333,
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03',
                      },
                    ],
                  },
                  {
                    id: 2003344,
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park',
                    date: '2016-10-03',
                  },
                ],
              },
              {
                id: 200,
                name: 'John Brown',
                age: 18,
                address: 'New York No. 1 Lake Park',
                date: '2016-10-03',
              },
            ],
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
            date: '2016-10-02',
          },
          {
            id: 4,
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04',
          },
          {
            id: 5,
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04',
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
              },
              {
                id: 20033,
                name: 'John Brown',
                age: 18,
                address: 'New York No. 1 Lake Park',
                date: '2016-10-03',
              },
            ],
          },
          {
            id: 7,
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04',
          },
          {
            id: 8,
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park',
            date: '2016-10-04',
          },
        ],

        columns: [{
            type: 'index', // 序号
            width: 75,
            label: '序号',
          },
          {
            label: 'Name',
            prop: 'name',
          },
          {
            label: 'Age',
            prop: 'age',
            sortable: 'custom', // 接受一个Boolean，默认为false,如果需要后端排序，需将sortable设置为custom
            filters: [{
                text: 18,
                value: 18
              },
              {
                text: 19,
                value: 19
              },
              {
                text: 20,
                value: 20
              },
            ],
          },
          {
            label: 'Address',
            prop: 'address',
            formatData: (data) => {
              console.log(data, 11)
              return data + '我是被转换的数据'
            },
          },
          {
            label: '操作',
            type: 'operate',
            width: 285,
          },
        ],
      }
    },
    methods: {
      filterHandler(value, row, column) {
        console.log(column.property, value, row)
        const property = column.property
        return row[property] === value
      },

      btnOperate(emit) {
        console.log(emit)
        // this.visible = !this.visible
      },

      currentChange(emit) {
        console.log(emit)
      },
    },
  }
</script>

<style lang="scss" scoped>
  ::v-deep .home-table-pagination {
    .warning-row {
      background: yellow;
    }

    // .yellow {
    //   background: yellow;
    // }
  }
</style>

<style lang="scss">
  .markdown-body {
    table {
      margin-bottom: 0px;
    }
  }
</style>
```

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
| cell-class-name  | 给某一列指定一个样式  | Function({row, column, rowIndex, columnIndex})/String | —  |— |
| header-row-class-name  | 表头行的 className 的回调方法   | Function({row, rowIndex})/String   | — | —  |
| empty-text  | 空数据时显示的文本内容，也可以通过 slot="empty" 设置 | string  | —  | 暂无数据  |
| id(自定义)  | 后端返回的数据的 id 的 key, 默认是 id  | string  | —   | id   |
| columns(自定义)  | 通过给列 columns 设置字段，表格数据渲染  | array  | —   | []  |
| is-only-get-id-arr(自定义)  | 当用户 Checkbox 时触发的事件, 是否只返回 id 数组 | boolean | —  | true  |
| is-only-get-id(自定义)   | 当用户点击按钮的时候触发的事件, 是否只返回 id        | boolean  | —  | false  |
| button(自定义)   | 增删改查等，按钮数组  | array  | —   | []   |
| delete-message-box (自定义)   | 删除弹出框设置, 该属性较多，看下表  | object | —  | []  |
| layout (分页)  | 组件布局，子组件名用逗号分隔  | sizes, prev, pager, next, jumper, ->, total, slot  | —| — |
| small (分页) | 在空间有限的情况下，可以使用简单的小型分页  | boolean  | —   | false   |
| page-sizes (分页)    | 每页显示个数选择器的选项设置  | number[]   | —  | [10, 20, 30, 40, 50, 100] |
| page-size (分页)    | 每页显示条目个数，支持 .sync 修饰符  | number   | — | 10 |
| current-page (分页)   | 当前页数，支持 .sync 修饰符      | number   | —  | 1  |
| hide-on-single-page (分页)  | 只有一页时是否隐藏   | boolean | — | true  |
| is-show-pagination (分页-自定义) | 是否显示分页  | boolean  |— | true |
| top (分页-自定义)   | 分页距离表格的距离   | number | — | 24  |
| align (分页-自定义) | 分页的位置   | string | center/居中、left/居左、right/居右 | center  |             
