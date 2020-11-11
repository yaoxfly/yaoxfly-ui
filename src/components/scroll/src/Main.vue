<!--
* @Author: yx
* @Description: 横向滚动--菜单
* @Date: 2020-10-26
-->
<template>
  <div class="eve-scroll" ref="eveScroll">
    <el-menu
      :default-active="defaultActive"
      mode="horizontal"
      @select="select"
      class="eve-scroll__menu"
      :background-color="backgroundColor"
      :text-color="textColor"
      :active-text-color="activeTextColor"
      :style="{ width: width }"
    >
      <swiper
        ref="mySwiper"
        :options="swiperOptions"
        class="eve-scroll__swiper"
        v-if="scroll"
      >
        <template v-for="item in data">
          <swiper-slide :key="item.path" class="eve-scroll__content">
            <menu-item :menu-data="item"></menu-item>
          </swiper-slide>
        </template>
        <!-- <div class="swiper-pagination" slot="pagination"></div> -->
        <div
          class="swiper-button-prev"
          :class="swiperButtoColor"
          slot="button-prev"
          @click="prev"
        ></div>
        <div
          class="swiper-button-next"
          :class="swiperButtoColor"
          slot="button-next"
          @click="next"
        ></div>
        <!-- <div class="swiper-scrollbar" slot="scrollbar"></div> -->
      </swiper>

      <div class="eve-scroll__item" v-else>
        <template v-for="item in data">
          <div :key="item.path">
            <menu-item :menu-data="item"></menu-item>
          </div>
        </template>
      </div>
    </el-menu>
  </div>
</template>
<script>

import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import MenuItem from '../../menu/src/MenuItem'
import mixins from './mixins' // 参数和方法
export default {
  name: 'EveScroll',
  mixins: [mixins],
  provide () {
    return {
      ////传一个类名用来改样式，以防全局污染样式
      className: 'eve-scroll__menu-item'
    }
  },
  components: {
    MenuItem,
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.$swiper
    }
  },
  data () {
    return {
      //滚动
      swiperOptions: {
        spaceBetween: 0,
        //分页器
        pagination: {
          el: '.swiper-pagination',
          clickable: false //允许分页点击跳转
        },
        //左右箭头
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        // 滚动条
        scrollbar: {
          el: '.swiper-scrollbar',
        },
        //显示的个数
        slidesPerView: this.slidesPerView
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.eve-scroll {
  width: 100%;
  &__content {
    text-align: center;
  }
  &__swiper {
    //防止鼠标右击出现border
    outline: none;
  }
  &__menu {
    width: 100%;
  }
  &__item {
    outline: none;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    user-select: none;
  }
}

::v-deep .eve-scroll__swiper {
  .swiper-button-prev:after,
  .swiper-button-next:after {
    font-size: 14px;
  }

  .swiper-button-next,
  .swiper-container-rtl .swiper-button-prev {
    // color: white;
    right: -10px;
  }
  .swiper-button-prev,
  .swiper-container-rtl .swiper-button-next {
    // color: white;
    left: -10px;
  }
}

::v-deep.eve-scroll__menu {
  user-select: none;
  .el-menu.el-menu--horizontal {
    border-bottom: solid 1px transparent;
  }
  /* 菜单的标题 */
  .el-submenu__title {
    color: white;
  }
  // 标题选中颜色和线
  .el-submenu.is-active .el-submenu__title {
    span {
      border-bottom: 2px solid blue;
      padding: 0 10px 10px 10px;
    }
  }
  //去掉箭头
  .el-submenu__title i {
    color: transparent;
  }

  .el-menu-item.is-active {
    span {
      border-bottom: 2px solid blue;
      padding: 0 10px 10px 10px;
    }
  }
}
</style>

<style  lang="scss">
.eve-scroll__menu-item {
  .el-submenu__title:focus,
  .el-submenu__title:hover {
    background-color: transparent !important;
    color: blue !important;
  }
}

/*里面最底层孩子项的颜色 */
.eve-scroll__menu-item {
  .el-menu-item:focus,
  .el-menu-item:hover {
    background-color: transparent !important;
    color: blue !important;
  }
}

ul[role='menu'] {
  .eve-scroll__menu-item {
    .el-menu-item {
      background-color: rgb(64, 158, 255) !important;
    }
  }
}
</style>





