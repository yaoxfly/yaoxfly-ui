
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
      value: '1',
      init: {
        plugins: ['help'],
        ax_wordlimit_num: 10,
        ax_wordlimit_callback: (editor, txt, num) => {
          alert(1)
        }
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


