module.exports = {
  plugins: [
    'preset-default', // 默认插件配置
    {
      name: 'removeAttrs',
      params: {
        attrs: '(fill|stroke)',
      },
    },
  ],
};
