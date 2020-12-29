<template>
  <div>
    <eve-scroll :data="data" @select="select" bottom-border> </eve-scroll>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: [
        {
          path: 'dialog', //唯一key值
          type: 'item', // 最底层的菜单
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
          type: 'submenu',
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

        {
          path: 'http://www.baidu.com1211',
          type: 'submenu',
          text: '测试4',
          children: [
            {
              path: 'http://www.baidu.com33311',
              type: 'submenu',
              text: '测试2',
              children: [
                {
                  path: 'http://www.baidu.com3331qq1',
                  type: 'item',
                  text: '测试2'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  mounted () { },
  methods: {
    //点击菜单回调
    select (emit) {
      console.log(emit, 11)
    }
  }
}
</script>


