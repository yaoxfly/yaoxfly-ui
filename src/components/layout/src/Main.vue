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
      height: `calc(100vh - ${heightDiffer}px)`,
    }"
  >
    <!--center(中间一整块)布局-->
    <section class="eve-layout__main" v-if="layout === 'center'">
      <el-scrollbar style="height: 100%">
        <slot> </slot>
      </el-scrollbar>
    </section>

    <!-- 左右布局 -->
    <section class="eve-layout__left-right" v-if="layout === 'left-right'">
      <!--左-->
      <div class="eve-layout__left" :style="{ width: `${span[0] * 10}%` }">
        <slot name="left"></slot>
      </div>
      <!--右-->
      <div
        class="eve-layout__right"
        :style="{
          width: `${span[1] * 10}%`,
          marginLeft: `${spacing}px`,
        }"
      >
        <slot name="right"></slot>
      </div>
    </section>

    <!--上下布局-->
    <section class="eve-layout__up-down" v-if="layout === 'up-down'">
      <!--上-->
      <div class="eve-layout__up" :style="{ minHeight: `${span[0] * 10}%` }">
        <slot name="up"></slot>
      </div>

      <!--下-->
      <div
        class="eve-layout__down"
        :style="{
          minHeight: `calc(${span[1] * 10}% - ${spacing}px )`,
          marginTop: `${spacing}px`,
        }"
      >
        <slot name="down"></slot>
      </div>
    </section>
  </div>
</template>


<script>
export default {
  name: 'EveLayout',
  props: {
    //布局方式,可选值：center(中间一大块)布局、left-right(左右布局)、up-down(上下布局)
    layout: {
      type: String,
      default: 'left-right'
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

    //占据比例数组(0-10),当左右布局时，左边是数组的第一个值，当上下布局的时候上面是是数组的第一个值。
    span: {
      type: Array,
      default: () => [1.7, 8.3]
    }

  },
  data () {
    return {
      visible: false // 是否显示
    }
  },
  methods: {}

}
</script>
<style lang='scss' scoped >
.eve-layout {
  overflow: hidden;
  overflow-y: auto;

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
  }

  &__left {
    padding: 20px 10px;
    background: white;
  }

  &__right {
    padding: 20px 10px;
    background: white;
  }

  &__up-down {
    width: 100%;
    height: 100%;
  }

  &__up {
    padding: 20px 10px;
    background: white;
  }

  &__down {
    padding: 20px 10px;
    background: white;
  }
}
::v-deep .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>

 