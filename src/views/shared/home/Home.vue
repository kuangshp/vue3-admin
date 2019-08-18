<template>
  <div>
    <h1>{{viewStore.title}}</h1>
    <el-button
      type="primary"
      @click="changeTitle"
    >切换标题</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import { IViewState } from '@/store/view';

@Component({})
export default class Home extends Vue {
  @State private viewStore!: IViewState;
  @Action('viewStore/setTitle') private changeTitleAc!: (params: string) => void;

  private changeTitle() {
    this.changeTitleAc('你好');
  }
}
</script>

<style scoped lang="less">
</style>