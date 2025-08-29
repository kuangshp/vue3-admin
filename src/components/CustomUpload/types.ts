import type { UploadRawFile } from 'element-plus';

/**
 * 上传文件项类型
 */
export interface UploadFileItem {
  uid: number;
  name: string;
  url?: string;
  nameBack?: string;
  custOrd: number;
  raw?: UploadRawFile;
  [key: string]: any;
}

/**
 * 自定义上传组件Props类型
 */
export interface CustomUploadProps {
  modelValue: string | UploadFileItem[];
  type?: 1 | 2 | 3;
  limit?: number;
  fileSize?: number;
  fileType?: string[];
  isShowTip?: boolean;
  isShowSortInput?: boolean;
  title?: string;
  isLink?: boolean;
  multiple?: boolean;
  viewUploadFile?: boolean;
  params?: Record<string, any>;
  uploadFn?: (formData: FormData) => Promise<any>;
  uploadFile?: string;
  uploadExitData?: Record<string, any>;
  isAutoUpload?: boolean;
  disabled?: boolean;
  isManyFiles?: boolean;
}

/**
 * 自定义上传组件Emits类型
 */
export type CustomUploadEmits = {
  'update:modelValue': [value: UploadFileItem[]];
  uploadSuccess: [value: UploadFileItem[]];
};

/**
 * 自定义上传组件暴露的方法类型
 */
export interface CustomUploadExpose {
  uploadFileHandler: () => Promise<void>;
}
