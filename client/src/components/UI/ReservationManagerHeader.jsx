import {Box, Button, Grid, Heading, Spacer} from "@chakra-ui/react";

export function ReservationManagerHeader(props) {
    return <Grid justifyContent="center" templateColumns="repeat(3, 1fr)" gap={6}>
        <Spacer/>
        <Heading textAlign="center" justifyContent="center">Management rezervací </Heading>
        <Box>
            <Button onClick={props.onClick}>Odhlásit se</Button>
        </Box>
    </Grid>;
}