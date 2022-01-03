import { Flex, Heading, Button, Input } from '@chakra-ui/react';
import {useState} from "react";
import {useAuth} from "../../context/auth-context";

const Login = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState();
    const {login} = useAuth()
    return (
        <Flex height="80vh" alignItems="center" justifyContent="center" >
            <Flex direction="column" background='gray.100' p={12} rounded={8} boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.7)">
                <Heading mb={6}>Přihlaste se</Heading>
                <Input onChange={(e) => setEmail(e.target.value)} placeholder="Váš email" variant="filed" mb={3} type="email"></Input>
                <Input onChange={(e) => setPassword(e.target.value)} placeholder="****" variant='filed' mb={6} type="password"></Input>
                <Button colorScheme="teal" onClick={() => login(email, password)}>Přihlásit</Button>
            </Flex>
        </Flex>
    )
}

export default Login