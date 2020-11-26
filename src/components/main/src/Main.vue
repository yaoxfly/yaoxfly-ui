<!--
* @Author: yx
* @Description: 中间区域块
* @Date: 2020-11-17
-->
<template>
  <div
    class="eve-main"
    :style="{
      margin: `${spacing}px`,
      width: `calc(100vw - ${tempLeft}px`,
      height: `calc(100vh - ${heightDiffer}px)`,
    }"
  >
    <section class="eve-main__content" :style="{ background: background }">
      <el-scrollbar style="height: 102%" v-if="scroll">
        <slot> </slot>
      </el-scrollbar>
      <div v-else>
        <slot></slot>
      </div>
    </section>
  </div>
</template>
<script>

import { receive } from '../../../bus/menu.js'
export default {
  name: 'EveMain',
  props: {

    //高度差 顶部导航+面包屑+两个spacing的高度之和
    heightDiffer: {
      type: Number,
      default: 125
    },

    //各个块间的间距(最好还是10或者小于10比较好)
    spacing: {
      type: Number,
      default: 10
    },

    //距离左边的距离(一般是菜单的宽度)
    left: {
      type: Number,
      default: () => 200
    },

    //背景颜色
    background: {
      type: String,
      default: () => '#fff'
    },

    //是否开启滚动
    scroll: {
      type: Boolean,
      default: () => false
    }

  },
  data () {
    return {
      tempLeft: 0 //距离左边的距离(内部用)
    }
  },

  mounted () {
    this.receiveBus()
  },

  methods: {
    /**@description 接收各种兄弟通信
       * @author yx
       */
    receiveBus () {
      receive.breadcrumbCollapse(collapse => {
        //本来是64,20是间距的距离
        this.tempLeft = collapse ? 84 : this.left
        console.log(this.tempLeft, 'layout')
      })
    }

  },
  watch: {
    left: {
      handler (newValue) {
        this.tempLeft = newValue
      },
      immediate: true
    }
  }
}
</script>

<style lang='scss' scoped >
.eve-main {
  &__content {
    width: 100%;
    height: 100%;
  }
}

//隐藏element-ui静态滚动条的横向滚动条
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
::v-deep .el-scrollbar__bar.is-vertical > div {
  width: 120%;
}
::v-deep .el-scrollbar__bar.is-horizontal > div {
  height: 120%;
}
// ::-webkit-scrollbar-track-piece {
//   //滚动条凹槽的颜色，还可以设置边框属性
//   background-color: #f8f8f8;
// }
// ::-webkit-scrollbar {
//   //滚动条的宽度
//   width: 8px;
//   height: 8px;
// }

// ::-webkit-scrollbar-thumb {
//   //滚动条的设置
//   background-color: rgba(144, 147, 153, 0.5);
//   background-clip: padding-box;
//   min-height: 10px;
//   border-radius: 3px;
// }

// ::-webkit-scrollbar-thumb:hover {
//   background-color: rgba(144, 147, 153, 0.5);
// }
</style>

 