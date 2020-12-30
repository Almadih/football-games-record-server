const player = require('express').Router()
const PlayerController = require('../controllers/PlayerController')

player.get('/',PlayerController.index)
player.post('/new',PlayerController.create)
player.get('/:id',PlayerController.find)
player.delete('/:id',PlayerController.delete)
player.put('/:id',PlayerController.update)


module.exports = player