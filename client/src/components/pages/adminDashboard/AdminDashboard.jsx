import axios from "axios";
import {
    Box,
    Button, Flex, FormControl, FormLabel, Grid,
    Heading,
    IconButton, Input, Spacer,
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
import {CloseIcon, EmailIcon} from "@chakra-ui/icons";
import {useAuth} from "../../context/auth-context";

const AdminDashboard = (props) => {
    const {logout} = useAuth()
    const [isWorking, setIsWorking] = useState(false)
    const [reload, setReload] = useState(false)
    const [previousReservations, setPreviousReservations] = useState([])
    const [upcomingReservations, setUpcomingReservations] = useState([])
    const [allSessions, setAllSessions] = useState([])
    const [newSlot, setNewSlot] = useState(new Date())
    const [newSlotPreference, setNewSlotPreference] = useState('')

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

    const getSessions = () => {
        axios.get('/session', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(result => {
            const temp = result.data;
            temp.sort((a,b) => (new Date(b.dateTime) - new Date(a.dateTime)));
            setAllSessions(temp);
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
        getSessions();
    }, [reload]);

    async function sendEmail(_id) {
        //TODO
        console.log('poslat email')
        return Promise.resolve(undefined);
    }

    async function handleNewSlotButton() {
        await axios.post('/session', {
            session: {
                dateTime: newSlot,
                preferences: newSlotPreference.split(','),
            }
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        alert('Termín úspěšně vytvořen')
        setReload(true)
    }

    async function cancelSession(sessionId) {
        setIsWorking(true);
        await axios.delete('session/' + sessionId, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        setIsWorking(false);
        alert('Termín byla zrušen');
        setReload(true)
    }

    return (
        <main style={{padding: "1rem 0"}}>
            <Stack justifyContent='center'>
                <Grid p={5} justifyContent="center" alignItems='flex-end' templateColumns='repeat(3, 1fr)' gap={6} borderBottom='1px solid black'>
                    <Spacer/>
                    <Heading textAlign="center" justifyContent="center">Rezervační správce</Heading>
                    <Box>
                        <Button onClick={logout}>Admin logout</Button>
                    </Box>
                </Grid>
                <Flex p={5} flexDirection='row' justifyContent='center' alignItems='flex-end' borderBottom='1px solid black'>
                    <Box mr='5'>
                        <FormControl margin="10px">
                            <FormLabel>Datum</FormLabel>
                            <Input value={newSlot} placeholder='Datum volného termínu' type='datetime-local' onChange={(e) => setNewSlot(e.target.value)}/>
                        </FormControl>
                    </Box>
                    <Box mr='5'>
                        <FormControl margin="10px">
                            <FormLabel>Preference</FormLabel>
                            <Input placeholder='Parametry termínu' type='text' onChange={(e) => setNewSlotPreference(e.target.value)}/>
                        </FormControl>
                    </Box>
                    <Box margin='10px'>
                        <Button onClick={handleNewSlotButton}>Vytvořit nový termín</Button>
                    </Box>


                </Flex>
                <Table>
                    <TableCaption placement='top'>Přehled všech nadcházejících rezervací</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>#</Th>
                            <Th>Datum rezervace</Th>
                            <Th>Uživatelské jméno</Th>
                            <Th>Detaily</Th>
                            <Th>Zrušit rezervaci</Th>
                            <Th>Kontaktovat</Th>
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
                                    <Td><IconButton isLoading={isWorking} aria-label='Send email'
                                                    icon={<EmailIcon/>}
                                                    onClick={async () => await sendEmail(reservation._id)}/></Td>
                                </Tr>
                            </Tbody>)
                    }) : <Text textAlign="center">Žádné rezervace</Text>}
                </Table>
                <Table>
                    <TableCaption placement='top'>Přehled všech vytvořených termínů</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>#</Th>
                            <Th>Datum termínu</Th>
                            <Th>Detaily</Th>
                            <Th>Zrušit termín</Th>
                        </Tr>
                    </Thead>
                    {allSessions.length ? allSessions.map((session, key) => {
                        return (
                            <Tbody key={key}>
                                <Tr>
                                    <Td>{key + 1}</Td>
                                    <Td>{dayjs(session.dateTime).format("DD.MM.YYYY HH:mm")}</Td>
                                    <Td>{session.preferences.join(", ")}</Td>
                                    <Td>{dayjs(session.dateTime).isAfter(dayjs()) ? <IconButton isLoading={isWorking} aria-label='Cancel session'
                                                                                                 icon={<CloseIcon/>}
                                                                                                 onClick={async () => await cancelSession(session._id)}/> : '-'}
                                    </Td>
                                </Tr>
                            </Tbody>)
                    }) : <Text textAlign="center">Žádný vytvořený termín</Text>}
                </Table>
                <Table>
                    <TableCaption placement='top'>Přehled všech předchozích rezervací</TableCaption>
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

export default AdminDashboard