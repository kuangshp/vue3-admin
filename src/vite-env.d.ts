/// <reference types="vite/client" />

// Vue单文件组件声明
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// SVG图标注册模块声明
declare module 'virtual:svg-icons-register' {
  const content: string;
  export default content;
}

// JavaScript模块的宽松声明，确保TypeScript不会对JS文件进行严格检查
declare module '*.js' {
  const content: any;
  export default content;
}

declare module '*.jsx' {
  const content: any;
  export default content;
}

// 环境变量类型声明
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_BASE_API: string;
  // 可以添加其他环境变量的类型声明
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
