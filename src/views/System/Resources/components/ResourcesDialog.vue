<template>
  <div>
    <el-dialog
      v-if="dialogVisible"
      v-model="dialogVisible"
      :title="title"
      width="50%"
      append-to-body
      destroy-on-close
      @close="cancelHandler"
    >
      <div class="dialog-content">
        <el-scrollbar :max-height="400">
          <el-form
            label-position="right"
            label-width="100"
            :rules="formRule"
            :model="formData"
            ref="formRef"
          >
            <el-form-item label="类型" prop="resourcesType">
              <el-radio-group v-model="formData.resourcesType" @change="resourcesTypeChangeHandler">
                <el-radio-button :value="0">模块</el-radio-button>
                <el-radio-button :value="1">菜单</el-radio-button>
                <el-radio-button :value="2">按钮</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              label="父级"
              prop="parentId"
              v-if="isShowParentItem && formData.resourcesType != 0"
            >
              <el-tree-select
                v-model="formData.parentId"
                :data="treeDataList"
                check-strictly
                style="width: 100%"
              />
            </el-form-item>
            <el-form-item label="名称" prop="title">
              <el-input v-model="formData.title" placeholder="请输入名称" />
            </el-form-item>
            <el-form-item label="路径地址" prop="url">
              <el-input v-model="formData.url" placeholder="请输入路径地址" />
            </el-form-item>
            <el-form-item label="请求方式" prop="method" v-if="formData.resourcesType == 2">
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
            <template v-if="formData.resourcesType != 2">
              <el-form-item label="是否外链" prop="isLink">
                <el-radio-group v-model="formData.isLink">
                  <el-radio :value="0">否</el-radio>
                  <el-radio :value="1">是</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否隐藏" prop="isHidden">
                <el-radio-group v-model="formData.isHidden">
                  <el-radio :value="0">不隐藏</el-radio>
                  <el-radio :value="1">隐藏</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否缓存" prop="isCache">
                <el-radio-group v-model="formData.isCache">
                  <el-radio :value="0">缓存</el-radio>
                  <el-radio :value="1">不缓存</el-radio>
                </el-radio-group>
              </el-form-item>
            </template>
            <el-form-item label="排序" prop="sort">
              <el-input
                v-model.number="formData.sort"
                placeholder="请输入排序数字"
                clearable
                v-number-only="'number'"
              ></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="formData.status">
                <el-radio :value="0">正常</el-radio>
                <el-radio :value="1">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="描述" prop="description">
              <el-input v-model="formData.description" type="textarea" />
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelHandler">取消</el-button>
          <el-button type="primary" @click="confirmHandler">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { getTreeList } from '@/utils/tree';
  import { ElMessage } from 'element-plus';
  import { ResourcesService } from '@/api';

  const dialogVisible = ref(false);
  const title = ref('创建资源');
  const treeDataList = ref([]);

  const generateFormData = () => {
    return {
      resourcesType: null,
      name: null,
      parentId: null,
      url: null,
      icon: null,
      sort: null,
      method: '',
      description: null,
      isLink: 0,
      isHidden: 0,
      isCache: 0,
      uniqueKey: '',
      status: 0,
    };
  };
  const formData = ref(generateFormData());

  const showChooseIcon = ref(false);
  const chooseIconRef = ref(null);
  const showSelectIcon = () => {
    chooseIconRef.value.reset();
    showChooseIcon.value = true;
  };
  /** 选择图标 */
  const selected = (name) => {
    formData.value.icon = name;
    showChooseIcon.value = false;
  };
  const cancelHandler = () => {
    formData.value = generateFormData();
    dialogVisible.value = false;
  };
  const newRowDate = ref(null);
  const pageType = ref('create');
  const openDialog = (type, rowData = {}) => {
    console.log(rowData, '数据');
    pageType.value = type;
    if (type == 'create') {
      newRowDate.value = null;
      title.value = '创建资源';
    } else {
      newRowDate.value = rowData;
      title.value = '编辑资源';
      formData.value = {
        ...formData.value,
        ...rowData,
      };
    }
    dialogVisible.value = true;
  };
  const formRule = ref({
    resourcesType: [
      {
        required: true,
        message: `类型必填`,
        trigger: ['change', 'blur'],
      },
    ],
    parentId: [
      {
        required: true,
        message: `类型必填`,
        trigger: ['change', 'blur'],
      },
    ],
    title: [
      {
        required: true,
        message: `名称必填`,
        trigger: ['change', 'blur'],
      },
    ],
    url: [
      {
        required: true,
        message: `名称必填`,
        trigger: ['change', 'blur'],
      },
    ],
    uniqueKey: [
      {
        required: true,
        message: `名称必填`,
        trigger: ['change', 'blur'],
      },
    ],
  });
  // 格式化树结构
  const isShowParentItem = ref(false);
  const resourcesTypeChangeHandler = async (value) => {
    if (!value) return;
    isShowParentItem.value = false;
    formData.value.parentId = null;
    const { result } = await ResourcesService.getCatalogApi({ catalogType: value });
    const list = [
      {
        id: -1,
        value: -1,
        label: '根目录',
        parentId: 0,
      },
      ...result.map((item) => {
        return {
          ...item,
          label: item.title,
          value: item.id,
        };
      }),
    ];
    treeDataList.value = getTreeList(list, 'id', 'parentId');
    isShowParentItem.value = true;
  };
  const formRef = ref(null);
  const emit = defineEmits(['updateTable']);
  const confirmHandler = async () => {
    await formRef.value.validate(async (valid) => {
      if (valid) {
        const postData = {
          ...formData.value,
          sort: formData.value.sort ?? 1,
        };
        console.log(postData);
        if (pageType.value == 'edit') {
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

  // 对外暴露出去的
  defineExpose({
    openDialog,
  });
</script>

<style lang="scss" scoped></style>
