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
      @select="(index, indexPath) => select(index, indexPath, data)"
      class="eve-scroll__menu"
      :class="[className, bottomBorder || 'eve-scroll__border-none']"
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
        <slot>
          <template v-for="(item, index) in data">
            <swiper-slide
              :key="item[tempConfig.path]"
              class="eve-scroll__content"
            >
              <slot name="content" :row="item" :index="index" :data="data">
                <menu-item :menu-data="item"></menu-item>
              </slot>
            </swiper-slide>
          </template>
        </slot>
        <!-- <div class="swiper-pagination" slot="pagination"></div> -->
        <div
          class="swiper-button-prev"
          :class="swiperButtonColor"
          slot="button-prev"
          @click="prev"
        ></div>
        <div
          class="swiper-button-next"
          :class="swiperButtonColor"
          slot="button-next"
          @click="next"
        ></div>
        <!-- <div class="swiper-scrollbar" slot="scrollbar"></div> -->
      </swiper>

      <div class="eve-scroll__item" v-else>
        <template v-for="item in data">
          <div :key="item[tempConfig.path]">
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
  inject: {
    className: {
      default: 'eve-scroll__menu-item'
    }
  },
  props: {
    // 配置菜单的text、path、children等key值--支持只修改某个key值,其他配置默认
    config: {
      type: Object,
      default: () => ({
        text: 'text', //文本
        path: 'path', // 路径
        children: 'children' //树结构数据的孩子节点
      })
    },
  },
  provide () {
    return {
      //传一个类名用来改样式，以防全局污染样式
      className: this.className,
      config: this.tempConfig
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
      //key默认配置--配置菜单、面包屑数据的text、path、children等key值(内部用可被config覆盖)
      tempConfig: {
        text: 'text', //文本
        path: 'path', // 路径
        children: 'children' //树结构数据的孩子节点
      },
    }
  },
  watch: {
    config: {
      handler (val) {
        Object.assign(this.tempConfig, val)
        // console.log(111, this.tempConfig, val)
      },
      immediate: true,
    },
  }
}
</script>

<style lang="scss" scoped>
@import './scroll.scss';
</style>

<style  lang="scss"  >
/*header组件的菜单样式 */
.eve-header__menu-item {
  .el-submenu__title:focus,
  .el-submenu__title:hover {
    background-color: transparent !important;
    color: blue !important;
  }
}

/*里面最底层孩子项的颜色 */
.eve-header__menu-item {
  .el-menu-item:focus,
  .el-menu-item:hover {
    background-color: transparent !important;
    color: blue !important;
  }
}

ul[role='menu'] {
  .eve-header__menu-item {
    .el-menu-item {
      background-color: #409eff !important;
    }
    .el-submenu__title {
      background-color: #409eff !important;
    }
    .el-submenu__title i {
      color: #fff;
    }
  }
}

/*纯粹的scroll组件的菜单样式 */
.eve-scroll__menu-item {
  .el-submenu__title:focus,
  .el-submenu__title:hover {
    background-color: transparent !important;
    color: #409eff !important;
  }
}

/*里面最底层孩子项的颜色 */
.eve-scroll__menu-item {
  .el-menu-item:focus,
  .el-menu-item:hover {
    background-color: transparent !important;
    color: #409eff !important;
  }
}

ul[role='menu'] {
  .eve-scroll__menu-item {
    .el-menu-item {
      background-color: #fff !important;
    }
    .el-submenu__title {
      background-color: #fff !important;
    }
    // .el-submenu__title i {
    // }
  }
}
</style>





