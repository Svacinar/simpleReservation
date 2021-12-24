const makeNewEmail = (data) => {
    //TODO check jestli je email OK -> entita email
    const sender = data.sender;
    const receiver = data.receiver;
    const subject = data.subject;
    const text = data.text;

    return {
        sender,
        receiver,
        subject,
        text,
    }
}

module.exports = {
    makeNewEmail,
}