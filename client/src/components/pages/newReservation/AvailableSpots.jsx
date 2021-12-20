import { Box, Stack, Text, Radio, RadioGroup, Heading } from '@chakra-ui/react';
import dayjs from 'dayjs';
function AvailableSpots(props) {
    const { saunaDate, spots, onClickHandler, saunaDateTime } = props;
    const RenderAvailableDateTimes = () => {
        return (
            <>
            <Text my={2} color="gray.500">
                Dostupné časy:
            </Text>
            <RadioGroup onChange={onClickHandler} >
                <Stack spacing={4}>
                    {spots.map((spot, id) => {
                        return <Radio value={spot}>{spot}</Radio>
                    })
                    }
                </Stack>
            </RadioGroup>
            </>
        )
    }
    return (
        <Box w={["300px", "300px", "300px"]} h={["300px", "300px", "300px"]} m={4} p={4} boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2)">
            <Heading p={2} size='sm'>
                Volné časy pro datum: {dayjs(saunaDate).format('DD.MM.YYYY')}
            </Heading>
            <Stack
                align={{ base: "center", md: "stretch" }}
                textAlign={{ base: "center", md: "left" }}
                mt={{ base: 4, md: 0 }}
                ml={{ md: 6 }}
            >
                {spots.length ? <RenderAvailableDateTimes/> :
                    <Text my={2} color="gray.500">
                        Zvolte jiný den.
                    </Text>}
            </Stack>
        </Box>
    )
}

export default AvailableSpots