# Dialog 对话框

在保留当前页面状态的情况下，告知用户并承载相关操作。

# 基本用法

Dialog 弹出一个对话框，适合需要定制性更大的场景。

<template>
  <div>
    <Example />
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
  <div class="dialog-example">
    <el-button @click="open">点击打开 Dialog (可拖拽)</el-button>
    <eve-dialog
      :visible.sync="dialog.visible"
      @right-button="rightButton"
      :is-drag="dialog.isDrag"
      :title-style="{ color: '#000' }"
      :right-button-data="dialog.rightButtonData"
      width="50%"
      ref="dialog"
    >
    </eve-dialog>
  </div>
</template>

<script>
  // @ is an alias to /src
  export default {
    name: 'Example',
    data() {
      return {
        dialog: {
          visible: false,
          isDrag: true,
          rightButtonData: [
            {
              value: '暂不通知',
            },
            {
              type: 'primary',
              value: '确定通知',
            },
          ],
        },
      }
    },
    methods: {
      open() {
        this.dialog.visible = true
      },

      rightButton() {
        // this.dialog.visible = false
      },
    },
  }
</script>

<style  scoped>
  .dialog-example {
    margin: 20px 0;
  }
</style>
```

> `visible` 一定要加上 `sync`,起到同步修改的作用，以上方法和属性中除了`visible.sync` 一定要在父组件设置外，其他都有默认值，如无特殊需求可不设置。

### Attributes

| 参数   | 说明 | 类型  | 可选值 | 默认值    |
| --------------- | ---------------- | ------- | ------ | - |
| visible  | 是否显示 Dialog，支持 .sync 修饰符 | boolean | —  | false |
| title    | Dialog 的标题，也可通过具名 slot （见下表）传入 | string  | —    | —  |
| width    | Dialog 的宽度     | string  | —      | 50%      |
| fullscreen  | 是否为全屏 Dialog   | boolean | —      | false    |
| top         | Dialog CSS 中的 margin-top 值  | string  | —      | 15vh   |
| modal       | 是否需要遮罩层    | boolean | —      | true   |
| show-close    | 是否显示关闭按钮      | boolean | —      | true    |
| close-on-press-escape  | 是否可以通过按下ESC关闭 Dialog | boolean | —  |false |
| close-on-press-escape  | 是否可以通过按下 ESC 关闭 Dialog   | boolean | —  | false  |
| center  | 是否对头部和底部采用居中布局  | boolean | —      | false  |
| destroy-on-close | 关闭时销毁 Dialog 中的元素 | boolean | —      | false   |
| content (自定义)  | Dialog 的内容,也可通过 slot （见下表）传入   | string  | —    | —      |
| title-style (自定义)   | Dialog 的标题的样式  | object  | — | —    |
| isDrag (自定义)  | Dialog 是否可以拖拽   | boolean | — | false  |
| loading (自定义)  | Dialog 是否添加 loading  | boolean | — | false |                                           
| left-button-data (自定义)  | Dialog 左边按钮的数据 | array  | —| [] |
| right-button-data (自定义) | Dialog 右边按钮的数据 | array  | — | [{ value: '取 消'},{ type: 'primary', value:'确 定'} ] |
| is-sure-close (自定义) | 点击确定是否关闭 Dialog| boolean | — | true|

### Slot

| name                 | 说明                          |
| -------------------- | ----------------------------|
| —                    | Dialog 的内容               |
| title                | Dialog 标题区的内容          |
| footer               | Dialog 按钮操作区的内容      |
| leftFooter(自定义)   | Dialog 按钮操作区左边的内容   |
| rightFooter (自定义) | Dialog 按钮操作区的右边的内容  |

### Events

| 事件名称              | 说明                          | 回调参数 |
| --------------------- | ----------------------------- | -------- |
| close                 | Dialog 关闭前的回调           | —        |
| closed                | Dialog 关闭动画结束时的回调   | —        |
| left-button(自定义)   | Dialog 左边按钮点击事件的回调 | —        |
| right-button (自定义) | Dialog 右边按钮点击事件的回调 | —        |
