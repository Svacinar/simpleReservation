import React from 'react'

import {Box, Text} from "@chakra-ui/react";
import {Link} from "react-router-dom"

export default function  Logo(props) {
    return (
        <Box {...props}>
            <Link to="/">
                <Text fontSize={"lg"} fontWeight={"bold"}>
                    Mistr Sauner
                </Text>
            </Link>
        </Box>
    )
}