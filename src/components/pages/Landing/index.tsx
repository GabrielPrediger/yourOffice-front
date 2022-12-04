import { useState } from 'react'
import { Collapse, Flex } from '@chakra-ui/react';
import { usePicasso } from '../../../hooks/usePicasso'
import '../../../styles/scrollbar.css'
import AboutUs from './AboutUs';
import Feedback from './Feedback';
import GetStarted from './GetStarted';
import Header from './Header';
import LandingFooter from './LandingFooter';
import Price from './Price';


const Landing: React.FC = () => {

  const theme = usePicasso();
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Flex flexDir={'column'} w="100%" h="max">
      <Collapse in={isOpen} animateOpacity>
          <Header />
          <GetStarted />
          <AboutUs />
          <Feedback />
          <Price />
          <LandingFooter />
        </Collapse>
    </Flex>
  );
}

export { Landing };
