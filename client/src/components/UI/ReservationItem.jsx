import {Tbody, Td, Tr} from "@chakra-ui/react";
import dayjs from "dayjs";

export const ReservationItem = props => <Tbody>
    <Tr>
        <Td>{props.id + 1}</Td>
        <Td>{dayjs(props.reservation.dateTime).format("DD.MM.YYYY HH:mm")}</Td>
        <Td>{props.reservation.userId}</Td>
        <Td>{props.reservation.preferences.join(", ")}</Td>
    </Tr>
</Tbody>;