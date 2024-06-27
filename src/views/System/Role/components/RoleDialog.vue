<template>
  <el-dialog
    v-if="dialogVisible"
    v-model="dialogVisible"
    width="50%"
    :title="title"
    append-to-body
    @close="cancelHandler"
  >
    <el-scrollbar :max-height="400">
      <el-form
        :model="formData"
        :rules="formRule"
        label-width="100px"
        ref="formRef"
      >
        <el-form-item
          label="名称"
          prop="name"
        >
          <el-input
            v-model="formData.name"
            placeholder="请输入名称"
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
          label="描述"
          prop="description"
        >
          <el-input
            type="textarea"
            v-model.trim="formData.description"
            placeholder="请输入描述"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="数据权限">
          <el-tree
            ref="treeRef"
            :data="resourceData"
            :props="defaultProps"
            show-checkbox
            node-key="id"
            @check="handleCheckChange"
            style="width: 100%"
          />
        </el-form-item>
      </el-form>
    </el-scrollbar>
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
import { RoleService, ResourcesService, RoleResourcesService } from '@/services';
import { getTreeList } from '@/utils';
const emits = defineEmits(['uploadTable']);
const dialogVisible = ref(false);
const cancelHandler = () => {
  formData.value = {
    name: null,
    sort: null,
    description: null,
  };
  dialogVisible.value = false;
};
const openDialog = async (rowData = {}) => {
  // TODO 这个地方要先显示出来,否则在获取树组件的ref为null
  dialogVisible.value = true;
  initCheckedNodeKey.value = [];
  await initAllResourcesList();
  if (Object.keys(rowData).length) {
    // 初始化已经授权的资源
    await initRoleResourceList(rowData.id);
    formData.value = {
      ...formData.value,
      ...rowData,
    };
    title.value = '编辑角色';
  } else {
    title.value = '新增角色';
  }
  // 避免打开的时候不操作直接提交资源清空
  allCheckedNodes.value = initCheckedNodeKey.value;
  console.log(initCheckedNodeKey.value, '1111')
  setCheckedKeys(initCheckedNodeKey.value);
};
const title = ref(null);
const formData = ref({
  name: null,
  sort: null,
  description: null,
});
const formRule = ref({
  name: [{ required: true, message: '必填字段', trigger: ['blur', 'change'] }],
});
const formRef = ref(null);
const confirmHandler = async () => {
  await formRef.value.validate(async (valid, fields) => {
    if (valid) {
      console.log(formData.value);
      const postData = {
        ...formData.value,
        resourceList: allCheckedNodes.value,
      };
      if (formData.value.id) {
        await RoleService.modifyByIdApi(formData.value.id, postData);
        ElMessage.success('修改成功');
      } else {
        await RoleService.createApi(postData);
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

// 树结构字段名
const defaultProps = {
  children: 'children',
  label: 'title',
};
// 全部的资源
const resourceData = ref([]);
// 获取选择的key
const treeRef = ref(null);
// 最后选中的
const allCheckedNodes = ref([]);
// 当前选中的
const initCheckedNodeKey = ref([]);
// 选择节点
const handleCheckChange = (data, checked, indeterminate) => {
  console.log(data, checked, indeterminate);
  const checkedNodes = treeRef.value.getCheckedNodes(false, true);
  console.log(
    checkedNodes.map((item) => item.id),
    '全部的'
  );
  allCheckedNodes.value = checkedNodes.map((item) => item.id);
};
// 处理树半选
const findTreeCheckedNodeKey = (checkedNodeList, treeData) => {
  let isExit = false;
  for (let item of treeData) {
    if (item?.children?.length > 0) {
      // 如果有children，那么说明它是父级
      isExit = false;
      findTreeCheckedNodeKey(checkedNodeList, item.children);
    } else {
      // 当它是子级时再进行匹配
      for (let it of checkedNodeList) {
        if (item.id == it) {
          // 菜单权限匹配
          initCheckedNodeKey.value.push(item.id);
        } else {
          // 且没有匹配成功
          isExit = true;
        }
      }
    }
  }
  if (isExit) {
    // 循环完成后进行判断
    return false;
  }
};

const setCheckedKeys = (defaultChecked = []) => {
  treeRef.value && treeRef.value.setCheckedKeys(defaultChecked);
};
// 获取全部的资源
const initAllResourcesList = async () => {
  const { result } = await ResourcesService.getCatalogApi({ catalogType: 2 });
  const treeData = getTreeList(result, 'id', 'parentId');
  resourceData.value = treeData;
};
// 根据角色id获取已经授权的资源
const initRoleResourceList = async (roleId) => {
  const { result } = await RoleResourcesService.getResourcesByRoleIdApi(roleId);
  findTreeCheckedNodeKey(
    result,
    resourceData.value
  );
};
// 暴漏方法出去
defineExpose({
  openDialog,
});
</script>

<style lang="scss" scoped></style>
