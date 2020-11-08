<template>
  <div class="comps-panel">
    <div class="comps-category-label">
      基础字段类型
    </div>
    <vue-draggable tag="div" class="drag-wrapper" v-bind="{ group:{ name: 'formDesign', pull:'clone', put: false }, sort: false, ghostClass: 'ghost' }" :list="commonComps">
      <div v-for="item in commonComps" :key="item.id" class="item">
        {{ item.label }}
      </div>
    </vue-draggable>
    <div class="comps-category-label">
      高级类型
    </div>
    <vue-draggable tag="div" class="drag-wrapper" v-bind="{ group:{ name: 'formDesign', pull:'clone', put: false }, sort: false, ghostClass: 'ghost' }" :list="layoutComps">
      <div v-for="item in layoutComps" :key="item.id" class="item">
        {{ item.label }}
      </div>
    </vue-draggable>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import VueDraggable from 'vuedraggable'

export default {
  components: {
    VueDraggable
  },
  computed: {
    ...mapState({
      commonComps: state => state.FormDesign.commonComps,
      layoutComps: state => state.FormDesign.layoutComps
    })
  }
}
</script>

<style lang="scss" scoped>
$borderColor: #000;
.comps-panel {
  width: 100%;
  .comps-category-label {
    line-height: 40px;
    
  }
  .drag-wrapper {
    display: flex;
    .item {
      width: 50%;
      // font-size: 12px;
      line-height: 35px;
      text-align: center;
      border: 1px solid rgba(0, 0, 0, 0.125);
      cursor: pointer;
    }
  }
}
</style>