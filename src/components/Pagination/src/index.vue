<template>
  <el-pagination
    v-bind="attrs"
    :background="background"
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :layout="layout"
    :page-sizes="pageSizes"
    :pager-count="pagerCount"
    :total="total"
    :hide-on-single-page="hideOnSinglePage"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  ></el-pagination>
</template>

<script setup lang="ts">
  import { defineProps, defineEmits, computed, useAttrs } from 'vue';
  import { scrollTo } from '@/utils';

  // 获取所有透传的属性
  const attrs = useAttrs();

  // 定义props接口
  interface PaginationProps {
    total: number;
    page?: number;
    limit?: number;
    pageSizes?: number[];
    pagerCount?: number;
    layout?: string;
    background?: boolean;
    autoScroll?: boolean;
    hideOnSinglePage?: boolean;
  }

  // 定义emits类型
  const emit = defineEmits<{
    'update:page': [value: number];
    'update:limit': [value: number];
    pagination: [value: { page: number; limit: number }];
  }>();

  // 定义props
  const props = withDefaults(defineProps<PaginationProps>(), {
    total: 0,
    page: 1,
    limit: 10,
    pageSizes: () => [10, 20, 30, 40, 50],
    pagerCount: document.body.clientWidth < 992 ? 5 : 7,
    layout: 'total, sizes, prev, pager, next, jumper',
    background: true,
    autoScroll: true,
    hideOnSinglePage: false,
  });

  const currentPage = computed({
    get(): number {
      return props.page;
    },
    set(val: number): void {
      emit('update:page', val);
    },
  });

  const pageSize = computed({
    get(): number {
      return props.limit;
    },
    set(val: number): void {
      emit('update:limit', val);
    },
  });

  const handleSizeChange = (val: number): void => {
    if (currentPage.value * val > props.total) {
      currentPage.value = 1;
    }
    emit('pagination', { page: currentPage.value, limit: val });
    if (props.autoScroll) {
      scrollTo(0, 800);
    }
  };

  const handleCurrentChange = (val: number): void => {
    emit('pagination', { page: val, limit: pageSize.value });
    if (props.autoScroll) {
      scrollTo(0, 800);
    }
  };
</script>
