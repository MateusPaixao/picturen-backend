const express = require('express')
const routes = express.Router()

const isAuth = require('./middlewares/isAuth')

const GoogleSearch = require('./controllers/GoogleSearch')
const Dictonary = require('./controllers/Dictonary')
const User = require('./controllers/User')
const Session = require('./controllers/Session')

// Session
routes.post('/sessions', Session.create)
routes.delete('/sessions', Session.delete)

// Create user
routes.post('/users', User.create)

routes.use(isAuth)

// Images routes
routes.get('/images', GoogleSearch.find)

// Words routes
routes.post('/words', Dictonary.create)
routes.get('/words/:username', Dictonary.list)
routes.put('/words/:username/:id', Dictonary.update)
routes.delete('/words/:username/:id', Dictonary.delete)

// Users routes

routes.get('/users', User.list)
routes.get('/users/:username', User.find)
routes.put('/users/:id', User.update)
routes.delete('/users/:id', User.delete)

module.exports = routes