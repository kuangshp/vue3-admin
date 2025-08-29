/**
 * 自定义表单选项类型
 */
export interface CustomFormOption {
  prop: string;
  label: string;
  type: string;
  span?: number;
  placeholder?: string;
  data?: any[];
  attrs?: Record<string, any>;
  children?: any[] | (() => Promise<any>);
  childrenData?: any[];
  loading?: boolean;
  required?: boolean;
  rules?: any[] | object;
  isHidden?: { value: boolean };
  uploadAttrs?: Record<string, any>;
  editorConfig?: Record<string, any>;
}

/**
 * 自定义表单Props类型
 */
export interface CustomFormProps {
  modelValue: Record<string, any>;
  options: CustomFormOption[];
  httpRequest?: (options: any) => Promise<any>;
  colSpan?: number;
  labelWidth?: string;
  queryBtnText?: string;
  showQueryBtn?: boolean;
  showResetBtn?: boolean;
  isScrollbar?: boolean;
  [key: string]: any;
}

/**
 * 自定义表单Emits类型
 */
export type CustomFormEmits = {
  (e: 'on-preview', file: any): void;
  (e: 'on-remove', data: { file: any; fileList: any }): void;
  (e: 'on-success', data: { response: any; file: any; fileList: any }): void;
  (e: 'on-error', data: { err: any; file: any; fileList: any }): void;
  (e: 'on-progress', data: { event: any; file: any; fileList: any }): void;
  (e: 'on-change', data: { file: any; fileList: any }): void;
  (e: 'before-upload', file: any): void;
  (e: 'before-remove', data: { file: any; fileList: any }): void;
  (e: 'on-exceed', data: { files: any; fileList: any }): void;
  (e: 'queryHandler', modelValue: Record<string, any>): void;
  (e: 'update:modelValue', modelValue: Record<string, any>): void;
};

/**
 * 自定义表单暴露的方法类型
 */
export interface CustomFormExpose {
  resetFields: () => void;
  validate: (callback: (valid: boolean) => void) => void;
  getFormData: (isValid?: boolean) => Promise<Record<string, any>> | Record<string, any>;
}
