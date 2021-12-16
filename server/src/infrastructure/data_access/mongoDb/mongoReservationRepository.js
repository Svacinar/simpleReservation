const makeReservationModel = require('./models/reservation');

module.exports = ({connection}) => {
    const ReservationModel = makeReservationModel(connection);
    const getAllReservations = async () => {
        // TODO check user role
        return await ReservationModel.find().exec();
    }
    const insertReservation = async (reservation) => {
        const reservationObject = new ReservationModel(reservation);
        await reservationObject.save();
    }
    const getReservationsForUser = async (userId) => {
        return await ReservationModel.find({
            userId: userId,
        }).exec();
    }
    return {
        getAllReservations,
        insertReservation,
        getReservationsForUser,
    }
}