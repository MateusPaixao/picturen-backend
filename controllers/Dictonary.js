const connection = require('../database/connection')

const table = 'words'

module.exports = {
    create: async (req, res) => {
        const { link, word, username } = req.body

        const [id] = await connection(table).insert({
            link, word, username
        }, 'id')

        return res.json({
            id,
            link,
            word,
            username
        })
    },

    list: async (req, res) => {
        const { username } = req.params

        const words = await connection(table).select('*').where('username', username)

        return res.json({ words })
    }
}