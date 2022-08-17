<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <svg-icon icon="language" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zhCN'" command="zhCN"> 中文 </el-dropdown-item>
        <el-dropdown-item :disabled="language === 'en'" command="en"> English </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
  import { useI18n } from 'vue-i18n';
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import { ElMessage } from 'element-plus';

  const store = useStore();
  const language = computed(() => store.getters.language);

  // 切换语言的方法
  const i18n = useI18n();
  const handleSetLanguage = (lang) => {
    // 切换 i18n 的 locale
    i18n.locale.value = lang;
    // 修改 vuex 中保存的 language
    store.commit('app/setLanguage', lang);
    ElMessage.success('切换成功');
  };
</script>

<style lang="scss" scoped></style>
