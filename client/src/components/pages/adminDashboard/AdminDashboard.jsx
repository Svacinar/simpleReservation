import axios from "axios";
import {Box, Button, Flex, FormControl, FormLabel, Grid, Heading, Input, Spacer, Stack} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import {ReservationsTables, UpcomingReservationTable} from "../../UI/ReservationsTables";
import {useAuth} from "../../context/auth-context";
import EmailModal from "../../modals/EmailModal";
import {useDisclosure} from "@chakra-ui/hooks";
import {AllSessionsTable} from "./AllSessionsTable";

const DashboardHeader = props => <Grid p={5} justifyContent="center" alignItems="flex-end"
                                       templateColumns="repeat(3, 1fr)" gap={6}
                                       borderBottom="1px solid black">
    <Spacer/>
    <Heading textAlign="center" justifyContent="center">Rezervační správce</Heading>
    <Box>
        <Button onClick={props.onClick}>Admin logout</Button>
    </Box>
</Grid>;

const AddNewSlot = props => <Flex p={5} flexDirection="row" justifyContent="center" alignItems="flex-end"
                                  borderBottom="1px solid black">
    <Box mr="5">
        <FormControl margin="10px">
            <FormLabel>Datum</FormLabel>
            <Input value={props.value} placeholder="Datum volného termínu" type="datetime-local"
                   onChange={props.onChange}/>
        </FormControl>
    </Box>
    <Box mr="5">
        <FormControl margin="10px">
            <FormLabel>Preference</FormLabel>
            <Input placeholder="Parametry termínu" type="text"
                   onChange={props.onChange1}/>
        </FormControl>
    </Box>
    <Box margin="10px">
        <Button onClick={props.onClick}>Vytvořit nový termín</Button>
    </Box>
</Flex>;

const AdminDashboard = (props) => {
    const {logout} = useAuth()
    const [isWorking, setIsWorking] = useState(false)
    const [reload, setReload] = useState(false)
    const [previousReservations, setPreviousReservations] = useState([])
    const [upcomingReservations, setUpcomingReservations] = useState([])
    const [allSessions, setAllSessions] = useState([])
    const [newSlot, setNewSlot] = useState(new Date())
    const [newSlotPreference, setNewSlotPreference] = useState('')

    const [email, setEmail] = useState();
    const [emailHeader, setEmailHeader] = useState()
    const [emailText, setEmailText] = useState()
    const { isOpen, onOpen, onClose } = useDisclosure();

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

    const openEmailModal = (_id, email) => {
        setEmailHeader('Zpráva o rezervaci ' + _id);
        setEmail(email)
        onOpen();
    };

    const handleAddNewSlot = async () => {
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
    };

    const cancelSession = async sessionId => {
        setIsWorking(true);
        await axios.delete('session/' + sessionId, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        setIsWorking(false);
        alert('Termín byla zrušen');
        setReload(true)
    };

    const handleSendEmail = async () => {
        await axios.post('/email', {
            emailData: {
                email: email,
                subject: emailHeader,
                text: emailText,
            }
        }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        onClose()
    };

    return (
        <main style={{padding: "1rem 0"}}>
            <EmailModal
                isOpen={isOpen}
                onClose={onClose}
                email={email}
                setEmail={setEmail}
                subject={emailHeader}
                setSubject={setEmailHeader}
                setText={setEmailText}
                onClickHandler={handleSendEmail}
            />
            <Stack justifyContent='center'>
                <DashboardHeader onClick={logout}/>
                <AddNewSlot value={newSlot} onChange={(e) => setNewSlot(e.target.value)}
                            onChange1={(e) => setNewSlotPreference(e.target.value)} onClick={handleAddNewSlot}/>
                <UpcomingReservationTable
                    upcomingReservations={upcomingReservations}
                    admin
                    sendEmail={openEmailModal}
                    isWorking={isWorking}
                    cancelReservation={cancelReservation}
                />
                <AllSessionsTable
                    allSessions={allSessions}
                    isWorking={isWorking}
                    cancelSession={cancelSession}
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

export default AdminDashboard