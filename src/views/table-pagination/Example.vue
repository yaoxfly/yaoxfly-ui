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
      <!-- <el-table-column
        prop="age"
        label="label"
        fixed
        sortable
        :filters="[{ text: 18, value: 18 }]"
        :filter-method="filterHandler"
      ></el-table-column> -->
      <!-- <template v-slot:age="scope">
        <el-table-column
          :prop="scope.row.prop"
          :label="scope.row.label"
          :width="scope.row.width"
          :key="`eve-table-pagination${scope.row.label}`"
          :fixed="scope.row.fixed"
          :type="scope.row.type"
          :sortable="scope.row.sortable"
          :filters="[{ text: 18, value: 18 }]"
          :filter-method="filterHandler"
        ></el-table-column>
      </template> -->
    </eve-table-pagination>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
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
    // rowClassName ({ row, rowIndex }) {
    //   if (rowIndex === 1) {
    //     return 'warning-row'
    //   } else if (rowIndex === 3) {
    //     return 'success-row'
    //   }
    //   return ''
    // }
    // cellClassName ({ row, column, rowIndex, columnIndex }) {
    //   if (rowIndex === 4 && columnIndex === 2) {
    //     return 'yellow'
    //   }
    // }
    // filterHandler (value, row, column) {
    //   console.log(column.property, value, row)
    //   const property = column.property
    //   return row[property] === value
    // },

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

<style lang='scss' scoped>
::v-deep .home-table-pagination {
  .warning-row {
    // background: yellow;
  }
  // .yellow {
  //   background: yellow;
  // }
}
</style>

