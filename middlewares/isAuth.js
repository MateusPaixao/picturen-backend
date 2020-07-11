const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.headers.authorization

    if (!token) return res.status(401).json({ auth: false, message: 'no token provided.' })

    jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error) return res.status(500).json({ auth: false, message: 'failed to authenticate token.' })

        req.userId = decoded.id
        req.username = decoded.username
        next()
    })
}