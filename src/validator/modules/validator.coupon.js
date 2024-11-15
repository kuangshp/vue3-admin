export const validateCoupon = (rule, value, callback) => {
  if (/^\d+$/.test(value) && value <= 99999) {
    callback();
  } else {
    callback(new Error('必须是1-99999的整数'));
  }
};
