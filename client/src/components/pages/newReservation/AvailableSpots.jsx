import { Box, Stack, Text, Radio, RadioGroup, Heading } from '@chakra-ui/react';

function AvailableSpots(props) {
    const { spots, onClickHandler } = props;
    const RenderAvailableDateTimes = () => {
        return (
            <Box textAlign="center">
                <RadioGroup onChange={onClickHandler} >
                    <Stack spacing={4}>
                        {spots.map((spot, id) => {
                            return <Radio key={id} value={spot}>{spot}</Radio>
                        })
                        }
                    </Stack>
                </RadioGroup>
            </Box>
        )
    }
    return (
        <Box w={["300px", "300px", "300px"]} h={["350px", "350px", "350px"]} m={2} boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2)" textAlign="center">
            <Heading p={4} size='md'>
                Dostupné časy
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