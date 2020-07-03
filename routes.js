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

routes.use(isAuth)

// Images routes
routes.get('/images', GoogleSearch.find)

// Words routes
routes.post('/words', Dictonary.create)
routes.get('/words/:username', Dictonary.list)
routes.put('/words/:id', Dictonary.update)
routes.delete('/words/:id', Dictonary.delete)

// Users routes

routes.post('/users', User.create)
routes.get('/users', User.list)
routes.get('/users/:username', User.find)
routes.put('/users/:id', User.update)
routes.delete('/users/:id', User.delete)

module.exports = routes