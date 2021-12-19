module.exports = (connection) => {
    const { Schema } = connection;

    const UserSchema = new Schema({
        username: String,
        password: String,
        isAdmin: Boolean,
    });
    return connection.model('User', UserSchema);
}