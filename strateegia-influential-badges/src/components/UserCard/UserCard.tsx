import React from 'react';
import { 
    Box,
    Heading, 
    Text, 
    Modal,
    ModalOverlay,
    useDisclosure,
    Textarea,
    Stack,
    Image,
} from '@chakra-ui/react';
import CustomModal from './CustomModal';
import { ExpandIcon, LightningLilacIcon } from '../CreateIcon';
import { InfoIcon } from '@chakra-ui/icons'
import message from '../../assets/images/message.png'
import DoughnutChart from './DoughnutChart';

interface IProps {
    name: string;
    score: number;
    position: number;
    metrica1: number;
    metrica2: number;
}

interface IMessage {
    firstText: string;
    secondText: string;
}


const UserCard = ({name, score, position, metrica1, metrica2}: IProps) => {

    
    let messages: IMessage = {
        firstText: '',
        secondText: ''
    }
    if (score > 66) {
        messages = {
            firstText: 'Fantástico !',
            secondText: 'Seu rendimento é inspirador.'
        };
    } else if (score > 33) {
        messages = {
            firstText: 'Indo bem !',
            secondText: 'continue assim e seja inspiração'
        };
    } else {
        messages = {
            firstText: 'Humm... ',
            secondText: 'Que tal interagir mais ?'
        };
    }
    
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
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
                    <ExpandIcon onClick={onOpen} cursor='pointer'/>
                </Box>
                <Box>
                    <Heading p='0 10px' fontSize='lg' mb='8px'>{name}</Heading>
                    <Text fontSize='lg' mb='8px'>Score</Text>
                    <Box display='flex' justifyContent='center' fontSize='lg' alignItems='center' >
                        
                        <Text color='pink'>{score}%</Text>
                    </Box>
                </Box>
            </Box>
            <CustomModal open={isOpen} close={onClose} message={
                <>
                <Box display='flex'> 
                    <Image src={message} marginRight='16px'/>
                    <Box>
                        <Text color='pink' fontSize='md'>{messages.firstText}</Text>
                        <Text fontSize='sm'>{messages.secondText}</Text>
                    </Box>
                </Box>
                </>
            }>
                <>
                    <Heading fontSize='xl' marginBottom='22px'>{name}</Heading>
                    <Box display='flex'fontSize='lg' marginBottom='16px'>
                        <Text fontWeight='bold' paddingRight='8px'>Score:</Text>
                        <Text fontWeight='medium' color='pink'>{score}%</Text>
                    </Box>
                    <Box display='flex' marginBottom='8px' alignItems='center'>
                        <InfoIcon color='lilac' marginRight='8px'/>
                        <Text>Score é uma pontuação que vai de 0 a 100. E indica o perfil de maior influência</Text>
                    </Box>
                    <Box display='flex' alignItems='center' marginBottom='60px'>
                        <LightningLilacIcon marginRight='8px'/>
                        <Text>Um usuário influente é aquele que  responde as questões e essa sua resposta gera interação</Text>
                    </Box>
                    <Box display='flex'>
                        <Box h='230px' w='230px' className='doughnutBox' marginRight='80px'>
                            <DoughnutChart totalA={metrica1} totalE={metrica2}/>
                        </Box>
                        <Box marginTop='50px'>
                            <Text className='metric1' marginBottom='8px'>{metrica1}% Total em respostas</Text>
                            <Text className='metric2'>{metrica2}% Total em engajamento</Text>
                        </Box>
                    </Box>
                    
                </>
            </CustomModal>

        </>
    )
};

export default UserCard;