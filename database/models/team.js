const mongoose = require('mongoose')


const TeamSchema = new mongoose.Schema({
    players:[{type: mongoose.Schema.Types.ObjectId, ref: 'Player'}],
    goals:[{type: mongoose.Schema.Types.ObjectId, ref: 'Goal'}],
    __v:{type: Number,select:false}
})

TeamSchema.virtual('goal_counts').get(function(){
    let goals_count = 0
    this.goals.forEach(goal => {
        goals_count += goal.count
    });
    return goals_count
})
TeamSchema.set('toJSON', { virtuals: true})
TeamSchema.set('toObject', { virtuals: true })

const Team = mongoose.model('Team',TeamSchema)

module.exports = {Team,TeamSchema}