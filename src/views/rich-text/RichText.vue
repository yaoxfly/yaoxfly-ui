<template>
  <div>
    <div class="markdown-body">
      <Md></Md>
    </div>
  </div>
</template>

<script>
import Md from './RichText.md'
export default {
  name: 'RichText',
  components: {
    Md
  }
}
</script>
