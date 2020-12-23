
<template>
  <div>
    <eve-rich-text
      v-model="value"
      @on-click="onClick"
      :init="init"
    ></eve-rich-text>
  </div>
</template>
<script>
export default {
  name: 'RichText',
  data () {
    return {
      value: '',
      init: {
        height: 327
      }
    }
  },
  mounted () {

  },
  methods: {
    //聚焦事件
    onClick () {
      console.log(this.value)
    }
  }
}
</script>


