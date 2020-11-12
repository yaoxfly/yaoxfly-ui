<!-- 表单设计 -->
<template>
  <el-dialog :visible.sync="show" append-to-body custom-class="vertical-center-modal" :width="modalWidth + 'px'" :close-on-click-modal="false" @open="handleOpen" @close="handleCancel">
    <div slot="title">
      预览配置文件
    </div>
    <json-editor v-if="show" :value="configJson" disabled/>
    <div slot="footer">
      <!-- <el-button type="primary" size="small" @click="setData">数据</el-button> -->
      <el-button type="primary" size="small" @click="handleOk">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ModalMixin from '../mixins/modal-mixin'
import { mapState } from 'vuex'
import JsonEditor from './JsonEditor'

export default {
  components: {
    JsonEditor
  },
  mixins: [
    ModalMixin
  ],
  props: {
  },
  data () {
    return {}
  },
  computed: {
    ...mapState({
      formItemConfigs: state => state.FormDesign.formItemConfigs,
      global: state => state.FormDesign.global
    }),
    configJson () {
      return {
        global: this.global,
        formItemConfigs: this.formItemConfigs
      }
    }
  },
  created () {
  },
  methods: {
    handleOpen () {
    },
    close () {
      this.show = false
    },
    handleCancel () {
    },
    handleOk () {
      this.close()
    }
  }
}
</script>
