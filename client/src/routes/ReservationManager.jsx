import {useAuth} from "../components/context/auth-context";
import Login from "../components/pages/login/Login";
import ReservationsList from "../components/pages/reservationManagement/ReservationsList";
import {useEffect} from "react";
import AdminDashboard from "../components/pages/adminDashboard/AdminDashboard";

const ReservationManager = (props) => {
    const {user, isError, decodeToken} = useAuth();
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) decodeToken(token)
    }, [])

    if (isError) alert('Bad credentials, please try again')
    if (!user) return <Login />
    return user.isAdmin ? <AdminDashboard /> : <ReservationsList />
}

export default ReservationManager