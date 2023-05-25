export const validatePassword = () => {
  return (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error('密码错误'));
    } else {
      callback();
    }
  };
};
