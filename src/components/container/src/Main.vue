<!--
* @Author: yx
* @Description: 中间区域布局组件
* @Date: 2020-11-11
-->
<template>
  <div
    class="eve-container"
    :style="{
      height: `calc(100vh - ${heightDiffer}px)`,
      background: background,
    }"
  >
    <!--center(中间一整块)布局-->
    <section class="eve-container__main" v-if="layout === 'center'">
      <el-scrollbar style="height: 102%">
        <slot> </slot>
      </el-scrollbar>
    </section>

    <!-- 左右布局 -->
    <section class="eve-container__left-right" v-if="layout === 'left-right'">
      <!--左-->
      <div
        class="eve-container__left"
        :style="{ width: `${proportion[0] * 100}px` }"
      >
        <el-scrollbar style="height: 100%">
          <slot name="left"></slot>
        </el-scrollbar>
      </div>
      <!--右-->
      <div
        class="eve-container__right"
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
    <section class="eve-container__up-down" v-if="layout === 'up-down'">
      <el-scrollbar style="height: 100%">
        <!--上-->
        <div
          class="eve-container__up"
          :style="{ minHeight: `${proportion[0] * 10}vh` }"
        >
          <slot name="up"></slot>
        </div>
        <!--下-->
        <div
          class="eve-container__down"
          :style="{
            minHeight: `calc(${
              proportion[1] * 10
            }vh - ${heightDiffer}px - ${spacing}px   )`,
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
export default {
  name: 'EveContainer',
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

    //背景颜色
    background: {
      type: String,
      default: () => '#f5f7fa'
    },

  },

  data () {
    return {
      proportion: [], //占据比例
    }
  },

  mounted () { },
  methods: {},
  watch: {
    layout: {
      handler (newValue) {
        console.log(newValue, 333)
        this.proportion = newValue === 'left-right' ? [3, 7] : [1, 9]
      }
    },
    span: {
      handler (newValue) {
        // Array.from(newValue).length
        this.proportion = newValue
        if (newValue.length === 0) {
          this.proportion = this.layout === 'left-right' ? [3, 7] : [1, 9]
        }
      },
      immediate: true
    },

  }
}
</script>
<style lang='scss' scoped >
.eve-container {
  min-width: 1020px;
  width: 100%;
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
    min-width: 800px;
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

 