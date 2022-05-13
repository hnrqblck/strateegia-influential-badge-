import React from 'react';
import { 
    Box,
} from '@chakra-ui/react';
import { DivPointId } from '../contexts/DivPointId';
import { executeCalculations } from '../components/metrics';
import UserCard from '../components/UserCard';

interface UserType {
    name: string;
    id: string;
    score: number;
}

const UsersCardsPages = () => {
    const [usersScore, setUsersScore] = React.useState(JSON.parse(localStorage.getItem("usersScore") || ''));
    const divPoint = localStorage.getItem("pointId");
    const { id } = React.useContext(DivPointId);

    React.useEffect(() => {
        executeCalculations(divPoint)
          .then(data => setUsersScore(data))
    
      }, [id])

    return (
        <Box 
            display='flex'
            flexWrap='wrap'
            justifyContent='space-between'
            >
            {usersScore.map((user: UserType, index: number) => (
                <UserCard key={user.id} name={user.name} score={Math.round((user.score * 100) / 0.96)} position={index + 1}/>
            ))}
            </Box>
    )
};

export default UsersCardsPages;