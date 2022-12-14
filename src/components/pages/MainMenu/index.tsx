import { Text } from '@chakra-ui/react';
import '../../../styles/scrollbar.css'
import { History } from '../../History';
import SidebarWithHeader from '../../Sidebar';

const MainMenuComponent: React.FC = () => {

  return (
    <SidebarWithHeader>
      <Text fontSize="3xl" fontFamily="heading">Olá! Seja bem-vindo...</Text>
      <History />
    </SidebarWithHeader>
  );
}

export { MainMenuComponent };
