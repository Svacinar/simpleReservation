import {IconButton, Tbody, Td, Tr} from "@chakra-ui/react";
import dayjs from "dayjs";
import {CloseIcon, EmailIcon} from "@chakra-ui/icons";

export const UpcomingReservationItem = props => <Tbody>
    <Tr>
        <Td>{props.id + 1}</Td>
        <Td>{dayjs(props.reservation.dateTime).format("DD.MM.YYYY HH:mm")}</Td>
        <Td>{props.reservation.userId}</Td>
        <Td>{props.reservation.preferences.join(", ")}</Td>
        {props.admin ?
            <Td>
                <IconButton
                    isLoading={props.isWorking}
                    aria-label='Send email'
                    icon={<EmailIcon/>}
                    onClick={() => props.sendEmail(props.reservation._id, props.reservation.userId)}/>
            </Td>
            : ''
        }
        <Td>
            <IconButton
                isLoading={props.loading}
                aria-label="Cancel reservation"
                icon={<CloseIcon/>}
                onClick={props.onClick}
            />
        </Td>
    </Tr>
</Tbody>;

