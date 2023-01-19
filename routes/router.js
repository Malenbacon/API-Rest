const router = require('express').Router();
const gamesRouter = require('./games')

router.use('/games' , gamesRouter)

module.exports = router;