import React from 'react';
import { Select, Flex, FormLabel } from '@chakra-ui/react';
import { DropDownIcon } from '../components/CreateIcon';

interface IProps {
  text: string;
  children: JSX.Element;
}

const SelectOpt: React.FC<IProps> = ({text, children}:IProps) => {
  return (
    <Flex mb='24px'>
      <FormLabel
        borderColor='gray'
        color='gray' 
        border='2px solid' 
        borderRadius='12px' 
        w='290px' h='40px' 
        textAlign='center'
        fontSize='lg'
        mr='20px'
      >
        {text}
      </FormLabel>
      <Select 
        icon={<DropDownIcon />}
        bg='radial-gradient(97.57% 210.75% at 0.9% 2.98%, rgba(0, 17, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%)' borderColor='lilac'
        borderRadius='12px'
        maxH='48px'
        w='430px'

        fontSize='lg'
        fontFamily='Poppins, sans-serif'
      >
        {children}
      </Select>
                
    </Flex>

  )
};

export default SelectOpt;