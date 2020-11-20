<template>
  <div class="layout">
    <eve-menu :data="data" :top='0'></eve-menu>
    <div class="layout__router-in-main">
      <router-view class="layout__router" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Layout',
  data () {
    return {
      data: [

        {
          path: 'use',
          type: 'item',
          text: '安装'
        },
        {
          path: 'dialog',
          type: 'item',
          text: 'Dialog'
        },
        {
          path: 'tablePagination',
          type: 'item',
          text: 'TablePagination'
        }
      ]
    }
  }
}
</script>

<style lang='scss' scoped>


.layout {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  padding-left: 200px;
  overflow: hidden;
  height: 100%;
  &__router-in-main {
    width: calc(100% - 50px);
    height: 100vh;
    padding-bottom:30px ;
    overflow: hidden;
    overflow-y: auto;
  }
  &__router {
    margin-left: 50px;
    margin-top: 10px;
  }
}
</style>
