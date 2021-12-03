import { useState } from 'react';
import { Flex, Box, Text, Link, Heading } from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';

const MenuItem = ({ children, isLast, to = '/' }) => {
    return (
        <Text
            mb={{ base: isLast ? 0 : 8, sm: 0 }}
            mr={{ base: 0, sm: isLast ? 0 : 8 }}
            _hover={{ backgroundColor: 'teal', rounded: '6px' }}
            display="block"
            padding="15px"
        >
            <Link href={to}>{children}</Link>
        </Text>
    );
};

const Header = (props) => {
    const [show, setShow] = useState(false);
    const toggleMenu = () => setShow(!show);
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
                    <MenuItem to="/about" isLast>
                        About
                    </MenuItem>
                </Flex>
            </Box>
        </Flex>
    );
};

export default Header;