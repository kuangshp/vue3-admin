const toString = Object.prototype.toString;

export const isObject = (obj) => {
  return Object.is(toString.call(obj), '[object Object]');
};

export const isRegExp = (v) => {
  return Object.is(toString.call(v), '[object RegExp]');
};


export const isValidArrayIndex = (val) => {
  const n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
};

export const isString = (str) => {
  return Object.is(toString.call(str), '[object String]');
};
