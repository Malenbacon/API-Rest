const gameModel = require('../models/games')

const checkLink = (link) => {                   //verify if the link is from imgur
    const domain = new URL(link)
    if(domain.hostname === "i.imgur.com" || domain.hostname ==="imgur.com") return true
    return false
}  

const gameController = {
    create: async(req,res) => {
        try {
            const game = {
                name: req.body.name ,
                price: req.body.price ,
                urlImage: req.body.image ,               
            };

            if(!checkLink(game.urlImage)){
                res.status(422).json({msg:"The link to the image must be from imgur"})
                return
            }
            const response = await gameModel.create(game);
            res.status(201).json({response, msg:"The game was successfully posted in the database" })
            console.log("um jogo foi postado")

        } catch (error) {
            console.log(error)
        }
    
    },
    getAll: async(req,res) => {
        try{
            const response = await gameModel.find()
            res.json(response)
        }
        catch(error){
            console.log(error)
        }
    },

    delete: async(req,res) => {
        try {
            const gameToBeDeleted = req.body.name;
            gameModel.deleteOne()
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = gameController;