import _ from 'lodash'

export default function({ formItemConfigs, global }) {
  const { size, globalStatus } = global.common
  // console.log('p p', formItemConfigs, size, 12)
  const vuePageConfig = { tabsDic: [], pageCodes: [], formData: [], formRules: [], formItemOptionsDic: [] }
  if (formItemConfigs.length === 1 && formItemConfigs[0].comp === 'fd-dialog') {
    visitFormItem(formItemConfigs[0].children[0].comps, 3, vuePageConfig, { globalSize: size, globalStatus })
    return generateFormDialog(formItemConfigs[0].props, global.common, vuePageConfig)
  } else {
    visitFormItem(formItemConfigs, 4, vuePageConfig, { globalSize: size, globalStatus })
    return generateCommomFormPage(global.common, vuePageConfig)
  }
}

// 返回普通表单页面
function generateCommomFormPage(globalCommon, vuePageConfig) {
  // labelPosition, labelWidth, globalStatus, tabsDic, pageCodes, formData, formRules, formItemOptionsDic
  const { globalStatus, labelPosition, labelWidth, size } = globalCommon
  const { tabsDic, pageCodes, formData, formRules, formItemOptionsDic } = vuePageConfig
  return '<template>' +
'\n  <div class="form-page">' +
'\n    <el-card class="form" shadow="never">' +
`\n      <el-form ref="form" :model="formData" :rules="formRules" label-position="${labelPosition}" label-width="${labelWidth}px"> ` +
pageCodes.join('') +
'\n      </el-form>' +
'\n    </el-card>' +
'\n    <el-card shadow="never" class="form-btn-wrapper">' +
'\n      <div class="form-foot-btns">' +
'\n        <el-button size="small" type="primary" @click="handleSubmit">Submit</el-button>' +
'\n        <el-button size="small" @click="handleReset" style="margin-left: 8px">Reset</el-button>' +
'\n      </div>' +
'\n    </el-card>' +
'\n  </div>' +
'\n</template>\n' +
'\n<script>' +
`\nimport formCompsMixin from '@/core/mixins/comps'${''}\n` +
'\nexport default {' +
'\n  mixins: [formCompsMixin],' +
'\n  data () {' +
'\n    return {' +
`\n      globalStatus: '${globalStatus}',` +
`\n      globalSize: '${size}',` +
`\n      formRules: {${formRules.length > 0 ? `${formRules.join(',')}\n      ` : ''}},` +
`\n      formData: {${formData.join(',')}\n      },` +
`${tabsDic.length > 0 ? `\n      tabsDic: {${tabsDic.join(',')}\n      },` : ''}` +
`${formItemOptionsDic.length > 0 ? `\n      formItemOptionsDic: {${formItemOptionsDic.join(',')}\n      },` : ''}` +
'\n    }' +
'\n  },' +
'\n  methods: {' +
'\n    handleSubmit () { this.$refs.form.validate(valid => {}) },' +
'\n    handleReset () { this.$refs.form.resetFields() },' +
'\n    validate (callback) {' +
'\n      this.$refs.form.validate(valid => callback(valid))' +
'\n    }' +
'\n  }' +
'\n}' +
'\n</script>\n'
}

// 对话框表单页
function generateFormDialog(dialogProps, globalCommon, vuePageConfig) {
  const { globalStatus, labelPosition, labelWidth, size } = globalCommon
  const { tabsDic, pageCodes, formData, formRules, formItemOptionsDic } = vuePageConfig
  return '<template>' +
  `\n  <fd-dialog ${parseProps(dialogProps)} @open-dialog="handleOpenDialog" @close-dialog="handleCloseDialog">` +
  `\n    <el-form ref="form" :model="formData" :rules="formRules" label-position="${labelPosition}" label-width="${labelWidth}px"> ` +
  pageCodes.join('') +
  '\n    </el-form>' +
  '\n    <div slot="footer">' +
  '\n      <el-button size="small" type="primary" @click="handleSubmit">Submit</el-button>' +
  '\n      <el-button size="small" style="margin-left: 8px" @click="handleReset">Reset</el-button>' +
  '\n    </div>' +
  '\n  </fd-dialog>' +
  '\n</template>\n' +
  '\n<script>' +
  `\nimport formCompsMixin from '@/core/mixins/comps'${''}\n` +
  '\nexport default {' +
  '\n  mixins: [formCompsMixin],' +
  '\n  data () {' +
  '\n    return {' +
  `\n      globalStatus: '${globalStatus}',` +
  `\n      globalSize: '${size}',` +
  `\n      formRules: {${formRules.length > 0 ? `${formRules.join(',')}\n      ` : ''}},` +
  `\n      formData: {${formData.join(',')}\n      },` +
  `${tabsDic.length > 0 ? `\n      tabsDic: {${tabsDic.join(',')}\n      },` : ''}` +
  `${formItemOptionsDic.length > 0 ? `\n      formItemOptionsDic: {${formItemOptionsDic.join(',')}\n      },` : ''}` +
  '\n    }' +
  '\n  },' +
  '\n  methods: {' +
  '\n    handleSubmit() { this.$refs.form.validate(valid => {}) },' +
  '\n    handleReset() { this.$refs.form.resetFields() },' +
  '\n    validate(callback) {' +
  '\n      this.$refs.form.validate(valid => callback(valid))' +
  '\n    },' +
  '\n    handleOpenDialog() {},' +
  '\n    handleCloseDialog() {' +
  '\n      this.$refs.form.resetFields()' +
  '\n    }' +
  '\n  }' +
  '\n}' +
  '\n</script>\n'
}

