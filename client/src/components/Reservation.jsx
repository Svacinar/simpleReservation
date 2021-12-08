
import { useState, useEffect } from "react";
import { Flex } from '@chakra-ui/react'
import dayjs from "dayjs";


import "react-datepicker/dist/react-datepicker.css";
import AvailableSpots from './AvailableSpots';
import DateSelector from './DateSelector';
import Preference from './Preference';
import RecapModal from './RecapModal';
import ConfirmButton from "./ConfirmButton";
import { Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useDisclosure } from "@chakra-ui/hooks";

import axios from 'axios';

const Reservation = ({ setIsFinished, setIsError }) => {
    const [isStarted, setIsStarted] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [saunaDate, setSaunaDate] = useState();
    const [saunaDateTime, setSaunaDateTime] = useState();
    const [email, setEmail] = useState();
    const [availableDates, setAvailableDates] = useState([]);
    const [availablePreferences, setAvailablePreferences] = useState({});
    const [preferences, setPreferences] = useState({});
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        handleSelectedDate().then(() => console.log('handled change'));
    }, [saunaDate])

    const handlePreferences = ([value, isChecked]) => {
        const actualPreferences = preferences;
        actualPreferences[value] = isChecked;
        setPreferences(actualPreferences);
    }

    const handleSelectedDate = async () => {
        try {
            const result = await axios.get(`/free-slots?date=${dayjs(saunaDate).format('YYYY/MM/DD')}`); //TODO better structure
            const availableSlots = [];
            const slotsPreferences = {};
            result.data.forEach(availableSlot => {
                const formattedDateTime = dayjs(availableSlot.dateTime).format('YYYY-MM-DD HH:mm:ss');
                availableSlots.push(formattedDateTime);
                slotsPreferences[formattedDateTime] = availableSlot.preferences;
            });
            setAvailableDates(availableSlots);
            setAvailablePreferences(slotsPreferences);
        } catch (error) {
            setIsError(true);
        }
    }

    const handleConfirmation = async () => {
        const chosenPreferences =  [];
        Object.keys(preferences).map((preference) => {
            if (preferences[preference]) {
                chosenPreferences.push(preference);
            }
        })

        try {
            await axios.post('/reservation', {
                email: email,
                preferences: chosenPreferences,
                selectedDateTime: saunaDateTime,
            });
        } catch (error) {
            setIsError(true);
        }
        onClose()
        setIsFinished(true);
    }

    return (
        <Flex height="80vh" alignItems="center" justifyContent="center" direction='column'>
            <RecapModal
                isOpen={isOpen}
                onClose={onClose}
                saunaDateTime={saunaDateTime}
                email={email}
                setEmail={setEmail}
                preferences={preferences}
                onClickHandler={handleConfirmation}
            />
            <Flex alignItems="center" direction="row" p={6} >
                {isStarted ? <DateSelector
                    startDate={startDate}
                    setSaunaDate={setSaunaDate}
                /> : <Button leftIcon={<AddIcon />} size='lg' onClick={() => setIsStarted(true)}>Rezervovat termín</Button>}
                {saunaDate ? <AvailableSpots saunaDate={saunaDate} saunaDateTime={saunaDateTime} spots={availableDates} onClickHandler={setSaunaDateTime} /> : ''}
                {saunaDateTime ? <Preference preferences={availablePreferences[saunaDateTime]} setPreferences={handlePreferences} /> : ''}
            </Flex >
            {isStarted ? <ConfirmButton onClickHandler={onOpen} /> : ''}
        </Flex >
    );
}

export default Reservation;
