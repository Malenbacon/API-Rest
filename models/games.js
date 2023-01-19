const mongoose = require('mongoose');

const gamesModel = mongoose.model('games', {
    name:String,
    price:String,
    urlImage:String
  });
module.exports = gamesModel;
