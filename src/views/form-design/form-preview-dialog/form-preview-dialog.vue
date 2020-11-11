<!-- 表单设计 -->
<template>
  <el-dialog :visible.sync="show" append-to-body custom-class="vertical-center-modal" :width="modalWidth + 'px'" :close-on-click-modal="false" @open="handleOpen" @close="handleCancel">
    <div slot="title">
      预览
    </div>
    <form-render ref="formRender" v-if="show" :form-config="form" />
    <div slot="footer">
      <!-- <el-button type="primary" size="small" @click="setData">数据</el-button> -->
      <el-button type="success" size="small" @click="handleClickValidate">校验</el-button>
      <el-button type="primary" size="small" plain @click="handleOk">关闭</el-button>
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
    },
    handleClickValidate () {
      this.$refs.formRender.validate((valid) => {
        console.error('校验结果 ', valid)
        console.log('数据 ', JSON.stringify(this.$refs.formRender.getData()))
      })
    },
    setData () {
      this.$refs.formRender.setFormData({
        s1: '123123',
        s2: '1',
        form_field_76857: '2020-12-19'
      })
    }
  }
}
</script>
