module.exports = (connection) => {
    const { Schema } = connection;
    const ReservationSchema = new Schema({
        dateTime: Date,
        preferences: Array,
        userId: String,
    });

    const Reservation = connection.model('Reservation', ReservationSchema);
    return Reservation;
}