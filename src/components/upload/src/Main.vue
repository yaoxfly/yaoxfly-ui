<!--
* @Author: yx
* @Description: 上传组件
* @Date: 2020-11-05
-->
<template>
  <div>
    <el-upload
      class="eve-upload"
      :action="action"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :http-request="httpRequest"
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'EveUpload',
  props: {
    //必选参数，上传的地址--上传地址设置为#，选择完自动上传，不会上传到action地址,而是自定义的http-request方法里
    action: {
      type: String,
      default: () => '#'
    },
  },

  data () {
    return {
      fileList: [
        {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
        {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }]
    }
  },
  computed: {},
  created () { },
  mounted () { },
  methods: {

    handleRemove (file, fileList) {
      console.log(file, fileList)
    },

    httpRequest (data) {
      console.log(data, 11)
    },

    handlePreview (file) {
      console.log(file)
    },

    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },

    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}?`)
    }

  },
  watch: {}
}
</script>

<style lang="scss" scoped>
.eve-upload {
}
</style>
