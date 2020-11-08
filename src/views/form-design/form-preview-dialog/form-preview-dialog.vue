<!-- 表单设计 -->
<template>
  <el-dialog :visible.sync="show" append-to-body custom-class="vertical-center-modal" :width="modalWidth + 'px'" :close-on-click-modal="false" @open="handleOpen" @close="handleCancel">
    <div slot="title">
      预览
    </div>
    <form-render v-if="show" :form-config="form"></form-render>
    <div slot="footer">
      <el-button type="primary" size="small" @click="handleOk">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import ModalMixin from '../../../mixins/modal-mixin'
import { mapState } from 'vuex'
import FormRender from './form-render'

export default {
  components: {
    FormRender
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
    form () {
      return {
        formItemConfigs: this.formItemConfigs,
        global: this.global
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
