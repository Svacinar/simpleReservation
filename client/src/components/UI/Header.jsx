import React, { useState } from 'react';
import {useDisclosure} from "@chakra-ui/hooks";
import AboutModal from "../modals/AboutModal";
import Logo from "./Logo";
import { HeaderContainer, MenuLinks, MenuComponents } from "./MenuComponents";

const Header = (props) => {
    const [showHeader, setShowHeader] = useState(false);
    const toggleMenu = () => setShowHeader(!showHeader);
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <HeaderContainer {...props}>
            <Logo />
            <MenuComponents toggle={toggleMenu} isOpen={showHeader}/>
            <MenuLinks isOpen={showHeader} onOpen={onOpen}/>
            <AboutModal isOpen={isOpen} onClose={onClose}/>
        </HeaderContainer>
    );
};

export default Header;