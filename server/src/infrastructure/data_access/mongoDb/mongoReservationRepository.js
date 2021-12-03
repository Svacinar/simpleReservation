const makeReservationModel = require('./models/reservation');

module.exports = ({connection}) => {
    const ReservationModel = makeReservationModel(connection);
    const getAllReservations = async () => {
        // TODO check user role
        const result = await Session.find().exec();
        return result;
    }
    const insertReservation = async (reservation) => {
        const reservationObject = new ReservationModel(reservation);
        await reservationObject.save();
    }
    return {
        getAllReservations,
        insertReservation,
    }
}