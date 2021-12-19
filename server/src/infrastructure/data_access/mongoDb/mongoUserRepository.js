const makeUserModel = require('./models/user');

module.exports = ({connection}) => {
    const UserModel = makeUserModel(connection);
    const getUserDetails = async (username) => {
        return await UserModel.findOne({
            username: username,
        }).exec();
    }
    const createNewUser = async ({
        username,
        password,
        isAdmin,
    }) => {
        await new UserModel({username, password, isAdmin}).save();
    }
    return {
        getUserDetails,
        createNewUser,
    }
}