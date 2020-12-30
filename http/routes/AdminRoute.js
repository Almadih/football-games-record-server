const admin = require('express').Router()
const adminController = require('../controllers/AdminController')

admin.post('/login',adminController.login)
admin.post('/new',adminController.create)

module.exports = admin