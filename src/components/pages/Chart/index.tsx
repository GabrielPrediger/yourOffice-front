import { Text } from '@chakra-ui/react';
import '../../../styles/scrollbar.css'
import Example from '../../Charts';
import { History } from '../../History';
import SidebarWithHeader from '../../Sidebar';

const ChartComponent: React.FC = () => {

  return (
    <SidebarWithHeader>
        <Example />
    </SidebarWithHeader>
  );
}

export { ChartComponent };

