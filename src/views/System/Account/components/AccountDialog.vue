<template>
  <el-dialog
    v-if="dialogVisible"
    v-model="dialogVisible"
    :title="title"
    @close="cancelHandler"
  >
    <template #default>
      <el-scrollbar :max-height="400">
        <el-form
          :model="formData"
          :rules="formRule"
          label-width="100px"
          ref="formRef"
        >
          <el-form-item
            label="账号名称"
            prop="username"
          >
            <el-input
              v-model="formData.username"
              placeholder="请输入账号名称"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            label="手机号码"
            prop="mobile"
          >
            <el-input
              v-model="formData.mobile"
              placeholder="请输入手机号码"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            label="电邮地址"
            prop="email"
          >
            <el-input
              v-model="formData.email"
              placeholder="请输入电邮地址"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            label="排序"
            prop="sort"
          >
            <InputNumber
              v-model.number="formData.sort"
              placeholder="请输入排序数字"
              clearable
            ></InputNumber>
          </el-form-item>
          <el-form-item
            label="角色"
            prop="roleIdList"
          >
            <el-checkbox-group v-model="formData.roleIdList">
              <el-checkbox
                v-for="(item, index) of roleList"
                :key="index"
                :label="item.id"
              >
                {{ item.name }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </template>
    <template #footer>
      <el-button
        type="default"
        style="margin-right: 10px"
        @click="cancelHandler"
      >取消</el-button>
      <el-button
        type="primary"
        @click="confirmHandler"
      >确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, defineEmits, defineExpose } from 'vue';
import { AccountService, RoleService, AccountRoleService } from '@/services';
import { getTreeList } from '@/utils';
import { ElMessage } from 'element-plus';
const emits = defineEmits(['uploadTable']);
const dialogVisible = ref(false);
const cancelHandler = () => {
  formData.value = {
    username: null,
    mobile: null,
    email: null,
    sort: null,
    roleIdList: [],
  };
  dialogVisible.value = false;
};
const openDialog = async (rowData = {}) => {
  await initRole();
  if (Object.keys(rowData).length) {
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
const title = ref(null);
const formData = ref({
  username: null,
  mobile: null,
  email: null,
  sort: null,
  roleIdList: [],
});
const formRule = ref({
  username: [{ required: true, message: '必填字段', trigger: ['blur', 'change'] }],
  roleIdList: [{ required: true, message: '必填字段', trigger: ['blur', 'change'] }],
});
const formRef = ref(null);
const confirmHandler = async () => {
  await formRef.value.validate(async (valid, fields) => {
    if (valid) {
      console.log(formData.value);
      if (formData.value.id) {
        await AccountService.modifyByIdApi(formData.value.id, formData.value);
        ElMessage.success('修改成功');
      } else {
        await AccountService.createApi(formData.value);
        ElMessage.success('创建成功');
      }
      emits('uploadTable');
      cancelHandler();
    } else {
      console.log('error submit!', fields);
      ElMessage.error('请补充资料');
    }
  });
};

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
// 暴漏方法出去
defineExpose({
  openDialog,
});
</script>

<style lang="scss" scoped></style>
