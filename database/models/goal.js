const mongoose = require('mongoose')

const GoalSchema = new mongoose.Schema({
    player:{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    count:{type:Number},
    __v:{type: Number,select:false}

})


const Goal = mongoose.model('Goal',GoalSchema)

module.exports = {Goal,GoalSchema}