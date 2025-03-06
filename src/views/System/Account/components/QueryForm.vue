<template>
  <div class="form-content">
    <div class="form-panel">
      <el-form ref="queryRef" :model="formData" :inline="true" label-width="68px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="用户名" prop="username" style="width: 100%">
              <el-input v-model="formData.username" placeholder="请输用户名" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态" prop="status" style="width: 100%">
              <el-select
                v-model="formData.status"
                style="width: 100%"
                placeholder="请选择状态"
                clearable
              >
                <el-option label="正常" value="0"></el-option>
                <el-option label="禁用" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-divider style="height: 30px" direction="vertical" />
    <div :flex="'170px'" style="text-align: right">
      <el-space :size="18">
        <el-button type="primary" icon="Search" @click="handleQuery">查询</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-space>
    </div>
  </div>
</template>

<script setup>
  const emits = defineEmits(['searchHandler']);

  const generateFormData = () => {
    return {
      username: '',
      mobile: '',
      status: null,
    };
  };
  const formData = ref(generateFormData());

  // 搜索
  const handleQuery = () => {
    emits('searchHandler', formData.value);
  };

  // 重置
  const resetQuery = () => {
    formData.value = generateFormData();
    handleQuery();
  };
</script>

<style lang="scss" scoped>
  .form-content {
    display: flex;
    flex-direction: row;
    background-color: #fff;
    padding: 20px;
    padding-bottom: 2px;
    box-sizing: border-box;
    border-radius: 5px;
    .form-panel {
      flex: 1;
    }
  }
</style>
