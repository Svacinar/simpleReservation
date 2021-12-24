
import { useState, useEffect } from "react";
import {Flex, Stack} from '@chakra-ui/react'
import dayjs from "dayjs";


import "react-datepicker/dist/react-datepicker.css";
import AvailableSpots from './AvailableSpots';
import DateSelector from './DateSelector';
import Preference from './Preference';
import RecapModal from '../../modals/RecapModal';
import ConfirmButton from "../../UI/ConfirmButton";
import { Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useDisclosure } from "@chakra-ui/hooks";

import axios from 'axios';
import {useAuth} from "../../context/auth-context";

const NewReservation = ({ setIsFinished, setIsError }) => {
    const {user} = useAuth()
    const [isStarted, setIsStarted] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState();
    const [selectedSpotDateTime, setSelectedSpotDateTime] = useState();
    const [email, setEmail] = useState(user ? user.username : '');
    const [availableSlotsForDay, setAvailableSlotsForDay] = useState([]);
    const [availablePreferences, setAvailablePreferences] = useState({});
    const [preferences, setPreferences] = useState({});
    const [availableDates, setAvailableDates] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        handleSelectedDate().then(() => console.log('handled change'));
    }, [selectedDate])

    useEffect(() => {
        loadAvailableDatesForMonths().then(console.log('data loaded'))
    }, [])

    const handlePreferences = ([value, isChecked]) => {
        const actualPreferences = preferences;
        actualPreferences[value] = isChecked;
        setPreferences(actualPreferences);
    }

    const loadAvailableDatesForMonths = async (monthsToLoad = 2) => {
        const result = await axios.get(`/free-slots?from=${dayjs().format('YYYY/MM/DD')}&to=${dayjs().add(monthsToLoad, 'M').format('YYYY/MM/DD')}`);
        const availableDates = [];
        result.data.forEach(date => {
            const formattedDateTime = new Date(date.dateTime);
            availableDates.push(formattedDateTime);
        });
        setAvailableDates(availableDates);
    }

    const handleSelectedDate = async () => {
        try {
            // TODO po pridani metody loadAvailableDatesForMonth je novy get zbytecny -> odstranit, implementova caching
            const result = await axios.get(`/free-slots?from=${dayjs(selectedDate).format('YYYY/MM/DD')}`); //TODO better structure
            setPreferences({})
            setSelectedSpotDateTime(null)
            const availableSlots = [];
            const slotsPreferences = {};
            result.data.forEach(availableSlot => {
                const formattedDateTime = dayjs(availableSlot.dateTime).format('YYYY-MM-DD HH:mm:ss');
                availableSlots.push(formattedDateTime);
                slotsPreferences[formattedDateTime] = availableSlot.preferences;
            });
            setAvailableSlotsForDay(availableSlots);
            setAvailablePreferences(slotsPreferences);
        } catch (error) {
            setIsError(true);
        }
    }

    const handleConfirmation = async () => {
        const chosenPreferences =  [];
        Object.keys(preferences).forEach((preference) => {
            if (preferences[preference]) {
                chosenPreferences.push(preference);
            }
        })

        try {
            await axios.post('/reservation', {
                email: email,
                preferences: chosenPreferences,
                selectedDateTime: selectedSpotDateTime,
            });
        } catch (error) {
            setIsError(true);
        }
        onClose()
        setIsFinished(true);
    }

    return (
        <Flex height="80vh" alignItems="center" justifyContent="initial" direction='column'>
            <RecapModal
                isOpen={isOpen}
                onClose={onClose}
                saunaDateTime={selectedSpotDateTime}
                email={email}
                setEmail={setEmail}
                preferences={preferences}
                onClickHandler={handleConfirmation}
            />
            <Stack
                spacing={8}
                align="center"
                justify={["center", "center", "flex-end", "flex-end"]}
                direction={["column", "column", "row", "row"]}
                pt={[4, 4, 0, 0]}
            >
                {isStarted ? <DateSelector
                    startDate={startDate}
                    setSaunaDate={setSelectedDate}
                    availableDates={availableDates}
                /> : <Button leftIcon={<AddIcon />} size='lg' onClick={() => setIsStarted(true)}>Rezervovat termín</Button>}
                {selectedDate ? <AvailableSpots saunaDate={selectedDate} saunaDateTime={selectedSpotDateTime} spots={availableSlotsForDay} onClickHandler={setSelectedSpotDateTime} /> : ''}
                {selectedSpotDateTime ? <Preference height="100%" preferences={availablePreferences[selectedSpotDateTime]} setPreferences={handlePreferences} /> : ''}
            </Stack >
            {selectedSpotDateTime ? <ConfirmButton onClickHandler={onOpen} /> : ''}
        </Flex >
    );
}

export default NewReservation;
