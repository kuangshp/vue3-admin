<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
export default class App extends Vue {}
</script>
<style lang="less">
*{
  margin: 0;
  padding: 0;
}
</style>
