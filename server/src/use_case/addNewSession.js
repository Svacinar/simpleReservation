const {makeSession} = require("../entity/Session");

const addNewSession = async ({
         sessionData,
         user,
         sessionRepository,
     }) => {
    if (!user.isAdmin()) throw new Error('User is not admin');
    const session = makeSession(sessionData)
    const sessionExists = await sessionRepository.getSessionByParameters({
        dateTime: new Date(sessionData.dateTime),
        availability: true,
    });
    if (sessionExists.length) throw new Error('Available session already exists for given datetime');
    await sessionRepository.insertSession(session);
}

module.exports = {
    addNewSession,
}