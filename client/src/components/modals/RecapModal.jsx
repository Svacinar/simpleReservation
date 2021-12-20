import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, Button, Text, Input } from "@chakra-ui/react";

function RecapModal(props) {
    const { saunaDateTime, email, setEmail, onClickHandler } = props;
    const { isOpen, onClose } = props;
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent p={6}>
                <ModalHeader textAlign='center' >Vaše rezervace</ModalHeader>
                <Text textAlign='center' >Zvolené datum: {saunaDateTime}</Text>
                <Input mt={3} value={email} type='email' placeholder="Váš email" onChange={(e) => setEmail(e.target.value)} />
                <ModalCloseButton />
                <Button
                    mt={3}
                    disabled={!email}
                    colorScheme="teal"
                    onClick={onClickHandler}
                >Potvrdit rezervaci
                </Button>
            </ModalContent>
        </Modal>
    )
}

export default RecapModal;