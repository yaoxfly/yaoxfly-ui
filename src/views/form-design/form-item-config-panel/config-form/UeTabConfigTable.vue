<template>
  <div>
    <el-table
      :data="curValue"
      style="width: 100%"
    >
      <el-table-column
        label="tab名称"
        width="80"
      >
        <template slot-scope="scope">
          <el-input
            :value="curValue[scope.$index].name"
            placeholder="请输入"
            size="small"
            @input="handleInput(scope.$index, 'name', $event)"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="展示图表"
        width="190"
      >
        <template slot-scope="scope">
          <el-select
            :value="curValue[scope.$index].charts"
            size="small"
            placeholder="请选择"
            multiple
            filterable
            @input="handleInput(scope.$index, 'charts', $event)"
          >
            <el-option
              v-for="item in getOptionsByTabId(curValue[scope.$index].tabId)"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="width: 100%; text-align: center; margin: 5px 0">
      <el-button
        size="small"
        type="primary"
        icon="el-icon-plus"
        circle
        @click="handleClickAdd"
      />
    </div>
  </div>
</template>

<script>
import { generateKey } from '@/lib/util'
import VModelMixin from './v-model-mixin'
import { mapState } from 'vuex'
import clonedeep from 'clonedeep'

export default {
  name: 'UeTabConfigTable',
  mixins: [
    VModelMixin
  ],
  data () {
    return {
      curValue: [],
      disabledOptionsDic: {}
    }
  },
  computed: {
    ...mapState({
      charts: state => state.bdUserConfig.charts
    }),
    chartsOptions () {
      return this.charts.filter(item => item.comp !== 'interaction-tab').map(chart => {
        return {
          value: chart.key,
          label: chart.basic.name
        }
      })
    }
  },
  created () {
    this.curValue = this.value
    this.updateDisabledOptionsDic(this.curValue)
  },
  methods: {
    /**
     * 手动触发input事件 设置撤回 重做
     */
    handleClickAdd () {
      const id = generateKey('tab')
      const newValue = clonedeep(this.curValue)
      newValue.push({
        tabId: id,
        name: '',
        charts: []
      })
      this.curValue = newValue
      this.$emit('input', newValue)
    },
    /**
     * 手动触发input事件 设置撤回 重做
     */
    handleDelete (index, row) {
      this.$confirm(`确定要删除第${index + 1}行?`, '确认框', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const newValue = clonedeep(this.curValue)
        newValue.splice(index, 1)
        this.updateDisabledOptionsDic(newValue)
        // 清除选项禁选状态
        this.curValue = newValue
        this.$emit('input', newValue)
      }).catch(error => {
        console.error(error + 'config table 取消删除')
      })
    },
    /**
     * 手动触发input事件 设置撤回 重做
     */
    handleInput (index, field, value) {
      const newValue = clonedeep(this.curValue)
      newValue[index][field] = value
      // 设置禁用选项
      this.curValue = newValue
      // 设置图表禁选项
      if (field === 'charts') {
        this.updateDisabledOptionsDic(newValue)
      }
      this.$emit('input', newValue)
    },
    updateDisabledOptionsDic (curValue) {
      const disabledOptionsDic = {}
      // 设置各tab配置的禁选项
      curValue.forEach((tab, index) => {
        tab.charts.forEach(chartKey => {
          disabledOptionsDic[chartKey] = tab.tabId
        })
      })
      this.disabledOptionsDic = disabledOptionsDic
    },
    // 根据禁选项对象获取各tab配置可选项
    getOptionsByTabId (tabId) {
      const options = []
      this.chartsOptions.forEach(chartsOption => {
        if (this.disabledOptionsDic[chartsOption.value] === tabId || !this.disabledOptionsDic[chartsOption.value]) {
          options.push(chartsOption)
        }
      })
      return options
    }
  }
}
</script>
