<!--
* @Author: yx
* @Description: 头部导航栏
* @Date: 2020-10-09
-->
<template>
  <div>
    <header
      class="eve-header"
      :style="{ background: background, height: `${height}px` }"
    >
      <!-- 左边的内容 -->
      <section class="eve-header__flex-column">
        <slot name="left">
          <div
            class="eve-header__flex-start eve-header__logo-title"
            :style="{ width: `${leftWidth}px` }"
          >
            <img :src="logo" class="eve-header__logo" />
            <div class="eve-header__flex-column eve-header__title">
              <span>{{ title }}</span>
              <span>{{ subTitle }}</span>
            </div>
          </div>
        </slot>
      </section>

      <!-- 中间的内容 -->
      <section class="eve-header__flex-column eve-header__center">
        <slot name="center">
          <div class="eve-header__flex-start">
            <eve-scroll
              :width="navigationWidth"
              :scroll="scroll"
              :defaultActive="defaultActive"
              :data="navigationButton"
              :slidesPerView="slidesPerView"
              :backgroundColor="backgroundColor"
              :textColor="textColor"
              :activeTextColor="activeTextColor"
              :swiperButtoColor="swiperButtoColor"
              :config="tempConfig"
              @select="navButton"
            ></eve-scroll>
          </div>
        </slot>
      </section>

      <!-- 右边的内容 -->
      <section class="eve-header__flex-column eve-header__right">
        <slot name="right">
          <div class="eve-header__flex-end">
            <template v-for="(item, index) in rightContent">
              <section
                v-if="item.type === 'icon'"
                :key="`${item.value}icon`"
                class="eve-header__icon-item"
                :class="[item.number ? 'eve-header__circle' : '']"
                :number="item.number"
              >
                <img
                  :src="item.value"
                  class="eve-header__icon-img"
                  @click="rightContentButton({ index: index, data: item })"
                />
              </section>

              <section
                v-else
                :key="`${item.content}icon`"
                :class="[item.number ? 'eve-header__circle' : '']"
                :number="item.number"
              >
                <span
                  class="eve-header__icon-item"
                  @click="rightContentButton({ index: index, data: item })"
                  >{{ item.value }}
                </span>
              </section>
            </template>
          </div>
        </slot>

        <div v-if="visible">
          <el-dialog
            class="eve-header__dialog"
            :visible.sync="visible"
            :modal="false"
            :lock-scroll="false"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
            :style="{
              right: `${dialogRight}px`,
              marginTop: `${dialogTop}px`,
            }"
          >
            <template #title>
              <span class="eve-header__dialog-title">
                <slot name="dialogTitle">
                  {{ dialogTitle }}
                </slot>
              </span>
              <div class="eve-header__dialog-border" v-if="dialogBorder"></div>
            </template>

            <slot name="dialogContent">
              <span>这里是内容，可以用slot覆盖 ，slot名：dialogContent</span>
            </slot>
            <span slot="footer">
              <div class="eve-header__dialog-border" v-if="dialogBorder"></div>
              <div class="eve-header__dialog-footer">
                <slot name="dialogFooter">
                  <template v-for="(item, index) in dialogButton">
                    <span
                      :key="`dialogButton${index}`"
                      class="eve-header__dialog-footer-button"
                      @click="dialogOperate({ index: index, data: item.text })"
                    >
                      {{ item.text }}
                    </span>
                  </template>
                </slot>
              </div>
            </span>
          </el-dialog>
          <div class="eve-header__triangle"></div>
        </div>
      </section>
    </header>
  </div>
</template>

<script>

