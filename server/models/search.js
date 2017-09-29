const Songs = require('../schemas/newSongs')

exports.searchSongs = (req, res, next) => {
	const search = new RegExp(req.query.search)
	Songs.find({ $or: [{ 'name': search }, { 'artistName': search }] }, function (err, result) {
		res.send(result)
	})
}