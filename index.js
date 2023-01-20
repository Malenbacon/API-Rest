const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const routes = require('./routes/router')

const app = express();
app.use(express.json());


app.use('/api', routes);

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL)
  .then(() => 
  {
    app.listen(3000);
    console.log('conectou ao mongo');
  })
  .catch((e) => console.log(e));
