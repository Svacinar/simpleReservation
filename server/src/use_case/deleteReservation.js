const makeNewEmail = require('../entity/Email');
const BaseError = require("../infrastructure/errors/BaseError");
const dayjs = require("dayjs");

module.exports = async (reservationId, reservationRepository, sessionRepository, mailService) => {
    const response = await reservationRepository.getReservationBy(reservationId);
    const reservation = response[0]?._doc || null;
    if (!reservation) throw new BaseError('BAD_REQUEST_ERROR', 400, `No reservation with id ${reservationId}`);
    await reservationRepository.deleteReservation(reservationId);
    await sessionRepository.setSessionParameter({
        dateTime: reservation.dateTime,
    }, {
        availability: true,
    });
    const email = makeNewEmail({
        subject: "Rezervace zrušena",
        text: `Vaše rezervace na ${dayjs(reservation.dateTime).format('DD.MM.YYYY HH:mm')} byla úspěšně zrušena.`,
        sender: process.env.EMAIL_SENDER,
        receiver: [
            process.env.DEFAULT_EMAIL,
            reservation.userId,
        ],
    })
    await mailService.sendEmail(email)


}