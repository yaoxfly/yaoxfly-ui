# Upload

通过点击或者拖拽上传文件,已集成多种上传类型的样式，加强了部分功能，如删除前的提示，超出个数限制提示,照片墙超出个数自动隐藏+等功能。

# 基础用法

## 手动上传

<template>
  <div>
    <ManualExample/>
  </div>
</template>

<script>
import Example from './Example'
import PictureCardExample from './PictureCardExample'
import PictureExample from './PictureExample'
import DragExample from './DragExample'
import CustomExample from './CustomExample'
import BaseExample from './BaseExample'
import ManualExample from './ManualExample'

export default {
  components: {
    Example,
    PictureCardExample,
    PictureExample,
    DragExample,
    CustomExample,
    BaseExample,
    ManualExample
  }
}
</script>

## 自动上传

<template>
  <div>
    <BaseExample/>
  </div>
</template>


# 演示代码

``` html
<!--手动上传-->
<template>
  <div>
    <eve-upload
      ref="upload"
      action="https://jsonplaceholder.typicode.com/posts"
      :on-preview="handlePreview"
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
    //手动上传
    submit () {
      this.$refs.upload.submit()
    },
  }
}
</script>

<!--自动上传-->
<template>
  <div>
    <eve-upload
      ref="upload"
      action="https://jsonplaceholder.typicode.com/posts"
      :on-preview="handlePreview"
      auto-upload
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
```

# 自定义上传

## 手动上传

<template>
  <div>
    <CustomExample/>
  </div>
</template>


## 自动上传

<template>
  <div>
    <Example/>
  </div>
</template>


# 演示代码

```html
<!--手动上传-->
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
```

```html
<!--自动上传-->
<template>
  <div>
    <eve-upload
      :http-request="httpRequest"
      auto-upload
      :tip="tip"
      :beforeUpload="beforeUpload"
      :file-list="fileList"
      ref="upload"
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
```





# 用户头像上传

<template>
  <div>
    <PictureExample/>
  </div>
</template>

# 演示代码

``` html
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
```

> 如果需要预览的操作可以把`list-type`，设置为`picture-card`； `limit`设置为`1`，也可实现单张图片上传。

# 照片墙

<template>
  <div>
    <PictureCardExample/>
  </div>
</template>

# 演示代码

``` html
<template>
  <div>
    <eve-upload
      :http-request="httpRequest"
      auto-upload
      :tip="tip"
      :beforeUpload="beforeUpload"
      :file-list="fileList"
      ref="upload"
      list-type="picture-card"
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
```


# 拖拽上传

<template>
  <div>
    <DragExample/>
  </div>
</template>

# 演示代码

``` html
<template>
  <div>
    <eve-upload
      :http-request="httpRequest"
      auto-upload
      :tip="tip"
      :beforeUpload="beforeUpload"
      :file-list="fileList"
      ref="upload"
      drag
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

```

###  Attributes
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ----| ----| --- | ---- | ----- |
| action  | 上传的地址;上传地址设置为#，选择完自动上传，不会上传到action地址,而是自定义的http-request方法里 | string | — | # |
| headers  | 设置上传的请求头部| object | — | {} |
| multiple  | 是否支持多选| boolean | — | true |
| data  | 上传时附带的额外参数| object | — | {} |
| name  | 上传的文件字段名 | string | — | file |
| with-credentials  | 是否支持发送 cookie 凭证信息 | boolean | — | false |
| show-fileList  | 是否显示已上传文件列表 | boolean | — | true |
| drag  | 是否启用拖拽上传| boolean | — |  false|
| accept  | 上传的文件类型 |string  | .jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF | — |
| on-preview  |	点击文件列表中已上传的文件时的钩子 |	function(file)  |  — | — |
| on-remove |	文件列表移除文件时的钩子 |	function(file, fileList)  |  — | — |
| on-success |	文件上传成功时的钩子 |	function(response, file, fileList)  |  — | — |
| on-change |	文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用 |	function(file, fileList)  |  — | — |
| before-upload |	上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。 |	function(file)  |  — | — |
| before-remove |	删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。 |	function(file, fileList) | — |—|
| list-type | 文件列表的类型 | string  |  text/picture/picture-card | text |
| auto-upload | 是否在选取文件后立即进行上传 |	boolean  |  — | false |
| file-list| 上传的文件列表, 例如: [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}] |	array  |  — | [] |
| http-request |覆盖默认的上传行为，可以自定义上传的实现 |	function(data) |  — | — |
| limit |最大允许上传个数 -- 0是无限制 |  number | — |2|
| on-exceed |文件超出个数限制时的钩子 |  function(files, fileList) | — |—|


> 当 `drag`属性为`true` 时`list-type`属性可不设置，默认`text`即可,设置其他类型如`picture-card`样式会错乱。  `file-list`存储的是已上传成功的列表

###  Attributes(自定义)
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ----| ----| --- | ---- | ----- |
| upload-type |上传类型 | string | text(按钮)/picture(单张图片)/picture-card(照片墙)/drag(拖拽上传) | text  |
| tip |提示说明文字| string | — | 上传提示说明文字，可传属性也可用slot,slot名和属性名一样都是tip (例子：只能上传jpg/png文件，且不超过500kb)|

> 当`list-type`为`picture-card`时,当前值会强制设置为`picture-card`,`show-file-list`要设置为`true`,否则看不见已经添加的图片；当`drag`为`true`时，当前值会强制转换为`drag`。

###  Methods
| 方法名 | 说明 | 参数 | 
| ----| ----| --- | 
| clearFiles  |清空已上传的文件列表（该方法不支持在 before-upload 中调用） | — | 
| abort |取消上传请求  | （ file: fileList 中的 file 对象 ）  |
| submit |手动上传文件列表  | —  |


###  Slot
| name | 说明 | 
 | ----| ----|  
 |— | 自定义内容|
 |tip | 提示说明文字|
 |trigger | 触发文件选择框的内容|

 ###  Scoped Slot
 | name | 说明 | 
 | ----| ----|  
 |file|文件缩略图--黑色框里的各种按钮，参数为 { file }|