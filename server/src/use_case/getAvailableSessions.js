module.exports = async (sessionRepository = {}, selectedDate) => {
    function isValidDate(selectedDate) {
        return true;
    }
    if (!isValidDate(selectedDate)) {
        throw new Error("Selected date is not a valid date");
    }
    return await sessionRepository.getAvailableSessions(selectedDate);
}