const makeSession = require('./models/session');

module.exports = ({connection}) => {
    const Session = makeSession(connection);
    const getAvailableSessions = async (selectedDate) => {
        const dateTime = new Date(selectedDate);
        const nextDay = new Date(selectedDate);
        nextDay.setDate(nextDay.getDate() + 1);
        return await Session.find({
            dateTime: {
                "$gte": dateTime,
                "$lt": nextDay,
            },
            availability: true,
        }).exec();
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