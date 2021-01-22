export const richText = {
    props: {
      init: {
        height: 327,
        max_height: 500,
        min_height: 327,
        ax_wordlimit_num: 1000,
        paste_data_images: true,
        plugins: ['wordcount', 'ax_wordlimit', 'help']
      }
    }
  }
  
  export const richTextPropsForm = {
    props: {
      init: {
        isGroup: true,
        configName: '富文本初始对象配置',
        plugins: {
          configName: '',
          component: 'ue-select',
          type: 'Array',
          multiple: true,
          clearable: true,
          mode: 'dialog',
          btnLabel: '选择plugins',
          selections: [
            { value: 'ax_wordlimit', label: '字数限制' },
            { value: 'lists', label: '列表插件' },
            { value: 'image', label: '插入上传图片插件' },
            { value: 'media', label: '插入视频插件' },
            { value: 'table', label: '插入表格插件' },
            { value: 'anchor', label: '锚点插件' },
            { value: 'autolink', label: '自动创建超链接' },
            { value: 'autosave', label: '自动存稿' },
            { value: 'bbcode', label: 'BBCode的输入输出功能' },
            { value: 'code', label: 'BBCode的输入输出功能' },
            { value: 'charmap', label: '自定义特殊字符' },
            { value: 'codesample', label: '代码示例插件' },
            { value: 'directionality', label: '文字方向' },
            // { value: 'fullpage', label: '文档属性' },
            { value: 'fullpage', label: '全屏' },
            { value: 'help', label: '帮助' },
            { value: 'hr', label: '水平分割线' },
            { value: 'importcss', label: '将class加入“格式”下拉菜单中 ' },
            { value: 'legacyoutput', label: '输出html4 ' },
            { value: 'link', label: '超链接 ' },
            { value: 'noneditable', label: '不可编辑元素 ' },
            { value: 'pagebreak', label: '插入分页符 ' },
            { value: 'print', label: '打印 ' },
            { value: 'preview', label: '预览 ' },
            { value: 'save', label: '保存提交按钮 ' },
            { value: 'searchreplace', label: '查找替换 ' },
            { value: 'tabfocus', label: 'tab 切入切出 ' },
            { value: 'template', label: '内容模板 ' },
            { value: 'textpattern', label: '快速排版 ' },
            { value: 'toc', label: '目录生成器 ' },
            { value: 'visualblocks', label: '显示块元素范围 ' },
            { value: 'visualchars', label: '显示不可见字符 ' },
            { value: 'wordcount', label: '字数统计插件 ' }
          ]
        },
        ax_wordlimit_num: {
          configName: '最大字数',
          component: 'ue-input',
          type: 'Number',
          min: 0,
          max: 999999
        },
        paste_data_images: {
          configName: '是否允许粘贴图像',
          component: 'ue-switch',
          type: 'Boolean'
        },
        height: {
          configName: '富文本高度',
          component: 'ue-input',
          type: 'Number',
          min: 0,
          max: 99999
        },
        min_height: {
          configName: '富文本最小高度',
          component: 'ue-input',
          type: 'Number',
          min: 0,
          max: 99999
        },
        max_height: {
          configName: '富文本最大高度',
          component: 'ue-input',
          type: 'Number',
          min: 0,
          max: 99999
        }
      }
    }
  }