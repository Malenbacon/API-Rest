const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const routes = express.Router()

app.use(express.json())
app.use(routes)

mongoose.connect(process.env.DATABASE_URL)
.then(() => {
    app.listen(3000)
    console.log('conectou ao mongodb')
})
.catch((e) => console.log(e))