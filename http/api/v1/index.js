const v1 = require('express').Router()
const player = require('../../routes/PlayerRoute')
const team = require('../../routes/TeamRoute')
const match = require('../../routes/MatchRoute')
const goal = require('../../routes/GoalRoute')
const admin = require('../../routes/AdminRoute')

v1.use('/player',player)
v1.use('/team',team)
v1.use('/match',match)
v1.use('/goal',goal)
v1.use('/admin',admin)




module.exports = v1
