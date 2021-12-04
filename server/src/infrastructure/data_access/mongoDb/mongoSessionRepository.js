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
    const setSessionParameter = async (findParameters, changeParameters) => {
        const result = await Session.findOneAndUpdate(
            findParameters,
            {
                $set: changeParameters,
            },
            {
                returnNewDocument: true,
            }
        ).exec();
        if (!result) {
            throw new Error(`No session available for parameters: ${JSON.stringify(findParameters)}`);
        }
    }
    const insertSession = async (session) => {
        const sessionObject = new Session(session)
        await sessionObject.save();
    }
    return {
        getAvailableSessions,
        insertSession,
        setSessionParameter,
    }
}