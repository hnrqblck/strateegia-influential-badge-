import React from 'react';
import { 
    Flex,
    Box,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    Heading, 
    Text
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useForm, SubmitHandler  } from "react-hook-form";
import NavBar from '../components/NavBar';
import { ReactComponent as LogoTitle } from '../assets/images/logo-title.svg';
import '../styles/login.scss';
// import { useAuth } from '../contexts/auth';
import { useAuth } from '../contexts/auth';


const Login: React.FC = () => {
    const [show, setShow] = React.useState(false);
    const [loginErrors, setLoginErrors] = React.useState("");
    // const { apiToken, isAuthenticated, setApiToken, setIsAuthenticated } = useAuth();
    const { auth } = useAuth();
    const handleClick = () => setShow(!show);
    document.body.style.overflow='hidden'

    type FormValues = {
        email: string;
        password: string;
    };

    // console.log(context);

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = data => {
        auth(data.email, data.password)
        .then((response : string | void) => {
            if (response !== undefined) {
                // setApiToken(response);
                // setIsAuthenticated(!isAuthenticated);
                // localStorage.setItem("strateegiaAccessToken", response);
                console.log('entrei', response);
                // navigate("/Home");
            } else {
                setLoginErrors("Acesso negado: email ou senha inválidos!");
                console.log('erro')
            }
        });  
    };
// https://api.strateegia.digital/projects/v1/divergence-point/626932f879be781095db6f90/comment/report
  

  return (
    <>
        {/* {isAuthenticated && <Navigate to='/Home'/>} */}
        {/* {!isAuthenticated && ( */}
            <>
            <NavBar visi={'hidden'}/>
            
            <Flex alignContent="center" alignItems="center" width="full" height="90vh" justifyContent='space-around' alignSelf='center'>
            
                <Box flex='2' className='leftBox' maxW="390px"  >
                    <LogoTitle />
                    <Text fontSize='lg' pl='10px'>Descubra quem são as pessoas mais influentes e engajadas das suas jornadas.</Text>
                </Box>
                <div className="elipse1"></div>
                <div className="elipse2"></div>
                <div className="elipse3"></div>
                <div className="circle1"></div>
                <Box 
                    flex='1'
                    className='rightBox' 
                    maxW='496px' 
                    h='83vh'
                    // bgGradient='radial(97.57% 210.75% at 0.9% 2.98%, rgba(0, 17, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%)'
                    backdropBlur='1rem'
                    // borderRadius='100px'
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='center'
                    // textAlign='center'

                >
                    <Text fontSize='md' w='330px' mb='18px'>Entre com sua conta strateegia</Text>
                    <Heading 
                        w='330px'
                        fontSize='2xl'
                        mb='35px'
                    >
                        Login
                    </Heading>
                        <form onSubmit={handleSubmit(onSubmit)} style={{ textAlign: 'center'}}>
                            <FormControl  w='330px' >
                                <FormLabel htmlFor='email'>E-mail</FormLabel>
                                <Input 
                                    id='email'
                                    type='email'
                                    mb='12px'
                                    borderColor='lilac'
                                    {...register("email", {
                                        required: "campo obrigatório *",
                                    })}
                                />
                                <FormErrorMessage color="#dc0362">
                                    {errors.email && errors.email.message}
                                </FormErrorMessage>
                                <FormLabel htmlFor='email'>Senha</FormLabel>
                                <InputGroup size='md' mb='24px'>
                                    <Input
                                        id='password'
                                        pr='4.5rem'
                                        borderColor='lilac'
                                        type={show ? 'text' : 'password'}
                                        {...register("password", {
                                            required: "campo obrigatório *",
                                        })}
                                    />
                                    <InputRightElement width='4.5rem'>
                                        <Button  h='1.75rem' size='lg' onClick={handleClick}>
                                        {show ? <ViewIcon color='lilac'/> : <ViewOffIcon color='lilac'/>}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage color="#dc0362">
                                            {errors.password && errors.password.message}
                                </FormErrorMessage>
                            </FormControl>
                            {loginErrors && <Box color="#dc0362">{loginErrors}</Box>}
                            <Button variant='pink' type='submit'>
                                {/* // bgColor='pink'
                                // color='white' */}
                                Entrar
                            </Button>
                        </form>
                </Box>

            </Flex>
            </>
        {/* )} */}
    </>
  )
};

export default Login;