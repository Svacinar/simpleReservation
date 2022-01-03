import {
    Box, Stack, Text, Checkbox, Heading,
} from '@chakra-ui/react';
function AvailableSpots(props) {
    const { preferences, setPreferences } = props;
    return (
        <Box w={["300px", "300px", "300px"]} h={["350px", "350px", "350px"]} m={2} boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.7)" textAlign="center" background="white" borderRadius={8}>
            <Heading size='md' p={4}>Vyberte možnosti</Heading>
            <Stack
                align={{ base: "center", md: "stretch" }}
                textAlign={{ base: "center", md: "left" }}
                mt={{ base: 4, md: 0 }}
                ml={{ md: 6 }}
            >
                {preferences.length ? preferences.map((preference, id) => <Checkbox key={id} onChange={(e) => setPreferences([preference, e.target.checked])}>{preference}</Checkbox>) : <Text>No preferences available</Text>}
            </Stack>
        </Box>
    )
}

export default AvailableSpots