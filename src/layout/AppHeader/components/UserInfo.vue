<template>
  <el-dropdown class="avatar-container">
    <div class="avatar-wrapper">
      <img :src="userAvatar" class="user-avatar" />
      <i class="el-icon-caret-bottom" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-if="username">
          <span style="display: block" :style="{ fontWeight: 500 }">用户名：{{ username }}</span>
        </el-dropdown-item>
        <el-dropdown-item divided @click="logout">
          <span style="display: block">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import defaultAvatar from '@/assets/logo.png';
import { defineComponent, computed, ref } from 'vue';
import { storage } from '@/utils';
import { currentUser } from '@/constants';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'UserInfo',
  setup() {
    const router = useRouter();
    const logout = () => {
      storage.clear();
      router.push('/login');
    };
    const userAvatar = ref(defaultAvatar);
    const userInfo = JSON.parse(storage.getItem(currentUser));
    const username = computed(() => userInfo.username || '');

    return {
      logout,
      userAvatar,
      username,
    };
  },
});
</script>

<style lang="scss" scoped>
.avatar-container {
  margin-right: 30px;
  .avatar-wrapper {
    margin-top: 5px;
    .user-avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      cursor: pointer;
    }

    .el-icon-caret-bottom {
      cursor: pointer;
      font-size: 12px;
    }
  }
}
</style>
