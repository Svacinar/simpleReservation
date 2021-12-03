const makeSession = require('./models/session');

module.exports = ({connection}) => {
    const Session = makeSession(connection);
    const getAvailableSessions = async (dateTime) => {
        const result = await Session.find({dateTime: dateTime, availability: true}).exec();
        return result;
    }
    const insertSession = async (session) => {
        const sessionObject = new Session(session)
        await sessionObject.save();
    }
    return {
        getAvailableSessions,
        insertSession,
    }
}