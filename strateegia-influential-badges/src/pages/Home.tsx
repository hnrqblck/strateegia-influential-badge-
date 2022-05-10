import React from 'react';
import { 
    Flex,
    Box,
    Heading,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import NavBar from '../components/NavBar';
import JourneyForm from '../components/JourneyForm';
import UserCard from '../components/UserCard';
import { users } from '../components/Metrics';
import '../styles/home.scss';
import { LightningIcon } from '../components/CreateIcon';

interface UserType {
  name: string;
  id: string;
}

const Home = () => {

console.log(users)
React.useEffect(() => {
  {users.map((user: UserType, index: number) => {
    console.log(index, user.id)
  })}
}, [])

  return (
    <>
        <NavBar visi={'visible'}/>
        <Flex
            justifyContent='center'
            flexDir='column'
            alignItems='center'
        >
            <JourneyForm />
            <Box className='oi'>
              <LightningIcon />
              <Box display='flex'>
                <Box
                  borderRadius='40px 0px 0px 40px'
                  bg='linear-gradient(180deg, #CD1D9C 0%, #6505B4 100%);'
                  fontSize='xs'
                  p='8px 12px'
                >
                  pouca influência
                </Box>
                <Box 
                  bg='mediumBlue'
                  color='lilac'
                  fontSize='xs'
                  p='8px 12px'
                >
                  média influência
                </Box>
                <Box 
                  borderRadius='0px 40px 40px 0px'
                  bg='mediumBlue'
                  color='lilac'
                  fontSize='xs'
                  p='8px 12px'
                >
                  maior influência
                </Box>
                
              </Box>
              <Heading fontSize='lg'>Conheça os influencers</Heading>
              <Box 
                display='flex'
                flexWrap='wrap'
                justifyContent='space-around'
              >
                {users.map((user: UserType, index: number) => (
                  <UserCard key={user.id} name={user.name} score={21} position={index + 1}/>
                ))}
              </Box>
            </Box>
        </Flex>
    </>
  )
};

export default Home;