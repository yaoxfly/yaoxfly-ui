<template>
  <div>
    <eve-scroll :data="data" @select="select">
      <template slot-scope="{ data, index, row }">
        <img :src="row.img" />
      </template>
    </eve-scroll>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: [
        {
          img: require('../../assets/image/header/scroll-test.png')
        },
        {
          img: require('../../assets/image/header/scroll-test.png')
        },
        {
          img: require('../../assets/image/header/scroll-test.png')
        },
        {
          img: require('../../assets/image/header/scroll-test.png')
        },
        {
          img: require('../../assets/image/header/scroll-test.png')
        },
        {
          img: require('../../assets/image/header/scroll-test.png')
        }, {
          img: require('../../assets/image/header/scroll-test.png')
        },
        {
          img: require('../../assets/image/header/scroll-test.png')
        },
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


