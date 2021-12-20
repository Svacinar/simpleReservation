import {useAuth} from "../components/context/auth-context";
import Login from "../components/pages/login/Login";
import ReservationsList from "../components/pages/reservationManagement/ReservationsList";
import {useEffect} from "react";


const PreviousReservations = (props) => {
    const {user, isError, decodeToken} = useAuth();
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) decodeToken(token)
    }, [])

    if (isError) alert('Bad credentials, please try again')

    return user ? <ReservationsList /> : <Login />
}
export default PreviousReservations