<template>
  <div>
    <el-button v-if="!notBtn" :disbaled="disbaled || inConfigPanel" type="primary" size="mini" @click="handleClick">新增</el-button>
    <el-dialog
      v-if="!inConfigPanel"
      :visible.sync="show"
      append-to-body
      custom-class="vertical-center-modal"
      :width="dialogWidth + 'px'"
      :top="`${dialogTop}px`"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @open="handleOpen"
      @close="handleClose"
      @on-cancel="handleClose"
    >
      <div slot="title" :style="headerStyle">
        {{ title }}
      </div>
      <slot />
      <template slot="footer">
        <slot name="footer" />
      </template>
    </el-dialog>
    <div v-else>
      <slot />
    </div>
  </div>
</template>

<script>

export default {
  name: 'FdDialog',
  props: {
    notBtn: {
      type: Boolean,
      default: false
    },
    dialogWidth: {
      type: Number,
      default: 800
    },
    dialogTop: {
      type: Number,
      default: 100
    },
    btnLabel: {
      type: String,
      default: '新增'
    },
    disbaled: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '对话框'
    },
    // 在拖拽配置面板中
    inConfigPanel: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: false,
      headerStyle: {
        fontSize: '14px',
        fontWeight: 'bold',
        textAlign: 'left'
      }
    }
  },
  methods: {
    handleOpen() {
      this.$emit('open-dialog')
    },
    handleClose() {
      this.$emit('close-dialog')
      this.closeDialog()
    },
    handleClick() {
      this.$emit('click-dialog-btn')
      this.showDialog()
    },
    // 开启
    showDialog() {
      this.show = true
    },
    // 关闭
    closeDialog() {
      this.show = false
    }
  }
}
</script>
