const list = [
  [
    { thumbnailUrl: '1', attributeValue: '红色' },
    { attributeValue: '紫色', thumbnailUrl: '2' },
  ],
  // [
  //   { thumbnailUrl: '3', attributeValue: '中' },
  //   { attributeValue: '小', thumbnailUrl: '4' },
  // ],
];

// 组成sku信息
const result = list.reduce((pre, cur) => {
  console.log('进来了');
  let res = [];
  for (const item of pre) {
    for (const it of cur) {
      let t = item.attributeValue + ',' + it.attributeValue;
      res.push({
        attributeValue: t,
        thumbnailUrl: item.thumbnailUrl || it.thumbnailUrl || '',
        attrJson: [item, it],
      });
    }
  }
  return res;
});
const foo = (list) => {
  let result = [];
  if (list.length == 0) {
    return result;
  }
  if (list.length == 1) {
    result = list[0];
  }
  for (const item of list) {
    for (const it of item) {
      let t = item.attributeValue + ',' + it.attributeValue;
      res.push({
        attributeValue: t,
        thumbnailUrl: item.thumbnailUrl || it.thumbnailUrl || '',
        attrJson: [item, it],
      });
    }
  }
  return result;
};
console.log(JSON.stringify(result));
console.log(JSON.stringify(foo(list)));
console.log(JSON.stringify(list));
