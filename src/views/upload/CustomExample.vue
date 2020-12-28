
<!--
* @Author: yx
* @Description: 自定义(ajax)手动上传
* @Date: 2020-12-28 
-->
<template>
  <div>
    <eve-upload
      :tip="tip"
      :beforeUpload="beforeUpload"
      :file-list="fileList"
      :on-change="onChange"
      ref="upload"
    ></eve-upload>
    <el-button @click="clear" :style="{ marginTop: '10px' }"
      >清空上传列表</el-button
    >

    <el-button @click="submit" :style="{ marginTop: '10px' }"
      >手动上传列表</el-button
    >
  </div>
</template>
<script>

export default {
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
    //手动上传
    submit () {
      console.log(this.file, this.toBeSentFileList, this.fileList, 1)
    },
    onChange (file, fileList) {
      this.file = file
      this.toBeSentFileList = fileList
    }

  }
}
</script>