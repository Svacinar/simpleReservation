module.exports = async (reservationRepository, user) => {
    //TODO logika handlingu ruznych resultu -> empty, etc
    return await reservationRepository.getReservationsForUser(user.getUsername());
}