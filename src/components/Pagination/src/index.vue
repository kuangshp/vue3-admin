<template>
  <el-pagination
    v-bind="$attrs"
    :background="background"
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :layout="layout"
    :page-sizes="pageSizes"
    :pager-count="pagerCount"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  ></el-pagination>
</template>

<script setup>
  import { defineProps, defineEmits, ref, watch } from 'vue';
  import { scrollTo } from '@/utils';
  const props = defineProps({
    total: {
      required: true,
      type: Number,
    },
    page: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 20,
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 40, 50];
      },
    },
    // 移动端页码按钮的数量端默认值5
    pagerCount: {
      type: Number,
      default: document.body.clientWidth < 992 ? 5 : 7,
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper',
    },
    background: {
      type: Boolean,
      default: true,
    },
    autoScroll: {
      type: Boolean,
      default: true,
    },
  });

  const emits = defineEmits();
  const currentPage = computed({
    get() {
      return props.page;
    },
    set(val) {
      emits('update:page', val);
    },
  });
  const pageSize = computed({
    get() {
      return props.limit;
    },
    set(val) {
      emits('update:limit', val);
    },
  });
  const handleSizeChange = (val) => {
    if (currentPage.value * val > props.total) {
      currentPage.value = 1;
    }
    emits('pagination', { page: currentPage.value, limit: val });
    if (props.autoScroll) {
      console.log('滚动');
      scrollTo(0, 800);
    }
  };
  const handleCurrentChange = (val) => {
    emits('pagination', { page: val, limit: pageSize.value });
    if (props.autoScroll) {
      console.log('滚动1');
      scrollTo(0, 800);
    }
  };
</script>

<style lang="scss" scoped></style>
