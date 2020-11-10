<template>
  <div>
    <el-button type="primary" size="mini" @click="showDialog">
      设置js脚本
    </el-button>
    <el-dialog :visible.sync="show" append-to-body custom-class="vertical-center-modal" :width="750 + 'px'" :close-on-click-modal="false" @open="handleOpen" @close="handleCancel">
      <div slot="title">
        脚本代码
      </div>
      <js-editor :comment="comment" v-model="curValue" :mode="mode" :disabled="disabled"/>
      <div slot="footer">
        <!-- <el-button type="primary" size="small" @click="setData">数据</el-button> -->
        <el-button type="primary" size="small" @click="handleOk">保存</el-button>
        <el-button type="error" size="small" plain @click="handleCancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import JsEditor from './JsEditor'

export default {
  components: {
    JsEditor
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    comment: {
      type: String,
      default: ''
    }
  },
  watch: {
    show () {
      this.curValue = this.value
    }
  },
  data () {
    return {
      show: false,
      curValue: ''
    }
  },
  methods: {
    showDialog () {
      this.show = true
    },
    handleOpen () {
      // this.curValue = this.value
    },
    handleCancel () {
      this.show = false
    },
    handleOk () {
      this.$emit('input', this.curValue)
      this.show = false
    }
  },
  created () {
    this.curValue = this.value
  }
}
</script>