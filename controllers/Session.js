const connection = require('../database/connection')
const jwt = require('jsonwebtoken')
const getHash = require('../utils/getHash')

const table = 'users'

module.exports = {
    create: async (request, response) => {
        let { email, password } = request.body
        password = getHash(password)

        const user = await connection(table)
            .where({ email, password })
            .select('*')
            .first()

        if (!user) {
            return response.status(400).json({ error: 'Authentication fail' })
        }

        delete user.password

        const token = jwt.sign({ ...user }, process.env.SECRET, {
            expiresIn: '99999 years'
        })

        return response.json({ ...user, auth: true, token })
    },

    delete: (request, response) => {
        return response.json({ auth: false, token: null })
    }
}