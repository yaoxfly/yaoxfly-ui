<template>
  <div class="ue-component-wrapper">
    <el-select
      v-if="mode !== 'dialog'"
      v-model="curValue"
      size="small"
      style="width: 100%"
      :disabled="disabled"
      placeholder="请选择"
      :clearable="clearable"
      :multiple="multiple"
    >
      <el-option
        v-for="(item, index) in realSelections"
        :key="`el_ue_option_${index}`"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <template v-else>
      <el-button :disabled="disabled" type="primary" size="small" @click="handleClickShowDialog">{{ btnLabel }}</el-button>
      <select-dialog ref="selectDialog" :title="btnLabel" :selections="realSelections" v-model="curValue"/>
    </template>
  </div>
</template>

<script>
import VModelMixin from '../v-model-mixin'
import { mapState } from 'vuex'
import selectDialog from './select-dialog'

export default {
  name: 'UeSelect',
  mixins: [
    VModelMixin
  ],
  components: {
    selectDialog
  },
  props: {
    selections: {
      type: Array,
      default: () => []
    },
    // 函数
    clearable: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    // 模式 dialog 选择项太多时可以设置为弹框模式进行选择
    mode: {
      type: String,
      default: null
    },
    btnLabel: {
      type: String,
      default: '选择'
    }
  },
  data () {
    return {
      clonedSelections: [],
      showDialog: false
    }
  },
  computed: {
    ...mapState({
      curChart: state => state.bdUserConfig.clickedActivatedChart
    }),
    realSelections () {
      if (this.multiple) {
        const clonedSelections = this.selections
        clonedSelections.sort((a, b) => a.label.length - b.label.length)
        return clonedSelections
      }
      return this.selections
    }
  },
  methods: {
    handleClickShowDialog () {
      this.$refs.selectDialog.openDialog()
    }
  }
}
</script>
