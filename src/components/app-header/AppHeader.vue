<template>
  <div class="app-header">
    <div class="logo">
      <router-link to="/">主页</router-link>
    </div>
    <div class="header-info">
      <app-breadcrumb />
    </div>
    <div class="userinfo-submenu">
      <el-dropdown>
        <span class="el-dropdown-link">
          <span>{{username}}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item>个人资料</el-dropdown-item>
          <el-dropdown-item
            divided
            @click.native="logout"
          >退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';
import { OperatedProduct } from '@/config';
import { storage } from '@/utils';

@Component({
  components: {},
})
export default class AppHeader extends Vue {
  @Provide() private username: string = '';

  @Provide() private logout(): void {
    storage.removeItem(OperatedProduct);
    this.$router.push({ name: 'login' });
  }

  private mounted() {
    this.username = storage.getItem(OperatedProduct);
  }
}
</script>
<style lang="less">
.app-header {
  height: 50px;
  background: #3273dc;
  display: flex;
  flex-direction: row;
  line-height: 50px;
  color: #fff;
  .logo {
    width: 240px;
    height: inherit;
    text-align: center;
    a {
      text-decoration: none;
      color: #fff;
    }
  }
  .header-info {
    flex: 1;
    margin: 0 10px;
    line-height: 50px;
  }
  .userinfo-submenu {
    width: 200px;
    height: inherit;
    text-align: right;
    margin-right: 2rem;
    .el-dropdown {
      color: #fff;
    }
  }
}
</style>