module.exports = buildMakeUser = ({}) => {
    return makeUser = ({
        username,
        password, //TODO hash az v entity, nebo uz v usecase?
        isAdmin = false,
        isLoggedIn = false, //TODO guestUser
        loginToken = null
    }) => {
        if (!username) throw new Error('No username set');
        if (!password) throw new Error('No password set');
        return Object.freeze({
            getUsername: () => username,
            getPassword: () => password,
            isAdmin: () => isAdmin,
            isLoggedIn: () => isLoggedIn,
            getLoginToken: () => loginToken,
        })
    }
}

//