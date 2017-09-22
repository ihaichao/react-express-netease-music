const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const index = require('./routes/index')
const users = require('./routes/users')

const DB_URL = 'mongodb://localhost:27017/netease-music'
mongoose.connect(DB_URL, { useMongoClient: true })

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

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)
app.use('/users', users)

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
