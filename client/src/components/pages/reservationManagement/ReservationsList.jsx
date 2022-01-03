import axios from "axios";
import {Box, Button, Heading, Stack} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import {useAuth} from "../../context/auth-context";
import {ReservationsTables, UpcomingReservationTable} from "../../UI/ReservationsTables";

const ReservationsList = (props) => {
    const {logout} = useAuth()
    const [isWorking, setIsWorking] = useState(false)
    const [reload, setReload] = useState(false)
    const [previousReservations, setPreviousReservations] = useState([])
    const [upcomingReservations, setUpcomingReservations] = useState([])
    const getReservations = () => {
        axios.get('/reservation', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(result => {
            const previousReservations = []
            const upcomingReservations = []
            result.data.forEach(reservation => {
                if (dayjs(reservation.dateTime).isBefore(dayjs())) {
                    previousReservations.push(reservation)
                } else {
                    upcomingReservations.push(reservation)
                }
            })
            upcomingReservations.sort((a, b) => (a.dateTime - b.dateTime))
            previousReservations.sort((a, b) => (a.dateTime - b.dateTime))
            setPreviousReservations(previousReservations)
            setUpcomingReservations(upcomingReservations)

        })
    }

    const cancelReservation = async (reservationId) => {
        setIsWorking(true);
        await axios.delete('reservation/' + reservationId, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        setIsWorking(false);
        setReload(true)
        alert('Rezervace byla zrušena');
    }

    useEffect(() => {
        getReservations();
    }, [reload]);
    return (
        <main style={{padding: "1rem 0"}}>
            <Stack justifyContent="center" textAlign="center">
                <Heading background="white" padding={4} margin="0% 30% 0% 30%" borderRadius={8}>Management rezervací </Heading>
                <Box>
                    <Button onClick={logout}>Odhlásit se</Button>
                </Box>
                <UpcomingReservationTable
                    upcomingReservations={upcomingReservations}
                    isWorking={isWorking}
                    cancelReservation={cancelReservation}
                />
                <ReservationsTables
                    previousReservations={previousReservations}
                    isWorking={isWorking}
                    cancelReservation={cancelReservation}
                />
            </Stack>
        </main>
    )
}

export default ReservationsList