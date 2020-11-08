<template>
  <div class="dialog-example main">
    <el-button @click="open">点击打开 Dialog (可拖拽)</el-button>

    <!-- 必须要加sync -->
    <eve-dialog
      :visible.sync="dialog.visible"
      @right-button="rightButton"
      :is-drag="dialog.isDrag"
      :title-style="{ color: '#000' }"
      :right-button-data="dialog.rightButtonData"
      width="50%"
      ref="dialog"
      @closed="closed"
      @close="close"
    >
    </eve-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Example',
  data () {
    return {
      dialog: {
        visible: false,
        isDrag: true,
        rightButtonData: [
          {
            value: '暂不通知'
          },
          {
            type: 'primary',
            value: '确定通知'
          }
        ]
      }
    }
  },
  methods: {
    open () {
      this.dialog.visible = true
    },

    rightButton () {
      // this.dialog.visible = false
    },

    close () {
      console.log('Dialog关闭前回调')
    },

    closed () {
      console.log('Dialog关闭后回调')
    }

  }
}
</script>

<style lang="scss" scoped>
.dialog-example {
  margin: 20px 0;
}

.main {
  overflow: hidden;

  // overflow-y: auto;
}
</style>
