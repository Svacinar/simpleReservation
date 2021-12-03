const mongoose = require("mongoose");
module.exports = class DatabaseConnection {
    constructor({username, password, endpoint}) {
        this.uri = `mongodb+srv://${username}:${password}@${endpoint}`;
    };
    init() {
        mongoose.connect(this.uri).then(() => console.log('MONGODB connected'));
        return mongoose;
    }
}