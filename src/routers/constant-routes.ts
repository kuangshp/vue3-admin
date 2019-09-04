/********************************定义一个方法将modules中的文件全部导入进来 start********************************/
const routerList: any[] = [];
function inportAll(r: any) {
  r.keys().forEach((key: string) => routerList.push(r(key).default));
}
inportAll(require.context('./modules', true, /\.ts/));
/********************************定义一个方法将modules中的文件全部导入进来 end********************************/

// 用户定义的全部路由
export const constantRoutes = routerList;
