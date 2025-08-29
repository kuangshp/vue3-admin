/**
 * 表格列配置选项类型
 */
export interface TableColumnOption {
  type?: 'selection' | 'radio' | 'index';
  label: string;
  prop: string;
  width?: number | string;
  minWidth?: number | string;
  align?: 'left' | 'center' | 'right';
  slot?: string;
  render?: (row: any) => any;
  action?: boolean;
  fixed?: boolean | 'left' | 'right';
  isHidden?: boolean;
  [key: string]: any;
}

/**
 * 自定义表格Props类型
 */
export interface CustomTableProps<T = any> {
  options: TableColumnOption[];
  data: T[];
  isShowPagination?: boolean;
  pageNumber?: number;
  pageSize?: number;
  headerStyle?: Record<string, any>;
  headerBgColor?: string;
  isCustomHeader?: boolean;
  border?: boolean;
  defaultSelectRowKeyList?: (string | number)[];
  defaultSelectRowKey?: string | number;
  rowKey?: string;
  noPadding?: boolean;
  total: number;
}

/**
 * 自定义表格Emits类型
 */
export type CustomTableEmits = {
  changePageHandler: [pages: { page: number; limit: number }];
  radioChange: [row: any];
};

/**
 * 自定义表格暴露的方法类型
 */
export interface CustomTableExpose<T = any> {
  getSelectedRow: () => T | null;
  clearSelection: () => void;
}
