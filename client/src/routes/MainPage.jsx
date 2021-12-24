import {Flex, Heading} from "@chakra-ui/react";
import NewReservation from "../components/pages/newReservation/NewReservation";
import {useState} from "react";

const MainPage = (props) => {
    const [isFinished, setIsFinished] = useState(false);
    const [isError, setIsError] = useState(false);

    if (isError) return (<Flex height="80vh" alignItems="center" justifyContent="center" direction='column'>
        <Heading>Vyskytla se chyba. Opakujte akci později</Heading>
    </Flex>)

    if (isFinished) return (<Flex height="80vh" alignItems="center" justifyContent="center" direction='column'>
        <Heading>Děkujeme za Vaši rezervaci</Heading>
    </Flex>)

    return <NewReservation setIsFinished={setIsFinished} setIsError={setIsError} />
}

export default MainPage
