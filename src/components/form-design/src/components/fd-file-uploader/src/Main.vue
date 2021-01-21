<template>
  <div v-loading="loading">
    <el-upload
      ref="upload"
      action="#"
      :accept="fileType"
      :show-file-list="false"
      :before-upload="beforeUpload"
      :disabled="isDisabled"
      :multiple="multiple"
       v-if="showUpload"
    >
      <div v-if="tip" slot="tip">
        <span>{{ tip }}</span>
      </div>
      <el-button type="primary" :disabled="isDisabled" plain size="mini"><i class="el-icon-upload el-icon--right" />点击上传</el-button>
    </el-upload>
    <div class="files-preview" :class="{ 'preview-flex': isFlex && multiple }">
      <div class="file" :class="{ 'file-flex': isFlex }" v-for="(file, idx) in newFileList" :key="`new_file_${idx}`">
        <i class="el-icon-document"></i>
        <span class="file-name">
          {{ file.name }}
        </span>
        <i class="el-icon-circle-close" @click="handleClickDelete('newFileList', idx)"></i>
      </div>
      <div class="file" :class="{ 'file-flex': isFlex }" v-for="(file, idx) in fileList" :key="`old_file_${idx}`">
        <i class="el-icon-document"></i>
        <span class="file-name">
          {{ file.name }}
        </span>
        <i class="el-icon-circle-close" @click="handleClickDelete('fileList', idx)"></i>
      </div>
    </div>
  </div>
</template>
<script>
import VModelMixin from '../../../mixins/fd-mixin'
import { confirmMsgBox } from '../../../lib/utils'

export default {
  mixins: [
    VModelMixin
  ],
  name: 'FdFileUploader',
  props: {
    fileType: {
      type: String,
      default: ''
    },
    tip: {
      type: String,
      default: '上传提示'
    },
    fileSize: {
      type: Number,
      default: 10
    },
    multiple: {
      type: Boolean,
      default: false
    },
    isFlex: {
      type: Boolean,
      default: false
    },
    needDeleteConfirm: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    showUpload () {
      if (this.multiple) {
        return !this.isReadOnly
      }
      return (!this.multiple && this.fileList.length === 0 && this.newFileList.length === 0)
    }
  },
  data () {
    return {
      permission: false,
      // 只包含已经上传的列表
      fileList: [],
      // 最后选择的文件
      file: '',
      // 待上传的文件列表
      newFileList: [],
      loading: false
    }
  },
  methods: {
    // 上传之前
    beforeUpload (file) {
      const isLt2M = file.size / 1024 / 1024 <= this.fileSize
      if (!isLt2M) {
        this.$message.error(`上传的文件大小不能超过 ${this.fileSize}MB!`)
        return false
      }
      if (this.fileType) {
        const fileTypeArr = this.fileType.split(',')
        const typeIdx = fileTypeArr.findIndex(type => file.name.endsWith(type))
        if (typeIdx === -1) {
          this.$message.error(`文件只能是${this.fileType}格式`)
          return false
        }
      }
      this.newFileList.push(file)
      return false
    },
    //清空上传的列表
    clear () {
      this.$refs.upload.clearFiles()
    },
    handleClickDelete (fileListName, idx) {
      const fileName = this[fileListName][idx].name
      if (this.needDeleteConfirm) {
        confirmMsgBox(this, { title: '提示', content: `确定移除 ${fileName}?` }).then(res => {
          this[fileListName].splice(idx, 1)
        })
      } else {
        this[fileListName].splice(idx, 1)
      }
    },
    //手动上传
    submit () {
      console.log(this.file, this.newFileList, this.fileList, 1)
    },
    // 需要远程数据回填的都要提供这个方法
    setRemoteData(params) {
      return new Promise(resolve => {
        resolve()
        // this.loading = true
        // setTimeout(() => {
        //   this.fileList = [
        //     { name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
        //     { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
        //     { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
        //     { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
        //     { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
        //     { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
        //   ]
        //   this.loading = false
        //   resolve()
        // }, 2000)
      })
    },
  },
  mounted() {
    this.$emit('commit-remote-data-setter', this)
  }
}
</script>

<style lang="scss" scoped>
.files-preview {
  width: 100%;
  .file {
    position: relative;
    padding: 0 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    .el-icon-circle-close {
      display: none;
      cursor: pointer;
      &:hover {
        color: #68C4FC;
      }
    }
    &:hover {
      background: #F5F7FA;
      .el-icon-circle-close {
        display: inline;
      }
    }
  }
  &.preview-flex {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .file-flex {
      width: 125px;
    }
  }
}

</style>