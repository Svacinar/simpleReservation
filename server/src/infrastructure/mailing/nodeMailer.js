const nodemailer = require('nodemailer');

module.exports = class NodeMailer {
    async sendEmail(data) {
        console.log(data);
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            },
            send: true,
        });

        const info = await transporter.sendMail({
            from: data.sender,
            to: data.receiver,
            subject: data.subject,
            text: data.text,
        })
        console.log("Message sent: %s", info.messageId);
    }
}
