import React from 'react';
import { 
    Box,
} from '@chakra-ui/react';
import SelectOpt from './SelectOpt';
import { getAllProjects, getProjectById, getAllDivergencePointsByMapId } from '../services/strateegia-api';

const JourneyForm = () => {
    const accessToken = localStorage.getItem("strateegiaAccessToken");
    const [labs, setLabs] = React.useState<any[]>([]);

    React.useEffect(() => {
        getAllProjects(accessToken || '')
        .then(data => {
            const journeys = data.map((lab: { projects: Object; }) => lab.projects);
            setLabs([...journeys.flat()]);
        });
    }, []);

    React.useEffect(() => {
        console.log(labs)
        // Promise.all(
        //     labs.map(lab => {
        //         return lab;
        //     })
        // )
        // .then(data => console.log('1', data))
    }, [labs]);

    return (
        <Box 
            display='flex'
            flexDir='column'
            justifyContent='center'
            alignItems='center'
            w='950px'
            h='352px'
            mt='70px'
            pt='24px'
            bg='mediumBlue'
            borderRadius='100px 40px'
            border='3px solid'
            borderColor='#6363ee56'
        >
            <SelectOpt text='Jornadas' children={<>{
                labs.map(journey => (
                    <option key={journey.id} value={journey.id}>{journey.title}</option>
                ))
            }</>}/>
            <SelectOpt text='Mapas' children={<option>oi</option>}/>
            <SelectOpt text='Pontos de Divergência' children={<option>oi</option>}/>
        </Box>
    )
};

export default JourneyForm;