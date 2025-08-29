<template>
  <CustomModal
    v-if="dialogVisible"
    v-model="dialogVisible"
    width="50%"
    :title="title"
    append-to-body
    @close="cancelHandler"
  >
    <el-form :model="formData" :rules="formRule" label-width="100px" ref="formRef">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入角色名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="角色排序" prop="sort">
        <el-input
          v-model.number="formData.sort"
          placeholder="请输入排序数字"
          clearable
          v-number-only="'number'"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="description">
        <el-input
          type="textarea"
          v-model.trim="formData.description"
          placeholder="请输入角色描述"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item v-if="pageType != 'create'" label="列表状态" prop="status">
        <el-select v-model="formData.status" style="width: 100%" placeholder="请选择状态" clearable>
          <el-option label="正常" :value="1"></el-option>
          <el-option label="禁用" :value="2"></el-option>
        </el-select>
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
    <template #footer>
      <el-button type="default" style="margin-right: 10px" @click="cancelHandler">取消</el-button>
      <el-button type="primary" @click="confirmHandler">确认</el-button>
    </template>
  </CustomModal>
</template>

<script setup lang="ts">
  import { ref, defineEmits } from 'vue';
  import { ResourcesService, RoleService, RoleResourcesService } from '@/api';
  import { getTreeList, sortTree } from '@/utils/tree';
  import { ElMessage } from 'element-plus';
  import type { ElForm, ElTree } from 'element-plus';
  import type { FormData, ResourceNode } from '../types';

  const emits = defineEmits<{
    uploadTable: [];
  }>();

  const dialogVisible = ref<boolean>(false);
  const pageType = ref<'create' | 'edit'>('create');
  const title = ref<string | null>(null);
  const formRef = ref<InstanceType<typeof ElForm> | null>(null);
  const treeRef = ref<InstanceType<typeof ElTree> | null>(null);
  const allCheckedNodes = ref<number[]>([]);
  const initCheckedNodeKey = ref<number[]>([]);
  const resourceData = ref<ResourceNode[]>([]);

  // 树结构字段名
  const defaultProps = {
    children: 'children',
    label: 'title',
  };

  const generateFormData = (): FormData => {
    return {
      name: null,
      sort: null,
      description: null,
      status: 1,
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
    name: [{ required: true, message: '必填字段', trigger: ['blur', 'change'] }],
    sort: [{ required: true, message: '必填字段', trigger: ['blur', 'change'] }],
  });

  const cancelHandler = (): void => {
    formData.value = generateFormData();
    dialogVisible.value = false;
  };

  const openDialog = async (
    type: 'create' | 'edit',
    rowData: Partial<FormData> = {}
  ): Promise<void> => {
    pageType.value = type;
    // TODO 这个地方要先显示出来,否则在获取树组件的ref为null
    dialogVisible.value = true;
    initCheckedNodeKey.value = [];
    await initAllResourcesList();
    if (type == 'edit') {
      // 初始化已经授权的资源
      await initRoleResourceList(rowData.id as number);
      formData.value = {
        ...formData.value,
        ...rowData,
      };
      title.value = '编辑角色';
    } else {
      title.value = '新增角色';
    }
    // 避免打开的时候不操作直接提交资源清空
    allCheckedNodes.value = [...initCheckedNodeKey.value];
    setCheckedKeys(initCheckedNodeKey.value);
  };

  const confirmHandler = async (): Promise<void> => {
    formRef.value?.validate(async (valid) => {
      if (valid) {
        const postData = {
          ...formData.value,
          resourceList: allCheckedNodes.value,
        };
        if (pageType.value == 'edit') {
          await RoleService.modifyByIdApi(formData.value.id as number, postData);
          ElMessage.success('修改成功');
        } else {
          await RoleService.createApi(postData);
          ElMessage.success('创建成功');
        }
        emits('uploadTable');
        cancelHandler();
      } else {
        ElMessage.error('请补充资料');
      }
    });
  };

  // 选择节点
  const handleCheckChange = (data: any, checked: boolean, indeterminate: boolean): void => {
    const checkedNodes = treeRef.value?.getCheckedNodes(false, true) || [];
    allCheckedNodes.value = checkedNodes.map((item: any) => item.id);
  };

  // 处理树半选
  const findTreeCheckedNodeKey = (checkedNodeList: number[], treeData: ResourceNode[]): void => {
    for (let item of treeData) {
      if (item?.children?.length && item.children.length > 0) {
        // 父级ID也要添加到数组中
        if (checkedNodeList.includes(item.id)) {
          initCheckedNodeKey.value.push(item.id);
        }

        findTreeCheckedNodeKey(checkedNodeList, item.children);
      } else {
        // 当它是子级时再进行匹配
        if (checkedNodeList.includes(item.id)) {
          // 菜单权限匹配
          initCheckedNodeKey.value.push(item.id);
        }
      }
    }
  };

  const setCheckedKeys = (defaultChecked: number[] = []): void => {
    if (!treeRef.value) return;
    for (let i = 0; i < defaultChecked.length; i++) {
      treeRef.value.setChecked(defaultChecked[i], true, false);
    }
  };

  // 获取全部的资源
  const initAllResourcesList = async (): Promise<void> => {
    const { result } = await ResourcesService.getCatalogApi({ catalogType: 2 });
    const treeData = sortTree(getTreeList(result, 'id', 'parentId'), 'sort');
    resourceData.value = treeData as ResourceNode[];
  };

  // 根据角色id获取已经授权的资源
  const initRoleResourceList = async (roleId: number): Promise<void> => {
    const { result } = await RoleResourcesService.getResourcesByRoleIdApi(roleId);
    findTreeCheckedNodeKey(result, resourceData.value);
  };

  defineExpose({
    openDialog,
  });
</script>

<style lang="scss" scoped></style>

