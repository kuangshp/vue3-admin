<template>
  <CustomModal v-if="dialogVisible" v-model="dialogVisible" :title="title" @close="cancelHandler">
    <div>
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
        <el-form-item v-if="pageType != 'create'" label="列表状态" prop="status">
          <el-select
            v-model="formData.status"
            style="width: 100%"
            placeholder="请选择列表状态"
            clearable
          >
            <el-option label="正常" :value="1"></el-option>
            <el-option label="禁用" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色列表" prop="roleIdList">
          <el-checkbox-group v-model="formData.roleIdList">
            <el-checkbox v-for="(item, index) of roleList" :key="index" :value="item.id">
              {{ item.name }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <el-button type="default" style="margin-right: 10px" @click="cancelHandler">取消</el-button>
      <el-button type="primary" @click="confirmHandler">确认</el-button>
    </template>
  </CustomModal>
</template>

<script setup lang="ts">
  import { ref, defineEmits } from 'vue';
  import { RoleService, AccountRoleService, AccountService } from '@/api';
  import { ElMessage } from 'element-plus';
  import type { ElForm } from 'element-plus';
  import type { FormData, RoleType } from '../types';

  const emits = defineEmits<{
    uploadTable: [];
  }>();

  const generateFormData = (): FormData => {
    return {
      username: '',
      mobile: '',
      email: '',
      status: 1,
      roleIdList: [],
    };
  };

  const formData = ref<FormData>(generateFormData());
  const formRule = ref<
    Record<
      string,
      Array<{
        required: boolean;
        message: string;
        trigger: string[];
      }>
    >
  >({
    username: [{ required: true, message: '必填字段', trigger: ['blur', 'change'] }],
  });
  const title = ref<string>('新增账号');
  const dialogVisible = ref<boolean>(false);
  const pageType = ref<'create' | 'edit'>('create');
  const roleList = ref<RoleType[]>([]);
  const formRef = ref<InstanceType<typeof ElForm> | null>(null);

  const openDialog = async (
    type: 'create' | 'edit',
    rowData: Partial<FormData> = {}
  ): Promise<void> => {
    pageType.value = type;
    // 获取全部的角色
    await initRole();
    if (type === 'edit') {
      formData.value = {
        ...formData.value,
        ...rowData,
      };
      await getAccountRoleList(rowData.id as number);
      title.value = '编辑账号';
    } else {
      title.value = '新增账号';
    }
    dialogVisible.value = true;
  };

  // 获取全部的角色
  const initRole = async (): Promise<void> => {
    const { result } = await RoleService.getListApi();
    roleList.value = result;
  };

  // 获取已经授权的角色列表
  const getAccountRoleList = async (accountId: number): Promise<void> => {
    const { result } = await AccountRoleService.getAccountRoleIdListApi(accountId);
    formData.value = {
      ...formData.value,
      roleIdList: result,
    };
  };

  const cancelHandler = (): void => {
    formData.value = generateFormData();
    dialogVisible.value = false;
  };

  const confirmHandler = async (): Promise<void> => {
    formRef.value?.validate(async (valid) => {
      if (valid) {
        if (pageType.value === 'edit') {
          await AccountService.modifyByIdApi(formData.value.id as number, formData.value);
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

