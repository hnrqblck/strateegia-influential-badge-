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
import { useForm, SubmitHandler  } from "react-hook-form";
import { auth } from '../services/strateegia-api';


const Login = () => {
    const [show, setShow] = React.useState(false);
    const [loginErrors, setLoginErrors] = React.useState("");
    const handleClick = () => setShow(!show);

    type FormValues = {
        email: string;
        password: string;
      };

    const options = [
        { label: 'E-mail', value: 'email' },
        { label: 'Senha', value: 'password' },
      ];

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = data => {
        auth(data.email, data.password)
        .then((response) => {
            if (response) {
                console.log(response);
            } else {
                setLoginErrors("Acesso negado: email ou senha inválidos!");
            }
        });  
    };

  

  return (
    <Flex>

        <Box flex='2'>
            <Heading>influencers</Heading>
            <Text fontSize='lg'>Descubra quem são as pessoas mais influentes e engajadas das suas jornadas.</Text>
        </Box>

        <Box 
            flex='1'
        >
            <Text fontSize='md'>Entre com sua conta strateegia</Text>
            <Heading 
                fontSize='2xl'
            >
                Login
            </Heading>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl>
                        <FormLabel htmlFor='email'>E-mail</FormLabel>
                        <Input 
                            id='email'
                            type='email'
                            {...register("email", {
                                required: "campo obrigatório *",
                            })}
                        />
                        <FormErrorMessage color="#dc0362">
                            {errors.email && errors.email.message}
                        </FormErrorMessage>
                        <FormLabel htmlFor='email'>Senha</FormLabel>
                        <InputGroup size='md'>
                            <Input
                                id='password'
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                {...register("password", {
                                    required: "campo obrigatório *",
                                })}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button variant='pink' h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
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
                        Button
                    </Button>
                </form>
        </Box>

    </Flex>
  )
};

export default Login;