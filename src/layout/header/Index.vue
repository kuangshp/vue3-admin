<template>
  <div class="app-header">
    <div class="logo">
      <router-link to="/">XX公司权限管理平台</router-link>
    </div>
    <!-- 头部切换左侧菜单 -->
    <div
      class="menus"
      @click="toogleSidebar"
    >
      <i class="fas fa-bars"></i>
    </div>
    <!-- 头部导航 -->
    <div class="header-info">
      <breadcrumb />
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

<script>
import Breadcrumb from './../breadcrumb/Index.vue';
import { currentUser, authToken } from '@/config';
import { storage } from '@/utils';
import { mapActions } from 'vuex';
export default {
  data () {
    return {
      username: '',
    }
  },
  methods: {
    logout () {
      storage.removeItem(authToken);
      storage.removeItem(currentUser);
      this.$router.push({ name: 'login' });
    },
    ...mapActions(['toogleSidebar'])
  },
  mounted () {
    this.username = storage.getItem(currentUser);
  },
  components: {
    Breadcrumb,
  }
}
</script>

<style lang="scss" scoped>
.app-header {
  height: 50px;
  background: #3273dc;
  display: flex;
  flex-direction: row;
  line-height: 50px;
  color: #fff;
  .menus {
    width: 30px;
    height: 30px;
    font-size: 25px;
    cursor: pointer;
  }
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