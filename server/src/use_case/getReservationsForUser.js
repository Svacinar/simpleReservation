module.exports = async (reservationRepository, userId) => {
    // TODO validace userId
    //TODO logika handlingu ruznych resultu -> empty, etc
    return await reservationRepository.getReservationsForUser(userId);
}