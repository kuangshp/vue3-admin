/********************************定义一个方法将modules中的文件全部导入进来 start********************************/
const routerList = [];
function importAll (r) {
  r.keys().forEach((key) => routerList.push(r(key).default));
}
importAll(require.context('./modules', true, /\.js/));
/********************************定义一个方法将modules中的文件全部导入进来 end********************************/

// 用户定义的全部路由
export const constantRoutes = routerList;
