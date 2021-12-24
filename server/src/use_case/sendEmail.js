const BaseError = require("../infrastructure/errors/BaseError");
const {makeNewEmail} = require("../entity/Email");

const sendEmail = async (mailService, emailData, user) => {
    if (!user.isAdmin()) throw new BaseError('BAD_REQUEST_ERROR', 400, 'USER IS NOT ADMIN');
    const email = makeNewEmail({
        subject: emailData.subject,
        text: emailData.text,
        sender: process.env.EMAIL_SENDER,
        receiver: [
            process.env.DEFAULT_EMAIL,
            emailData.email,
        ],
    })
    await mailService.sendEmail(email);
}

module.exports = {
    sendEmail,
}