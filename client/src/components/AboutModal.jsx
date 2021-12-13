import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, ListItem, Text } from "@chakra-ui/react";

function AboutModal(props) {
    const { isOpen, onClose } = props;
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent p={6}>
                <ModalCloseButton />
                <ModalHeader textAlign='center' >Postup rezervace</ModalHeader>
                <ListItem>Již obsazené termíny jsou vyznačeny šedivě</ListItem>
                <ListItem>Po kliknutí na datum vyberte volný čas</ListItem>
                <ListItem>Zvolte volitelné preference</ListItem>
                <ListItem>Klikněte na potvrdit rezervaci</ListItem>
                <ListItem>Zadejte Váš email a potvrďte</ListItem>
                < ListItem>Vyčkejte na emailové potvrzení rezervace</ListItem>
            </ModalContent>
        </Modal>
    )
}

export default AboutModal;