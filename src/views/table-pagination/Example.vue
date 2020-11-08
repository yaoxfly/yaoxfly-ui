<template>
  <div>
    <eve-table-pagination
      class="home-table-pagination"
      @btn-operate="btnOperate"
      :delete-message-box="deleteMessageBox"
      @current-change="currentChange"
      :page-size="pageSize"
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
      pageSize: 20

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
