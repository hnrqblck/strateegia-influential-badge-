import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

interface IProps {
    name: string;
    score: number;
    position: number;
}

const UserCard = ({name, score, position}: IProps) => {
  return (
    <Box
        bg='mediumBlue'
        w='260px'
        h='248px'
        borderRadius='24px'
        display='flex'
        justifyContent='center'
        alignItems='center'
        textAlign='center'
        mb='24px'
    >
        <div>
            <Heading fontSize='lg' mb='8px'>{name}</Heading>
            <Text fontSize='lg' mb='8px'>Score</Text>
            <Box display='flex' justifyContent='center' fontSize='lg' alignItems='center' >
                <Text
                    w='24px' h='24px'
                    borderRadius='25px'
                    fontWeight='bold'
                    fontSize='md' 
                    bg='white' 
                    color='mediumBlue'
                    mr='6px'
                >
                    {position}
                </Text>
                <Text color='pink'>{score}%</Text>
            </Box>
        </div>
    </Box>
  )
};

export default UserCard;