<template>
  <div>
    <eve-breadcrumb :menu="menu"></eve-breadcrumb>
  </div>
</template>
<script>

export default {
  name: 'Breadcrumb',
  data () {
    //菜单数据
    return {
      menu: [{
        text: 'Breadcrumb',
        path: '/breadcrumb'
      },
      {
        text: '安装',
      }]
    }
  },
  mounted () {

  },

  methods: {

  }
}
</script>
