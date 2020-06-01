<template>
  <div class="app-header">
    <div class="logo">
      <router-link to="/">
        <div
          class="log1"
          v-if="sidebarOpened"
        ></div>
        <div
          class="log2"
          v-else
        ></div>
      </router-link>
    </div>
    <!-- 头部切换左侧菜单 -->
    <div
      class="menus"
      @click="toggleSidebar"
    >
      <i
        v-if="sidebarOpened"
        class="trigger el-icon-s-fold"
      ></i>
      <i
        v-else
        class="trigger el-icon-s-unfold"
      ></i>
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
import { mapActions, mapState } from 'vuex';
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
    ...mapActions(['toggleSidebar'])
  },
  computed: {
    ...mapState({
      sidebarOpened: state => state.view.sidebarOpened
    })
  },
  mounted () {
    console.log(this.sidebarOpened, '==')
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
  .logo {
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .log1 {
      width: 240px;
      height: 40px;
      background: rgba(255, 255, 255, 0.2);
    }
    .log2 {
      width: 65px;
      height: 40px;
      background: rgba(255, 255, 255, 0.2);
    }
  }
  .menus {
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 5px;
    .trigger {
      color: #fff;
      font-size: 30px;
      width: 35px;
      height: 35px;
      padding: 5px;
      margin-top: 4px;
      cursor: pointer;
    }
    .trigger:hover {
      background: #40a9ff;
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