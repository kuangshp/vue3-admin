<template>
  <div class="custom-table" :class="{ 'no-padding': noPadding }">
    <!-- 表格上面插槽 -->
    <el-row type="flex" style="margin-bottom: 10px" :style="headerStyle">
      <slot name="tableHeader"></slot>
    </el-row>
    <div
      :class="{ 'table-panel': isCustomHeader }"
      :style="{
        borderLeftWidth: border ? '0px' : '1px',
        borderRightWidth: border ? '0px' : '1px',
        borderTopWidth: border ? '0px' : '1px',
      }"
    >
      <el-table
        :data="data"
        v-bind="$attrs"
        header-row-class-name="custom-header"
        cell-class-name="custom-cell"
        row-class-name="custom-row"
        :border="border"
        ref="tableRef"
        :row-key="rowKey"
      >
        <!-- 普通列 -->
        <template v-for="(item, index) of tableOption" :key="index">
          <el-table-column
            v-if="item.type"
            :label="item.label"
            :prop="item.prop"
            :width="item.width"
            :min-width="item.minWidth"
            :align="item.align"
            :type="item.type"
            :reserve-selection="true"
            show-overflow-tooltip
            v-bind="$attrs"
          >
            <!-- 支持 selection多选,radio单选 index序号 -->
            <template v-if="item.type === 'radio'" #default="scope">
              <div class="radio">
                <el-radio
                  v-model="tableRadioValue"
                  :label="scope.row[rowKey]"
                  @change="handleRadioChange(scope.$index, scope.row)"
                ></el-radio>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-else
            :label="item.label"
            :prop="item.prop"
            :width="item.width"
            :min-width="item.minWidth"
            :align="item.align"
            show-overflow-tooltip
            v-bind="$attrs"
          >
            <template #default="scope">
              <!-- 如果有插槽的时候显示插槽,否则显示原本的 -->
              <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
              <!-- 根据项目来处理几个字段 -->
              <template v-else>
                <RenderContent v-if="item.render" :render="() => item.render(scope.row)" />
                <!-- 对时间格式化处理化 -->
                <span v-else>
                  <template v-if="isTimeProp(item.prop)">{{
                    formatDateStr(scope.row[item.prop], true)
                  }}</template>
                  <template v-else>
                    {{ scope.row[item.prop] }}
                  </template>
                </span>
              </template>
            </template>
          </el-table-column>
        </template>
        <!-- 操作列 -->
        <template v-for="(item, index) of actionOption" :key="index">
          <el-table-column
            :label="item.label"
            :prop="item.prop"
            :width="item.width"
            :align="item.align"
            :fixed="item.fixed"
          >
            <template #default="scope">
              <slot name="action" :scope="scope"></slot>
            </template>
          </el-table-column>
        </template>
        <!-- 没有数据的时候展示 -->
        <template #empty>
          <el-empty description="暂无数据" />
        </template>
      </el-table>
    </div>
    <!-- 页码显示 -->
    <div
      v-if="isShowPagination"
      style="display: flex; flex-direction: row; justify-content: flex-end; margin-top: 10px"
    >
      <!-- <Pagination
        v-bind="$attrs"
        background
        v-model:page="pageNumberRef"
        v-model:limit="pageSizeRef"
        @pagination="pageChangeHandler"
        layout="total,prev, pager, next"
        hide-on-single-page
      >
      </Pagination> -->

      <Pagination
        v-bind="attrs"
        :total="total"
        v-model:page="pageNumberRef"
        v-model:limit="pageSizeRef"
        @pagination="pageChangeHandler"
        layout="total, prev, pager, next"
        hide-on-single-page
        background
      />
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'CustomTable',
    inheritAttrs: false,
  };
</script>

