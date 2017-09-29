# react-express-netease-music

React + Redux + Express + MongoDB 实现移动版网易云音乐

## Getting Started 

启动 mongoDB 服务
```bash
sudo mongod
```

启动 mongoDB shell  
```bash
mongo
```

创建数据库
```bash
use netease-music
```

安装依赖  
```bash
yarn install
```

启动应用
```bash
yarn run server
```

启动应用之后注释掉 app.js 中写数据到 mongodb 中的代码，否则会重复写入数据.