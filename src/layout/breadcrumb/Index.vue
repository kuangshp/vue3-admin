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

<script>
export default {
  data () {
    return {
      breadcrumbData: [],
    }
  },
  methods: {
    getRouteMatched () {
      const matched = this.$route.matched.filter((item) => item.name);
      this.breadcrumbData = this.$route.name === 'home'
        ? matched
        : [
          {
            name: '首页',
            path: '/home',
            meta: { title: '首页' },
          },
        ].concat(matched);
    }
  },
  mounted () {
    this.getRouteMatched();
  },
  watch: {
    $route () {
      this.getRouteMatched()
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  height: 50px;
  line-height: 50px;
  color: #fff !important;
  .el-breadcrumb {
    line-height: 50px;
    ::v-deep .el-breadcrumb__item {
      .el-breadcrumb__inner.is-link {
        color: #fff;
      }
    }
  }
}
</style>