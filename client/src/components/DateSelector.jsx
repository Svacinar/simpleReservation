import { Box, Heading } from "@chakra-ui/layout"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
//import './DatePicker.css';

function DateSelector(props) {
    const { startDate, setSaunaDate } = props;
    return (
        <Box h="100%" m={2} p={4} boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2)">
            <Heading p={2} size='sm'>Vyberte datum</Heading>
            <DatePicker boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2)" selected={startDate} inline onChange={(date) => {
                console.log(date);
                setSaunaDate(date);
            }} />
        </Box>

    );

}

export default DateSelector;