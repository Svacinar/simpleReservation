const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = (secretKey) => {
    const generateAuthToken = async (payload) => {
        return await jwt.sign(
            payload,
            secretKey,
        )
    }
    const compare = async (rawPassword, hashedPassword) => {
        return await bcrypt.compare(rawPassword, hashedPassword)
    }
    const hash = async (password, salt = 12) => {
        return bcrypt.hash(password, salt);
    }
    const decode = async (token) => {
        return jwt.verify(token, secretKey)
    }
    return Object.freeze({
        generateAuthToken,
        compare,
        hash,
        decode,
    })
}