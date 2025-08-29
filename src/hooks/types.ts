// 定义表格数据请求函数的参数类型
export interface TableRequestParams {
  pageSize: number;
  pageNumber: number;
  [key: string]: any;
}

// 定义表格数据响应类型
export interface TableResponse<T> {
  data: T[];
  total: number;
  [key: string]: any;
}

// 定义API请求函数类型
export interface ApiRequestFunction<T = any> {
  (params: TableRequestParams): Promise<{
    result: TableResponse<T>;
  }>;
}

// 定义表单数据类型
export interface FormData {
  value?: Record<string, any>;
  [key: string]: any;
}
