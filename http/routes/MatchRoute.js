const match = require('express').Router()
const MatchController = require('../controllers/MatchController')
match.get('/',MatchController.index)
match.post('/new',MatchController.create)
match.put('/:id',MatchController.update)
match.delete('/:id',MatchController.delete)
match.get('/:id',MatchController.find)

module.exports = match