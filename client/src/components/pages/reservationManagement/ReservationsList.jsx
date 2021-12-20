import axios from "axios";
import {
    Box,
    Button, Grid,
    Heading,
    IconButton, Spacer,
    Stack,
    Table,
    TableCaption,
    Tbody,
    Td, Text,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import {CloseIcon} from "@chakra-ui/icons";
import {useAuth} from "../../context/auth-context";

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
            <Stack justifyContent={"center"}>
                <Grid justifyContent="center" templateColumns='repeat(3, 1fr)' gap={6}>
                    <Spacer/>
                    <Heading textAlign="center" justifyContent="center">Management rezervací </Heading>
                    <Box>
                        <Button onClick={logout}>Odhlásit se</Button>
                    </Box>
                </Grid>
                <Table>
                    <TableCaption placement='top'>Přehled nadcházejících rezervací</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>#</Th>
                            <Th>Datum rezervace</Th>
                            <Th>Uživatelské jméno</Th>
                            <Th>Detaily</Th>
                            <Th>Zrušit rezervaci</Th>
                        </Tr>
                    </Thead>
                    {upcomingReservations.length ? upcomingReservations.map((reservation, key) => {
                        return (
                            <Tbody key={key}>
                                <Tr>
                                    <Td>{key + 1}</Td>
                                    <Td>{dayjs(reservation.dateTime).format("DD.MM.YYYY HH:mm")}</Td>
                                    <Td>{reservation.userId}</Td>
                                    <Td>{reservation.preferences.join(", ")}</Td>
                                    <Td><IconButton isLoading={isWorking} aria-label='Cancel reservation'
                                                    icon={<CloseIcon/>}
                                                    onClick={async () => await cancelReservation(reservation._id)}/></Td>
                                </Tr>
                            </Tbody>)
                    }) : <Text textAlign="center">Žádné rezervace</Text>}
                </Table>
                <Table>
                    <TableCaption placement='top'>Přehled předchozích rezervací</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>#</Th>
                            <Th>Datum rezervace</Th>
                            <Th>Uživatelské jméno</Th>
                            <Th>Detaily</Th>
                        </Tr>
                    </Thead>
                    {previousReservations.length ? previousReservations.map((reservation, key) => {
                        return (
                            <Tbody key={key}>
                                <Tr>
                                    <Td>{key + 1}</Td>
                                    <Td>{dayjs(reservation.dateTime).format("DD.MM.YYYY HH:mm")}</Td>
                                    <Td>{reservation.userId}</Td>
                                    <Td>{reservation.preferences.join(", ")}</Td>
                                </Tr>
                            </Tbody>)
                    }) : <Text textAlign="center">Žádné rezervace</Text>}
                </Table>


            </Stack>
        </main>
    )
}

export default ReservationsList