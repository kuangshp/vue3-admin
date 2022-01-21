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
      // 泛型内存
      ['feat', 'fic', 'docs'],
    ],
    // subject大小写不做校验
    'subject-case': [0],
  },
};
