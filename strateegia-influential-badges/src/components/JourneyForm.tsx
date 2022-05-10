import React, { BaseSyntheticEvent } from 'react';
import { 
    Box,
} from '@chakra-ui/react';
import SelectOpt from './SelectOpt';
import { getAllProjects, getProjectById, getAllDivergencePointsByMapId } from '../services/strateegia-api';

interface userProps {
    id: string;
    name: string;
}

const JourneyForm = () => {
    const accessToken = localStorage.getItem("strateegiaAccessToken");
    
    const [labs, setLabs] = React.useState<any[]>([]);
    const [maps, setMaps] = React.useState<any[]>([]);
    const [points, setPoints] = React.useState<any[]>([]);

    const [journeyId, setJourneyId] = React.useState<string>('');
    const [mapId, setMapId] = React.useState<string>('');
    const [pointId, setPointId] = React.useState<string>('');

    React.useEffect(() => {
        getAllProjects(accessToken)
        .then(data => {
            const journeys = data.map((lab: { projects: Object; }) => lab.projects);
            setLabs([...journeys.flat()]);
            setJourneyId(journeys[0][0].id)
        });
    }, []);

    React.useEffect(() => {
        getProjectById(accessToken, journeyId) 
        .then(data => {
            const users: any = [];
            const maps = data.maps.map((lab: Object) => lab);
            console.log('map', data)
            setMaps([...maps.flat()]);
            setMapId(maps[0].id)
            data.users.forEach(({id, name}: userProps) => {
                users.push({ id: id, name: name });
            });
            localStorage.setItem("users", JSON.stringify(users));
        })
    }, [journeyId]);
    
    React.useEffect(() => {
        getAllDivergencePointsByMapId(accessToken, mapId)
        .then(data => {
            const points = data.content.map((point: []) => point);
            setPoints([...points.flat()]);
            setPointId(points[0].id);
        })
        
    }, [mapId]);
    

    const selectAnOption = (e: BaseSyntheticEvent, setter: any) => {
        setter(e.target.value);
    }


    // console.log('1', selectJourney.current)

    

    return (
        <Box 
            display='flex'
            flexDir='column'
            justifyContent='center'
            alignItems='center'
            w='857px'
            h='292px'
            mt='70px'
            pt='24px'
            bg='mediumBlue'
            borderRadius='100px 40px'
            border='3px solid'
            borderColor='#6363ee56'
        >
            <SelectOpt 
                text='Jornadas'
                onClick={(e: BaseSyntheticEvent) => selectAnOption(e, setJourneyId)} 
                children={<>{
                    labs.map(journey => ( 
                        <option key={journey.id} value={journey.id}>{journey.title}</option>
                    ))
                }</>}
            />
            <SelectOpt 
                onClick={(e: BaseSyntheticEvent) => selectAnOption(e, setMapId)}
                text='Mapas' 
                children={<>{
                    maps.map(journeyMap => ( 
                        <option key={journeyMap.id} value={journeyMap.id}>{journeyMap.title}</option>
                    ))
                }</>}
            />
            <SelectOpt
                text='Pontos de Divergência'
                children={<>{
                    points.map(point => ( 
                        <option key={point.tool.id} value={point.tool.id}>{point.tool.title}</option>
                    ))
                }</>}/>
        </Box>
    )
};

export default JourneyForm;