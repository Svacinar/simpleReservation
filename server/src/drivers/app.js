const express = require('express');

const app = express();

const Mailer = require('../infrastructure/mailing/nodeMailer');
const DatabaseConnection = require('../infrastructure/data_access/mongoDb/mongoConnection');
const mongoConnection = new DatabaseConnection({
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    endpoint: process.env.MONGO_ENDPOINT,
}).init();

const getAvailableSessions = require('../use_case/getAvailableSessions');
const makeNewReservation = require('../use_case/makeNewReservation');
const sessionRepository = require('../infrastructure/data_access/mongoDb/mongoSessionRepository')({connection: mongoConnection});
const reservationRepository = require('../infrastructure/data_access/mongoDb/mongoReservationRepository')({connection: mongoConnection});

const mailService = new Mailer();

app.use(express.json());

app.get('/free-slots', async (req, res) => {
    const date = req.query.date;
    if (!date) {
        throw new Error('No date selected');
    }
    const result = await getAvailableSessions(sessionRepository,date);
    res.status(200).json(result);
})

app.post('/reservation', async (req, res) => {
    //TODO overit token -> middleware
    const reservation = req.body;
    await makeNewReservation(reservationRepository, reservation, mailService);
    res.status(204).send();
})

app.post('/login', (req, res) => {
    //TODO login komponent - sprava rezervaci
    const userToken = req.body.token;
    const result = true; // TODO token verifikator (db call);
    let status = 200;
    if (!result) {
        status = 403;
    }
    res.status(status).send();
})

module.exports = {
    app,
}



