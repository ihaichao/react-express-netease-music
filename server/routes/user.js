var express = require('express')
var router = express.Router()

const home = require('../models/home')
const rank = require('../models/rank')
const search = require('../models/search')

router.get('/newsongs',home.getNewSongs);
router.get('/playlist',home.getPlayList);
router.get('/mv',home.getMV);
router.get('/djprogram',home.getDJProgram);
router.get('/privatecontent',home.getPrivatecontent);
router.get('/personalized',home.getPersonalized);

router.get('/officialrank', rank.getOfficialRank)
router.get('/nationalrank', rank.getNationalRank)

router.get('/search', search.searchSongs)

module.exports = router
