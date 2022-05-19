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
import { SearchIcon } from '@chakra-ui/icons'
import NavBar from '../components/NavBar';
import JourneyForm from '../components/JourneyForm';
import '../styles/home.scss';
import { LightningIcon } from '../components/CreateIcon';
import UsersCardsPages from '../components/UsersCardsPages';
import { DivPointId } from '../contexts/DivPointId';

const Home: React.FC = () => {
  const [query, setQuery] = React.useState<string>('');
  const [usersScore, setUsersScore] = React.useState<any>([]);
  const journeyId = localStorage.getItem("journeyId");
  const mapId = localStorage.getItem("mapId");
  const [userLevel, setUserLevel] = React.useState<any>({});
  const { id } = React.useContext(DivPointId);
  document.body.style.overflow='visible'

  const inputHandler = (e: any) => {
    var lowerCase = e.target.value.toLowerCase();
    setQuery(lowerCase);
  };

  React.useEffect(() => {
    setTimeout(() => {
      setUsersScore(JSON.parse(localStorage.getItem("usersScore") || ''));
    }, 500);
  }, [journeyId, mapId, id]);

  React.useEffect(() => {
    const userId: string = (localStorage.getItem('userId') || '');
    const userLevel = {
      level: 'littleInfluence',
      bg: 'linear-gradient(180deg, #CD1D9C 0%, #6505B4 100%)',
      color: 'white'
    }
    const filteredUsersScore = usersScore?.filter(({ id } : any ) => {
      return id === userId;
    });

    if (filteredUsersScore[0]?.score >= 67) {
      setUserLevel({...userLevel, level: 'greaterInfluence'});
    } else if (filteredUsersScore[0]?.score >= 34) {
      setUserLevel({...userLevel, level: 'mediumInfluence'});
    } else {
      setUserLevel({...userLevel});
    }
  }, [usersScore]);


  return (
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
                  className={userLevel.level === 'littleInfluence' ? 'influence' : ''}
                  bg={userLevel.level === 'littleInfluence' ? userLevel.bg : 'mediumBlue'}
                  color={userLevel.level === 'littleInfluence' ? userLevel.color : 'lilac'}
                  borderRadius='40px 0px 0px 40px'
                  fontSize='xs'
                  p='8px 12px'
                >
                  pouca influência
                </Box>
                <Box
                  className={userLevel.level === 'mediumInfluence' ? 'influence' : ''}
                  bg={userLevel.level === 'mediumInfluence' ? userLevel.bg : 'mediumBlue'}
                  color={userLevel.level === 'mediumInfluence' ? userLevel.color : 'lilac'}
                  fontSize='xs'
                  p='8px 12px'
                >
                  média influência
                </Box>
            </Box>
              <Box 
                className={userLevel.level === 'greaterInfluence' ? 'influence' : ''}
                bg={userLevel.level === 'greaterInfluence' ? userLevel.bg : 'mediumBlue'}
                color={userLevel.level === 'greaterInfluence' ? userLevel.color : 'lilac'}
                borderRadius='0px 40px 40px 0px'
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
                <Text>({usersScore.length} resultados)</Text>
              </Box>
              
              <form >
                  <InputGroup bg='mediumBlue' borderRadius='40px' >
                      <InputRightElement
                      pointerEvents='none'
                      children={<SearchIcon color='grey' />}
                      />
                      <Input
                        onChange={inputHandler}
                        border='none'
                        borderRadius='40px'
                        color='lilac'
                        // {...register("searchContent")}
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
            <UsersCardsPages searchQuery={query}/>
          </Box>
      </Flex>
    </>
  )
};

export default Home;