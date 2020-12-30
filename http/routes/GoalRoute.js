const goal = require('express').Router()
const { Goal } = require('../../database/models/goal')
const GoalController = require('../controllers/GoalController')
goal.get('/',GoalController.index)

module.exports = goal