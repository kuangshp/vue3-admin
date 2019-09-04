<template>
  <div>
    <el-submenu
      v-if="item.children.length"
      :index="item.url"
    >
      <template slot="title">{{ item.name }}</template>
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
      :index="item.url"
    >
      <router-link
        :to="{ name: item.url }"
        class="router"
      >
        <li>{{ item.name }}</li>
      </router-link>

    </el-menu-item>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'MenuItem',
})
export default class MenuItem extends Vue {
  @Prop() private item!: () => {};
}
</script>

<style scoped lang="less">
.router {
  color: #e5e5e5;
  text-decoration: none;
}
.active {
  color: #f00;
}
</style>
