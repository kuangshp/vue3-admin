<template>
  <el-dropdown class="avatar-container">
    <div class="avatar-wrapper">
      {{ username }}
      <i class="el-icon-caret-bottom" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
          <span>个人中心</span>
        </el-dropdown-item>
        <el-dropdown-item divided @click="logout">
          <span style="display: block">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
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
    const userInfo = JSON.parse(storage.getItem(currentUser));
    const username = computed(() => userInfo.username || '');

    return {
      logout,
      username,
    };
  },
});
</script>

<style lang="scss" scoped>
.avatar-container {
  margin-right: 30px;
  .avatar-wrapper {
    .el-icon-caret-bottom {
      cursor: pointer;
      font-size: 12px;
    }
  }
}
</style>
