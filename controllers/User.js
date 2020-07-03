const connection = require('../database/connection')

const table = 'users'

module.exports = {
    list: async (req, res) => {
        const columns = [
            'id',
            'name',
            'email',
            'active',
            'removed',
            'created_at',
            'updated_at',
            'username'
        ]
        const users = await connection(table).select(columns).where('removed', 0)
        return res.json({ users })
    },

    find: async (req, res) => {
        const { username } = req.params
        const [user] = await connection(table).select('*').where('username', username).limit(1)

        if (user){
            delete user.password
            return res.json({ user })
        }else{
            return res.status(404).json({ message: 'Any user found' })
        }
        
    },

    create: async (req, res) => {
        const { name, username, email, password } = req.body

        const userExists = await connection(table).select('*').where('email', email).limit(1)

        if(userExists.length){
            return res.status(400).json({ error: true, message: 'email already used' })
        }

        const [id] = await connection(table).insert({
            name,
            username,
            email,
            password
        }, 'id')

        return res.json({ id })
    },

    update: async (req, res) => {
        const { id } = req.params
        const { name, email, password } = req.body

        const [userExists] = await connection(table).select('*').where({ id, removed: 0 }).limit(1)

        if(!userExists){
            return res.status(404).json({ error: true, message: 'user not found' })
        }

        const newEmail = userExists.email != email ? true : false

        if(newEmail){
            const [checkEmail] = await connection(table).select('email').where('email', email).limit(1)

            if(!!checkEmail){
                return res.status(400).json({ error: true, message: 'email already used' })
            }
        }

        try {
            await connection(table)
            .where('id', id)
            .update({
                name,
                email,
                password
            }, 'id')
            
            return res.status(200).json({
                id: Number(id),
                name,
                email,
                password
            })
        } catch (error) {
            return res.status(500).json({ error: true, message: 'internal server error, try again latter' })
        }
    },

    delete: async (req, res) => {
        const { id } = req.params

        // TODO:
        // Add userId on request, with auth middleare
        // Add in update too
        if(req.userId !== id){
            return res.status(401).json({ error: true, message: 'operation not permitted' })
        }

        try{
            await connection(table)
            .where('id', id)
            .update({ removed: 1 })
        
            return res.status(204).send()
        }catch(error){
            return res.status(500).json({ error: true, message: 'internal server error, try again letter' })
        }

        
    }
}