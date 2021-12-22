const buildMakeUser = ({crypto}) => {
    const hashPassword = async (password) => {
        if (!validatePassword(password)) throw new Error('Password not valid');
        await crypto.hash(password)
    };
    return makeUser = async ({
        username,
        password = null,
        isAdmin = false,
        isLoggedIn = false, //TODO guestUser
    } = {}) => {
        if (!username) throw new Error('No username set');
        const loginToken = await crypto.generateAuthToken({
            username: username,
            isAdmin: isAdmin,
            roles: 'test',
        })
        return Object.freeze({
            getUsername: () => username,
            getPassword: () => password,
            isAdmin: () => isAdmin,
            isLoggedIn: () => isLoggedIn,
            getLoginToken: () => loginToken,
            setPassword: async (rawPassword) => password = await hashPassword(rawPassword),
        })
    }
}

const validatePassword = (password) => {
    if (!password) return false;
    if (password.length < 5) return false;
    if (!password.match(/\d+/)) return false
    return true
}

module.exports = {
    buildMakeUser,
    validatePassword,
}