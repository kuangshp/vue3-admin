<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="(item, index) of breadcrumbData"
        :key="index"
        :to="{ path: item.path }"
      >{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Provide } from 'vue-property-decorator';

@Component({})
export default class Breadcrumb extends Vue {
  private breadcrumbData: any[] = [];

  private getRouteMatched(): void {
    const matched: any = this.$route.matched.filter((item: { [propsName: string]: any }) => item.name);
    this.breadcrumbData = this.$route.name === 'home'
      ? matched
      : [
        {
          name: 'home',
          path: '/home',
          meta: { title: 'Home' },
        },
      ].concat(matched);
  }
  private mounted() {
    this.getRouteMatched();
  }

  @Watch('$route')
  private aa() {
    this.getRouteMatched();
  }
}
</script>

<style lang="less">
.breadcrumb {
  height: 50px;
  line-height: 50px;
  color: #fff !important;
  .el-breadcrumb {
    line-height: 50px;
    .el-breadcrumb__item {
      .el-breadcrumb__inner.is-link {
        color: #fff;
      }
    }
  }
}
</style>
