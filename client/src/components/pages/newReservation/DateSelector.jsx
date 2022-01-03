import { Box, Heading } from "@chakra-ui/layout"
import DatePicker from 'react-datepicker';

function DateSelector(props) {
    const {availableDates,startDate, setSaunaDate } = props;
    return (
        <Box w={["300px", "300px", "300px"]} h={["350px", "350px", "350px"]} m={2}  boxShadow="0 8px 8px 0 rgba(0, 0, 0, 0.7)" textAlign="center" background="white" borderRadius={8}>
            <Heading p={4} size='md'>Vyberte datum</Heading>
            <Box>
                <DatePicker
                    boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2)"
                    selected={startDate}
                    inline
                    calendarStartDay={1}
                    includeDates={availableDates}
                    onChange={(date) => {
                        setSaunaDate(date);
                    }} />
            </Box>

        </Box>

    );

}

export default DateSelector;