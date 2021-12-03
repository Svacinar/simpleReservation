import Header from "./components/Header";
import { useState } from "react";
import { Flex, Heading, } from '@chakra-ui/react'

import Reservation from "./components/Reservation";

function App() {
  const [isFinished, setIsFinished] = useState(false);
  const [isError, setIsError] = useState(false);
  return (
    <div className="App">
      <Header />
      {isError ? <Flex height="80vh" alignItems="center" justifyContent="center" direction='column'>
        <Heading>Vyskytla se chyba. Opakujte akci později</Heading>
      </Flex> : isFinished ?
        <Flex height="80vh" alignItems="center" justifyContent="center" direction='column'>
          <Heading>Děkujeme za Vaši rezervaci</Heading>
        </Flex> : <Reservation setIsFinished={setIsFinished} setIsError={setIsError} />
      }
    </div>
  );
}

export default App;
