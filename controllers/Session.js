const connection = require('../database/connection')
const jwt = require('jsonwebtoken')
const getHash = require('../utils/getHash')
const { validateEmail } = require('../utils/validate')

const table = 'users'

module.exports = {
    create: async (req, res) => {
        let { email, password } = req.body

        if(!validateEmail(email)){
            return res.status(400).json({ error: 'Invalid email.' })
        }

        password = getHash(password)

        const user = await connection(table)
            .where({ email, password })
            .select('*')
            .first()
            
        if (!user) {
            return res.status(400).json({ error: 'Authentication fail' })
        }

        delete user.password

        const token = jwt.sign({ ...user }, process.env.SECRET, {
            expiresIn: '99999 years'
        })

        return res.json({ ...user, auth: true, token })
    },

    delete: (req, res) => {
        return res.json({ auth: false, token: null })
    }
}