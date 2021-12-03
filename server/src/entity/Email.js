module.exports = (data) => {
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