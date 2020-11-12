import TreeNode from '../classes/TreeNode'
import { getPropertyDataFromNestObj } from '../../../lib/utils'
// 图表配置表单树构建器

// lodash zipObjectDeep
/**
 * 构建图表配置表单树 左孩子右兄弟
 * @param {*} formConfig
 */
export const chartConfigFormTreeBuilder = function (formConfig, rootKey) {
  //
  const root = new TreeNode({ key: rootKey || formConfig.rootKey || 'options', isRoot: true, commonGroup: formConfig.commonGroup }, null, null)
  // 递归访问配置对象构建二叉树（左节点是孩子节点 右节点是当前节点的兄弟节点）
  const obj = getPropertyDataFromNestObj(formConfig, rootKey || formConfig.rootKey || 'options')
  visitFormConfig(root, obj)
  return root
}

/**
 * 访问图表表单配置的所有节点，构建树
 * 例如:
 *  传入的 parentNodeConfig 对象是这样的 { isGroup: true, id: 'ct1', configName: 'xxx配置', title: { textStyle: {...} }, legend: {...} }
 * parentNodeConfig的configKeys数组就会是[ 'title', 'legend', 'id' ] 也就是当前对象的除isGroup configName commonGroup以外的字段名称，
 * 通过读取这些字段名称获取下一级配置比如 title配置对象 递归访问，构建二叉树
 * @param {*} root 当前子树的父节点
 * @param {*} parentNodeConfig 父节点节点的配置
 */
function visitFormConfig (root, parentNodeConfig) {
  if (!parentNodeConfig) {
    return
  }
  let configKeys = []
  if (parentNodeConfig.configKeys) {
    configKeys = parentNodeConfig.configKeys
  } else {
    // 将这些辅助字段过滤掉 减少树的层级结构
    configKeys = Object.keys(parentNodeConfig)
      .filter(key =>
        key !== 'isGroup' &&
        key !== 'configName' &&
        key !== 'commonGroup' &&
        key !== 'hideOther' &&
        key !== 'hideFunction' &&
        key !== 'disableOther' &&
        key !== 'disableFunction' &&
        key !== 'configTip' &&
        key !== 'wrapWithElCollapseItem' &&
        key !== 'needConfigKeysSelector' &&
        key !== 'configKeysSelector')
  }
  // const siblings = []
  // 上一个兄弟节点
  let lastSibling = null
  configKeys.forEach((key, index) => {
    // console.log(key, ' r ', parentNodeConfig[key])
    const value = parentNodeConfig[key]
    // 当前节点不需要配置 直接返回
    if (!value || value.cannotConfig) return null
    const data = {
      key,
      ...value
    }
    // 新建树节点
    const treeNode = new TreeNode(data, null, null)
    // 如果是配置组 即当前被isGroup标识的配置表单项是一个组，解析时只有这种类型的树节点会有child节点
    /**
     * title: {
     *  textAlign: '',
     *  text: ''
     * }
     * 它对应的图表配置表单 配置是
     * title: {
     *  isGroup: true,
     *  configName: '标题配置'
     *  textAlign: {
     *    type: 'String',
     *    component: 'ue-input',
     *    defaultValue: '未来一周气温变化',
     *    configName: '图表标题'
     *  },
     *  text: {
     *    type: 'String',
     *    component: 'ue-input',
     *    defaultValue: '',
     *    configName: '标题文本'
     *  }
     * }
     */
    if (value.isGroup || value.commonGroup) {
      visitFormConfig(treeNode, value)
    }
    // console.log('key ', key, ' data ', data)
    if (index === 0) {
      // configKeys的第一个字段将作为左侧孩子节点连接到parentNodeConfig的树节点的child字段
      root.child = treeNode
    } else {
      // configKeys的第二个字段
      lastSibling.sibling = treeNode
    }
    // 链表的最后一个节点，兄弟节点就像一个链表一样链接在一起
    // parentNodeConfig.child
    //                  -> id.sibling -> title.sibling -> legend
    //                                        .child -> textStyle
    lastSibling = treeNode
  })
}
