<template>
  <div class="common-group">
    <slot name="title" />
    <div class="common-group-body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UeCommonGroup',
  props: {
  }
}
</script>

<style lang="scss">
.common-group {
  .common-group-body {
    // background: #eee;
    // border-radius: 12px;
    // padding: 0 12px;
  }
  // border-bottom: 1px dashed red;
  // margin-top: 10px;
  // padding-top: 10px;
  // border-top: 1px solid #cecece;
  // padding-bottom: 5px;
  &:last-child {
    // margin-bottom: 10px;
  }
}
</style>
