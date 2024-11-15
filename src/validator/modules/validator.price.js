export const validatePrice = (rule, value, callback) => {
  if (value) {
    if (/^\d+([.]\d{0,2})?$/.test(value)) {
      callback();
    } else {
      callback(new Error('必须是两位小数'));
    }
  } else {
    callback();
  }
};
