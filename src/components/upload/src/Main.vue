
<!--
* @Author: yx
* @Description: 上传组件
* @Date: 2020-11-05
-->
<template>
  <div>
    <el-upload
      class="eve-upload"
      :class="[isHideAdd && 'eve-upload__none']"
      :action="action"
      :multiple="multiple"
      :show-file-list="showFileList"
      :drag="drag"
      :accept="accept"
      :limit="limit"
      :list-type="listType"
      :auto-upload="autoUpload"
      :file-list="fileLists"
      :on-exceed="onExceed"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :on-success="onSuccess"
      :on-change="onChange"
      :before-upload="beforeUpload"
      :before-remove="beforeRemove"
      :http-request="httpRequest"
    >
      <slot>
        <!-- 单独上传一张图片 -->
        <section v-if="uploadType === 'picture'">
          <img v-if="imageUrl" :src="imageUrl" class="eve-upload__img" />
          <i v-else class="el-icon-plus eve-upload__icon"></i>
        </section>
        <!-- 照片墙,多张图片 -->
        <section v-else-if="uploadType === 'picture-card'">
          <i class="el-icon-plus"></i>
        </section>
        <!-- 其他文件类型 -->
        <el-button type="primary" v-else>点击上传</el-button>
      </slot>
      <template #tip>
        <div class="el-upload__tip">
          <!-- 提示说明文字 -->
          <slot name="tip"> {{ tip }} </slot>
        </div>
      </template>
      <!-- 触发文件选择框的内容 -->
      <template #trigger> <slot name="trigger"></slot> </template>

      <!-- 文件缩略图 -->
      <template v-slot:file="{ file }">
        <slot name="file" :file="file"></slot>
      </template>
    </el-upload>

    <!-- 预览-放大图用 -->
    <el-dialog :visible.sync="dialog.visible">
      <img width="100%" :src="dialog.imageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'EveUpload',
  props: {

    /*element-ui属性 */
    //必选参数，上传的地址--上传地址设置为#，选择完自动上传，不会上传到action地址,而是自定义的http-request方法里
    action: {
      type: String,
      default: () => '#'
    },

    //是否支持多选
    multiple: {
      type: Boolean,
      default: () => true
    },

    //是否显示已上传文件列表
    showFileList: {
      type: Boolean,
      default: () => true
    },
    //是否启用拖拽上传
    drag: {
      type: Boolean,
      default: () => false
    },

    //接受上传的文件类型--".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF";默认无限制
    accept: {
      type: String,
      default: () => ''
    },

    /* 文件列表移除文件时的钩子(回调)
      * @param  {Object}  file 文件详细信息
      * @param  {Array}  fileList 文件列表信息(被删除后剩余的列表信息)
     */
    onRemove: {
      type: Function,
      default: function (file, fileList) {
        // console.log(file, fileList, 11)
      }
    },



    /*文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
     * @param  {Object}  file 文件详细信息
      * @param  {Array}  fileList 文件列表信息(被删除后剩余的列表信息)
    */
    // onChange: {
    //   type: Function,
    //   default: function (file, fileList) {
    //     console.log(11)
    //   }
    // },


    //上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传，要去掉列表
    beforeUpload: {
      type: Function,
      default: function (file) {
        // const isJPG = file.type === 'image/jpeg'
        // const isLt2M = file.size / 1024 / 1024 < 2
        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!')
        // }
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!')
        // }
        // return isJPG && isLt2M
      }
    },

    //删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除
    beforeRemove: {
      type: Function,
      default: function (file, fileList) {
        return this.$confirm(`确定移除 ${file.name}?`)
      }
    },

    /* action为#时且autoUpload为true时，覆盖默认的上传行为，可以自定义上传的实现(即自动上传可用ajax)
      * @param  {Object}  data 上传信息--包括上传地址、文件名称、参数、headers等信息
    */
    httpRequest: {
      type: Function,
      default: function (data) {
        // console.log(data, 'data')
      }
    },

    //文件列表的类型(展示用) --text/picture/picture-card
    listType: {
      type: String,
      default: () => 'picture-card'
    },

    //是否在选取文件后立即进行上传
    autoUpload: {
      type: Boolean,
      default: () => true
    },

    //最大允许上传个数 -- 0是无限制
    limit: {
      type: Number,
      default: 2
    },

    /* 文件超出个数限制时的钩子
     * @param  {Object}  file 文件详细信息
     * @param  {Array}  fileList 文件列表信息(被删除后剩余的列表信息)
    */
    onExceed: {
      type: Function,
      default: function (files, fileList) {
        this.$message.warning(`当前限制选择${this.limit}个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      }
    },

    //上传的文件列表
    fileList: {
      type: Array,
      default: () => [
        // {
        //   name: 'food.jpeg',
        //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        // },
        // {
        //   name: 'food2.jpeg',
        //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        // }
      ]
    },

    /* 自定义属性 */

    //提示说明文字
    tip: {
      type: String,
      default: '上传提示说明文字，可传属性也可用slot,slot名和属性名一样都是tip (例子：只能上传jpg/png文件，且不超过500kb)'
    },

    //上传文件的类型 --text(按钮)/picture(单张图片)/picture-card(照片墙),当listType为picture-card时,当前值一定也要设置为picture-card，showFileList也要设置为true否则看不见已经添加的图片。
    uploadType: {
      type: String,
      default: 'picture-card'
    }
  },

  data () {
    return {
      //上传成功后要回填的图片地址
      imageUrl: '',
      //文件列表(内部处理逻辑用)
      fileLists: [],
      //对话框
      dialog: {
        imageUrl: '', //图片地址
        visible: false //是否显示
      }
    }
  },


  created () { },
  mounted () {
    // console.log(this.$attrs)
  },
  methods: {

    /** @description    点击文件列表中已上传的文件时的钩子(回调) 
      * @author yx
      * @param  {Object}  file  文件详细信息
     */
    onPreview (file) {
      this.dialog.imageUrl = file.url
      this.dialog.visible = true
      this.$emit('on-preview', file)
    },

    /** @description   文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
      * @author yx
      * @param  {Object}  file 文件详细信息
      * @param  {Array}  fileList 文件列表信息
     */
    onChange (file, fileList) {
      const KeyMap = {
        //上传类型是单张图片的时候
        picture: () => {
          this.fileLists = []
          this.$emit('update:file-list', this.fileLists)
          this.imageUrl = URL.createObjectURL(file.raw)
        },
        'picture-card': () => {
          // return this.fileLists.length >= this.limit
        }

      }
      KeyMap[this.uploadType] && KeyMap[this.uploadType]()
      console.log(fileList, this.fileLists)
      this.$emit('on-change', file, fileList)
    },

    /** @description   文件上传成功时的钩子
      * @author yx
      * @param  {Object}  response 上传成功后的返回信息
      * @param  {Object}  file 文件详细信息
      * @param  {Array}  fileList 文件列表信息
     */
    onSuccess (response, file, fileList) {
      this.$emit('on-success', response, file, fileList)
    }
  },

  watch: {
    //文件列表
    fileList: {
      handler (newValue) {
        this.fileLists = newValue
        this.$emit('update:fileList', this.fileLists)
      }
    },

  },

  computed: {
    isHideAdd () {
      return this.fileLists.length >= this.limit
    }
  }

}
</script>


<style lang="scss" scoped>
.eve-upload {
}
::v-deep .el-button {
  padding: 9px 15px;
}

::v-deep .eve-upload {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload:hover {
    border-color: #409eff;
  }
  &__icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  &__img {
    width: 178px;
    height: 178px;
    display: block;
  }
}

::v-deep .eve-upload__none {
  .el-upload--picture-card {
    display: none;
  }
}
</style>
