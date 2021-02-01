<!--
* @Author: yx
* @Description: 带有单位转换的input框
* @Date: 2021-01-29 
-->
<template>
  <div class="fd-input-unit-change">
    <el-input
      v-model="curValue"
      :disabled="isDisabled"
      :placeholder="placeholder"
      :size="size"
      @input="oninput"
    ></el-input>

    <span class="fd-input-unit-change__input">
      {{ unit }}
    </span>
  </div>
</template>

<script>
import VModelMixin from '../../../mixins/fd-mixin'
export default {
  name: 'FdInputUnitChange',
  mixins: [VModelMixin],
  props: {
    placeholder: {
      type: String,
      default: ''
    },

    //单位
    unit: {
      type: String,
      default: '元'
    },

  },

  methods: {
    /**@description  限制input输入
   * @author yx
   */
    oninput (value) {
      this.curValue = value.replace(/[^(\d||/.)]/g, '')
    },

    /**@description  单位转换
     * @author yx
     */
    unitChange (param) {
      const { shineUpon = { 元: 1, 千元: 1000, 万元: 10000 }, oldVal, newVal } = param || {}
      const strValue = shineUpon[newVal].toString()
      const accuracy = strValue.substr(1, strValue.length).length + 2 //当前精度
      this.curValue = shineUpon[newVal] > shineUpon[oldVal] ? (this.curValue / (shineUpon[newVal] / shineUpon[oldVal]).toFixed(accuracy)).toFixed(accuracy)
        : (this.curValue * (shineUpon[oldVal] / shineUpon[newVal]).toFixed(accuracy)).toFixed(accuracy)
    },
  },

  watch: {
    unit: {
      handler (newVal, oldVal) {
        this.unitChange({ newVal: newVal, oldVal: oldVal })
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.fd-input-unit-change {
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: normal;
  &__input {
    width: 30px;
    white-space: normal;
    margin: 0 10px;
  }
}
</style>