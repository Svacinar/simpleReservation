import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalHeader,
    Button,
    Input,
    Textarea
} from "@chakra-ui/react";

function EmailModal(props) {
    const { email, setEmail, subject, setSubject, setText, onClickHandler } = props;
    const { isOpen, onClose } = props;
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent p={6}>
                <ModalHeader textAlign='center'>Poslat email</ModalHeader>
                <Input mt={3} value={email} type='email' placeholder="Email příjemce" onChange={(e) => setEmail(e.target.value)} />
                <Input mt={3} value={subject} type='email' placeholder="Předmět" onChange={(e) => setSubject(e.target.value)} />
                <Textarea mt={3} type='email' placeholder="Text emailu" onChange={(e) => setText(e.target.value)} />
                <ModalCloseButton />
                <Button
                    mt={3}
                    disabled={!email }
                    colorScheme="teal"
                    onClick={onClickHandler}
                >Odeslat email
                </Button>
            </ModalContent>
        </Modal>
    )
}

export default EmailModal;