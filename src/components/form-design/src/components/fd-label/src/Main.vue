<template>
  <div>
    <el-divider :content-position="contentPosition">{{ label }}</el-divider>
  </div>
</template>

<script>
export default {
  name: 'FdLabel',
  props: {
    label: {
      type: String,
      default: ''
    },
    // left / right / center
    contentPosition: {
      type: String,
      default: ''
    }
  }
}
</script>
