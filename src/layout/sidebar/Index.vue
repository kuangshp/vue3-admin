<template>
  <div class="app-sidebar">
    <menus />
  </div>
</template>

<script>
import { menus } from '@/statics/menus';
export default {
  data () {
    return {
      menus,
      isCollapse: false,
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>