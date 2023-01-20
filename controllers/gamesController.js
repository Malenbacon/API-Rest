const gameModel = require('../models/games')

const checkLink = (link) => {                   //verify if the link is from imgur
    const domain = new URL(link)
    if (domain.hostname === "i.imgur.com" || domain.hostname === "imgur.com") return true
    return false
}

const gameController = {
    create: async (req, res) => {
        try {
            const game = {
                name: req.body.name,
                price: req.body.price,
                urlImage: req.body.image,
            };
            game.name = game.name.replace(/\s+/g, "_") //replace the spaces with underscores
            if (!checkLink(game.urlImage)) return res.status(422).json({ msg: "The link to the image must be from imgur" });
            const response = await gameModel.create(game);
            res.status(201).json({ response, msg: "The game was successfully posted in the database" });
            console.log("um jogo foi postado");

        } catch (error) {
            console.log(error)
        }

    },
    get: async (req, res) => {
        try {
            if (req.query.name) { //get only one result with query strings
                const response = await gameModel.findOne({ name: req.query.name })
                if(!response) return res.status(404).json({msg:"The game was not found, verify if the game was typed right. The query string is case sensive and use underscores instead of spaces"})
                return res.json(response)
            }
            const response = await gameModel.find()
            return res.json(response)
        }
        catch (error) {
            console.log(error)
        }
    },

    delete: async (req, res) => {
        try {
            const gameToBeDeleted = req.query.name;
            if (!gameToBeDeleted) return res.status(400).json({ msg: "Insert the of name the game you want to delete as a query string in the url. Example:/api/games/?name=Hollow_Knight" })
            const response = await gameModel.deleteOne({ name: gameToBeDeleted })
            if (response.deletedCount === 0) return res.status(500)
            res.json(response)
        } catch (error) {
            console.log(error)
        }
    },
    update: async (req, res) => {
        try {
 
            const gameToBePatched = req.query.name;
            if (!gameToBePatched) return res.status(400).json({ msg: "Insert the of name the game you want to patch as a query string in the url. Example:/api/games/?name:HollowKnight" }) //return an error if the query string does not exist
            const response = await gameModel.findOneAndUpdate({ name: gameToBePatched}, req.body);
            res.json({ response })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = gameController;