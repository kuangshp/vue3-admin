export const validateMax50Int = (rule, value, callback) => {
  if (Number.isInteger(value) && value > 0 && value <= 50) {
    callback();
  } else {
    callback(new Error('必须是1-50的整数'));
  }
};
