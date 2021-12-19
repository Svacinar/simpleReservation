module.exports = (connection) => {
    const { Schema } = connection;
    const SessionSchema = new Schema({
        dateTime: Date,
        preferences: Array,
        availability: Boolean,
    });

    return connection.model('Session', SessionSchema);
}
