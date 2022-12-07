import { Text } from '@chakra-ui/react';
import { usePicasso } from '../../../hooks/usePicasso'
import '../../../styles/scrollbar.css'
import  Example  from '../../Charts';
import { History } from '../../History';
import SidebarWithHeader from '../../Sidebar';
import CreateUserComponent from '../../User/CreateUser';

const MainMenuComponent: React.FC = () => {

  const theme = usePicasso();

  return (
    <SidebarWithHeader>
      <Text fontSize="3xl" fontFamily="heading">Olá! Seja bem-vindo...</Text>
      <History />
      <Example />
    </SidebarWithHeader>
  );
}

export { MainMenuComponent };
