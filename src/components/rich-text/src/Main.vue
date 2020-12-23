<!--
 * @Author: yx
 * @Description: 根据第三方插件tinymce封装的富文本
 * @Date: 2020-10-16 
 -->
<template>
  <div class="eve-rich-text">
    <editor
      id="richText"
      ref="richText"
      v-model="myValue"
      :init="tempInit"
      :disabled="tempDisabled"
      @onClick="onClick"
      :key="key"
    >
    </editor>
  </div>
</template>
<script>
/* 引入富文本相关库*/
import tinymce from 'tinymce/tinymce' //tinymce默认hidden，不引入不显示
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
import 'tinymce/skins/ui/oxide/skin.css'//引入皮肤
import languageUrl from '../../../assets/tinymce/lang/zh_CN.js'
import '../../../assets/tinymce/plugins/ax_wordlimit/plugin.min.js' //字数限制
/* 富文本plugins */
import 'tinymce/icons/default/icons' //引入图标
import 'tinymce/plugins/image' // 插入上传图片插件
import 'tinymce/plugins/media' // 插入视频插件
import 'tinymce/plugins/table' // 插入表格插件
import 'tinymce/plugins/lists' // 列表插件
import 'tinymce/plugins/anchor' //锚点插件
import 'tinymce/plugins/autolink' //自动创建超链接
import 'tinymce/plugins/autoresize' //自动调整Tinymce大小以适应内容
import 'tinymce/plugins/autosave' //自动存稿
import 'tinymce/plugins/bbcode' //为TinyMCE添加基于BBCode的输入输出功能。
import 'tinymce/plugins/code' //为TinyMCE添加基于BBCode的输入输出功能。
import 'tinymce/plugins/charmap' //特殊字符插件。
import 'tinymce/plugins/codesample' //代码示例插件
import 'tinymce/plugins/directionality' //文字方向
// import "tinymce/plugins/emoticons"; //可在内容区插入unicode字符表情。--没有表情会报错
import 'tinymce/plugins/fullpage' //文档属性
import 'tinymce/plugins/fullscreen' //全屏
import 'tinymce/plugins/help' //帮助
import 'tinymce/plugins/hr' //水平分割线
import 'tinymce/plugins/importcss' //将class加入”格式“下拉菜单中
import 'tinymce/plugins/insertdatetime' //插入当前日期时间
import 'tinymce/plugins/legacyoutput' //输出html4
import 'tinymce/plugins/link' //超链接
import 'tinymce/plugins/nonbreaking' //插入不间断的空格
import 'tinymce/plugins/noneditable' //不可编辑元素
import 'tinymce/plugins/pagebreak' //插入分页符
import 'tinymce/plugins/paste' //粘贴插件
import 'tinymce/plugins/preview' //预览
import 'tinymce/plugins/print' //打印
// import 'tinymce/plugins/quickbars' //快速工具栏--可漂浮的工具栏
import 'tinymce/plugins/save' //保存提交按钮
import 'tinymce/plugins/searchreplace' //查找替换
//import "tinymce/plugins/spellchecker"; //拼写检查
import 'tinymce/plugins/tabfocus' //tab 切入切出
import 'tinymce/plugins/template' //内容模板
import 'tinymce/plugins/textpattern' //快速排版
import 'tinymce/plugins/toc' //目录生成器
import 'tinymce/plugins/visualblocks' //显示块元素范围
import 'tinymce/plugins/visualchars' //显示不可见字符
import 'tinymce/plugins/wordcount' //字数统计插件
//http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4 视频测试地址
export default {
  components: {
    Editor
  },
  name: 'EveRichText',
  //双向绑定
  model: {
    prop: 'value', //要存在于props
    event: 'change' //当组件的值发生改变时要emit的事件名
  },
  props: {
    //富文本的值
    value: {
      type: String,
      default: ''
    },
    //是否禁用
    disabled: {
      type: Boolean,
      default: false
    },

    //初始化
    init: {
      type: Object,
      default: () => { }
    }
  },

  data () {
    return {
      //默认初始化
      tempInit: {
        selector: 'richText',
        auto_focus: true,
        //语言插件地址
        language_url: languageUrl,
        //语言   
        language: 'zh_CN',
        // //皮肤地址
        // skin_url: this.skinUrl,
        // skin_url: 'tinymce/skins/ui/oxide-dark',//暗色系
        //高度
        height: 300,
        //使用的插件
        plugins: ['wordcount', 'ax_wordlimit', 'help'],
        //工具栏展示的插件
        toolbar: 'undo redo | formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat | anchor | restoredraft | code | charmap | codesample | ltr rtl  | fullpage | fullscreen | help | hr | image  | insertdatetime | link | nonbreaking | pagebreak | paste | preview | print | save | searchreplace | template | toc | visualblocks | visualchars | wordcount',
        // 去水印
        branding: false,
        // 允许粘贴图像
        paste_data_images: true,
        //媒体实时预览开关
        media_live_embeds: true,
        //是否隐藏最上方menu
        menubar: false,
        // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        images_upload_handler: (blobInfo, success) => {
          console.log(blobInfo, success, 111)
          const img = 'data:image/jpeg;base64,' + blobInfo.base64()
          success(img)
        },
        video_template_callback: function (data) {
          return '<span class="mce-preview-object mce-object-video" contenteditable="false" data-mce-object="video" data-mce-p-allowfullscreen="allowfullscreen" data-mce-p-frameborder="no" data-mce-p-scrolling="no" data-mce-p-src=' + data.source + ' data-mce-p-width=' + data.width + ' data-mce-p-height=' + data.height + ' data-mce-p-controls="controls" data-mce-html="%20"> <video width=' + data.width + ' height=' + data.height + ' controls="controls"> <source src=' + data.source + ' type=' + data.sourcemime + '></source> </video> </span>'
        },
        //限定编辑器的最小高度。
        min_height: 327,
        //限定编辑器的最大高度，当内容不断增长达到此高度时，编辑器将停止增加高度。
        max_height: 500,
        //当内容无变化时禁用保存按钮,当有变化时，保存按钮变为可点击状态。
        save_enablewhendirty: true,
        //保存回调函数
        save_onsavecallback: function () {
          console.log('已保存')
        },
        //该插件实现了自定义内容模板。
        templates: [
          {
            title: 'Some title 1',
            description: 'Some desc 1',
            content: 'My content'
          },
          {
            title: 'Some title 2',
            description: 'Some desc 2',
            url: 'print.php'
          }
        ],
        // 快速排版（类似markdown）
        textpattern_patterns: [
          { start: '*', end: '*', format: 'italic' },
          { start: '**', end: '**', format: 'bold' },
          { start: '#', format: 'h1' },
          { start: '##', format: 'h2' },
          { start: '###', format: 'h3' },
          { start: '####', format: 'h4' },
          { start: '#####', format: 'h5' },
          { start: '######', format: 'h6' },
          { start: '1. ', cmd: 'InsertOrderedList' },
          { start: '* ', cmd: 'InsertUnorderedList' },
          { start: '- ', cmd: 'InsertUnorderedList' }
        ],
        //自定义该窗口中可选的特殊字符。
        charmap: [
          [0x2615, 'morning coffee'],
          [0x2600, 'sun'],
          [0x2601, 'cloud']
        ],
        //字数限制最大值
        ax_wordlimit_num: 40,
        //字数限制的回调
        ax_wordlimit_callback: (editor, txt, num) => {
          const str = txt.substr(0, num)
          this.myValue = ''
          this.$message.error(`当前字数${txt.length}，已超过最大限制字数${num}`)
          this.tempDisabled = true
          setTimeout(() => {
            this.tempDisabled = false
            tinymce.execCommand('mceInsertContent', false, str)
            this.$emit('update:value', this.myValue)
            this.$emit('update:disabled', this.tempDisabled)
          }, 0)
        }
      },
      myValue: this.value, //富文本的值
      tempDisabled: false, //禁用(内部用)
      key: 0
    }
  },

  mounted () {
    this.initialize()
  },

  methods: {

    /**@description  聚焦事件
     * @author yx
     * @param  {Object}  e 事件对象
     */
    onClick (e) {
      console.log(e, tinymce, 11)
      this.$emit('on-click', e, tinymce)
    },
    /**@description  清空内容
       * @author yx
       */
    clear () {
      this.myValue = ''
    },

    /**@description 设置初始化
     * @author yx
    */
    initialize () {
      tinymce.init({})
      this.$nextTick(() => {
        setTimeout(() => {
          document.getElementsByClassName('tox-statusbar__wordcount')[0].click()
        }, 300)
      })
    },


    /**@description 更新
    * @author yx
    */
    update () {
      this.key++
    },

    /**@description 深拷贝
    * @author yx
    */
    deepClone (obj) {
      /* eslint-disable*/
      //判断拷贝的要进行深拷贝的是数组还是对象，是数组的话进行数组拷贝，对象的话进行对象拷贝
      const objClone = Array.isArray(obj) ? [] : {}
      //进行深拷贝的不能为空，并且是对象或者是
      if (obj && typeof obj === 'object') {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (obj[key] && typeof obj[key] === 'object') {
              objClone[key] = this.deepClone(obj[key])
            } else {
              objClone[key] = obj[key]
            }
          }
        }
      }
      return objClone
    },

    /**@description 设置属性和状态
        * @param  {Object}  obj 源对象
        * @param  {Object}  param 属性
        * @author yx 
     */
    setProperty (obj, param) {
      if (param instanceof Array) {
        param.forEach(element => {
          this.setProperty(obj, element)
        });
      } else {
        Object.defineProperty(obj, param, {
          configurable: false, //不可删除
          writable: false //不可修改
        })
      }
    }
  },

  watch: {
    //父修改-子接收
    value (newValue) {
      this.myValue = newValue
    },
    //子修改-父接收
    myValue (newValue) {
      //获取值
      this.$emit('change', newValue)
    },

    //初始化
    init: {
      handler (newValue) {
        this.$nextTick(() => {
          const init = this.deepClone(newValue)
          this.setProperty(this.tempInit, [
            'selector',
          ])
          const { plugins } = this.tempInit
          Object.assign(this.tempInit, init)
          this.tempInit.plugins.push(...plugins)
          this.update()
        })
      },
      immediate: true,
      deep: true
    },

    //是否禁用
    disabled: {
      handler (newValue) {
        this.tempDisabled = newValue
      },
      immediate: true
    }
  }
}
</script>
<style lang='scss' scoped></style>