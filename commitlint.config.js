module.exports = {
  //继承的规则
  extends: ['@commitlint/config-conventional'],
  // 定义规则
  roles: {
    'type-enum': [
      // 当前验证的错误级别
      2,
      // 在什么情况下进行验证
      'always',
      // 泛型内存(根据.cz-config.js中来配置)
      ['feat', 'fix', 'docs', 'styles', 'refactor', 'perf', 'test', 'revert', 'build'],
    ],
    // subject大小写不做校验
    'subject-case': [0],
  },
};
