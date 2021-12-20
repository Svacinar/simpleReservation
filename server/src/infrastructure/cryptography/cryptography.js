const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = () => {
    const generateAuthToken = async (payload) => {
        return await jwt.sign(
            payload,
            process.env.JWTPRIVATEKEY,
        )
    }
    const compare = async (rawPassword, hashedPassword) => {
        console.log(rawPassword, hashedPassword)
        return await bcrypt.compare(rawPassword, hashedPassword)
    }
    const hash = async (password, salt = 12) => {
        return bcrypt.hash(password, salt);
    }
    const decode = async (token) => {
        return jwt.verify(token, process.env.JWTPRIVATEKEY)
    }
    return Object.freeze({
        generateAuthToken,
        compare,
        hash,
        decode,
    })
}