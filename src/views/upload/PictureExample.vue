<template>
  <div>
    <eve-upload
      :http-request="httpRequest"
      auto-upload
      :tip="tip"
      :beforeUpload="beforeUpload"
      :file-list="fileList"
      ref="upload"
      upload-type="picture"
    ></eve-upload>
    <el-button @click="clear" :style="{ marginTop: '10px' }"
      >清空上传列表</el-button
    >
  </div>
</template>
<script>

export default {
  data () {
    return {
      tip: '上传提示说明文字，可传属性也可用slot,slot名和属性名一样都是tip (例子：只能上传jpg/png文件，且不超过2MB!)',
      permission: false,
      fileList: []
    }
  },
  methods: {
    // ajax请求
    httpRequest (data) {
      if (this.permission) {
        console.log(data)
      }
    },

    // 上传之前
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      this.permission = isJPG && isLt2M
      return this.permission
    },

    //清空上传的列表
    clear () {
      this.$refs.upload.clearFiles()
    }

  }
}
</script>