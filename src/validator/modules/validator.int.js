export const validateInt = (rule, value, callback) => {
  if (/^\d+$/.test(value)) {
    callback();
  } else {
    callback(new Error('必须是整数'));
  }
};
