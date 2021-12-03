import {
    Box, Stack, Link, Text, Button, Checkbox, Heading,
} from '@chakra-ui/react';
function AvailableSpots(props) {
    const { preferences, setPreferences } = props;
    return (
        <Box h="100%" m={2} p={4} boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2)">
            <Stack
                align={{ base: "center", md: "stretch" }}
                textAlign={{ base: "center", md: "left" }}
                mt={{ base: 4, md: 0 }}
                ml={{ md: 6 }}
            >
                <Heading size='sm ' p={2}>Vyberte možnosti</Heading>
                {preferences.length ? preferences.map(preference => <Checkbox onChange={(e) => setPreferences([preference, e.target.checked])}>{preference}</Checkbox>) : <Text>No preferences available</Text>}
            </Stack>
        </Box>
    )
}

export default AvailableSpots