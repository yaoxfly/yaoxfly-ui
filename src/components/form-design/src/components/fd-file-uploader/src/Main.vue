
<!--
* @Author: yx
* @Description:基础上传--自动上传
* @Date: 2020-12-28 
-->
<template>
  <div>
    <eve-upload
      ref="upload"
      action="https://jsonplaceholder.typicode.com/posts"
      :on-preview="handlePreview"
      auto-upload
    ></eve-upload>
  </div>
</template>
<script>

export default {
  name: 'FdFileUploader',
  data () {
    return {
      tip: '上传提示说明文字，可传属性也可用slot,slot名和属性名一样都是tip (例子：只能上传jpg/png文件，且不超过2MB!)',
      permission: false,
      // 只包含已经上传的列表
      fileList: [
        { name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
        { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }
      ],
      // 最后选择的文件
      file: '',
      // 包含上传成功和待上传的文件列表
      toBeSentFileList: []
    }
  },
  methods: {
    //点击文件列表中已上传的文件时的钩子
    handlePreview (file) {
      console.log(file, 11)
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
    },

  }
}
</script>