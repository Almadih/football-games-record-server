const mongoose = require('mongoose')
const goal = require('./goal')
const {Goal} = require('./goal')

const PlayerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    profile:{
        type:String,
        required:false
    },
    __v:{type: Number,select:false}

},
) 
PlayerSchema.virtual('goals').get(async function(){
    let goals = await Goal.aggregate([{$match:{'player':this.id}},{ $group: { _id: "$player", count: { $sum: "$count" } } }])
    return goals;
})

// PlayerSchema.set('toJSON', { virtuals: true })
// PlayerSchema.set('toObject', { virtuals: true })


const Player = mongoose.model('Player',PlayerSchema)

module.exports = {Player,PlayerSchema}