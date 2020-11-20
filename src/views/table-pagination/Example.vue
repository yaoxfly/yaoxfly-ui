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
  name: 'Home',
  data () {
    return {
      deleteMessageBox: {
        center: false,
        message: '代码是写给人看的，顺便在程序里运行',
        text: '删除'
      },
      pageSize: 20,
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
        },
        {
          label: '操作',
          type: 'operate',
          width: 285
        },

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
    filterHandler (value, row, column) {
      console.log(column.property, value, row)
      const property = column.property
      return row[property] === value
    },

    btnOperate (emit) {
      console.log(emit)
      // this.visible = !this.visible
    },

    currentChange (emit) {
      console.log(emit)
    }
  }
}

</script>

<style lang='scss' scoped>
::v-deep .home-table-pagination {
  .warning-row {
    background: yellow;
  }
  // .yellow {
  //   background: yellow;
  // }
}
</style>

<style lang='scss' >
.markdown-body {
  table {
    margin-bottom: 0px;
  }
}
</style>
