const makeReservationModel = require('./models/reservation');

module.exports = ({connection}) => {
    const ReservationModel = makeReservationModel(connection);
    const getAllReservations = async () => {
        return await ReservationModel.find().exec();
    }
    const insertReservation = async (reservation) => {
        const reservationObject = new ReservationModel(reservation);
        const result = await reservationObject.save();
        return {insertId: result._doc._id.toString()}
    }
    const getReservationsForUser = async (userId) => {
        return await ReservationModel.find({
            userId: userId,
        }).exec();
    }
    const getReservationBy = async (reservationId) => {
        return await ReservationModel.find({
            _id: reservationId,
        }).exec();
    }
    const deleteReservation = async (reservationId) => {
        return await ReservationModel.deleteOne({
            _id: reservationId,
        }).exec();
    }
    return {
        getAllReservations,
        insertReservation,
        getReservationsForUser,
        getReservationBy,
        deleteReservation,
    }
}