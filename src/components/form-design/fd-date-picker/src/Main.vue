<!--
* @Author: xjd
* @Description: 日期选择器的封装
* @Date: 2020-10-20
-->
<template>
  <div class="eve-input">
    <!-- {{ formData }} -->
    <el-date-picker
      v-if="!isReadOnly"
      :value-format="valueFormat || 'yyyy-MM-dd'" 
      :size="size" v-model="curValue" 
      style="width: 100%"
      :disabled="isDisabled"
      :picker-options="pickerOptions"
      :placeholder="placeholder" 
      :type="type" />
    <template v-else>
      {{ curValue }}
    </template>
  </div>
</template>
<script>
import VModelMixin from '../../fd-mixin'
import { formatDateByDateObj } from '../../../../lib/utils'

export default {
  name: 'FdDatePicker',
  mixins: [
    VModelMixin
  ],
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'date'
    },
    valueFormat: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    // 今天之前的日期可选
    optionBeforeToday: {
      type: Boolean,
      default: false
    },
    // 今天之后的日期可选
    optionAfterToday: {
      type: Boolean,
      default: false
    },
    // 是否包括今天 当optionBeforeToday、optionAfterToday其中有一个被选中时 inclueToday可选
    includeToday: {
      type: Boolean,
      default: false
    },
    dateCompareConfigs: {
      type: Array,
      default: () => ([])
    },
    // 今天之后/之前设置之后出现的配置项 （比如说，当前日期之后的3天可选）为0不限制
    rangeDays: {
      type: Number,
      default: 0
    },
    // 表单数据
    formData: {
      type: Object,
      default: () => ({})
    },
    defaultToday: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      pickerOptions: {}
    }
  },
  created () {
    this.curValue = this.value
    
    if (!this.curValue && this.defaultToday) {
      // 值为空值 且默认值的设置为默认今天
      this.curValue = formatDateByDateObj(new Date(), { format: this.valueFormat })
      this.$emit('input', this.curValue)
    }
    // 如果是配置模式 返回
    this.setDisableFunc()
  },
  watch: {
    formData: {
      deep: true,
      handler: function () {
        this.setDisableFunc()
      }
    }
  },
  methods: {
    getRangeDate (curDate, rangeDays) {
      return formatDateByDateObj(new Date(curDate.valueOf() + Number(rangeDays) * 24 * 60 * 60 * 1000), { format: this.valueFormat })
    },
    setDisableFunc () {
      if (this.isConfig) {
        return
      }
      /**
       * 取禁用的日期
       * 这是一个开区间的取法,
       * 要禁用的日期该函数返回的值是true
       */
      const disabledDate = (date) => {
        let compare = null
        const formatedDate = formatDateByDateObj(date, { format: this.valueFormat })
        const curDate = new Date()
        const today = formatDateByDateObj(curDate, { format: this.valueFormat })
        if (this.optionBeforeToday) {
          // 今天之前的可选
          // 和formatedDate比较的日期 original
          compare = () => {
            const rs = this.includeToday ? (today < formatedDate) : (today <= formatedDate)
            if (this.rangeDays > 0 && !rs) {
              // 判断date是否是在指定的范围之内
              const startDate = this.getRangeDate(curDate, -Number(this.rangeDays))
              if (startDate > formatedDate) {
                // 禁用
                return true
              }
            }
            return rs
          }
        } else if (this.optionAfterToday) {
          // 今天之后的可选
          compare = () => {
            const rs = this.includeToday ? (today > formatedDate) : (today >= formatedDate)
            if (this.rangeDays > 0 && !rs) {
              // 判断date是否是在指定的范围之内
              const endDate = this.getRangeDate(curDate, Number(this.rangeDays))
              if (endDate < formatedDate) {
                // 禁用
                return true
              }
            }
            return rs
          }
        } else {
          compare = () => { return false }
        }
        const funcs = [compare]
        this.dateCompareConfigs.forEach(compareConfig => {
          const { targetKey, compareMethod, before, after } = compareConfig
          let func = null
          
          if (!this.formData[targetKey] || !compareMethod) {
            /**
             * 配置不全 函数默认不生效
             */
            func = () => {
              return false
            }
          } else {
            if (compareMethod === '>') {
              func = () => {
                return formatedDate <= this.formData[targetKey]
              }
            } else if (compareMethod === '>=') {
              func = () => {
                return formatedDate < this.formData[targetKey]
              }
            } else if (compareMethod === '<') {
              func = () => {
                return formatedDate >= this.formData[targetKey]
              }
            } else if (compareMethod === '<=') {
              func = () => {
                return formatedDate > this.formData[targetKey]
              }
            } else if (compareMethod === 'range') {
              const start = this.getRangeDate(new Date(this.formData[targetKey]), -Number(before))
              const end = this.getRangeDate(new Date(this.formData[targetKey]), Number(after))
              func = () => {
                return formatedDate < start || formatedDate > end
              }
            }
          }
          funcs.push(func)
        })
        for (const i in funcs) {
          // 有一个
          if (funcs[i]()) {
            return true
          }
        }
        return false
      }
      this.pickerOptions = {
        /**
         * 返回true即禁用
         */
        disabledDate
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
