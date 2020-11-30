<!-- 表单设计 -->
<template>
  <el-dialog top="1vh" :visible.sync="show" append-to-body custom-class="vertical-center-modal" :width="modalWidth + 'px'" :close-on-click-modal="false" @open="handleOpen" @close="handleCancel">
    <div slot="title">
      预览页面代码
    </div>
    <vue-editor v-if="show" :value="code" disabled/>
    <div slot="footer">
      <!-- <el-button type="primary" size="small" @click="setData">数据</el-button> -->
      <el-button type="primary" size="small" @click="handleOk">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ModalMixin from '../mixins/modal-mixin'
import { mapState } from 'vuex'
import VueEditor from './VueEditor'
import codeGenerator from './code-generator'

export default {
  components: {
    VueEditor
  },
  mixins: [
    ModalMixin
  ],
  props: {
  },
  data () {
    return {
      code: ''
    }
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
      this.code = codeGenerator(this.configJson)
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
