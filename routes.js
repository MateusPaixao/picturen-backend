const express = require('express')
const routes = express.Router()

const GoogleSearch = require('./controllers/GoogleSearch')
const Dictonary = require('./controllers/Dictonary')

/**
 * 
 * Rota de busca de imagem: 
 * 
 * A api recebe um termo
 * busca no google images esse termo
 * retorna uma lista com 10 items
 * 
 */

routes.get('/images', GoogleSearch.find)

/**
 * 
 * Rota de criação de palavra do dicionário
 * 
 * A api recebe link, word, username
 * e salva essa infos em uma tabela de dicionário
 * 
 */

routes.post('/words', Dictonary.create)


/**
 * 
 * Rota de listagem de dicionário
 * 
 * A api recebe o username do usuário
 * e lista todos as palavras associodas
 * 
 */

routes.get('/words/:username', Dictonary.list)

routes.put('/words/:id', Dictonary.update)
routes.delete('/words/:id', Dictonary.delete)

module.exports = routes