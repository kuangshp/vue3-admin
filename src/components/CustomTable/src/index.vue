<template>
  <div class="custom-table">
    <!-- 表格上面插槽 -->
    <el-row type="flex" style="margin-bottom: 10px; justify-content: flex-end">
      <slot name="tableHeader"></slot>
    </el-row>
    <el-table :data="data" v-bind="$attrs">
      <!-- 普通列 -->
      <template v-for="(item, index) of tableOption" :key="index">
        <el-table-column
          :label="item.label"
          :prop="item.prop"
          :width="item.width"
          :align="item.align"
          :type="item.type"
          show-overflow-tooltip
        >
          <template #default="scope">
            <template v-if="!item.type">
              <!-- 如果有插槽的时候显示插槽,否则显示原本的 -->
              <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
              <!-- 根据项目来处理几个字段 -->
              <span v-else>
                <!-- 对时间格式化处理化 -->
                <template v-if="['createdAt', 'updatedAt', 'lastLoginDate'].includes(item.prop)">{{
                  formatDateStr(scope.row[item.prop], true)
                }}</template>
                <!-- <template v-else-if="item.prop == 'status'">
                  <el-tag type="success" v-if="scope.row[item.prop] == 0">正常</el-tag>
                  <el-tag type="danger" v-else>禁用</el-tag>
                </template> -->
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
    </el-table>
    <!-- 页码显示 -->
    <div
      v-if="isShowPagination"
      style="display: flex; flex-direction: row; justify-content: flex-end; margin-top: 10px"
    >
      <Pagination
        v-bind="$attrs"
        background
        v-model:page="pageNumber"
        v-model:limit="pageSize"
        @pagination="pageChangeHandler"
        layout="total,prev, pager, next"
        hide-on-single-page
      >
      </Pagination>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, defineEmits } from 'vue';
  import { formatDate } from '@/utils';
  const formatDateStr = (data, isDue) => formatDate(data, isDue);
  const emits = defineEmits(['changePageHandler']);
  const props = defineProps({
    // 表格的配置选项
    options: {
      type: Array,
      default: () => [],
    },
    // 表格数据
    data: {
      type: Array,
      default: () => [],
    },
    // 是否显示分页器
    isShowPagination: {
      type: Boolean,
      default: true,
    },
    pageNumber: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
  });
  // 过滤操作项全部的列
  const tableOption = computed(() => props.options.filter((item) => !item.action));
  // 表格操作列
  const actionOption = computed(() => props.options.filter((item) => item.action));
  // 切换分页
  const pageNumber = props.pageNumber;
  const pageSize = props.pageSize;
  const pageChangeHandler = (pages) => {
    emits('changePageHandler', pages);
  };
</script>

<style lang="scss" scoped>
  .custom-table {
    background: #fff;
    padding: 20px;
    box-sizing: border-box;
  }
</style>
