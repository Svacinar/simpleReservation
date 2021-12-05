const makeNewReservation = require('../entity/Reservation');
const makeNewEmail = require('../entity/Email');
const dayjs = require("dayjs");
const BaseError = require('../infrastructure/errors/BaseError');

module.exports = async (reservationRepository = {}, sessionRepository, reservationData, mailService) => {
    if (!verifyProvidedReservationData(reservationData)) {
        throw new BaseError('BAD_REQUEST_ERROR',400, 'Provided reservation data is invalid');
    }

    await verifySessionExists(sessionRepository,reservationData);

    const reservation = makeNewReservation({
        userId: reservationData.email,
        preferences: reservationData.preferences,
        dateTime: reservationData.selectedDateTime,
    });

    await reservationRepository.insertReservation(reservation);

    await sessionRepository.setSessionParameter({
        dateTime: reservation.dateTime,
        availability: true,
    }, {
        availability: false,
    });

    const email = makeNewEmail({
        subject: "Potvrzení rezervace ✔",
        text: `Vaše rezervace na ${dayjs(reservationData.selectedDateTime).format('DD.MM.YYYY HH:mm')} byla přijata. Děkujeme`,
        sender: process.env.EMAIL_SENDER,
        receiver: [
            process.env.DEFAULT_EMAIL,
            reservationData.email,
        ],
    });
    await mailService.sendEmail(email);
}

const verifyProvidedReservationData = (reservationData) => {
    if (!reservationData.selectedDateTime) return false;
    if (!reservationData.email) return false;
    if (!reservationData.preferences) return false;
    return true;
}

const verifySessionExists = async (sessionRepository, reservationData) => {
    const sessionDetails = await sessionRepository.getSessionByParameters({
        dateTime: new Date(reservationData.selectedDateTime),
        availability: true,
    });

    if (sessionDetails.length === 0) {
        throw new BaseError('BAD_REQUEST_ERROR', 400, `No session available for parameters: ${JSON.stringify(reservationData)}`);
    }
    return true;
}
