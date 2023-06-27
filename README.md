## `vue-admin`介绍

针对企业后台管理项目搭建的基础框架模型，实现基本的布局、登录权限、多环境区分、菜单权限、动态路由，如果你没有后端接口，[你可以使用 nestjs 后端项目](https://github.com/kuangshp/nestjs-mysql-api)

## 使用方式

- 1、下载代码
- 2、安装依赖包
- 3、运行项目

## 界面展示

- 1、登录页面

  ![image-20230627161944230](D:\vue3-admin\assets\image-20230627161944230.png)

- 2、登录进去后的页面展示

  ![image-20230627162014614](D:\vue3-admin\assets\image-20230627162014614.png)

## 菜单权限

- 1、模拟当前用户拥有的权限列表，实际开发中请求后端数据接口，覆盖这个数据就可以

  ```js
  // TODO 实际开发替换模拟后端返回的菜单列表
  authMenusList: ['account', 'resources', 'accountDetail', 'baidu','role'],
  ```

