<!--
* @Author: xjd
* @Description: 输入框的封装
* @Date: 2020-12-7
-->
<template>
  <div class="eve-file-uploader">
    <el-upload
      ref="uploadZip"
      class="upload-demo"
      action="#"
      :accept="fileType"
      :show-file-list="false"
      :before-upload="uploadZip"
      :multiple="multiple"
    >
      <el-button v-if="!showUploadBtn" type="primary" :disabled="isDisabled" plain size="mini">重新上传<i class="el-icon-upload el-icon--right" /></el-button>
      <template v-else>
        <el-button type="primary" :disabled="isDisabled" plain size="mini">点击上传<i class="el-icon-upload el-icon--right" /></el-button>
        <div v-if="fileType">支持扩展名：{{ fileType }}</div>
      </template>
      <div
        v-if="curFileName !== ''"
        slot="tip"
        style="margin: 5px 0"
      >
        {{ curFileName }}
      </div>
    </el-upload>
  </div>
</template>
<script>
import VModelMixin from '../../../mixins/fd-mixin'

export default {
  name: 'FdFileUploader',
  mixins: [
    VModelMixin
  ],
  props: {
    fileType: {
      type: String,
      default: ''
    },
    fileSize: {
      type: Number,
      default: 10
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      fileList: '',
      curFileName: '',
      curFileObj: '', // 记录上传的文件流
      showUploadBtn: true
    }
  },

  mounted() {
    this.curFileName = ''
    if (this.curValue && !this.multiple) {
      this.showUploadBtn = false
    }
  },

  methods: {
    // 上传文件
    uploadZip(file) {
      const isLt10M = file.size / 1024 / 1024 < this.fileSize
      if (!isLt10M) {
        this.$message.error(`文件大小不能超过 ${this.fileSize}MB!`)
        return false
      }
      // 浏览器兼容问题，识别不到file.type字段，改用name的后缀名识别
      if (this.fileType) {
        const fileTypeArr = this.fileType.split(',')
        const typeIdx = fileTypeArr.findIndex(type => file.name.endsWith(type))
        if (typeIdx === -1) {
          this.$message.error(`文件只能是${this.fileType}格式`)
          return false
        }
      }
      this.curFileName = file.name
      // this.formData.file = 'alreadyUploadZip'
      this.curFileObj = file
      this.showUploadBtn = false
      return false
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
