/**
 * 树节点对象
 */
export default class TreeNode {
  /**
   * 数据
   * 左孩子
   * 右兄弟
   */
  constructor (data, child, sibling) {
    this.data = data
    this.child = child
    this.sibling = sibling
  }
}

/**
 * 前序遍历 callback 的参数当前树节点 孩子还是兄弟的标识（child/sibling）父节点
 * @param {*} tree
 * @param {*} callback
 */
export const preOrderVisit = (treeNode, callback, childOrSibling, parent) => {
  if (!treeNode) return
  /**
     * @treeNode 树节点
     * @childOrSibling child sibling
     * @parent 父节点
     */
  callback(treeNode, childOrSibling, parent)
  preOrderVisit(treeNode.child, callback, 'child', treeNode)
  preOrderVisit(treeNode.sibling, callback, 'sibling', treeNode)
}

/**
   * 中序遍历
   * @param {*} tree
   * @param {*} callback
   */
export const orderVisit = (treeNode, callback, childOrSibling, parent) => {
  if (!treeNode) return
  orderVisit(treeNode.child, callback, 'child', treeNode)
  callback(treeNode, childOrSibling, parent)
  orderVisit(treeNode.sibling, callback, 'sibling', treeNode)
}

/**
   * 后序遍历
   * @param {*} treeNode
   * @param {*} callback
   * @param {*} childOrSibling
   */
export const postOrderVisit = (treeNode, callback, childOrSibling, parent) => {
  if (!treeNode) return
  postOrderVisit(treeNode.child, callback, 'child', treeNode)
  postOrderVisit(treeNode.sibling, callback, 'sibling', treeNode)
  callback(treeNode, childOrSibling, parent)
}
