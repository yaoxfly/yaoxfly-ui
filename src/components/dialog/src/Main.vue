<!--
* @Author: yx
* @Description: 对话框
* @Date: 2020-09-27
-->
<template>
  <div class="eve-dialog">
    <el-dialog
      v-el-drag-dialog="isDrag"
      class="eve-dialog__scroll"
      :visible.sync="isShow"
      :modal="modal"
      :top="top"
      :show-close="showClose"
      :close-on-press-escape="closeOnPressEscape"
      :close-on-click-modal="closeOnClickModal"
      :width="width"
      :center="center"
      :loading="loading"
      :destroy-on-close="destroyOnClose"
      :fullscreen="fullscreen"
      @closed="closed"
      @close="close"
    >
      <div v-loading="loading">
        <slot>{{ content }}</slot>
      </div>
      <template #title>
        <slot name="title">
          <span class="eve-dialog__title" :style="titleStyle">
            {{ title }}
          </span>
        </slot>
      </template>
      <template #footer>
        <slot name="footer">
          <div class="eve-dialog__footer">
            <div>
              <slot name="leftFooter">
                <template v-for="(item, index) in leftButtonData">
                  <el-button
                    :key="index"
                    :type="item.type"
                    @click="leftButton({ index: index, value: item.value })"
                  >
                    {{ item.value }}
                  </el-button>
                </template>
              </slot>
            </div>

            <div>
              <slot name="rightFooter">
                <template v-for="(item, index) in rightButtonData">
                  <el-button
                    :key="index"
                    :type="item.type"
                    @click="rightButton({ index: index, value: item.value })"
                  >
                    {{ item.value }}
                  </el-button>
                </template>
              </slot>
            </div>
          </div>
        </slot>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import elDragDialog from './drag.js'
export default {
  name: 'EveDialog',
  directives: {
    elDragDialog
  },
  props: {

    /* 饿了么ui的属性 */

    // 是否显示
    visible: {
      type: Boolean,
      default: () => false
    },
    // 标题
    title: {
      type: String,
      default: () => '这是标题'
    },

    // 宽度
    width: {
      type: String,
      default: () => '50%'
    },

    // 是否为全屏 Dialog
    fullscreen: {
      type: Boolean,
      default: () => false
    },

    //  距离顶部的距离
    top: {
      type: String,
      default: () => '15vh'
    },

    // 是否显示遮罩层
    modal: {
      type: Boolean,
      default: () => true
    },

    // 是否显示删除图标
    showClose: {
      type: Boolean,
      default: () => true
    },

    // 是否可以通过esc按钮关闭
    closeOnPressEscape: {
      type: Boolean,
      default: () => false
    },
    // 是否可以通过点击模态框关闭 Dialog
    closeOnClickModal: {
      type: Boolean,
      default: () => false
    },
    // 是否对头部和底部采用居中布局
    center: {
      type: Boolean,
      default: () => false
    },

    // 关闭时销毁 Dialog 中的元素
    destroyOnClose: {
      type: Boolean,
      default: () => false
    },

    /* 自定义的属性 */

    // 内容
    content: {
      type: String,
      default: () => '这是内容'
    },

    // 标题样式修改
    titleStyle: {
      type: Object,
      default: () => { }
    },

    // 是否可以拖拽
    isDrag: {
      type: Boolean,
      default: () => false
    },

    // 是否添加loading
    loading: {
      type: Boolean,
      default: () => false
    },

    // 左边按钮数据
    leftButtonData: {
      type: Array,
      default: () => []
    },

    // 右边按钮数据
    rightButtonData: {
      type: Array,
      default: () => [
        {
          value: '取 消'
        },
        {
          type: 'primary',
          value: '确 定'
        }
      ]
    },
    // 点击确定是否关闭Dialog
    isSureClose: {
      type: Boolean,
      default: () => true
    }

  },
  data () {
    return {
      isShow: false // 是否显示
    }
  },
  computed: {},
  watch: {
    visible: {
      handler (newValue) {
        this.isShow = newValue
      },
      immediate: true
    }
  },
  created () { },
  mounted () {
    // console.log(this.$refs.dialog)

  },
  methods: {
    /** @description  左边按钮事件
     * @author yx
     * @param  {Object}  param 按钮里参数值 包括 index 按钮下标  value按钮值
     */
    leftButton (param) {
      // console.log(param)
      this.$emit('update:visible', false)
      this.$emit('left-button', param)
    },
    /** @description  右边按钮事件
     * @author yx
    * @param  {Object}  param 按钮里参数值 包括 index 按钮下标  value按钮值
     */
    rightButton (param) {
      let { value } = param || {}
      // console.log(param)
      //  (this.isShow = false)
      value = value.replace(/\s*/g, '')
      if (value === '取消' || this.isSureClose) {
        this.$emit('update:visible', false)
      }
      this.$emit('right-button', param)
    },

    /** @description 关闭模态框前的事件
     * @author yx
     */
    closed () {
      this.$emit('update:visible', false)
      this.$emit('closed')
    },

    /** @description 右边的关闭按钮
     * @author yx
     */
    close () {
      this.$emit('update:visible', false)
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.eve-dialog {
  &__footer {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
  }
}
.el-dialog__wrapper {
  user-select: none;
}
</style>
