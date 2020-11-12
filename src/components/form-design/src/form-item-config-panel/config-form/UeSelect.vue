<template>
  <div class="ue-component-wrapper">
    <el-select
      v-model="curValue"
      size="small"
      style="width: 100%"
      :disabled="disabled"
      placeholder="请选择"
      :clearable="clearable"
    >
      <el-option
        v-for="(item, index) in realSelections"
        :key="`el_ue_option_${index}`"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script>
import VModelMixin from './v-model-mixin'
import { mapState } from 'vuex'

export default {
  name: 'UeSelect',
  mixins: [
    VModelMixin
  ],
  props: {
    selections: {
      type: Array,
      default: () => []
    },
    // 函数
    selectionsParser: {
      type: String,
      default: null
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      parsedOptions: []
    }
  },
  computed: {
    ...mapState({
      curChart: state => state.bdUserConfig.clickedActivatedChart
    }),
    realSelections () {
      if (this.selectionsParser) {
        // eslint-disable-next-line no-eval
        return eval(`(false || function () { return ${this.selectionsParser} })()`)(this, this.curChart)
      } else {
        return this.selections
      }
    }
  }
}
</script>
