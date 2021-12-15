import React from "react"
import {Box, Button, Flex, Menu, MenuButton, Stack, Text} from "@chakra-ui/react"

import { Link } from "react-router-dom"

import {CloseIcon, HamburgerIcon} from "@chakra-ui/icons";

const MenuComponents = ({ toggle, isOpen }) => {
    return (
        <Box display={{ base: "block", md: "none" }} onClick={toggle}>
            {isOpen ? <CloseIcon /> : <HamburgerIcon />}
        </Box>
    )
}
const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
    return (
        <Link to={to}>
            <Text display="block" {...rest}>
                {children}
            </Text>
        </Link>
    )
}

const MenuLinks = (props) => {
    const {onOpen} = props;
     return (
         <Stack
             align="center"
             justify={["center", "space-between", "flex-end", "flex-end"]}
             direction={["column", "row", "row", "row"]}
             pt={[4, 4, 8, 0]}
         >
             <MenuItem to="/" isLast>Nová rezervace</MenuItem>
             <MenuItem to="/my-reservations" isLast>Předchozí rezervace</MenuItem>
             <Menu>
                 <MenuButton as={Button} onClick={onOpen}>
                     Pomoc
                 </MenuButton>
             </Menu>
         </Stack>
     )
}

const HeaderContainer = ({children, ...props}) => {
    return (
        <Flex
            mb={8}
            p={8}
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            borderBottom="3px solid black"
            textTransform="uppercase"
            {...props}
        >
            {children}
        </Flex>
    )
}

export {
    MenuComponents,
    MenuItem,
    HeaderContainer,
    MenuLinks,
}