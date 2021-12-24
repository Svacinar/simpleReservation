const {makeNewEmail} = require("../entity/Email");
const BaseError = require("../infrastructure/errors/BaseError");
const dayjs = require("dayjs");

function createRegularEmail(reservation) {
    return makeNewEmail({
        subject: "Rezervace zrušena",
        text: `Vaše rezervace na ${dayjs(reservation.dateTime).format('DD.MM.YYYY HH:mm')} byla úspěšně zrušena.`,
        sender: process.env.EMAIL_SENDER,
        receiver: [
            process.env.DEFAULT_EMAIL,
            reservation.userId,
        ],
    });
}
function createAdminEmail(reservation, admin) {
    return makeNewEmail({
        subject: "Informace o zrušení Vaši rezervace", //TODO move hardcoded text in emails to templates
        text: `
        Omlouváme se, ale Vaše rezervace na ${dayjs(reservation.dateTime).format('DD.MM.YYYY HH:mm')} 
        byla z technických důvodu zrušena. 
        Prosím rezervujte si jiný termín.
        
        Děkujeme`,
        sender: process.env.EMAIL_SENDER,
        receiver: [
            process.env.DEFAULT_EMAIL,
            reservation.userId,
            admin.userId,
        ],
    });
}

module.exports = async (reservationId, reservationRepository, sessionRepository, mailService, user) => {
    const response = await reservationRepository.getReservationBy(reservationId);
    const reservation = response[0]?._doc || null;
    if (!reservation) throw new BaseError('BAD_REQUEST_ERROR', 400, `No reservation with id ${reservationId}`);
    await reservationRepository.deleteReservation(reservationId);
    await sessionRepository.setSessionParameter({
        dateTime: reservation.dateTime,
    }, {
        availability: true,
    });
    const email = user.isAdmin ? createAdminEmail(reservation, user) : createRegularEmail(reservation)
    await mailService.sendEmail(email);
}