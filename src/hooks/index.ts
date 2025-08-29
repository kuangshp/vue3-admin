// // 动态导入所有模块
// const modules = import.meta.glob('./modules/*.ts', { eager: true });

// // 创建导出对象
// const exports: Record<string, any> = {};

// // 遍历模块并收集导出
// Object.entries(modules).forEach(([path, module]) => {
//   const fileName = path.split('/').pop()?.replace('.ts', '') || '';
//   if (fileName !== 'index') {  // 避免导出自己
//     Object.assign(exports, module);
//   }
// });

// // 导出所有收集的内容
// export default exports;
export * from './modules/useCopy';
export * from './modules/useTableData';
