<template>
  <el-select
    class="main-select-tree"
    ref="selectTree"
    :multiple="isMultiple"
    v-model="newValue"
    style="width: 100%"
    :placeholder="placeholder"
    :disabled="disabled"
    :clearable="clearable"
    @remove-tag="removeTagHandler"
    @clear="clearHandler"
  >
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.label"
      :value="item.id"
      style="display: none"
    />
    <el-tree
      class="main-select-el-tree"
      ref="selectTreeRef"
      :data="treeDataList"
      node-key="id"
      :accordion="accordion"
      highlight-current
      :props="defaultProps"
      @node-click="handleNodeClick"
      expand-on-click-node
      :check-on-click-node="isMultiple"
      :default-checked-keys="isMultiple ? currentNodeKey : []"
      :default-expand-all="defaultExpandAll"
      :show-checkbox="isMultiple"
      @check-change="handleCheckChange"
    />
  </el-select>
</template>
<script setup>
  import { getTreeList } from '@/utils';
  import { onMounted, reactive } from 'vue';
  const props = defineProps({
    modelValue: {
      type: [String, Array],
    },
    // 是否多选
    isMultiple: {
      type: Boolean,
      default: false,
    },
    // 是否全部展示字段
    defaultExpandAll: {
      type: Boolean,
      default: true,
    },
    // 是否为手风琴模式
    accordion: {
      type: Boolean,
      default: true,
    },
    // 提示文案
    placeholder: {
      type: String,
      default: '请选择',
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 下拉框的数据
    options: {
      type: Array,
      default: () => [],
    },
    // 是否有清除能力
    clearable: {
      type: Boolean,
      default: true,
    },
  });
  const newValue = ref(props.modelValue);
  const currentNodeKey = ref(props.modelValue);
  const treeDataList = ref([]);
  const defaultProps = reactive({
    children: 'children',
    label: 'label',
  });
  onMounted(() => {
    treeDataList.value = getTreeList(props.options, 'id', 'parentId');
  });
  const emit = defineEmits(['update:modelValue']);
  const selectTreeRef = ref(null);
  const selectTree = ref(null);
  // 点击文本节点
  const handleNodeClick = (node) => {
    if (node.children || props.isMultiple) return;
    console.log(node, '选择文本', selectTreeRef.value);
    newValue.value = node.id;
    selectTree.value.blur();
    emit('update:modelValue', newValue.value);
  };
  // 复选框的时候
  const handleCheckChange = (node, checked, indeterminate) => {
    console.log(node, checked, indeterminate);
    console.log(selectTreeRef.value.getCheckedKeys(), '????11');
    newValue.value = selectTreeRef.value.getCheckedKeys();
    console.log(newValue.value, '???');
    emit('update:modelValue', newValue.value);
  };
  // 多选的时候删除tag
  const removeTagHandler = (val) => {
    console.log(val, '多选');
    newValue.value = newValue.value.filter((tag) => tag != val);
    findTreeCheckedNodeKey(newValue.value, treeDataList.value);
  };
  // 全部清空的时候
  const clearHandler = () => {
    if (props.isMultiple) {
      selectTreeRef.value.setCheckedKeys([]);
      newValue.value = currentValue.value = [];
    } else {
      newValue.value = '';
    }
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
            currentNodeKey.value = [...new Set([...currentNodeKey.value, item.id])];
            selectTreeRef.value.setCheckedKeys(currentNodeKey.value);
            console.log('执行了----');
            emit('update:modelValue', currentNodeKey.value);
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
</script>
