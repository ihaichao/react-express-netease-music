var NewSongsModel = require('../schemas/newSongs')
var PlayList = require('../schemas/playList')
var Mv = require('../schemas/mv')
var DJProgram = require('../schemas/djProgram')
var Personalized = require('../schemas/personalized')
var PrivateContent = require('../schemas/privateContent')

// 推荐歌单
exports.getPersonalized = (req, res, next) => {
	Personalized.find({}, function (err, result) {
		res.send(result)
	})
}

// 独家放送
exports.getPrivatecontent = (req, res, next) => {
	PrivateContent.find({}, function (err, result) {
		res.send(result)
	})
}

// 最新音乐
exports.getNewSongs = (req, res, next) => {
	NewSongsModel.find({ "newSong": true }, function (err, result) {
		res.send(result)
	})
}

// 推荐 MV
exports.getMV = (req, res, next) => {
	Mv.find({}, function (err, result) {
		res.send(result)
	})
}

// 主播电台
exports.getDJProgram = (req, res, next) => {
	DJProgram.find({}, function (err, result) {
		res.send(result)
	})
}

// 播放列表
exports.getPlayList = (req, res, next) => {
	PlayList.find({}, function (err, result) {
		res.send(result)
	})
}