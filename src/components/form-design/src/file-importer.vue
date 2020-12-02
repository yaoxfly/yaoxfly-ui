<template>
  <div style="display: inline-block; width: 110px">
    <!-- // 由于我是 vue项目使用的 element-ui的组件库,所以用到 el-upload -->
    <!-- // 上传一个文件 -->
    <!-- // action此处链接随便填写 -->
    <el-upload
      ref="upload"
      :limit="1"
      action="#"
      accept=".json"
      :file-list="fileList"
      :show-file-list="false"
      :before-upload="beforeUpload"
      :on-remove="onRemove"
    >
      <el-button size="small" type="info" plain>导入json配置</el-button>
    </el-upload>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fileList: [],
      uploadData: []
    }
  },
  methods: {
    beforeUpload (file) {
      const that = this
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = (e) => {
        that.uploadData = []
        that.uploadData = JSON.parse(e.target.result)
        console.log('sd ', e.target.result)
        that.$emit('upload-parent', that.uploadData)
      }
    },
    onRemove (file) {
      this.fileList = []
    },
    save () {
      // 把数据发送给 父元素
      this.$emit('upload-parent', this.uploadData)
    }
  }
}
</script>
