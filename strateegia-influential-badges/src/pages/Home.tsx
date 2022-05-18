import React from 'react';
import { 
    Flex,
    Box,
    Heading,
    Text,
    InputGroup,
    Input,
    InputRightElement,
    Button
} from '@chakra-ui/react';
import { useForm, FormProvider } from "react-hook-form";
import { SearchIcon } from '@chakra-ui/icons'
import NavBar from '../components/NavBar';
import JourneyForm from '../components/JourneyForm';
import UserCard from '../components/UserCard';
import { executeCalculations } from '../components/metrics';
import '../styles/home.scss';
import { LightningIcon } from '../components/CreateIcon';
// import { useAuth } from '../contexts/auth';

import UsersCardsPages from '../components/UsersCardsPages';
import { Navigate } from 'react-router-dom';

interface UserType {
  name: string;
  id: string;
  score: number;
}

const Home: React.FC = () => {
  const [query, setQuery] = React.useState<string>('');
  document.body.style.overflow='visible'
  // const { apiToken, isAuthenticated } = useAuth();
  
  type FormValues = {
    searchContent: string;
  };


  // React.useEffect(() => {
  //   executeCalculations(divPoint)
  //     .then(data => setUsersScore(data))

  // }, [id])


  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const pressEnter = (data: any) => {
    setQuery('');
    const search = (JSON.stringify(data.searchContent));
    const slicedSearch = search.slice(0, -1);
    setQuery(slicedSearch.slice(1));
  };

  return (
    <>
      {/* {!isAuthenticated && <Navigate to='/'/>} */}
      {/* {isAuthenticated && ( */}
        <>
          <NavBar visi={'visible'}/>
          <Flex
              justifyContent='center'
              flexDir='column'
              alignItems='center'
          >
              <JourneyForm />
              <Box className='oi' mt='74px' w='857px' h='292px'>

                <Box display='flex' justifyContent='flex-start'>
                  <LightningIcon w='33px' h='33px' />
                  <Box display='flex' pl='11px'>
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
                <Box
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                  mt='75px'
                  mb='20px'
                >
                  <Box display='flex' alignItems='center'>
                    <Heading fontSize='lg' mr='8px'>Conheça os influencers</Heading>
                    {/* <Text>({usersScore.length} resultados)</Text> */}
                  </Box>
                  
                  <form onSubmit={handleSubmit(pressEnter)}>
                      <InputGroup bg='mediumBlue' borderRadius='40px' >
                          <InputRightElement
                          pointerEvents='none'
                          children={<SearchIcon color='grey' />}
                          />
                          <Input
                            border='none'
                            borderRadius='40px'
                            color='lilac'
                            {...register("searchContent")}
                            type='text' placeholder='Busque influencers...'/>
                      </InputGroup>
                  </form>
                </Box>
                <Box display='flex' mb='60px' fontSize='sm'>
                    <Button bg='lilac' borderRadius='40px' mr='16px'>
                      score
                    </Button>
                    <Button bg='rgba(232, 232, 232, 0.12)' borderRadius='40px' color='gray' >
                      tabela
                    </Button>
                  </Box>
                <UsersCardsPages />
              </Box>
          </Flex>
        </>
      {/* )} */}
    </>
  )
};

export default Home;