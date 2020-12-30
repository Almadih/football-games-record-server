const team = require('express').Router()
const TeamsController = require('../controllers/TeamsController')

team.get('/',TeamsController.index)
team.get('/:id',TeamsController.find)
team.put('/:id',TeamsController.update)
team.delete('/:id',TeamsController.delete)
team.post('/new',TeamsController.create)



module.exports = team