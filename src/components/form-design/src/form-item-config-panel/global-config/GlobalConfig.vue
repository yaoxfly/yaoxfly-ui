<template>
  <div style="height: 100%">
    <config-form is-update-global label-position="top" :config="globalConfigForm" root="common"/>
  </div>
</template>

<script>
import { global, globalConfigForm } from './global-config-form'
import { mapMutations } from 'vuex'
import ConfigForm from '../config-form'

export default {
  components: {
    ConfigForm
  },
  data () {
    return {
      globalConfigForm
    }
  },
  created () {
    this.initGlobal(global)
  },
  methods: {
    ...mapMutations({
      initGlobal: 'FormDesign/INIT_GLOBAL'
    })
  }
}
</script>