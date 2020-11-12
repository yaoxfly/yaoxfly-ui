import parsers from './component-parsers'

/**
 * 构建图表配置表单，前序遍历
 * @param {*} treeNode 子树的根节点
 * @param {*} parentKey 字段parentKey 上一级的key值 options.key
 * @param {*} form 表单对象
 * @param {*} activeNames el-collapse 折叠面板全部打开的配置
 * @param {*} curChartConfig 当前图表的配置数据 设置初始值
 * @param {*} configKeysSelectorValueDic 例如系列 需要通过一个下拉框来确定配置哪个系列的控制对象
 */
export const buildChartForm = (treeNode, parentKey, form, activeNames, curChartConfig, configKeysSelectorValueDic) => {
  if (!treeNode || !curChartConfig) {
    // console.log(parentKey, { curChartConfig })
    return
  }
  const { data, child, sibling } = treeNode
  const { isRoot, wrapWithElCollapseItem, needConfigKeysSelector, configKeys } = data
  // 如果有子节点
  if (child) {
    if (!isRoot) {
      const activeName = parentKey + '.' + data.key
      activeNames.push(activeName)
      if (needConfigKeysSelector && configKeys) {
        // 有值的话默认显示第一个
        configKeysSelectorValueDic[activeName] = configKeys.length > 0 ? configKeys[0] : ''
      }
    }
    /**
     * 1. 比如title有孩子节点,上一级的传入的parentKey是'options', 她传给下一级节点parentKey就是 options.title
     * 2. 如果是根节点（isRoot: true） parentKey传进来的是undefined或者null或者''
     *  因此根节点不需要拼接 否则会出现 undefined.title.textAlign这种东西
     */
    buildChartForm(child, isRoot ? data.key : parentKey + '.' + data.key, form, activeNames, curChartConfig[data.key], configKeysSelectorValueDic)
  } else {
    // wrapWithElCollapseItem 标识当前输入项是否需要包一层折叠框
    if (wrapWithElCollapseItem) {
      activeNames.push(parentKey + '.' + data.key)
    }
    /**
     * options: {
     *  title: {
     *    show: false,
     *    text: "",
     *    left: 'left',
     *    top: 'top',
     *    textStyle: {
     *      fontSize: 18,
     *      color: "#333"
     *    }
     *  },
     * legend: {...}
     * }
     */
    // 没有子节点表示当前节点已经定位到了配置项如 options.title.textStyle.color 可以给他设置初始值
    form[parentKey + '.' + data.key] = curChartConfig[data.key]
  }
  /**
   * 访问兄弟节点
   * 兄弟节点与当前节点在配置文件下属于同一层级, title与legend,
   * 因此当访问title的兄弟节点legend时传入的parentKey还是'options'
   */
  buildChartForm(sibling, parentKey, form, activeNames, curChartConfig, configKeysSelectorValueDic)
}

/**
 * 生成图表配置页表单
 * @param {*} h 页面渲染函数
 * @param {*} instance 页面实例
 */
export const buildReder = (h, instance, formTree, useDiv) => {
  return h(useDiv ? 'div' : 'el-form', {
    props: {
      model: instance.form,
      labelPosition: instance.labelPosition || 'left'
    }
  }, buildFormRender(h, instance, formTree, ''))
}

/**
 * 构建图表配置表单渲染函数，后序遍历
 * @param {*} h 渲染函数构造器
 * @param {*} instance 页面实例
 * @param {*} treeNode 当前树节点
 * @param {*} parentKey 父节点key值
 * @param {*} doesParentNeedConfigKeysSelector 父节点需要根据一个选择框来显示当前要修改的configKey对应的属性，例如多系列，根据一个选择框来确定当前配置的是哪个系列
 */
