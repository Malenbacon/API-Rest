const router = require('express').Router();
const gameController = require('../controllers/gamesController')

router.route("/").post((req, res) => gameController.create(req, res));
router.route("/").get((req, res) => gameController.get(req, res));
router.route("/").delete((req, res) => gameController.delete(req, res));
router.route("/").patch((req, res) => gameController.update(req, res));


module.exports = router;