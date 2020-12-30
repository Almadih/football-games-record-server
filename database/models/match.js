const mongoose = require('mongoose')

const MatchSchema = new mongoose.Schema({
    team_a:{type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
    team_b:{type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
    time:{type:Date,default:Date.now()},
    __v:{type: Number,select:false}

})

const Match = mongoose.model('Match',MatchSchema)

module.exports = {Match,MatchSchema}