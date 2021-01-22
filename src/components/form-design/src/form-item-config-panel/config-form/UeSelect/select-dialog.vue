<template>
  <el-dialog
    :visible.sync="show"
    append-to-body
    custom-class="vertical-center-modal"
    :width="900 + 'px'"
    :top="`${30}px`"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @open="handleOpenDialog"
    @close="handleCloseDialog"
    @on-cancel="handleCloseDialog">
    <div slot="title" :style="headerStyle">
      {{ title }}
    </div>
    <div class="fields-selections">
      <el-checkbox style="margin-left: 5px" :disabled="selections.length === 0" :value="value.length === selections.length && selections.length > 0" @input="handleSelectAll" :indeterminate="isIndeterminate">全选</el-checkbox>
      <el-checkbox-group
        :value="value"
        @input="handleInput"
        size="small"
        style="width: 100%"
      >
        <el-checkbox class="selection" v-for="(item, index) in selections" :label="item.value" :key="`check_group_selection_${index}`">{{item.label}}</el-checkbox>
      </el-checkbox-group>
    </div>
  </el-dialog>
</template>
  
<script>
export default {
  props: {
    selections: {
      type: Array,
      default: () => ([])
    },
    title: {
      type: String,
      default: ''
    },
    value: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    isIndeterminate() {
      return this.value.length > 0 && this.value.length !== this.selections.length
    },
    headerStyle() {
      return {
        fontSize: '14px',
        fontWeight: 'bold',
        textAlign: 'left'
      }
    },
  },
  methods: {
    handleOpenDialog() {},
    handleCloseDialog() {},
    openDialog() {
      this.show = true
    },
    handleInput(v) {
      this.$emit('input', v)
    },
    handleSelectAll(v) {
      if (v) {
        this.$emit('input', this.selections.map(item => item.value))
      } else {
        this.$emit('input', [])
      }
    }
  }
}
</script>

<style lang="scss">
.fields-selections {
  .selection {
    margin: 5px;
    .el-checkbox__label {
      padding-left: 10x;
    }
  }
}
</style>