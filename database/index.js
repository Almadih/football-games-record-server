const mongoose = require('mongoose')
const {Team} = require('./models/team')
const {Player} = require('./models/player')
const {Match} = require('./models/match')
const {Goal} = require('./models/goal')
const {Admin} = require('./models/admin')
require('dotenv').config()

const connectDb = () => {
    return mongoose.connect(process.env.DATABASE_URL,{useUnifiedTopology: true,useNewUrlParser:true});
  };

  module.exports = {connectDb,Team,Player,Match,Goal,Admin}