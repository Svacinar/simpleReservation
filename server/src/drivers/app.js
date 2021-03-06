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
const deleteReservation  = require('../use_case/deleteReservation')

const sessionRepository = require('../infrastructure/data_access/mongoDb/mongoSessionRepository')({connection: mongoConnection});
const reservationRepository = require('../infrastructure/data_access/mongoDb/mongoReservationRepository')({connection: mongoConnection});
const userRepository = require('../infrastructure/data_access/mongoDb/mongoUserRepository')({connection: mongoConnection})

const cryptography = require('../infrastructure/cryptography/cryptography')(process.env.JWTPRIVATEKEY)
const verifyToken = require('./middleware/verifyToken')(cryptography);
const {reqResMiddleware} = require("./middleware/reqResMiddleware");

const mailService = new Mailer();
const errorHandler = require('../infrastructure/errors/errorHandler');
const {addNewSession} = require("../use_case/addNewSession");
const {getAllSessions} = require("../use_case/getAllSessions");
const {deleteSession} = require("../use_case/deleteSession");
const {sendEmail} = require("../use_case/sendEmail");

app.use(express.json());

app.use(express.static(path.join(__dirname, '../../../client/build/'))); // TODO testing?

app.use(reqResMiddleware({logger: console}));

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

app.get('/session', verifyToken, async (req, res, next) => {
    try {
        const result = await getAllSessions(sessionRepository, req.user)
        res.status(200).send(result)
    } catch (e) {
        next(e)
    }
})

app.get('/deleteToken/:id', async (req, res, next) => {
    const token = req.params.id; //TODO generovat do mailu uuid, verify via redis
    try {
       await deleteReservation(token, reservationRepository, sessionRepository, mailService, {});
       res.status(204).send()
    } catch (e) {
        next(e)
    }
})

app.delete('/session/:id', verifyToken, async(req, res, next) => {
    try {
        await deleteSession(sessionRepository, req.params.id, req.user);
        res.status(204).send();
    } catch (e) {
        next(e);
    }
})

app.post('/session', verifyToken, async (req, res, next) => {
    try {
        await addNewSession({
            sessionData: req.body.session,
            user: req.user,
            sessionRepository,
        });
        res.status(204).send()
    } catch (e) {
        next(e);
    }
})

app.post('/reservation', async (req, res, next) => {
    const reservation = req.body;
    try {
        await makeNewReservation(reservationRepository, sessionRepository, reservation, mailService);
        res.status(204).send();
    } catch (e) {
        next(e);
    }
})

app.get('/reservation', verifyToken, async (req, res) => {
    const reservations = await getReservationsForUser(reservationRepository, req.user);
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
        res.send({
            token: user.getLoginToken()
        })
    } catch (e) {
        next(e);
    }
})

app.delete('/reservation/:id', verifyToken, async (req, res, next) => {
    const reservationId = req.params.id
    await deleteReservation(reservationId, reservationRepository, sessionRepository, mailService, req.user);
    res.status(204).send();
})

app.post('/email', verifyToken, async (req, res, next) => {
    try {
        await sendEmail(mailService, req.body.emailData, req.user);
        res.send(204)
    } catch (e) {
        next(e)
    }
})

app.get('*', (req, res) => {
    res.redirect('/');
});

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



