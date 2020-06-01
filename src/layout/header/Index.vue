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
      <!-- 全屏显示 -->
      <div
        class="btn-fullscreen"
        @click="handleFullScreen"
      >
        <el-tooltip
          effect="dark"
          :content="fullscreen?`取消全屏`:`全屏`"
          placement="bottom"
        >
          <i class="el-icon-rank"></i>
        </el-tooltip>
      </div>
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
      fullscreen: false,
    }
  },
  methods: {
    logout () {
      storage.removeItem(authToken);
      storage.removeItem(currentUser);
      this.$router.push({ name: 'login' });
    },
    // 全屏事件
    handleFullScreen () {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
    ...mapActions(['toggleSidebar'])
  },
  computed: {
    ...mapState({
      sidebarOpened: state => state.view.sidebarOpened
    })
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
      margin-bottom: 4px;
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
    display: flex;
    flex-direction: row;
    .btn-fullscreen {
      transform: rotate(45deg);
      margin-right: 5px;
      font-size: 24px;
      cursor: pointer;
    }
    .el-dropdown {
      color: #fff;
      flex: 1;
    }
  }
}
</style>