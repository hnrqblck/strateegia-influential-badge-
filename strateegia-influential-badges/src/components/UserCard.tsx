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
        w='310px'
        h='248px'
        borderRadius='24px'
    >
        <div>
            <Text>{position}</Text>
            <Heading>{name}</Heading>
            <Text>Score</Text>
            <Box>
                <Text>{score}%</Text>
            </Box>
        </div>
    </Box>
  )
};

export default UserCard;