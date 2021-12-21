const {buildMakeUser} = require('../entity/User');
module.exports = async ({
    userRepository,
    crypto,
    rawUser,
}) => {
    const makeUser = buildMakeUser({crypto});
    const validateInput = (user) => {
        if (!user.username) return false; //TODO meaningful logic
        if (!user.password) return false;
        return true
    }
    if (!validateInput(rawUser)) {
        throw new Error('Provided user data not valid');
    }
    const userDetails = await userRepository.getUserDetails(rawUser.username);
    if (!userDetails) {
        //TODO -> error, nebo guest?
        throw new Error('User not found')
    }
    const validPassword = await crypto.compare(
        rawUser.password,
        userDetails.password,
    );
    if (!validPassword) throw new Error('Password provided not valid');
    return makeUser({
        username: userDetails.username,
        password: userDetails.password,
        isAdmin: userDetails.isAdmin,
        isLoggedIn: true,
    });
}