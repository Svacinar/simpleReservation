import {Flex, Heading} from "@chakra-ui/react";
import Reservation from "../components/pages/newReservation/Reservation";
import {useState} from "react";

const MainPage = (props) => {
    const [isFinished, setIsFinished] = useState(false);
    const [isError, setIsError] = useState(false);
    return (
        <div>
            {isError ? <Flex height="80vh" alignItems="center" justifyContent="center" direction='column'>
                <Heading>Vyskytla se chyba. Opakujte akci později</Heading>
            </Flex> : isFinished ?
                <Flex height="80vh" alignItems="center" justifyContent="center" direction='column'>
                    <Heading>Děkujeme za Vaši rezervaci</Heading>
                </Flex> : <Reservation setIsFinished={setIsFinished} setIsError={setIsError} />
            }
        </div>
    )
}

export default MainPage
