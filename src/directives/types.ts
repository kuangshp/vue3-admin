import type { App, DirectiveBinding } from 'vue';

// 定义指令的配置类型
export interface DebounceOptions {
  callback: () => void;
  time: number;
}

export interface ThrottleOptions {
  callback: () => void;
  time: number;
}

// 输入类型
export type InputType = 'number' | 'decimal' | 'decimal_2' | 'customize';

export interface DirectiveModule {
  setupDirective: (app: App) => void;
}
