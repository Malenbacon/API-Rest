const router = require('express').Router();
const gameController = require('../controllers/gamesController')

router.route("/").post((req,res) => gameController.create(req,res));

module.exports = router;