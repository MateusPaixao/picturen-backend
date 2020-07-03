const connection = require('../database/connection')
const jwt = require('jsonwebtoken')

const table = 'users'

module.exports = {
    create: async (request, response) => {
        const { email, password } = request.body

        const user = await connection(table)
            .where({ email, password})
            .select('*')
            .first()

        delete user.password

        if (!user) {
            return response.status(400).json({ error: 'No user found with this credentials' })
        }

        const token = jwt.sign({ ...user }, process.env.SECRET, {
            expiresIn: '24h'
        })

        return response.json({ ...user, auth: true, token })
    },

    delete: (request, response) => {
        return response.json({ auth: false, token: null })
    }
}