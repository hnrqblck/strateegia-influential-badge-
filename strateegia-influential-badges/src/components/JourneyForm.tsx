import React, { BaseSyntheticEvent } from 'react';
import { 
    Box,
} from '@chakra-ui/react';
import SelectOpt from './SelectOpt';
import { getAllProjects, getProjectById, getAllDivergencePointsByMapId } from '../services/strateegia-api';
import { users, executeCalculations } from './metrics';

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

    const [usersCalc, setUsersCalc] = React.useState<any[]>([])

    React.useEffect(() => {
        getAllProjects(accessToken)
        .then(data => {
            const journeys = data.map((lab: { projects: Object; }) => lab.projects);
            setLabs([...journeys.flat()]);
            setJourneyId(journeys[0][0].id)
            fetchProjectById(accessToken, journeys[0][0].id);
        });
    }, []);
    

    const fetchProjectById = (accessToken: string | null, journeyId: string) => {
        getProjectById(accessToken, journeyId) 
        .then(data => {
            const users: any = [];
            const maps = data.maps.map((lab: Object) => lab);
            setMaps([...maps.flat()]);
            setMapId(maps[0].id)
            data.users.forEach(({id, name}: userProps) => {
                users.push({ id: id, name: name });
            });
            fetchDivId(accessToken, maps[0].id)
            console.log('us', users);
            localStorage.setItem("users", JSON.stringify(users));
        })
    }

    const fetchDivId = (accessToken: string | null, mapId: string) => {
        getAllDivergencePointsByMapId(accessToken, mapId)
        .then(data => {
            const points = data.content.map((point: []) => point);
            setPoints([...points.flat()]);
            setPointId(points[0].id);
            console.log('pt', points);
            
        })
    }

    const selectAnJourneyOption = (e: BaseSyntheticEvent, setter: any) => {
        setter(e.target.value);
        fetchProjectById(accessToken, e.target.value);
    };

    const selectAnMapOption = (e: BaseSyntheticEvent, setter: any) => {
        setter(e.target.value);
        fetchDivId(accessToken, e.target.value)
    };

    const selectAnPointOption = (e: BaseSyntheticEvent, setter: any) => {
        setter(e.target.value);
        executeCalculations(e.target.value).then(data => localStorage.setItem("usersScore", JSON.stringify(data)));
    };

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
                onClick={(e: BaseSyntheticEvent) => selectAnJourneyOption(e, setJourneyId)} 
                children={<>{
                    labs.map(journey => ( 
                        <option key={journey.id} value={journey.id}>{journey.title}</option>
                    ))
                }</>}
            />
            <SelectOpt 
                onClick={(e: BaseSyntheticEvent) => selectAnMapOption(e, setMapId)}
                text='Mapas' 
                children={<>{
                    maps.map(journeyMap => ( 
                        <option key={journeyMap.id} value={journeyMap.id}>{journeyMap.title}</option>
                    ))
                }</>}
            />
            <SelectOpt
                onClick={(e: BaseSyntheticEvent) => selectAnPointOption(e, setPointId)}
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