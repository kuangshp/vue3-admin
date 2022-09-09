<template>
  <div
    class="custom-table-wrapper"
    v-loading="config.loading"
    element-loading-text="数据加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.7)"
  >
    <!-- 表格上面的 -->
    <div class="tools" v-if="isShowTools || isShowAction">
      <div class="btn-group" v-if="isShowTools">
        <slot name="tools"></slot>
      </div>
      <div class="user-action" v-if="isShowAction">
        <img src="@/assets/images/refresh.png" @click="refreshHandler" />
        <el-dropdown trigger="click">
          <img src="@/assets/images/setting.png" />
          <template #dropdown>
            <el-dropdown-menu>
              <el-checkbox-group v-model="checkedField" @change="handleCheckedFieldChange">
                <el-dropdown-item v-for="item of config.tableFields" :key="item.prop">
                  <el-checkbox :key="item.prop" :label="item.prop">{{
                    item.label || item.prop
                  }}</el-checkbox>
                </el-dropdown-item>
              </el-checkbox-group>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <!-- 表格内容 -->
    <el-table
      ref="customTableRef"
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
        v-if="config.indexable ?? true"
        type="index"
        width="55"
        align="center"
        :index="config.indexMethod"
        :label="config.indexLabel"
      ></el-table-column>
      <template v-for="(field, index) of config.tableFields" :key="index">
        <el-table-column
          v-if="checkedField.includes(field.prop)"
          :prop="field.prop"
          :label="field.label ? field.label : field.prop"
          :width="field.width"
          :fixed="field.field"
          :align="field.align"
          :formatter="field.formatter"
          :header-align="field.align || 'left'"
          :render-header="field.renderHeader"
          :show-overflow-tooltip="field.tooltip ?? true"
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
      </template>
    </el-table>
    <!-- 分页处理 -->
    <el-pagination
      ref="paginationRef"
      class="pagination"
      :small="config.pagination.small"
      :total="config.pagination.total"
      :page-size="config.pagination.pageSize ?? 10"
      :page-count="config.pagination.pageCount"
      :pager-count="config.pagination.pageCount"
      :current-page="config.pagination.pageNumber ?? 1"
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
  import { defineProps, ref, reactive, watch, defineEmits } from 'vue';
  const props = defineProps({
    config: {
      type: Object,
      required: true,
      default: () => {},
    },
    isShowTools: {
      type: Boolean,
      default: false,
    },
    isShowAction: {
      type: Boolean,
      default: false,
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
  // 跳转到首页和尾页
  const jumper = (isLast) => {
    console.log(isLast);
    if (isLast) {
      const pageNumber = Math.min(
        props.config.pagination.total / props.config.pagination.pageSize ?? 10
      );
      currentPage.pageNumber = pageNumber;
      props.config.pagination.onChange &&
        props.config.pagination.onChange(pageNumber, currentPage.pageSize);
    } else {
      const pageNumber = 1;
      currentPage.pageNumber = pageNumber;
      props.config.pagination.onChange &&
        props.config.pagination.onChange(pageNumber, currentPage.pageSize);
    }
  };

  watch(
    props.config.pagination,
    (newVal) => {
      if (newVal.pageNumber <= 1) {
        isFirstPage.value = true;
      } else {
        isFirstPage.value = false;
      }
      if (newVal.pageSize * newVal.pageNumber >= props.config.pagination.total) {
        isLastPage.value = true;
      } else {
        isLastPage.value = false;
      }
    },
    {
      immediate: true,
      deep: true,
    }
  );

  // 监听默认值反填上去
  watch(
    props.config.defaultValue,
    (newVal) => {
      if (Array.isArray(newVal) && newVal.length) {
        if (props.config.multiple) {
          // 多选的时候
          setTimeout(() => {
            multipleDefaultValue(newVal);
          }, 0);
        } else {
          // 单选的时候
          radioSelected.value = newVal[0];
        }
      }
    },
    {
      immediate: true,
      deep: true,
    }
  );
  const customTableRef = ref(null);
  const multipleDefaultValue = (newVal) => {
    // 1.先清空已经选择的数据
    customTableRef.value.clearSelection();
    // 2.循环表格数据,如果当前项在defaultValue数组中就选中
    for (const item of props.config.tableData) {
      if (newVal.includes(item[props.config.rowKey || 'id'])) {
        customTableRef.value.toggleRowSelection(item, true);
      }
    }
  };

  // 刷新事件
  const emit = defineEmits(['refresh']);
  const refreshHandler = () => {
    emit('refresh');
  };

  // 点击选择显示的表格列
  const checkedField = ref([]);
  const handleCheckedFieldChange = (field) => {
    checkedField.value = field;
  };
  watch(
    props.config.tableFields,
    (newVal) => {
      checkedField.value = newVal.map((item) => item.prop);
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
