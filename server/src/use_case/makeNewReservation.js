const makeNewReservation = require('../entity/Reservation');
const makeNewEmail = require('../entity/Email');
const dayjs = require("dayjs");

module.exports = async (reservationRepository = {}, sessionRepository, reservationData, mailService) => {
    if (!reservationData) {
        throw new Error('No reservation data provided');
    }
    const reservation = makeNewReservation({
        userId: reservationData.email,
        preferences: reservationData.preferences,
        dateTime: reservationData.selectedDateTime,
    });

    await sessionRepository.setSessionParameter({
        dateTime: reservation.dateTime,
        availability: true,
    }, {
        availability: false,
    });

    await reservationRepository.insertReservation(reservation);

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