<script setup lang="ts" generic="T extends Record<string, any> = any">
  import { ref, computed, watch, defineComponent, nextTick } from 'vue';
  import { formatDate } from '@/utils';
  import Pagination from './../../Pagination/src/index.vue';
  import type {
    CustomTableProps,
    CustomTableEmits,
    CustomTableExpose,
    TableColumnOption,
  } from '../types';
  // 获取所有透传的属性
  const attrs = useAttrs();
  const formatDateStr = (data: any, isDue: boolean): string => formatDate(data, isDue);

  // 定义emits
  const emit = defineEmits<CustomTableEmits>();

  // 定义props
  const props = withDefaults(defineProps<CustomTableProps<T>>(), {
    options: () => [],
    data: () => [],
    isShowPagination: true,
    pageNumber: 1,
    pageSize: 10,
    headerStyle: () => ({}),
    headerBgColor: '#e8f3ff',
    isCustomHeader: false,
    border: false,
    defaultSelectRowKeyList: () => [],
    defaultSelectRowKey: null,
    rowKey: 'id',
    noPadding: false,
    total: 0,
  });

  const tableRef = ref<any>(null);

  // 处理单选
  const tableRadioValue = ref<string | number | null>(props.defaultSelectRowKey ?? null);
  const selectedTableRow = ref<T | null>(null);

  // 监听数据变化处理默认选中
  watch(
    () => props.data,
    (newVal) => {
      if (newVal.length) {
        nextTick(() => {
          newVal
            .filter((item) => props.defaultSelectRowKeyList.includes(item[props.rowKey]))
            .forEach((item) => {
              tableRef.value?.toggleRowSelection(item, true);
            });
        });
      }
    },
    { immediate: true, deep: true }
  );

  // 处理单选变化
  const handleRadioChange = (index: number, row: T): void => {
    selectedTableRow.value = row;
    tableRadioValue.value = row[props.rowKey];
    emit('radioChange', row);
  };

  // 监听默认选中值变化
  watch(
    () => props.defaultSelectRowKey,
    (newVal) => {
      if (newVal) {
        const targetRow = props.data.find((item) => item[props.rowKey] === newVal);
        if (targetRow) {
          selectedTableRow.value = targetRow;
          tableRadioValue.value = newVal;
        }
      }
    }
  );

  // 定义暴露的方法
  defineExpose<CustomTableExpose<T>>({
    getSelectedRow: (): T | null => selectedTableRow.value,
    clearSelection: (): void => {
      selectedTableRow.value = null;
      tableRadioValue.value = null;
    },
  });

  const pageNumberRef = computed({
    get: () => props.pageNumber,
    set: (value) => value,
  });

  const pageSizeRef = computed({
    get: () => props.pageSize,
    set: (value) => value,
  });

  // 过滤操作项全部的列
  const tableOption = computed<TableColumnOption[]>(() =>
    props.options.filter((item) => !item.action && !item.isHidden)
  );

  // 表格操作列
  const actionOption = computed<TableColumnOption[]>(() =>
    props.options.filter((item) => item.action && !item.isHidden)
  );

  const pageChangeHandler = (pages: { page: number; limit: number }): void => {
    emit('changePageHandler', pages);
  };

  // 渲染内容组件
  const RenderContent = defineComponent({
    props: {
      render: {
        type: Function,
        required: true,
      },
    },
    setup(props) {
      return () => props.render();
    },
  });

  // 判断是否是时间字段
  const isTimeProp = (prop: string): boolean =>
    ['createdAt', 'updatedAt', 'loginTime'].includes(prop);
</script>

<style lang="scss" scoped>
  .custom-table {
    background: #fff;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 20px;
    box-sizing: border-box;
    &.no-padding {
      padding: 0;
    }
    .table-panel {
      border: 1px solid #e5e5e5;
      width: 100%;
      border-radius: 5px;
      overflow: hidden;
      :deep(.custom-header) {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        --el-table-header-bg-color: v-bind(headerBgColor);
        height: 40px;
      }
      :deep(.custom-row) {
        &:last-child {
          td.el-table__cell {
            border-bottom: none !important;
          }
        }
      }
      // 调整单选按钮的垂直对齐方式
      :deep(.el-radio) {
        display: flex;
        align-items: center;
      }
      :deep(.el-radio > .el-radio__label) {
        display: none;
      }
      :deep(.el-table__inner-wrapper) {
        &::before {
          background-color: transparent !important;
        }
      }
    }
  }
  .radio {
    :deep(.el-radio) {
      display: flex;
      align-items: center;
    }
    :deep(.el-radio > .el-radio__label) {
      display: none;
    }
  }
</style>

