import React from 'react';
import { 
    Flex,
    Box,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import NavBar from '../components/NavBar';
import SelectOpt from '../components/SelectOpt';

const Home = () => {
  return (
    <>
        <NavBar visi={'visible'}/>
        <Flex
            justifyContent='center'
        >
            <Box 
                display='flex'
                flexDir='column'
                justifyContent='center'
                alignItems='center'
                w='950px'
                h='352px'
                mt='70px'
                pt='24px'
                bg='mediumBlue'
                borderRadius='100px 40px'
                border='3px solid'
                borderColor='#6363ee56'
            >
                <SelectOpt text='Jornadas' children={<option>oi</option>}/>
                <SelectOpt text='Mapas' children={<option>oi</option>}/>
                <SelectOpt text='Pontos de Divergência' children={<option>oi</option>}/>
            </Box>
            <Box>

            </Box>
        </Flex>
    </>
  )
};

export default Home;