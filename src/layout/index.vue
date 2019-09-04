<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Layout extends Vue {
  @Prop() private msg!: string;
}
</script>

<style scoped lang="less">
</style>