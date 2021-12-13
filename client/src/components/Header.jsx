import { useState } from 'react';
import { Button, Flex, Box, Heading, Menu, MenuButton } from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {useDisclosure} from "@chakra-ui/hooks";
import AboutModal from "./AboutModal";

const Header = (props) => {
    const [show, setShow] = useState(false);
    const toggleMenu = () => setShow(!show);
    const { isOpen, onOpen, onClose } = useDisclosure();
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
        >
            <AboutModal isOpen={isOpen} onClose={onClose}/>
            <Box>
                <Heading fontSize="2rem" transform="skew(-14deg)" fontWeight="bold">
                    Sauna Reservation
                </Heading>
            </Box>

            <Box display={{ base: 'block', md: 'none' }} onClick={toggleMenu}>
                {show ? <CloseIcon /> : <HamburgerIcon />}
            </Box>

            <Box
                display={{ base: show ? 'block' : 'none', md: 'block' }}
                flexBasis={{ base: '100%', md: 'auto' }}
            >
                <Flex
                    align="center"
                    justify={['center', 'space-between', 'flex-end', 'flex-end']}
                    direction={['column', 'row', 'row', 'row']}
                    pt={[4, 4, 0, 0]}
                    onClick={toggleMenu}
                >
                    <Menu>

                        <MenuButton as={Button} onClick={onOpen}>
                            Help
                        </MenuButton>
                    </Menu>
                </Flex>
            </Box>
        </Flex>
    );
};

export default Header;