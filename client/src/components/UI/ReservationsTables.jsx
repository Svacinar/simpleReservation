import {Box, Table, TableCaption, Text, Th, Thead, Tr} from "@chakra-ui/react";
import {ReservationItem} from "./ReservationItem";
import {UpcomingReservationItem} from "./UpcomingReservationItem";

export const UpcomingReservationTable = props => <Box paddingBottom={8} background="white" borderRadius={8}>
    <Table >
        <TableCaption placement="top">Přehled nadcházejících rezervací</TableCaption>
        <Thead>
            <Tr>
                <Th>#</Th>
                <Th>Datum rezervace</Th>
                <Th>Uživatelské jméno</Th>
                <Th>Detaily</Th>
                {props.admin ? <Th>Kontakt</Th> : ''}
                <Th>Zrušit rezervaci</Th>
            </Tr>
        </Thead>
        {props.upcomingReservations.length ? props.upcomingReservations.map((reservation, id) => {
                return (<UpcomingReservationItem
                    id={id}
                    reservation={reservation}
                    loading={props.isWorking}
                    admin={!!props.admin}
                    sendEmail={props.sendEmail}
                    onClick={async () => await props.cancelReservation(reservation._id)}
                />)
            }) :
            <Text textAlign="center">Žádné rezervace</Text>}
    </Table>
</Box>;

export const ReservationsTables = props => <Box borderRadius={8} background="white" paddingBottom={8}>
    <Table  >
        <TableCaption placement="top">Přehled předchozích rezervací</TableCaption>
        <Thead>
            <Tr>
                <Th>#</Th>
                <Th>Datum rezervace</Th>
                <Th>Uživatelské jméno</Th>
                <Th>Detaily</Th>
            </Tr>
        </Thead>
        {props.previousReservations.length ? props.previousReservations.map((reservation, id) => {
                return (
                    <ReservationItem id={id} reservation={reservation}/>)
            }) :
            <Text textAlign="center">Žádné rezervace</Text>}
    </Table>
</Box>;