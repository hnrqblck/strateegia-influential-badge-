import React, { useState } from "react";
import { Table, Image } from '@chakra-ui/react';
import { DivPointId } from '../contexts/DivPointId';
import { executeCalculations } from '../components/metrics';
import { LightningIcon } from '../components/CreateIcon';

import ProgressBar from "@ramonak/react-progress-bar";
import userImg from '../assets/images/user.png'

import '../styles/userTable.scss';

interface UserType {
    name: string;
    id: string;
    score: number;
    metrica1: number;
    metrica2: number;
}

const UserTablePage = () => {
    const [usersScore, setUsersScore] = React.useState(JSON.parse(localStorage.getItem("usersScore") || ''));
    const [curItems, setCurItems] = useState([]);
    const divPoint = localStorage.getItem("pointId");
    const { id } = React.useContext(DivPointId);

    React.useEffect(() => {
        executeCalculations(divPoint)
          .then(data => {
            setUsersScore(data);
            localStorage.setItem("usersScore", JSON.stringify(data))
          })
          
      }, [id]);

    return (
        // <TableContainer>
            <Table variant='striped'>
                <thead>
                <tr >
                    <th className='biggerTh'>Influencers</th>
                    <th>Total em Respostas</th>
                    <th>Total em Engajamento</th>
                    <th>Score</th>
                    <th className='biggerTh'>Nível</th>
                </tr>
                </thead>
                <tbody>
                {usersScore
                    .map((user: UserType, index: number) => (
                        <tr className={index % 2 === 0 ? 'strip' : ''}>
                            <td className="user_name"> 
                                <Image src={userImg} boxSize='32px' marginRight='16px'/>
                                {user.name}
                            </td>
                            <td>{user.metrica1} %</td>
                            <td>{user.metrica2} %</td>
                            <td>{user.score} %</td>
                            <td className="level">
                                <LightningIcon marginRight='5px' w='15px' h='15px' marginLeft='20px'/>
                                <ProgressBar 
                                    completed={user.score}
                                    bgColor='linear-gradient(180deg, #CD1D9C 0%, #6505B4 100%)'
                                    baseBgColor='#09093B'
                                    height="15px"
                                    width="160px"
                                    isLabelVisible={false}
                                    animateOnRender={true}
                                    // barContainerClassName='level'
                                    // className='level'
                                />

                            </td>
                        </tr>
                    )
                )}
                
                </tbody>
            </Table>
        // </TableContainer>
    )
}

export default UserTablePage;