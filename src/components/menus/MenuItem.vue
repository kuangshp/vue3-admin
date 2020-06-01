<template>
  <el-submenu
    v-if="item.children && item.children.length"
    :index="item.index"
  >
    <template slot="title">{{ item.title }}</template>
    <!-- 递归使用该组件 -->
    <template v-for="(m, i) in item.children">
      <MenuItem
        :item="m"
        :key="i"
      />
    </template>
  </el-submenu>
  <el-menu-item
    v-else
    :index="item.index"
  >
    <i :class="item.icon"></i>
    <span slot="title">{{ item.title }}</span>
  </el-menu-item>
</template>

<script>

export default {
  props: {
    item: Object,
    default: () => { },
  }
}
</script>

<style scoped lang="scss">
.router {
  color: #e5e5e5;
  text-decoration: none;
}
.active {
  color: #f00;
}
</style>
