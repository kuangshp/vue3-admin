<template>
  <div class="app-sidebar">
    <menus />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';
import { menus } from '@/statics/menus';

@Component({
  components: {},
})
export default class Sidebar extends Vue {
  private menus: any[] = menus;
  private isCollapse: boolean = false;

  private handleOpen(key: any, keyPath: any) {
    console.log(key, keyPath);
  }
  private handleClose(key: any, keyPath: any) {
    console.log(key, keyPath);
  }
}
</script>
<style lang="less">
</style>