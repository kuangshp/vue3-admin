<template>
  <el-dialog
    v-if="dialogVisible"
    v-model="dialogVisible"
    :title="title"
    @close="cancelHandler"
    draggable
  >
    <div>
      <el-scrollbar :max-height="400">
        <el-form :model="formData" :rules="formRule" label-width="100px" ref="formRef">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="formData.username" placeholder="请输入用户名" clearable></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model="formData.mobile" placeholder="请输入手机号码" clearable></el-input>
          </el-form-item>
          <el-form-item label="电邮地址" prop="email">
            <el-input v-model="formData.email" placeholder="请输入电邮地址" clearable></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio :value="0">正常</el-radio>
            <el-radio :value="1">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
          <el-form-item label="角色列表" prop="roleIdList">
            <el-checkbox-group v-model="formData.roleIdList">
              <el-checkbox v-for="(item, index) of roleList" :key="index" :value="item.id">
                {{ item.name }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </div>
    <template #footer>
      <el-button type="default" style="margin-right: 10px" @click="cancelHandler">取消</el-button>
      <el-button type="primary" @click="confirmHandler">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
  import { ref,defineEmits } from 'vue';
  import { RoleService, AccountRoleService, AccountService } from '@/api';

  const emits = defineEmits(['uploadTable']);
  const generateFormData = () => {
    return {
      username: '',
      mobile: '',
      email: '',
      status:0,
      roleIdList: [],
    };
  };
  const formData = ref(generateFormData());
  const formRule = ref({
    username: [{ required: true, message: '必填字段', trigger: ['blur', 'change'] }],
  });
  const title = ref('新增账号');
  const dialogVisible = ref(false);
  const pageType = ref('create');
  const openDialog = async (type, rowData = {}) => {
    pageType.value = type;
    // 获取全部的角色
    await initRole();
    if (type === 'edit') {
      formData.value = {
        ...formData.value,
        ...rowData,
      };
      await getAccountRoleList(rowData.id);
      title.value = '编辑账号';
    } else {
      title.value = '新增账号';
    }
    dialogVisible.value = true;
  };

  // 获取全部的角色
  const roleList = ref([]);
  const initRole = async () => {
    const { result } = await RoleService.getListApi();
    roleList.value = result;
  };
  // 获取已经授权的角色列表
  const getAccountRoleList = async (accountId) => {
    const { result } = await AccountRoleService.getAccountRoleIdListApi(accountId);
    formData.value = {
      ...formData.value,
      roleIdList: result,
    };
  };
  const cancelHandler = () => {
    formData.value = generateFormData();
    dialogVisible.value = false;
  };
  const formRef = ref(null);
  const confirmHandler = async () => {
    await formRef.value.validate(async (valid, fields) => {
      if (valid) {
        if (pageType.value === 'edit') {
          await AccountService.modifyByIdApi(formData.value.id, formData.value);
          ElMessage.success('修改成功');
        } else {
          await AccountService.createApi(formData.value);
          ElMessage.success('创建成功');
        }
        emits('uploadTable');
        cancelHandler();
      }
    });
  };
  defineExpose({
    openDialog,
  });
</script>
<style lang="scss" scoped></style>
