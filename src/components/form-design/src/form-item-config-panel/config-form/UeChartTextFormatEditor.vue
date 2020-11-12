<template>
  <div>
    <template v-for="(templateVar, index) in curTemplateVars">
      <!-- 不需要按钮在来控制显隐藏单位 -->
      <el-form-item
        v-if="canShowVars[index] && templateVar.value === '{c}'"
        :key="`template_unit_${index}`"
        :label-width="labelWidth"
        label="单位"
      >
        <div class="ue-component-wrapper">
          <el-input
            size="small"
            :placeholder="`请输入${templateVar.label}单位`"
            :value="curTemplateVars[index].unit"
            @input="handleUnitInput(index, $event)"
          />
        </div>
      </el-form-item>
    </template>
  </div>
</template>

<script>
import clonedeep from 'clonedeep'
import VModelMixin from './v-model-mixin'
import _ from 'lodash'
export default {
  name: 'UeChartTextFormatEditor',
  mixins: [
    VModelMixin
  ],
  props: {
    templateVars: {
      type: Object,
      default: () => ({})
    },
    labelWidth: {
      type: String,
      default: '100px'
    }
  },
  data () {
    return {
      canShowVars: [],
      curTemplateVars: []
    }
  },
  watch: {
    value () {
      this.curValue = this.value
      this.updateCurTemplateVars()
    },
    curValue () {
      // 什么都不做 VModelMixin 混合中会因为这个监听额触发emit事件导致数据重复变更
      // 这里什么都不做 用来覆盖 混合中的变更操作
    }
  },
  created () {
    this.curValue = this.value
    this.initCurTemplateVars()
  },
  methods: {
    updateCurTemplateVars () {
      // 依据 value
      const { order } = this.templateVars
      order.forEach((variable, index) => {
        const templateVar = this.curTemplateVars[index]
        const canShow = `${this.curValue}`.indexOf(templateVar.value) > -1
        this.$set(this.canShowVars, index, canShow)
        // 更新单位
        if (variable === '{c}') {
          const rs = this.getUnit(order, variable, templateVar)
          if (rs.canSet) {
            this.$set(this.curTemplateVars[index], 'unit', rs.unit)
          }
        }
      })
    },
    initCurTemplateVars () {
    // order 是字符模板的排序 模板是这个的话 {b} : {c} ({d}%) 他的order就是 ['{b}', 'c', 'd']
      const { order } = this.templateVars
      const canShowVars = []
      const curTemplateVars = []
      // order 是['{a}', '{c}', '{d}', '{b}']这些字符模板的顺序数组
      order.forEach(variable => {
        const templateVar = clonedeep(this.templateVars[variable])
        let canShow
        if (this.curValue && `${this.curValue}`.indexOf(templateVar.value) > -1) {
          canShow = true
        } else {
          canShow = false
        }
        // 之后可以在这里加其他数值类型的字段 isValueField 像自定义的字段{@lat}
        if (canShow && (variable === '{c}')) {
          const rs = this.getUnit(order, variable, templateVar)
          if (rs.canSet) {
            templateVar.unit = rs.unit
          }
        }
        canShowVars.push(canShow)
        curTemplateVars.push(templateVar)
      })
      this.canShowVars = canShowVars
      this.curTemplateVars = curTemplateVars
    },

    getUnit (order, variable, templateVar) {
      // 提取单位 例如要提取 formatter = "{a} -> ({c}吨)" 里的吨
      const cOrderIndex = order.findIndex(tempV => tempV === variable)
      if (cOrderIndex > -1) {
        return {
          canSet: true,
          unit: templateVar.unit// elWithUnit.split(templateVar.sufix)[0]
        }
        // "{a} -> ({c}吨)" -> ['{a} -> (', '吨)']
        // const split1 = this.curValue.split(variable)
        // if (split1.length === 2) {
        // 取 '吨)' 这个
        // const elWithUnit = split1[1]
        // 切分 ')'之后去第一个
        // return {
        //   canSet: true,
        //   unit: templateVar.unit// elWithUnit.split(templateVar.sufix)[0]
        // }
        // }
      }
      return {
        canSet: false
      }
    },
    handleSwitchInput (index, value) {
      this.$set(this.canShowVars, index, value)
      this.emitInputEvent()
    },
    emitInputEvent () {
      const formatter = []
      const { order } = this.templateVars
      order.forEach((variable, orderIndex) => {
        if (this.canShowVars[orderIndex]) {
          // 拼接字符串
          const { prefix, sufix, unit } = this.curTemplateVars[orderIndex]
          if (_.compact(this.canShowVars).length === 1) {
            if (variable === '{c}') {
              formatter.push(`${variable}${unit || ''}`)
            } else if (variable === '{d}') {
              formatter.push(`${variable}${sufix}`)
            } else {
              formatter.push(`${variable}`)
            }
          } else {
            formatter.push(`${prefix}${variable}${unit || ''}${sufix}`)
          }
        }
      })
      // 拼接模板字符串
      this.curValue = formatter.join('')
      this.$emit('input', this.curValue)
    },
    handleUnitInput (index, value) {
      // const { order } = this.templateVars
      this.$set(this.curTemplateVars[index], 'unit', value)
      this.emitInputEvent()
    }
  }
}
</script>
