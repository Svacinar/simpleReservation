const makeSession = (sessionData) => {
    if (!sessionData) {
        throw new Error('No data provided');
    }
    // TODO meaningful validation logic
    if (!sessionData.dateTime) {
        throw new Error('No date provided');
    }
    return {
        dateTime: sessionData.dateTime,
        preferences: sessionData.preferences || [],
        availability: sessionData.availability || true,
    }
}

module.exports = {
    makeSession,
}