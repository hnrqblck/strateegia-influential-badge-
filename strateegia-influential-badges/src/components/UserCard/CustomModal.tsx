import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Link,
} from '@chakra-ui/react'
  import { ExternalLinkIcon } from '@chakra-ui/icons'

  interface IProps {
    children: JSX.Element;
    message: JSX.Element;
    open: any;
    close: any;
  }

const CustomModal = ({children, message, open, close}: IProps) => {
  return (
    <div>
      <Modal isOpen={open} onClose={close} size='4xl' isCentered >
        <ModalOverlay />
        <ModalContent 
          bg='mediumBlue'
          border='3px solid'
          borderColor='lilac'
          borderRadius='40px'
          p='40px 30px 20px 30px'
        >
            <ModalHeader>
              <ModalCloseButton m='10px'/>
            </ModalHeader>
            <ModalBody>
                {children}
            </ModalBody>

          <ModalFooter>
            <Box display='flex' alignItems='flex-end' w='75vw' justifyContent='space-between'>
              {message}
              <Box>
                
                <Link 
                  href='https://docs.google.com/document/d/1AOaxrYJFdNVKrmocyh-vdoIDIFI91tU6ZrOTRZFBi-w/edit' 
                  target='_blank'
                  fontSize='xs'
                  colorScheme='pink'
                >
                  <ExternalLinkIcon mx='2px' h='18px' w='14px' />
                  Acesse as Métricas Influencers</Link>
              </Box>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
};

export default CustomModal;
