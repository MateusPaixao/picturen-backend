const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
    const token = request.headers.authorization

    if (!token) return response.status(401).json({ auth: false, message: 'no token provided.' })

    jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error) return response.status(500).json({ auth: false, message: 'failed to authenticate token.' })

        request.userId = decoded.id
        next()
    })
}