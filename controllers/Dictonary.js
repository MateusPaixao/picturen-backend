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

        const words = await connection(table).orderBy('id', 'desc').where('username', username)

        return res.json({ words })
    },

    delete: async (req, res) => {
        const { username, id } = req.params

        if(req.username !== username){
            return res.status(401).json({ error: true, message: 'operation not permitted' })
        }

        try {
            await connection(table)
            .where('id', id)
            .del()

            return res.status(204).send()
        } catch (error) {
            return res.status(500).json({ error: true, message: 'internal server error, try again letter' })
        }
    },

    update: async (req, res) => {
        const { username, id } = req.params
        const { word } = req.body

        if(req.username !== username){
            return res.status(401).json({ error: true, message: 'operation not permitted' })
        }

        try {
            const update = await connection(table)
            .where('id', id)
            .update({ word })

            return res.status(204).send()
        } catch (error) {
            return res.status(500).json({ error: true, message: 'internal server error, try again letter' })
        }
    }
}