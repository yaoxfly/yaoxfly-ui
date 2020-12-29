/**@description 滚动混入些参数
 * @author yx
 */
export default {
  props: {
    //滚动菜单的宽度
    width: {
      type: String,
      default: () => '100%'
    },

    //是否开始滚动
    scroll: {
      type: Boolean,
      default: () => true
    },

    // 当前激活菜单的标识--可不在外面设置已经根据路由变化而变化了
    defaultActive: {
      type: String,
      default: 'dialog'
    },

    //菜单的数据
    data: {
      type: Array,
      default: () => [
        //   {
        //   path: 'dialog', //唯一key值
        //   type: 'item', // 最底层的菜单
        //   text: '主页'// 菜单名
        // },
        // {
        //   path: 'dialog1',
        //   type: 'item',
        //   text: '行政许可'
        // },
        // {
        //   path: 'dialog2',
        //   type: 'item',
        //   text: '市场监管'
        // },
        // {
        //   path: 'dialog3',
        //   type: 'item',
        //   text: '行政执法'
        // },
        // {
        //   path: 'dialog4',
        //   type: 'item',
        //   text: '知识产权'
        // },
        // {
        //   path: 'dialog5',
        //   type: 'item',
        //   text: '质量监管'
        // },
        // {
        //   path: 'http://www.baidu.com1',
        //   type: 'item',
        //   text: '业务应用'
        // },
        // {
        //   path: 'http://www.baidu.com测试3',
        //   type: 'submenu',
        //   text: '应用支撑',
        //   children: [
        //     {
        //       path: 'http://www.baidu.com3331',
        //       type: 'item',
        //       text: '测试1',

        //     },
        //     {
        //       path: 'http://www.baidu.com3332',
        //       type: 'item',
        //       text: '测试2',

        //     },
        //     {
        //       path: 'http://www.baidu.com3333',
        //       type: 'item',
        //       text: '测试3',

        //     }
        //   ]
        // },

        // {
        //   path: 'http://www.baidu.com1211',
        //   type: 'submenu',
        //   text: '测试4',
        //   children: [
        //     {
        //       path: 'http://www.baidu.com33311',
        //       type: 'submenu',
        //       text: '测试2',
        //       children: [
        //         {
        //           path: 'http://www.baidu.com3331qq1',
        //           type: 'item',
        //           text: '测试2'
        //         }
        //       ]
        //     }
        //   ]
        // }
      ]
    },
    //滚动显示的个数
    slidesPerView: {
      type: Number,
      default: () => 5
    },

    //背景颜色 
    backgroundColor: {
      type: String,
      default: () => 'transparent'
    },
    //字体颜色
    textColor: {
      type: String,
      default: () => 'black'
    },
    //当前激活菜单的文字颜色
    activeTextColor: {
      type: String,
      default: () => '#409eff'
    },
    //默认蓝色 swiper-button-white(白)/swiper-button-black(黑)
    swiperButtonColor: {
      type: String,
      default: () => ''
    },
    //是否显示底部的线
    bottomBorder: {
      type: Boolean,
      default: () => false
    }
  },

  methods: {
    /**@description  上一页
     * @author yx
     */
    prev () {
      this.swiper.slidePrev()
    },
    /**@description  下一页
     * @author yx
     */
    next () {
      this.swiper.slideNext()
    },

    // 菜单激活回调--可用来做动态面包屑
    select (index, indexPath, data) {
      const menu = this.findPath(index, data)
      const value = menu.length > 0 ? menu[0][this.tempConfig.text] : ''
      this.$emit('select', {
        index: index,
        indexPath: indexPath,
        text: value,
        currentData: menu.length > 0 ? menu[0] : [],
        data: data,
      })
    },

    /**@description  根据路由查找菜单数据中匹配路径的数组
       * @author yx
       * @param  {String}  path path 路径
       * @param  {Array}  data 菜单数据
     */
    findPath (path, data) {
      data = Array.from(data)
      let arr = []
      data.some(item => {
        if (item[this.tempConfig.path] === path) {
          arr.push(item)
          return true
        } else if (item[this.tempConfig.children]) {
          arr = this.findPath(path, [this.tempConfig.children])
          if (arr.length > 0) { //递归退出条件 要不断的退出n个循环递归，否则循环会继续执行，但不会陷入死循环。
            return true
          } else {
            return false
          }
        }
      })
      return arr
    },

  }

}