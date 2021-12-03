//const mongoose = require('mongoose');
module.exports = (connection) => {
    const { Schema } = connection;
    //const {Schema: Schema2} = mongoose;
    const SessionSchema = new Schema({
        dateTime: Date,
        preferences: Array,
        availability: Boolean,
    });

    const Session = connection.model('Session', SessionSchema);
    return Session;
}
