# Upload

上传附件。

# 基础用法

<template>
  <div>
    <Example/>
  </div>
</template>

<script>

import Example from './Example'
export default {
  components: {
    Example,
  }
}
</script>

# 演示代码

``` html
<template>
  <div>
    <eve-upload></eve-upload>
  </div>
</template>
<script>

export default {
  data () {
    return {

    }
  },
  methods: {}
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


###  Attributes(自定义)

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| ----| ----| --- | ---- | ----- |
| tip |提示说明文字| string | — | 上传提示说明文字，可传属性也可用slot,slot名和属性名一样都是tip (例子：只能上传jpg/png文件，且不超过500kb)|
| upload-type |上传类型 | string | 上传类型 --text(按钮)/picture(单张图片)/picture-card(照片墙)/drag(拖拽上传的样式),当listType为picture-card时,当前值一定也要设置为picture-card，showFileList也要设置为true,否则看不见已经添加的图片。 | text  |

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