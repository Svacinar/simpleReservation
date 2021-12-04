module.exports = (reservationData) => {
    console.log(reservationData);
    if (!reservationData) {
        throw new Error('No data provided');
    }
    // TODO meaningful validation logic
    if (!reservationData.dateTime) {
        throw new Error('No date provided');
    }
    if (!reservationData.preferences) {
        throw new Error('No reservation preferences provided');
    }
    return {
        dateTime: new Date(reservationData.dateTime),
        preferences: reservationData.preferences,
        userId: reservationData.userId,
    }
}