import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import { ReactComponent as Logo } from '../assets/images/logo.svg';
import { LogoutIcon } from '../components/CreateIcon';
import { useAuth } from '../contexts/auth';

interface IProps {
  visi: any;
}

const NavBar: React.FC<IProps> = ({visi}: IProps) => {
  const navigate  = useNavigate();
  const { setApiToken } = useAuth();

  return (
    <Flex flexDirection='row' justifyContent='space-between' alignItems='center' h='50px' margin='45px  87px 0 87px'>
      <Logo cursor='pointer' onClick={() => navigate('/')}/>
      <LogoutIcon w='32px' h='32px' cursor='pointer'  onClick={() => {
        localStorage.removeItem('strateegiaAccessToken');
        setApiToken(null);
        navigate('/');
        }} visibility={visi}/>
    </Flex>
  )
};

// NavBar.defaultProps = {
//   visi: ''
// }

export default NavBar;