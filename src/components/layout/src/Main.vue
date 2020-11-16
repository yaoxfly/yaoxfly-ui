<!--
* @Author: yx
* @Description: 中间内容布局组件
* @Date: 2020-11-11
-->
<template>
  <div
    class="eve-layout"
    :style="{
      margin: `${spacing}px`,
      width: `calc(100vw - ${tempLeft}px`,
      height: `calc(100vh - ${heightDiffer}px)`,
    }"
  >
    <!--center(中间一整块)布局-->
    <section class="eve-layout__main" v-if="layout === 'center'">
      <el-scrollbar style="height: 102%">
        <slot> </slot>
      </el-scrollbar>
    </section>

    <!-- 左右布局 -->
    <section class="eve-layout__left-right" v-if="layout === 'left-right'">
      <!--左-->
      <div
        class="eve-layout__left"
        :style="{ width: `${proportion[0] * 100}px` }"
      >
        <el-scrollbar style="height: 100%">
          <slot name="left"></slot>
        </el-scrollbar>
      </div>
      <!--右-->
      <div
        class="eve-layout__right"
        :style="{
          width: `calc(${proportion[1] * 10}% - ${proportion[0] * 100} px  )`,
          marginLeft: `${spacing}px`,
        }"
      >
        <el-scrollbar style="height: 100%">
          <slot name="right"></slot>
        </el-scrollbar>
      </div>
    </section>

    <!--上下布局 -->
    <section class="eve-layout__up-down" v-if="layout === 'up-down'">
      <el-scrollbar style="height: 100%">
        <!--上-->
        <div
          class="eve-layout__up"
          :style="{ minHeight: `${proportion[0] * 10}vh` }"
        >
          <slot name="up"></slot>
        </div>
        <!--下-->
        <div
          class="eve-layout__down"
          :style="{
            minHeight: `calc(${
              proportion[1] * 10
            }vh - ${heightDiffer}px - ${spacing}px  )`,
            marginTop: `${spacing}px`,
          }"
        >
          <slot name="down"></slot>
        </div>
      </el-scrollbar>
    </section>
  </div>
</template>
<script>
import Bus from '../../../assets/js/bus.js'
export default {
  name: 'EveLayout',
  props: {
    //布局方式,可选值：center(中间一大块)布局、left-right(左右布局)、up-down(上下布局)
    layout: {
      type: String,
      default: 'center'
    },

    //高度差 顶部导航+面包屑+两个spacing的高度之和
    heightDiffer: {
      type: Number,
      default: 125
    },

    //各个块间的间距
    spacing: {
      type: Number,
      default: 10
    },

    //占据比例数组(0-10);当左右布局时，左边是数组的第一个值,右边可不管根据左边自适应了;当上下布局的时候上面是是数组的第一个值。
    span: {
      type: Array,
      default: () => []
    },

    //距离左边的距离(一般是菜单的宽度)
    left: {
      type: Number,
      default: () => 200
    }

  },
  data () {
    return {
      visible: false, // 是否显示
      proportion: [], //占据比例
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
      Bus.$on('breadcrumb-container-menu-collapse', collapse => {
        //本来是64,20是间距的距离
        this.tempLeft = collapse ? 84 : this.left
        console.log(this.tempLeft, 'layout')
      })
    }
  },
  watch: {
    layout: {
      handler (newValue) {
        console.log(newValue, 333)
        this.proportion = newValue === 'left-right' ? [3, 7] : [1.7, 8.3]
      }
    },
    span: {
      handler (newValue) {
        // Array.from(newValue).length
        this.proportion = newValue
        if (newValue.length === 0) {
          this.proportion = this.layout === 'left-right' ? [3, 7] : [1.7, 8.3]
        }
      },
      immediate: true
    },
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
.eve-layout {
  min-width: 800px;
  &__main {
    width: 100%;
    height: 100%;
    padding: 20px 10px;
    background: white;
  }

  &__left-right {
    display: flex;
    justify-content: center;
    height: 100%;
    width: 100%;
  }

  &__left {
    width: 100%;
    padding: 20px 10px;
    background: white;
  }

  &__right {
    width: 100%;
    padding: 20px 10px;
    background: white;
    overflow: hidden;
    overflow-x: auto;
  }

  &__up-down {
    width: 100%;
    height: 100%;
  }

  &__up {
    width: 100%;
    background: white;
    padding: 20px 10px;
  }

  &__down {
    width: 100%;
    padding: 20px 10px;
    background: white;
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

 