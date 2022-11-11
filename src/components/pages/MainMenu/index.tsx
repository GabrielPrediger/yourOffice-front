import { usePicasso } from '../../../hooks/usePicasso'
import '../../../styles/scrollbar.css'
import SidebarWithHeader from '../../Sidebar';
import CreateUserComponent from '../../User/CreateUser';

const MainMenuComponent: React.FC = () => {

  const theme = usePicasso();

  return (
    <SidebarWithHeader>

    </SidebarWithHeader>
  );
}

export { MainMenuComponent };
