import React from 'react';
import { 
    Flex,
    Box,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import NavBar from '../components/NavBar';
import SelectOpt from '../components/SelectOpt';
import JourneyForm from '../components/JourneyForm';
import '../styles/home.scss';

const Home = () => {
  return (
    <>
        <NavBar visi={'visible'}/>
        <Flex
            justifyContent='center'
        >
            <JourneyForm />
            <Box>

            </Box>
        </Flex>
    </>
  )
};

export default Home;