const visitFormItem = (formItemList, level, parentConfig, globalConfig) => {
  const { tabsDic, pageCodes, formData, formRules, formItemOptionsDic } = parentConfig
  const currentIndents = getIndents(level)
  formItemList.forEach(formItem => {
    /**
     * comp: 组件类型
     * category 组件类型 layout 布局组件
     * props 当前组件的属性
     * elFormItem 表单属性配置
     */
    if (formItem.category === 'layout') {
      /**
       * children 子组件配置
       */
      const { children, props, key } = formItem
      const propStr = parseProps(props)
      // 当前布局组件下的代码
      const currentLayoutComps = []
      if (formItem.comp === 'el-tabs') {
        currentLayoutComps.push(`\n${currentIndents}<el-tabs v-model="tabsDic.${key}" ${propStr}>`)
        if (children.length > 0) {
          tabsDic.push(`\n${getIndents(4)}${key}: '${children[0].props.name}'`)
        } else {
          tabsDic.push(`\n${getIndents(4)}${key}: ''`)
        }
      } else {
        currentLayoutComps.push(`\n${currentIndents}<${formItem.comp} ${propStr}>`)
      }
      children.forEach((childComp, idx) => {
        /**
         * 子组件配置
         */
        const { comps } = childComp
        const childCodeArr = [`\n${getIndents(level + 1)}<${childComp.comp} ${parseProps(childComp.props)}>`]
        const child = {
          tabsDic: [], pageCodes: [], formData: [], formRules: [], formItemOptionsDic: []
        }
        /**
         * 递归解析当前子布局组件下的所有组件
         */
        visitFormItem(comps, level + 2, child, globalConfig)
        /**
         * 子组件中有el-tab页
         * 子组件中的表单项
         * 子组件中的表单必填项
         * formItemOptionsDic 可选项对应
         */
        const parentNotNullKeys = ['tabsDic', 'formData', 'formRules', 'formItemOptionsDic']
        parentNotNullKeys.forEach(key => {
          if (child[key].length > 0) {
            parentConfig[key].push(child[key].join(','))
          }
        })
        childCodeArr.push(child.pageCodes.join(''))
        childCodeArr.push(`\n${getIndents(level + 1)}</${childComp.comp}>`)
        currentLayoutComps.push(childCodeArr.join(''))
      })
      currentLayoutComps.push(`\n${currentIndents}</${formItem.comp}>`)
      // 拼接到父组件的代码数组中去
      pageCodes.push(currentLayoutComps.join(''))
    } else if (formItem.category === 'input') {
      /**
       * 非布局组件 字段名称
       * diyValidator 自定义校验函数
       */
      const { status } = formItem.common || {}
      const { fieldName, isRequired, formItemLabel, defaultValue, size, labelWidth } = formItem.elFormItem || {}
      if (fieldName) {
        const v = getEmpytValue(formItem.props)
        formData.push(`\n${getIndents(4)}${fieldName}: ${parseObjectToString(defaultValue || v)}`)
        if (isRequired) {
          const trigger = _.isArray(v) || formItem.triggerUseChange ? 'change' : 'blur'
          const ruleStr = `\n${getIndents(4)}${fieldName}: [` +
          `\n${getIndents(5)}{ required: true, message: '${formItemLabel}不能为空!', trigger: '${trigger}' }` +
          `\n${getIndents(4)}]`
          formRules.push(ruleStr)
        } else {
          // formRules.push(`\n${getIndents(4)}${fieldName}: []`)
        }
        // form-item 组件属性
        const formItemProps = {
          label: formItemLabel,
          prop: fieldName
        }
        if (labelWidth) {
          formItemProps.labelWidth = `${labelWidth}px`
        } else {
          if (!formItemLabel) {
            formItemProps.labelWidth = '0'
          }
        }
        const curInputFormItemCodeArr = [`\n${getIndents(level)}<el-form-item style="width: 100%" ${parseProps(formItemProps)}>`]
        if (formItemLabel) {
          curInputFormItemCodeArr.push(`\n${getIndents(level + 1)}<span class="diy-el-item-label" slot="label">${formItemLabel}</span>`)
        }
        // 组件的props
        const inputCompProps = {
          ...formItem.props,
          size,
          status
        }
        let statusStr = ''
        if (!inputCompProps.status) {
          delete inputCompProps.status
          statusStr = ' :status="globalStatus"'
        }
        let sizeStr = ''
        if (!inputCompProps.size) {
          delete inputCompProps.size
          sizeStr = ' :size="globalSize"'
        }
        // 解析带可选项的组件的选项
        let selectionsStr = ''
        if (formItem.props && formItem.props.selections) {
          selectionsStr = ` :selections="formItemOptionsDic.${fieldName}"`
          const selections = formItem.props.selections
          if (selections.length > 0) {
            formItemOptionsDic.push(`\n${getIndents(4)}${fieldName}: [` + `${parseSelections(selections, 5)}` +
              `\n${getIndents(4)}]`)
          }
        }
        curInputFormItemCodeArr.push(`\n${getIndents(level + 1)}<${formItem.comp} v-model${formItem.comp === 'fd-input' ? '.trim' : ''}="formData.${fieldName}"${selectionsStr}${statusStr}${sizeStr} ${parseProps(inputCompProps)}>`)
        // 可以在这里设置options
        curInputFormItemCodeArr.push(`</${formItem.comp}>`)
        curInputFormItemCodeArr.push(`\n${getIndents(level)}</el-form-item>`)
        pageCodes.push(curInputFormItemCodeArr.join(''))
      }
    } else {
      // 其他类型的组件
      pageCodes.push(`\n${getIndents(level)}<${formItem.comp} ${parseProps(formItem.props)}/>`)
    }
  })
}

