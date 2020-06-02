const express = require('express');

const app = express();
app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,token');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});
app.get('/category', (req, res) => {
  res.json({
    menuList: [
      {
        id: 0,
        icon: 'el-icon-s-order',
        index: 'table',
        title: '基础表格',
        pid: -1,
      },
      {
        id: 1,
        icon: 'el-icon-s-marketing',
        index: 'tab',
        title: 'tab选项卡',
        pid: -1,
      },
      {
        id: 2,
        icon: 'el-icon-folder-opened',
        index: 'form',
        title: '表单相关',
        pid: -1,
      },
      {
        id: 3,
        index: 'base_form',
        title: '基本表单',
        icon: 'el-icon-s-data',
        pid: 2,
      },
      {
        id: 4,
        index: 'upload',
        title: '文件上传',
        pid: 2,
      }
    ]
  });
});
app.listen(3000); // http://localhost:3000/category