<template>
  <div
    class="custom-table-wrapper"
    v-loading="config.loading"
    element-loading-text="数据加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.7)"
  >
    <el-table
      ref="customTable"
      :header-cell-style="{ backgroundColor: '#F6F6F6', 'text-align': 'left', color: '#666666' }"
      :data="config.tableData"
      :height="config.height"
      :max-height="config.maxHeight"
      :stripe="config.stripe ?? true"
      :border="config.border ?? true"
      :size="config.size || 'small'"
      :fit="config.fit ?? true"
      :show-header="config.showHeader"
      :highlight-current-row="config.highlight === undefined ? true : config.highlight"
      :current-row-key="config.rowKey"
      :row-key="config.rowKey"
      :empty-text="config.emptyText ?? '暂无数据'"
      :show-summary="config.summary"
      :sum-text="config.summaryText ?? '合计'"
      @selection-change="selectionChange"
      @sort-change="config.sortChange ?? function () {}"
      @filter-change="config.filterChange ?? function () {}"
    >
      <!-- 判断是否开启选择功能 -->
      <template v-if="config.selectable">
        <!-- 多选 -->
        <el-table-column
          v-if="config.multiple"
          width="55"
          align="center"
          type="selection"
          :reserve-selection="true"
          :selectable="config.selectHandler"
        >
        </el-table-column>
        <!-- 单选 -->
        <el-table-column v-else align="center" width="55">
          <template #default="scope">
            <el-radio
              v-model="radioSelected"
              :label="scope.row[config.rowKey || 'id']"
              @click.prevent="radioClick(scope.row[config.rowKey || 'id'], scope.row)"
              >{{ '' }}</el-radio
            >
          </template>
        </el-table-column>
      </template>
      <!-- 判断是否有序列号 -->
      <el-table-column
        v-if="config.indexable === undefined ? true : config.indexable"
        type="index"
        width="55"
        align="center"
        :index="config.indexMethod"
        :label="config.indexLabel"
      ></el-table-column>
      <el-table-column
        v-for="(field, index) of config.tableFields"
        :key="index"
        :prop="field.prop"
        :label="field.label ? field.label : field.prop"
        :width="field.width"
        :fixed="field.field"
        :align="field.align"
        :formatter="field.formatter"
        :header-align="field.align || 'left'"
        :render-header="field.renderHeader"
        :show-overflow-tooltip="field.tooltip === undefined ? true : field.tooltip"
        :sortable="field.sortable"
      >
        <!-- 如果是使用插槽的时候 -->
        <template v-if="field.type === 'slot'" #default="scope">
          <slot
            :name="field.slotName ?? field.prop"
            :field="field"
            :row="scope.row"
            :column="scope.column"
            :index="scope.$index"
          ></slot>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页处理 -->
    <el-pagination
      ref="paginationRef"
      class="pagination"
      :small="config.pagination.small"
      :total="config.pagination.total"
      :page-size="config.pagination.pageSize ?? 10"
      :page-count="config.pagination.pageCount"
      :pager-count="config.pagination.pagerCount"
      :current-page="config.pagination.pageNumber"
      :layout="config.pagination.layout ?? 'total, sizes, slot, prev, pager, next,slot, jumper'"
      :page-sizes="config.pagination.pageSizes || [10, 20, 30, 40, 50]"
      :disabled="config.pagination.disabled"
      :hide-on-single-page="config.pagination.hideOnSinglePage"
      @size-change="onPageSizeChange"
      @current-change="onPageIndexChange"
    >
      <button class="pagination-btn" :disabled="isFirstPage" @click="jumper()"></button>
      <button class="pagination-btn" :disabled="isLastPage" @click="jumper(true)"></button>
    </el-pagination>
  </div>
</template>

<script setup>
  import { defineProps, ref, reactive, watch } from 'vue';
  const props = defineProps({
    config: {
      type: Object,
      required: true,
      default: () => {},
    },
  });
  // 单选功能
  const radioSelected = ref(null);
  const selectionList = ref([]);
  const radioClick = (rowKey, rowData) => {
    console.log(props.config);
    if (radioSelected.value == rowKey) {
      radioSelected.value = null;
      selectionList.value = [];
    } else {
      radioSelected.value = rowKey;
      selectionList.value = [rowData];
    }
    props.config.selectionChange && props.config.selectionChange(selectionList.value);
  };

  // 多选功能
  const selectionChange = (selection) => {
    console.log(selection, '111');
    selectionList.value = selection;
    props.config.selectionChange && props.config.selectionChange(selectionList.value);
  };

  // 点击分页操作
  const paginationRef = ref(null);
  const isFirstPage = ref(true); // 默认不能点击
  const isLastPage = ref(true);
  const currentPage = reactive({
    pageSize: props.config.pagination.pageSize ?? 10,
    pageNumber: props.config.pagination.currentPage ?? 1,
  });
  const onPageIndexChange = (index) => {
    currentPage.pageNumber = index;
    props.config.pagination.onChange &&
      props.config.pagination.onChange(index, currentPage.pageSize);
  };
  const onPageSizeChange = (size) => {
    currentPage.pageSize = size;
    props.config.pagination.onChange &&
      props.config.pagination.onChange(currentPage.pageNumber, size);
  };
  watch(
    props.config.pagination,
    (newVal) => {
      console.log(newVal, '监听到');
    },
    {
      immediate: true,
      deep: true,
    }
  );
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
