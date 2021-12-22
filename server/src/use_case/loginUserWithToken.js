const {buildMakeUser} = require('../entity/User');

module.exports = async (
    {
        crypto,
        token,
    }) => {
    if (!token) throw new Error('No token provided')
    const makeUser = buildMakeUser({crypto})
    const decode = await crypto.decode(token);
    return makeUser({
        username: decode.username,
        password: decode.password,
        isAdmin: decode.isAdmin,
        isLoggedIn: true,
        loginToken: token,
    })
}