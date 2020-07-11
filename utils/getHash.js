const crypto = require('crypto')

module.exports = (string) => {
    const shasum = crypto.createHash('sha256')
    shasum.update(string)
    return shasum.digest('hex')
}