const buildFormRender = (h, instance, treeNode, parentKey, doesParentNeedConfigKeysSelector) => {
  const labelWidth = instance.labelWidth
  if (!treeNode) return []
  // 获取树节点结构数据
  const { data, child, sibling } = treeNode
  // 对于render函数来说，data就是vue虚拟节点的配置数据
  const vueNodeConfig = data
  const {
    isRoot,
    commonGroup,
    configName,
    configTip,
    wrapWithElCollapseItem,
    needConfigKeysSelector,
    // 组件样式
    marginBottom,
    component
  } = vueNodeConfig
  // 当前render函数的key值，就是表单的字段名称
  const formPropertyName = isRoot ? vueNodeConfig.key : parentKey + '.' + vueNodeConfig.key
  // 访问孩子节点 如果是根节点（isRoot: true） parentparentKey传进来的是undefined或者null或者''
  const childNodeRenderArr = buildFormRender(h, instance, child, formPropertyName, needConfigKeysSelector)
  // 访问兄弟节点 兄弟节点与当前节点在配置文件下属于同一层级 parentKey不需要拼接
  const siblingNodeRenderArr = buildFormRender(h, instance, sibling, parentKey, doesParentNeedConfigKeysSelector)
  // 当前节点构造成的渲染函数
  let vueNodeRender = null
  if (child) {
    if (isRoot) {
      // 折叠面板
      vueNodeRender = h(commonGroup ? 'ue-common-group' : 'el-collapse', {
        props: {
          value: instance.activeNames
        }
      }, [childNodeRenderArr])
    } else {
      const childrenArr = []
      // 普通组 不放在折叠面板里
      if (commonGroup && configName) {
        // 标题放在插槽中
        childrenArr.push(
          h('el-divider', {
              props: {
                contentPosition: 'left'
              },
              class: 'title',
              slot: 'title' 
            }, configName)
        )
        // <el-divider content-position="left">少年包青天</el-divider>
      }
      const vueNodeRenderChildren = []
      if (needConfigKeysSelector) {
        vueNodeRenderChildren.push(configKeysSelectorBuilder(h, vueNodeConfig, instance, formPropertyName))
      }
      // 非commonGroup使用element的普通折叠面板子项组件 el-collapse-item
      vueNodeRender = h(commonGroup ? 'ue-common-group' : 'el-collapse-item', {
        props: {
          title: configName,
          name: formPropertyName
        },
        style: {
          marginBottom: marginBottom
        }
        // 子节点放在默认插槽中 h('span', configTip),
      }, vueNodeRenderChildren.concat([...childrenArr, ...childNodeRenderArr]))
    }
  } else {
    const elFormItemRenderConfig = {
      props: {
        // labelWidth: '0'
      },
      style: {
        marginBottom
      }
    }
    const notElFormItemComps = {
      // 不需要在外面包裹el-form-item的组件
      'ue-chart-text-format-editor': true
    }
    if (configName && !notElFormItemComps[component]) {
      if (configName.length <= 6) {
        elFormItemRenderConfig.props.labelWidth = configName ? labelWidth : '0'
        if (!wrapWithElCollapseItem) {
          // 要折叠框的话就不能设置 elFormItem的 label属性
          elFormItemRenderConfig.props.label = configName
        }
        vueNodeRender = h('el-form-item', elFormItemRenderConfig, [
          parseComponent(h, instance, vueNodeConfig, formPropertyName, parentKey)
        ])
      } else {
        // label configName超长 换行
        vueNodeRender = h('div', [
          h('div', {
            class: 'el-form-item__label'
          }, configName),
          h('el-form-item', elFormItemRenderConfig, [
            parseComponent(h, instance, vueNodeConfig, formPropertyName, parentKey)
          ])
        ])
      }
    } else {
      if (notElFormItemComps[component]) {
        elFormItemRenderConfig.props.labelWidth = labelWidth
      }
      vueNodeRender = h(notElFormItemComps[component] ? 'div' : 'el-form-item', elFormItemRenderConfig, [
        parseComponent(h, instance, vueNodeConfig, formPropertyName, parentKey)
      ])
    }
    if (wrapWithElCollapseItem) {
      const titleChildren = [h('span', configName)]
      let configTipRender = null
      if (configTip) {
        configTipRender = h('div', { style: { padding: '0 10px' } }, configTip)
      }
      const titleRender = h('div', { slot: 'title' }, titleChildren)
      // 是否要再包一层折叠框，颜色列表需要
      vueNodeRender = h('el-collapse-item', {
        props: {
          // title: configName,
          name: formPropertyName
        },
        style: {
          marginTop: '15px'
        }
        // 除非指定slot否则子节点会放在默认插槽中
      }, [titleRender, configTipRender, vueNodeRender])
    }
  }
  // 是否要隐藏当前项,隐藏当前项但必须显示兄弟节点
  if (instance.hide[formPropertyName] || instance.dontShow[formPropertyName]) {
    return siblingNodeRenderArr || []
  }
  if (doesParentNeedConfigKeysSelector) {
    // 比如说系列，根据所选系列设置哪个系列
    const curSelect = instance.configKeysSelectorValueDic[parentKey]
    if (formPropertyName === parentKey + '.' + curSelect || formPropertyName === curSelect) {
      return [vueNodeRender].concat(siblingNodeRenderArr || [])
    } else {
      return siblingNodeRenderArr || []
    }
  } else {
    // 兄弟节点放在当前节点的后面
    return [vueNodeRender].concat(siblingNodeRenderArr || [])
  }
}

/**
 * 解析输入组件
 * @param {*} h
 * @param {*} instance
 * @param {*} vueNodeConfig 节点配置
 * @param {*} formPropertyName 表单字段名称
 * @param {*} parentKey 父节点key值
 */
function parseComponent (h, instance, vueNodeConfig, formPropertyName, parentKey) {
  if (!vueNodeConfig.component) return null
  const parser = parsers[vueNodeConfig.component]
  if (!parser) {
    return h('div', { style: { color: 'red' } }, '赶紧写解析啊' + vueNodeConfig.component)
  } else {
    return parser(h, instance, vueNodeConfig, formPropertyName, parentKey)
  }
}
// const { props, updateEvts } = parseProps(formItem, componentProps, instance)

/**
 *
 * @param {*} h
 * @param {*} vueNodeConfig 当前配置
 * @param {*} instance 页面实例
 * @param {*} formPropertyName 当前属性key
 */
function configKeysSelectorBuilder (h, vueNodeConfig, instance, formPropertyName) {
  const { configKeysSelector, configKeys } = vueNodeConfig
  return h('el-form-item', [
    h('div', { style: { marginBottom: '-5px' }, slot: 'label' }, configKeysSelector),
    h('ue-select', {
      props: {
        value: instance.configKeysSelectorValueDic[formPropertyName],
        selections: configKeys.map(key => {
          return {
            label: vueNodeConfig[key].configName,
            value: key
          }
        })
      },
      on: {
        input: (value) => {
          instance.setSelectedConfigKey(formPropertyName, value)
        }
      }
    })
  ])
}
