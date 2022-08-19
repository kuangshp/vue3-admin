<template>
  <div class="custom-table-wrapper">
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
              @click="radioClick(scope.row[config.rowKey || 'id'], scope.row)"
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
    {{ config.pagination }}=={{ Object.keys(config.pagination).length }}
    <el-pagination
      ref="paginationRef"
      class="pagination"
      :small="config.pagination.small"
      :total="config.pagination.total"
      :page-size="config.pagination.pageSize ?? 10"
      :page-count="config.pagination.pageCount"
      :pager-count="config.pagination.pagerCount"
      :current-page="config.pagination.currentPage"
      :layout="config.pagination.layout ?? 'total,prev, pager, next, jumper'"
      :page-sizes="config.pagination.pageSizes || [5, 10, 20, 30, 40, 50]"
      :disabled="config.pagination.disabled"
      :hide-on-single-page="config.pagination.hideOnSinglePage"
      @size-change="onPageSizeChange"
      @current-change="onPageIndexChange"
    >
    </el-pagination>
  </div>
</template>

<script setup>
  import { defineProps, ref } from 'vue';
  const props = defineProps({
    config: {
      type: Object,
      required: true,
      default: () => {},
    },
  });
  // 单选功能
  const radioSelected = ref(null);
  const radioClick = (rowKey, rowData) => {
    console.log(rowKey, rowData);
  };

  // 点击分页操作
  const paginationRef = ref(null);
  const onPageIndexChange = (index) => {
    props.config.pagination.onChange &&
      props.config.pagination.onChange(index, paginationRef.value.pageSize);
  };
  const onPageSizeChange = (size) => {
    props.config.pagination.onChange &&
      props.config.pagination.onChange(
        Math.min(paginationRef.value.currentPage, Math.ceil(paginationRef.value.total / size)),
        size
      );
  };
</script>

<style lang="scss" scoped>
  .custom-table-wrapper {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.03);
    .el-table {
      width: 100%;
      border-radius: 8px 8px 0px 0px;
      border: 1px solid #efefef;
      border-bottom: none;
    }
    .pagination {
      text-align: end;
      margin: 1.5rem 2.86rem;
      margin-left: 0;

      ::v-deep .btn-next,
      ::v-deep .btn-prev,
      ::v-deep .el-pager li {
        border: 1px solid #dcdfe6;
        border-radius: 6px !important;
      }

      ::v-deep .el-pager {
        li:first-child {
          margin-left: 10px;
        }

        li {
          margin-right: 10px;
          min-width: 28px;
        }

        .active {
          color: #fff;
          background-color: #e5e5e5;
        }
      }

      ::v-deep .el-input__inner {
        border-radius: 6px !important;
      }
    }
  }
</style>
