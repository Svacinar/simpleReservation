const BaseError = require("../infrastructure/errors/BaseError");
const getAllSessions = async (sessionRepository, user) => {
    if (!user.isAdmin()) throw new BaseError('BAD_REQUEST_ERROR', 400, 'USER IS NOT ADMIN');
    return await sessionRepository.getSessionByParameters(null);
}

module.exports = {
    getAllSessions,
}