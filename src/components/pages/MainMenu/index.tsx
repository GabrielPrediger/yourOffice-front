import { usePicasso } from '../../../hooks/usePicasso'
import '../../../styles/scrollbar.css'
import  Example  from '../../Charts';
import SidebarWithHeader from '../../Sidebar';
import CreateUserComponent from '../../User/CreateUser';

const MainMenuComponent: React.FC = () => {

  const theme = usePicasso();

  return (
    <SidebarWithHeader>
      <Example />
    </SidebarWithHeader>
  );
}

export { MainMenuComponent };
