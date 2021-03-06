import React, { BaseSyntheticEvent } from 'react';
import { 
    Box,
} from '@chakra-ui/react';
import SelectOpt from './SelectOpt';
import { getAllProjects, getProjectById, getAllDivergencePointsByMapId, getUser } from '../services/strateegia-api';
import {executeCalculations } from './metrics';
import { DivPointId } from '../contexts/DivPointId';

interface UserType {
    name: string;
    id: string;
    score: number;
    position: number;
}


const JourneyForm = () => {
    const accessToken = localStorage.getItem("strateegiaAccessToken");
    const [usersScore, setUsersScore] = React.useState<string | null>(null);
    const [labs, setLabs] = React.useState<any[]>([]);
    const [maps, setMaps] = React.useState<any[]>([]);
    const [points, setPoints] = React.useState<any[]>([]);
    const appContext = React.useContext(DivPointId);
    const [pointId, setPointId] = React.useState<string>('');


    React.useEffect(() => {
        getUser(accessToken).then(data => localStorage.setItem('userId', data.id));
        getAllProjects(accessToken)
        .then(data => {
            const journeys = data.map((lab: { projects: Object; }) => lab.projects);
            setLabs([...journeys.flat()]);
            fetchProjectById(accessToken, journeys[0][0].id);
            // fetchDivId(accessToken,  maps[0].id)
        });
        
    }, []);
    

    const fetchProjectById = (accessToken: string | null, journeyId: string) => {
        getProjectById(accessToken, journeyId) 
        .then(data => {
            const users: any = [];
            const maps = data.maps.map((lab: Object) => lab);

            fetchDivId(accessToken,  data.maps[0].id);
            setMaps([...maps.flat()]);
            data.users.forEach(({id, name}: UserType) => {
                users.push({ id: id, name: name });
            });
            localStorage.setItem("users", JSON.stringify(users));
        })
    }

    const fetchDivId = (accessToken: string | null, mapId: string) => {
        getAllDivergencePointsByMapId(accessToken, mapId)
        .then(data => {
            const points = data.content.map((point: []) => point);
            localStorage.setItem('pointId', points[0].id);
            executeCalculations(points[0].id).then(data => {
                const addPosition = data.map((dt: UserType, index: number) => {
                    const newObj = {...dt};
                    newObj.position = index + 1;
                    return newObj;
                  })
                localStorage.setItem("usersScore", JSON.stringify(addPosition))
            });
            setPoints([...points.flat()]);
            
        })
    }

    const selectAnJourneyOption = (e: BaseSyntheticEvent) => {
        localStorage.setItem('journeyId', e.target.value);
        fetchProjectById(accessToken, e.target.value);
        setTimeout(() => {
            appContext.setId(localStorage.getItem('pointId'));
        }, 1000);
    };

    const selectAnMapOption = (e: BaseSyntheticEvent) => {
        localStorage.setItem('mapId', e.target.value);
        fetchDivId(accessToken, e.target.value)
        setTimeout(() => {
            appContext.setId(localStorage.getItem('pointId'));
        }, 1000);
    };

    const selectAnPointOption = (e: BaseSyntheticEvent) => {
        localStorage.setItem('pointId', e.target.value);
        executeCalculations(e.target.value).then(data => {
            localStorage.setItem("usersScore", JSON.stringify(data));
            setUsersScore(JSON.stringify(data));
        });
        appContext.setId(e.target.value);
    };

    React.useEffect(() => {
        setUsersScore(localStorage.getItem("usersScore"));
    }, [pointId]);

    return (
        <>
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
                    onClick={(e: BaseSyntheticEvent) => selectAnJourneyOption(e)} 
                    children={<>{
                        labs.map(journey => ( 
                            <option key={journey.id} value={journey.id}>{journey.title}</option>
                        ))
                    }</>}
                />
                <SelectOpt 
                    onClick={(e: BaseSyntheticEvent) => selectAnMapOption(e)}
                    text='Mapas' 
                    children={<>{
                        maps.map(journeyMap => ( 
                            <option key={journeyMap.id} value={journeyMap.id}>{journeyMap.title}</option>
                        ))
                    }</>}
                />
                <SelectOpt
                    onClick={(e: BaseSyntheticEvent) => selectAnPointOption(e)}
                    text='Pontos de Diverg??ncia'
                    children={<>{
                        points.map(point => ( 
                            <option key={point.id} value={point.id}>{point.tool.title}</option>
                        ))
                    }</>}/>
            </Box>
            </>
    )
};

export default JourneyForm;