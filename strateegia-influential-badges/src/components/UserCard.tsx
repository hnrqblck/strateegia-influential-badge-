import React from 'react';
import { Box, Heading, Text, Stack } from '@chakra-ui/react';
import { ExpandIcon } from '../components/CreateIcon';

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
            flexDir='column'
            justifyContent='center'
            alignItems='center'
            textAlign='center'
            mb='24px'
        >
            {/* top='775px' */}
            <Box display='inline-flex' w='220px' justifyContent='space-between' marginBottom='180px' pos='absolute'>
                <Text className='position' display='inline'> {position}º </Text>
                <ExpandIcon />
            </Box>
            <Box>
                <Heading p='0 10px' fontSize='lg' mb='8px'>{name}</Heading>
                <Text fontSize='lg' mb='8px'>Score</Text>
                <Box display='flex' justifyContent='center' fontSize='lg' alignItems='center' >
                    
                    <Text color='pink'>{score}%</Text>
                </Box>
            </Box>
        </Box>
    )
};

export default UserCard;