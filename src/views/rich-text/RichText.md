  # RichText
   富文本组件，基于tinymce富文本插件，添加了字数限制，集成了各种插件，等自定义功能。
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

```html
<template>
  <div>
    <eve-rich-text
      v-model="value"
      @on-click="onClick"
      :init="init"
    ></eve-rich-text>
  </div>
</template>
<script>
export default {
  name: 'RichText',
  data () {
    return {
      value: '',
      init: {
        height: 327
      }
    }
  },
  mounted () {

  },
  methods: {
    //聚焦事件
    onClick () {
      console.log(this.value)
    }
  }
}
</script>
```

### Attributes
| 参数   | 说明 | 类型  | 可选值 | 默认值 |
| ----- | ------ | ----- | ----- | - |
| value/v-model  | 双向绑定 | string | — | — | 
| disabled | 是否禁用 | boolean | — | false | 
| init | 初始化配置，详细参数见下表 |  object | — | — |

### init
| 参数   | 说明 | 类型  | 可选值 | 默认值 |
| ----- | ------ | ----- | ----- | - |
| auto_focus | 类型 | boolean |  —  | true |
| language_url | 语言插件地址 |  string |  —  |  — |
| language | 语言 |  string |  —  |  zh_CN |
| height | 高度 |  number |  —  |  300 |
| plugins | 插件,详细参数见下表 |  array/string |  —  |  ['wordcount', 'ax_wordlimit', 'help'] |
| toolbar | 工具栏展示的插件，已内置了基本所有插件，建议不需要传 |  array/string |  —  | —|
| branding | 是否有水印 |  boolean |  —  | fasle|
| paste_data_images | 允许粘贴图像 |  boolean |  —  | true|
| media_live_embeds | 媒体实时预览开关 |  boolean |  —  | true|
| menubar | 是否隐藏最上方menu |  boolean |  —  | false|
| images_upload_handler | 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片 |  function |  —  | —|
| video_template_callback | 此处为视频显示的回调 |  function |  —  | —|
| min_height | 限定编辑器的最小高度。 |  number |  —  | 327|
| max_height | 限定编辑器的最大高度 |  number |  —  | 500|
| save_enablewhendirty |当内容无变化时禁用保存按钮,当有变化时，保存按钮变为可点击状态 |  boolean |  —  | true|
| save_onsavecallback |保存回调函数 |  function |  —  | —|
| templates |自定义内容模板 |  array |  —  | —|
| textpattern_patterns |快速排版（类似markdown） |  array |  —  | —|
| charmap |自定义该窗口中可选的特殊字符 |  array |  —  | —|
| ax_wordlimit_num |字数限制最大值 |  number |  —  | —|
| ax_wordlimit_callback |字数限制的回调 |  function |  —  | —|

### plugins
| 插件   | 说明 | 
| ----- | ------ | 
| lists | 列表插件 | 
| image | 插入上传图片插件 | 
| media | 插入视频插件 | 
| table | 插入表格插件 | 
| anchor | 锚点插件 | 
| autolink | 自动创建超链接 | 
| autosave | 自动存稿 | 
| bbcode | 为TinyMCE添加基于BBCode的输入输出功能。 | 
| code | 为TinyMCE添加基于BBCode的输入输出功能。 | 
| charmap | 自定义该窗口中可选的特殊字符。 | 
| codesample | 代码示例插件 | 
| directionality | 文字方向 | 
| fullpage | 文档属性 | 
| fullpage | 全屏 | 
| help | 帮助 | 
| hr | 水平分割线 | 
| importcss | 将class加入”格式“下拉菜单中 |
| legacyoutput | 输出html4 |
| link | 超链接 |
| noneditable | 不可编辑元素 |
| pagebreak | 插入分页符 |
| print | 打印 |
| preview | 预览 |
| save | 保存提交按钮 |
| searchreplace | 查找替换 |
| tabfocus | tab 切入切出 |
| template | 内容模板 |
| textpattern | 快速排版 |
| toc | 目录生成器 |
| visualblocks | 显示块元素范围 |
| visualchars | 显示不可见字符 |
| wordcount | 字数统计插件 |

### Events
| 事件名称 | 说明 | 回调参数  |
| ----| ----| --- | 
| on-click | 聚焦事件| function(e,tinymce)  包含事件对象，以及富文本本身| 

### Function
| 方法名 | 说明 | 参数  |
| ----| ----| --- | 
| initialize | 初始化富文本 | — |  
| update | 强制更新富文本 | — |  
| clear | 清空富文本的值 | — |  

### 参考
更多的内容参考[tinymce官方文档](http://tinymce.ax-z.cn/plugins/charmap.php)

> 按住ctrl再点击链接，通过新窗口打开文档。
