import React, {useState} from "react"
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
    const [hover, setHover] = useState(false);
    const style = {
        size:"8px",
        padding: "6px",
        marginRight: "12px",
        border: "2px solid rgb(237, 242, 247)",
        background: hover ? "rgb(237, 242, 247)" : '',
        borderRadius: "5px",
        transition: "0.3s",
    }
    return (
        <Link to={to} onMouseEnter={() => setHover(!hover)} onMouseLeave={() => setHover(!hover)}>
            <Text  display="block" style={style} {...rest}>
                {children}
            </Text>
        </Link>
    )
}

const MenuLinks = (props) => {
    const {onOpen, isOpen} = props;
     return (
         <Box
             display={{ base: isOpen ? "block" : "none", md: "block" }}
             flexBasis={{ base: "100%", md: "auto" }}
         >
             <Stack
                 align="center"
                 justify={["center", "space-between", "flex-end", "flex-end"]}
                 direction={["column", "row", "row", "row"]}
                 pt={[4, 4, 8, 0]}
             >
                 <MenuItem to="/">Nová rezervace</MenuItem>
                 <MenuItem to="/my-reservations" isLast>Předchozí rezervace</MenuItem>
                 <Menu>
                     <MenuButton as={Button} onClick={onOpen}>
                         Pomoc
                     </MenuButton>
                 </Menu>
             </Stack>
         </Box>
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