import mixins from '../../scroll/src/mixins'
export default {
  name: 'EveHeader',
  mixins: [mixins],
  provide () {
    return {
      className: 'eve-header__menu-item',
      config: this.tempConfig
    }
  },
  props: {
    //logo
    logo: {
      type: String,
      default: require('../../../assets/logo.png')
    },
    // 标题
    title: {
      type: String,
      default: 'XXX平台系统'
    },
    //副标题
    subTitle: {
      type: String,
      default: 'XXXXXXXXX子系统'
    },
    // 左边包含logo和系统名的宽度
    leftWidth: {
      type: Number,
      default: 250
    },

    //header 背景 
    background: {
      type: String,
      default: '#409EFF'
    },

    //header高度
    height: {
      type: Number,
      default: 55
    },

    //默认白 swiper-button-white(白)/swiper-button-black(黑)
    swiperButtoColor: {
      type: String,
      default: 'swiper-button-white'
    },

    //是否开启滚动
    scroll: {
      type: Boolean,
      default: true
    },

    //导航按钮的宽度--如果开启滚动必须固定一个宽度
    navigationWidth: {
      type: String,
      default: () => '680px'
    },
    // 导航按钮的数据
    navigationButton:
    {
      type: Array,
      default: () => [{
        path: 'dialog', //唯一key值
        type: 'item', // 最底层的菜单-没有子菜单的
        text: '主页'// 菜单名
      },
      {
        path: 'dialog1',
        type: 'item',
        text: '行政许可'
      },
      {
        path: 'dialog2',
        type: 'item',
        text: '市场监管'
      },
      {
        path: 'dialog3',
        type: 'item',
        text: '行政执法'
      },
      {
        path: 'dialog4',
        type: 'item',
        text: '知识产权'
      },
      {
        path: 'dialog5',
        type: 'item',
        text: '质量监管'
      },
      {
        path: 'http://www.baidu.com1',
        type: 'item',
        text: '业务应用'
      },
      {
        path: 'http://www.baidu.com测试3',
        type: 'submenu', //有子菜单的
        text: '应用支撑',
        children: [
          {
            path: 'http://www.baidu.com3331',
            type: 'item',
            text: '测试1',

          },
          {
            path: 'http://www.baidu.com3332',
            type: 'item',
            text: '测试2',

          },
          {
            path: 'http://www.baidu.com3333',
            type: 'item',
            text: '测试3',

          }
        ]
      },
      ]
    },

    //字体颜色(中间菜单)
    textColor: {
      type: String,
      default: () => '#fff'
    },

    //当前激活菜单的文字颜色(中间菜单)
    activeTextColor: {
      type: String,
      default: () => 'blue'
    },

    //右边的内容：一般是图标或者是文本 //require这里不能用@会引入调用这个工程的src下的图片,只能用相对路径。
    rightContent: {
      type: Array,
      default: () => [
        {
          type: 'icon',
          value: require('../../../assets/image/header/help.png'),
        },
        {
          type: 'icon',
          value: require('../../../assets/image/header/info.png'),
          number: 8, //在图标右上方添加number
        },
        {
          type: 'icon',
          value: require('../../../assets/image/header/head_sculpture.png'),
        },
        {
          value: '李四',
          dialog: true //设置这个属性后,点击这个按钮会弹出对话框,默认是false
        }
      ]
    },

    //对话框的距离右边的距离
    dialogRight: {
      type: Number,
      default: () => 20
    },

    //对话框的距离上边的距离
    dialogTop: {
      type: Number,
      default: () => 48
    },

    //对话框的标题
    dialogTitle: {
      type: String,
      default: () => '李四，上午好！'
    },

    //对话框的线--默认显示
    dialogBorder: {
      type: Boolean,
      default: () => true
    },

    //对话框的按钮
    dialogButton: {
      type: Array,
      default: () => [
        {
          text: '修改密码'
        },
        {
          text: '安全退出'
        }
      ]
    },

    //左边菜单数据：联动页签、左边菜单组件，配置后切换顶部菜单，页面默认跳转左侧菜单的第一个，如果存在二级，则跳转到二级菜单的第一个
    linkageTagMenu: {
      type: Array,
      default: () => []
    },

    // 配置菜单的text、path、children等key值--支持只修改某个key值,其他配置默认
    config: {
      text: 'text', //文本
      path: 'path', // 路径
      children: 'children' //树结构数据的孩子节点
    },

  },

  data () {
    return {
      visible: false, // 是否显示
      //key默认配置--配置菜单、面包屑数据的text、path、children等key值(内部用可被config覆盖)
      tempConfig: {
        text: 'text', //文本
        path: 'path', // 路径
        children: 'children' //树结构数据的孩子节点
      },
    }
  },

  methods: {
    /**@description  中间部分导航按钮点击事件
     * @author yx
     * @param  {Object}  param 包含导航按钮的路径
     */
    navButton (param) {
      this.$emit('nav-button', param)
    },
    /**@description  右边部分icon和用户信息等按钮的点击事件
     * @author yx
     * @param  {Object}  param 包含导航按钮的index和数据
     */
    rightContentButton (param) {
      const { data: { dialog = false } = {} } = param || {}
      this.visible = dialog
      this.$emit('right-content-button', param)
    },

    /**@description  右边dialog的按钮的点击事件
    * @author yx
    * @param  {Object}  param 包含dialog按钮的index和数据
    */
    dialogOperate (param) {
      // console.log(param)
      this.visible = false
      this.$emit('dialog-operate', param)
    },

    /**@description  查找最底层的菜单--配合linkageTagMenu联动用
      * @author yx
      * @param  {Aarray}  menu 
      */
    findlowestMenu (menu) {
      let obj = {}
      menu.some(element => {
        obj = { [this.tempConfig.text]: element[this.tempConfig.text], [this.tempConfig.path]: element[this.tempConfig.path] }
        if (element[this.tempConfig.children]) {
          obj = this.findlowestMenu(element[this.tempConfig.children])
          return true
        } else {
          return true
        }
      })
      return obj
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
<style lang='scss' scoped >
.eve-header {
  // width: 100%;
  border-bottom: 0;
  display: flex;
  padding: 0 20px;
  color: white;
  font-size: 14px;
  &__flex-start {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
  }
  &__flex-end {
    @extend .eve-header__flex-start;
    justify-content: flex-end;
    line-height: 0.5;
  }
  &__flex-column {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    line-height: 1.5;
  }
  &__title {
    padding-left: 16px;
  }

  &__logo {
    width: 40px;
    height: auto;
  }

  &__right {
    margin-left: auto;
  }

  &__center {
    margin-left: 50px;
    white-space: nowrap;
  }

  &__button {
    cursor: pointer;
    user-select: none;
    &:not(:first-child) {
      margin-left: 50px;
    }
  }

  &__icon-img {
    width: 20px;
    height: auto;
  }

  &__icon-item {
    cursor: pointer;
    user-select: none;
    &:not(:last-child) {
      margin-right: 14px;
    }
    &:nth-last-child(2) {
      margin-right: 8px;
    }
    &:nth-last-child(3) {
      margin-right: 28px;
    }
    white-space: nowrap;
  }

  &__circle {
    position: relative;
    &::before {
      position: absolute;
      left: 12.3px;
      top: -5.2px;
      content: attr(number);
      z-index: 2;
      font-size: 12px;
    }
    &::after {
      position: absolute;
      background: red;
      width: 15px;
      height: 15px;
      font-size: 12px;
      left: 8px;
      top: -10px;
      border-radius: 50%;
      display: block;
      content: '';
    }
  }

  &__triangle {
    position: relative;
    &::before {
      position: absolute;
      content: '';
      width: 0;
      height: 0;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-bottom: 5px solid white;
      right: 10px;
    }
  }

  &__dialog-title {
    display: block;
    padding: 10px 20px;
  }

  &__dialog-border {
    border-bottom: 1px solid #333;
    opacity: 0.1;
  }
  &__dialog-footer {
    display: block;
    color: #333;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0;
    opacity: 0.6;
    font-weight: bold;
    font-size: 12px;
  }
  &__dialog-footer-button {
    user-select: none;
    cursor: pointer;
  }
  //隐藏菜单底下的线
  ::v-deep .el-menu.el-menu--horizontal {
    border-bottom: solid 1px transparent;
  }
}

::v-deep .eve-header__dialog {
  position: absolute;
  top: -6px;
  .el-dialog {
    margin: 0;
    position: absolute;
    right: 0;
    width: 300px !important ;
    margin-top: 0 !important;
    font-size: 14px;
  }
  .el-dialog__header {
    position: relative;
    padding: 5px 0;
    color: black;
  }
  .el-dialog__body {
    padding: 5px 20px 10px 20px;
  }

  .el-dialog__footer {
    padding: 0;
  }
}
</style>

 