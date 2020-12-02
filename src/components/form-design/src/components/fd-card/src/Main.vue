<template>
  <el-card :shadow="shadow" :body-style="bodyStyle">
    <div slot="header">
      {{ header }}
    </div>
    <slot />
  </el-card>
</template>

<script>
export default {
  name: 'FdCard',
  props: {
    header: {
      type: String,
      default: '卡片标题'
    },
    shadow: {
      type: String,
      default: 'never'
    }
  },
  computed: {
    bodyStyle() {
      return {
        padding: '0'
      }
    }
  }
}
</script>
