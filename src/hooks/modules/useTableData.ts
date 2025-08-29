import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import type { ApiRequestFunction, FormData, TableRequestParams } from '../types';

/**
 * 表格数据管理Hook
 * @param fn 获取表格数据的API请求函数
 * @param defaultQueryFormData 默认的查询表单数据
 * @returns 表格数据管理相关的状态和方法
 */
export const useTableData = <T = any>(
  fn: ApiRequestFunction<T>,
  defaultQueryFormData: FormData = {}
) => {
  console.log('🚀 ~ useTableData ~ queryFormData:', defaultQueryFormData);

  if (!fn || typeof fn !== 'function') {
    ElMessage.warning('请传入请求方法！');
  }

  const loading = ref(false);
  const tableData = ref<T[]>([]);
  const tableTotal = ref(10);
  const pageNumberRef = ref(1);
  const pageSizeRef = ref(10);

  /**
   * 获取最新数据的函数
   * @param updatedFormData 更新的表单数据
   */
  const fetchTableData = async (updatedFormData?: Record<string, any>): Promise<void> => {
    try {
      loading.value = true;
      // 如果传入了更新的表单数据，使用它；否则使用传入的defaultQueryFormData或空对象
      const formData =
        updatedFormData ||
        (defaultQueryFormData &&
        typeof defaultQueryFormData === 'object' &&
        'value' in defaultQueryFormData
          ? defaultQueryFormData.value
          : defaultQueryFormData || {});

      const { result } = await fn({
        pageSize: pageSizeRef.value,
        pageNumber: pageNumberRef.value,
        ...formData,
      });
      tableData.value = result.data;
      tableTotal.value = result.total;
    } finally {
      loading.value = false;
    }
  };

  /**
   * 翻页操作处理函数
   * @param pagination 分页信息
   */
  const changePageHandler = ({ page, limit }: { page: number; limit: number }): void => {
    pageSizeRef.value = limit;
    pageNumberRef.value = page;
    fetchTableData();
  };

  return {
    loading,
    tableData,
    tableTotal,
    pageNumberRef,
    pageSizeRef,
    changePageHandler,
    fetchTableData,
  };
};
