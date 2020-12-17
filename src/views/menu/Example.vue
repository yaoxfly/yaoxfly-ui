<template>
  <div>
    <eve-menu :data="data" :top="55"> </eve-menu>
  </div>
</template>
<script>

export default {
  data () {
    return {
      data: [
        {
          path: '',
          type: 'submenu',
          text: '菜单1',
          children: [
            {
              title: '开发指南',
              path: 'main',
              type: 'item', // 子菜单
              icon: 'el-icon-location',
              text: 'Main',
            }
          ],
        },
        {
          path: '/',
          type: 'item',
          text: '开始'
        },
      ]

    }
  },

  methods: {

  }
}
</script>


