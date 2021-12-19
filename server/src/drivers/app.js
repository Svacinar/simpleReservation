const express = require('express');

const app = express();
const path = require('path');

const Mailer = require('../infrastructure/mailing/nodeMailer');
const DatabaseConnection = require('../infrastructure/data_access/mongoDb/mongoConnection');
const mongoConnection = new DatabaseConnection({
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    endpoint: process.env.MONGO_ENDPOINT,
}).init();

const getAvailableSessions = require('../use_case/getAvailableSessions');
const makeNewReservation = require('../use_case/makeNewReservation');
const getReservationsForUser = require('../use_case/getReservationsForUser');
const loginUser = require('../use_case/loginUser')

const sessionRepository = require('../infrastructure/data_access/mongoDb/mongoSessionRepository')({connection: mongoConnection});
const reservationRepository = require('../infrastructure/data_access/mongoDb/mongoReservationRepository')({connection: mongoConnection});
const userRepository = require('../infrastructure/data_access/mongoDb/mongoUserRepository')({connection: mongoConnection})

const cryptography = require('../infrastructure/cryptography/cryptography')()


const mailService = new Mailer();
const errorHandler = require('../infrastructure/errors/errorHandler');

app.use(express.json());

app.use(express.static(path.join(__dirname, '../../../client/build/'))); // TODO testing?

app.get('/free-slots', async (req, res, next) => {
    const fromDate = req.query.from;
    const toDate = req.query.to;
    if (!fromDate) {
        next('No date selected');
    }
    try {
        const result = await getAvailableSessions(sessionRepository,{
            from: fromDate,
            to: toDate,
        });
        res.status(200).json(result);
    }
    catch (e) {
        next(e);
    }

})

app.post('/reservation', async (req, res, next) => {
    //TODO overit token -> middleware
    const reservation = req.body;
    try {
        await makeNewReservation(reservationRepository, sessionRepository, reservation, mailService);
        res.status(204).send();
    } catch (e) {
        next(e);
    }
})

app.get('/reservation', async (req, res) => {
    //TODO verify userId
    const reservations = await getReservationsForUser(reservationRepository, req.query.userId)
    res.status(200).json(reservations);
})

app.post('/login', async (req, res, next) => {
    const {username, password} = req.body;
    try {
        const user = await loginUser({
            userRepository,
            crypto: cryptography,
            rawUser: {
                username,
                password,
            }
        });
        res.send(user.getLoginToken())
    } catch (e) {
        next(e);
    }
})

app.use(function (err, req, res, next) {
    errorHandler.handleError(err, res);
})

process.on('uncaughtException', err => {
    errorHandler.handleError(err);
    process.exit(1);
})

process.on('unhandledRejection', (reason) => {
    errorHandler.handleError(reason);
    throw reason;
})

module.exports = {
    app,
}



