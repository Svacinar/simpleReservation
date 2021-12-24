import {IconButton, Table, TableCaption, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";
import dayjs from "dayjs";
import {CloseIcon} from "@chakra-ui/icons";

const SessionItem = props => <Tbody>
    <Tr>
        <Td>{props.id + 1}</Td>
        <Td>{dayjs(props.session.dateTime).format("DD.MM.YYYY HH:mm")}</Td>
        <Td>{props.session.preferences.join(", ")}</Td>
        <Td>
            {dayjs(props.session.dateTime).isAfter(dayjs()) ?
                <IconButton
                    isLoading={props.loading}
                    aria-label="Cancel session"
                    icon={<CloseIcon/>}
                    onClick={props.onClick}/>
                : "-"
            }
        </Td>
    </Tr>
</Tbody>;

export const AllSessionsTable = props => <Table>
    <TableCaption placement="top">Přehled všech vytvořených termínů</TableCaption>
    <Thead>
        <Tr>
            <Th>#</Th>
            <Th>Datum termínu</Th>
            <Th>Detaily</Th>
            <Th>Zrušit termín</Th>
        </Tr>
    </Thead>
    {props.allSessions.length ? props.allSessions.map((session, id) => {
        return (
                <SessionItem
                    id={id}
                    session={session}
                    loading={props.isWorking}
                    onClick={async () => await props.cancelSession(session._id)}
                />)
        }) :
        <Text textAlign="center">Žádný vytvořený termín</Text>}
</Table>;
