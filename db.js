const mongoose = require('mongoose')

require('dotenv').config()

const conn = mongoose.connect(process.env.mongourl)

module.exports = {conn}