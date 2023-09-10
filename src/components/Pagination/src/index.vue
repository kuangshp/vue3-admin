<template>
  <el-pagination
    v-bind="$attrs"
    v-model:pageNumber="pageNumber"
    v-model:pageSize="pageSize"
    :page-sizes="pageSizes"
    :layout="layout"
    :total="total"
    @size-change="handlePageSizeChange"
    @current-change="handlePageNumberChange"
  ></el-pagination>
</template>

<script setup>
  import { defineProps, defineEmits, ref, watch } from 'vue';
  const emits = defineEmits(['pageSize', 'pageNumber']);

  const props = defineProps({
    pageNumber: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 0,
    },
    // 显示分页数据多少条的选项
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 40],
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper',
    },
  });
  const pageSize = ref(props.pageSize);
  const pageNumber = ref(props.pageNumber);
  const handlePageSizeChange = (value) => {
    emits('pageSize', value);
  };
  const handlePageNumberChange = (value) => {
    emits('pageNumber', value);
  };
  watch(
    () => props.pageNumber,
    (value) => {
      console.log('监听到数据', value);
      pageNumber.value = value;
    }
  );

  watch(
    () => props.pageSize,
    (value) => {
      pageSize.value = value;
    }
  );
</script>

<style lang="scss" scoped></style>
