module.exports = async (sessionRepository = {}, dateRange = {}) => {
    function isValidDate(dateRange) {
        if (!dateRange.from) {
            throw new Error('From date is required');
        }
        // TODO validation
        Object.values(dateRange).forEach(date => console.log(date));
        return true;
    }
    if (!isValidDate(dateRange)) {
        throw new Error("Selected dates in range are not valid dates.");
    }
    const fromDate = dateRange.from;
    const toDate = dateRange.to || dateRange.from;
    return await sessionRepository.getAvailableSessions(fromDate, toDate);
}