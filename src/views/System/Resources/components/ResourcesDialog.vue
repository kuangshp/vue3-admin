<template>
  <CustomModal
    v-if="dialogVisible"
    v-model="dialogVisible"
    :title="title"
    width="50%"
    append-to-body
    destroy-on-close
    @close="cancelHandler"
  >
    <el-form
      label-position="right"
      label-width="100"
      :rules="formRule"
      :model="formData"
      ref="formRef"
    >
      <el-form-item label="资源类型" prop="resourcesType">
        <el-radio-group
          v-model="formData.resourcesType"
          :disabled="pageType != 'create'"
          @change="resourcesTypeChangeHandler"
        >
          <el-radio-button :value="1">模块</el-radio-button>
          <el-radio-button :value="2">菜单</el-radio-button>
          <el-radio-button :value="3">按钮</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="父级节点"
        prop="parentId"
        v-if="isShowParentItem && formData.resourcesType != 1"
      >
        <el-tree-select
          v-model="formData.parentId"
          :data="treeDataList"
          check-strictly
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="资源名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入资源名称" />
      </el-form-item>
      <el-form-item label="路径地址" prop="url">
        <el-input v-model="formData.url" placeholder="请输入路径地址" />
      </el-form-item>
      <el-form-item label="请求方式" prop="method" v-if="formData.resourcesType == 3">
        <el-select
          v-model="formData.method"
          placeholder="请选择请求方式"
          style="width: 100%"
          clearable
        >
          <el-option label="GET" value="GET"></el-option>
          <el-option label="POST" value="POST"></el-option>
          <el-option label="PUT" value="PUT"></el-option>
          <el-option label="DELETE" value="DELETE"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="ICON图标" prop="icon" v-else>
        <el-popover
          placement="bottom-start"
          :width="500"
          v-model:visible="showChooseIcon"
          trigger="click"
          @show="showSelectIcon"
        >
          <template #reference>
            <el-input v-model="formData.icon" placeholder="请选择图标" readonly>
              <template #prefix>
                <SvgIcon
                  v-if="formData.icon"
                  :icon="formData.icon"
                  class="el-input__icon"
                  style="height: 32px; width: 16px"
                />
                <el-icon v-else style="height: 32px; width: 16px"><search /></el-icon>
              </template>
            </el-input>
          </template>
          <ChooseIcon ref="chooseIconRef" @selected="selected" :active-icon="formData.icon" />
        </el-popover>
      </el-form-item>
      <el-form-item label="唯一标识符" prop="uniqueKey">
        <el-input
          v-model="formData.uniqueKey"
          :disabled="pageType != 'create'"
          placeholder="请输入唯一标识符"
        />
      </el-form-item>
      <template v-if="formData.resourcesType != 3">
        <el-form-item label="是否外链" prop="isLink">
          <el-radio-group v-model="formData.isLink">
            <el-radio :value="1">否</el-radio>
            <el-radio :value="2">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否隐藏" prop="isHidden">
          <el-radio-group v-model="formData.isHidden">
            <el-radio :value="1">不隐藏</el-radio>
            <el-radio :value="2">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否缓存" prop="isCache">
          <el-radio-group v-model="formData.isCache">
            <el-radio :value="1">缓存</el-radio>
            <el-radio :value="2">不缓存</el-radio>
          </el-radio-group>
        </el-form-item>
      </template>
      <el-form-item label="资源排序" prop="sort">
        <el-input
          v-model.number="formData.sort"
          placeholder="请输入排序数字"
          clearable
          v-number-only="'number'"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="pageType != 'create'" label="资源状态" prop="status">
        <el-select v-model="formData.status" style="width: 100%" placeholder="请选择状态" clearable>
          <el-option label="正常" :value="1"></el-option>
          <el-option label="禁用" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="资源描述" prop="description">
        <el-input v-model="formData.description" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelHandler">取消</el-button>
        <el-button type="primary" @click="confirmHandler">确认</el-button>
      </span>
    </template>
  </CustomModal>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { getTreeList, sortTree } from '@/utils/tree';
  import { ElMessage } from 'element-plus';
  import { Search } from '@element-plus/icons-vue';
  import { ResourcesService } from '@/api';
  import type { ElForm } from 'element-plus';
  import type { FormData, ResourceType, TreeSelectItem } from '../types';

  const dialogVisible = ref<boolean>(false);
  const title = ref<string>('创建资源');
  const treeDataList = ref<TreeSelectItem[]>([]);
  const showChooseIcon = ref<boolean>(false);
  const chooseIconRef = ref<any>(null);
  const formRef = ref<InstanceType<typeof ElForm> | null>(null);
  const newRowDate = ref<ResourceType | null>(null);
  const pageType = ref<'create' | 'edit'>('create');
  const isShowParentItem = ref<boolean>(false);

  const emit = defineEmits<{
    updateTable: [];
  }>();

  const generateFormData = (): FormData => {
    return {
      resourcesType: 1,
      name: null,
      parentId: null,
      url: null,
      icon: null,
      sort: 1,
      method: '',
      description: null,
      isLink: 1,
      isHidden: 1,
      isCache: 1,
      uniqueKey: '',
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
    resourcesType: [{ required: true, message: `类型必填`, trigger: ['change', 'blur'] }],
    parentId: [{ required: true, message: `类型必填`, trigger: ['change', 'blur'] }],
    title: [{ required: true, message: `名称必填`, trigger: ['change', 'blur'] }],
    url: [{ required: true, message: `名称必填`, trigger: ['change', 'blur'] }],
    uniqueKey: [{ required: true, message: `名称必填`, trigger: ['change', 'blur'] }],
    sort: [{ required: true, message: `名称必填`, trigger: ['change', 'blur'] }],
  });

  const cancelHandler = (): void => {
    formData.value = generateFormData();
    dialogVisible.value = false;
  };

  const showSelectIcon = (): void => {
    chooseIconRef.value?.reset && chooseIconRef.value.reset();
    showChooseIcon.value = true;
  };

  /** 选择图标 */
  const selected = (name: string): void => {
    formData.value.icon = name;
    showChooseIcon.value = false;
  };

  const openDialog = async (
    type: 'create' | 'edit',
    rowData: Partial<ResourceType> = {}
  ): Promise<void> => {
    pageType.value = type;
    if (type == 'create') {
      newRowDate.value = null;
      title.value = '创建资源';
    } else {
      newRowDate.value = rowData as ResourceType;
      title.value = '编辑资源';
      formData.value = {
        ...formData.value,
        ...rowData,
      };
    }
    // 如果有父节点的时候
    if (rowData.parentId !== undefined && rowData.resourcesType !== undefined) {
      await resourcesTypeChangeHandler(rowData.resourcesType, false);
    }
    dialogVisible.value = true;
  };

  // 格式化树结构
  const resourcesTypeChangeHandler = async (
    value: number,
    clearParentId: boolean = true
  ): Promise<void> => {
    if (!value) return;
    isShowParentItem.value = false;
    if (clearParentId) {
      formData.value.parentId = null;
    }
    const { result } = await ResourcesService.getCatalogApi({ catalogType: value });
    const list: TreeSelectItem[] = [
      {
        id: -1,
        value: 0,
        label: '根目录',
        parentId: 0,
      },
      ...result.map((item: any) => {
        return {
          ...item,
          label: item.title,
          value: item.id,
        };
      }),
    ];
    treeDataList.value = sortTree(getTreeList(list, 'id', 'parentId')) as TreeSelectItem[];
    isShowParentItem.value = true;
  };

  const confirmHandler = async (): Promise<void> => {
    formRef.value?.validate(async (valid) => {
      if (valid) {
        const postData = {
          ...formData.value,
          sort: formData.value.sort ?? 1,
        };

        if (pageType.value == 'edit' && newRowDate.value?.id) {
          await ResourcesService.modifyByIdApi(newRowDate.value.id, postData);
          ElMessage.success('修改成功');
        } else {
          await ResourcesService.createApi(postData);
          ElMessage.success('创建成功');
        }
        emit('updateTable');
        cancelHandler();
      }
    });
  };

  defineExpose({
    openDialog,
  });
</script>

<style lang="scss" scoped></style>

