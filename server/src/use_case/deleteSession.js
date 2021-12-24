const BaseError = require("../infrastructure/errors/BaseError");
const deleteSession = async (sessionRepository, sessionId, user) => {
    if (!user.isAdmin()) throw new BaseError('BAD_REQUEST_ERROR', 400, 'USER IS NOT ADMIN');
    return await sessionRepository.deleteSession(sessionId)
}

module.exports = {
    deleteSession,
}