module.exports = async (reservationRepository, user) => {
    //TODO logika handlingu ruznych resultu -> empty, etc
    if (user.isAdmin()) return reservationRepository.getAllReservations();
    return await reservationRepository.getReservationsForUser(user.getUsername());
}