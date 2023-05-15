<template>
  <!-- 页码开始 -->
  <div class="pagination">
    <el-pagination background hide-on-single-page layout="total, prev, pager, next,jumper" :current-page="pageIndex" :page-size="pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
  </div>
  <!-- 页码结束 -->
</template>

<script>
export default {
  name: 'table-pagination',
  props: {
    // 总共页码数
    pageTotal: {
      type: Number,
      default: 0,
    },
    // 当前页码
    pageIndex: {
      type: Number,
      default: 1,
    },
    // 每页的条数
    pageSize: {
      type: Number,
      default: 10,
    }
  },
  methods: {
    handlePageChange (val) {
      this.$emit('handlePageChange', val);
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 30px 0;
}
</style>