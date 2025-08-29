/**
 * 模态框Props类型
 */
export interface CustomModalProps {
  title?: string;
  modelValue: boolean;
  width?: number | string;
  height?: number | string;
  closeButton?: boolean;
  closeOnClickMask?: boolean;
  closeOnEsc?: boolean;
  contentStyle?: Record<string, any>;
  draggable?: boolean;
  fullscreen?: boolean;
  bodyStyle?: Record<string, any>;
  scrollTop?: number;

  // 允许传递任意以字符串为键的属性
  [key: string]: any;
}

/**
 * 模态框Emits类型
 */
export type CustomModalEmits = {
  'update:modelValue': [value: boolean];
  close: [];
  'fullscreen-change': [isFullscreen: boolean];
};

/**
 * 拖拽状态类型
 */
export interface DragState {
  isDragging: boolean;
  startX: number;
  startY: number;
  offsetX: number;
  offsetY: number;
  modalWidth?: number;
  modalHeight?: number;
}

/**
 * 内容位置类型
 */
export interface ContentPosition {
  x: number;
  y: number;
}
