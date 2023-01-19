const gameModel = require('../models/games')

const gameController = {
    create: async(req,res) => {
        try {
            const game = {
                name: req.body.name ,
                price: req.body.price ,
                urlImage: req.body.image ,               
            };
            const response = await gameModel.create(game);
            res.status(201).json({response, msg:"The game was successfully posted in the database" })
            console.log("um jogo foi postado")

        } catch (error) {
            console.log(error)
        }

    }
}

module.exports = gameController;