// 解析输入组件的选项
function parseSelections(selections, indents) {
  const selectionsStr = []
  _.forEach(selections, (item) => {
    if (_.isArray(item)) {
      const arr = []
      item.forEach(v => {
        arr.push(parseObjectToStringWithIndents(v, indents))
      })
      selectionsStr.push(`[${arr.join(',')}]`)
    } else if (_.isObject(item)) {
      selectionsStr.push(`${parseObjectToStringWithIndents(item, indents)}`)
    }
  })
  return selectionsStr.join(',')
}

function parseObjectToStringWithIndents(obj, indents) {
  if (_.isArray(obj)) {
    const arr = []
    obj.forEach(v => {
      arr.push(`${parseObjectToStringWithIndents(v, indents + 1)}`)
    })
    return ` [${arr.join(',')}\n${getIndents(indents)}]`
  } else if (_.isObject(obj)) {
    const arr = []
    Object.keys(obj).forEach(k => {
      const v = obj[k]
      arr.push(`\n${getIndents(indents + 1)}${k}: ${parseObjectToStringWithIndents(v, indents + 1)}`)
    })
    return `\n${getIndents(indents)}{${arr.join(',')}\n${getIndents(indents)}}`
  } else {
    if (_.isBoolean(obj) || _.isNumber(obj) || _.isNull(obj)) {
      return obj
    } else {
      return `'${obj}'`
    }
  }
}

const getIndents = (n) => {
  if (n > 0) {
    return new Array(n).fill('  ').join('')
  }
  return ''
}

/**
 * 当前项的空值
 * @param {*} props
 */
function getEmpytValue(props) {
  if (props.multiple) {
    return []
  } else {
    return null
  }
}

function parseProps(props) {
  const propsStrArr = []
  Object.keys(props).forEach(prop => {
    //  !== 'selections'
    if (prop !== 'selections') {
      const v = props[prop]
      if (_.isArray(v)) {
        const arr = []
        _.forEach(v, (item) => {
          arr.push(parseObjectToString(item))
        })
        propsStrArr.push(`:${prop}="[${arr.join(', ')}]"`)
      } else if (_.isObject(v)) {
        propsStrArr.push(`:${prop}="${parseObjectToString(v)}"`)
      } else if (_.isBoolean(v) || _.isNumber(v)) {
        propsStrArr.push(`:${prop}="${v}"`)
      } else {
        if (!_.isString(v) || v) {
          propsStrArr.push(`${prop}="${v}"`)
        }
      }
    }
  })
  return propsStrArr.join(' ')
}

/**
 * 不带缩进换行的对象解析
 * @param {*} obj
 */
function parseObjectToString(obj) {
  if (_.isArray(obj)) {
    const arr = []
    obj.forEach(v => {
      arr.push(`${parseObjectToString(v)}`)
    })
    return `[${arr.join(', ')}]`
  } else if (_.isObject(obj)) {
    const arr = []
    Object.keys(obj).forEach(k => {
      const v = obj[k]
      arr.push(`${k}: ${parseObjectToString(v)}`)
    })
    return `{ ${arr.join(', ')} }`
  } else {
    if (_.isBoolean(obj) || _.isNumber(obj) || _.isNull(obj)) {
      return obj
    } else {
      return `'${obj}'`
    }
  }
}
