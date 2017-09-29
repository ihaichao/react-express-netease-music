const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const user = require('./server/routes/user')

const DB_URL = 'mongodb://localhost:27017/netease-music'

mongoose.connect(DB_URL, { useMongoClient: true })

// 将数据写入 MongoDB (启动应用之后注释掉这段代码，否则会重复写入数据)
const MongoClient = require('mongodb').MongoClient
const fs = require('fs')
const djprogramFile = "./mongoDB/djprogram.json"
const djprogram = JSON.parse(fs.readFileSync(djprogramFile))
const mvFile = "./mongoDB/mv.json"
const mv = JSON.parse(fs.readFileSync(mvFile))
const personalFile = "./mongoDB/personal.json"
const personal = JSON.parse(fs.readFileSync(personalFile))
const playlistsFile = "./mongoDB/playlists.json"
const playlists = JSON.parse(fs.readFileSync(playlistsFile))
const privateContentFile = "./mongoDB/privateContent.json"
const privateContent = JSON.parse(fs.readFileSync(privateContentFile))
const rankFile = "./mongoDB/rank.json"
const rank = JSON.parse(fs.readFileSync(rankFile))
const songsFile = "./mongoDB/songs.json"
const songs = JSON.parse(fs.readFileSync(songsFile))
MongoClient.connect(DB_URL, function (err, db) {
  db.collection('djprogram').insert(djprogram)
  db.collection('MV').insert(mv)
  db.collection('personalized').insert(personal)
  db.collection('PlayList').insert(playlists)
  db.collection('privatecontent').insert(privateContent)
  db.collection('Rank').insert(rank)
  db.collection('Songs').insert(songs)
})

//连接成功
mongoose.connection.on('connected', function () {
  console.log('connect success ' + DB_URL);
})

//连接异常
mongoose.connection.on('error', function (err) {
  console.log('connect error: ' + err)
})

//连接断开
mongoose.connection.on('disconnected', function () {
  console.log('disconnect')
})

const app = express()

if (process.env.NODE_ENV !== 'production') {
  var webpack = require('webpack');
  var webpackConfig = require('./webpack.config.js');
  var webpackCompiled = webpack(webpackConfig);
  // 配置运行时打包
  var webpackDevMiddleware = require('webpack-dev-middleware');
  app.use(webpackDevMiddleware(webpackCompiled, {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
    lazy: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    },
  }));

  // 配置热更新
  var webpackHotMiddleware = require('webpack-hot-middleware');
  app.use(webpackHotMiddleware(webpackCompiled));
}

app.all('*', function (req, res, next) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.set("X-Powered-By", 'Express')
  // res.set("Content-Type", "text/html;charset=utf-8");
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(favicon(path.join(__dirname, 'public/imgs', 'logo.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', user)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
