import ReactDOM from 'react-dom/client';
import './index.css';
import { ColorModeScript } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react'
import './styles/scrollbar.css'
import App from './app';
import { AuthProvider } from './context/auth';
import { UserLoggedProvider } from './context/userLogged';
import { UserPermitionProvider } from './context/userPermition';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <AuthProvider>
    <UserPermitionProvider>
      <UserLoggedProvider>
        <ChakraProvider>
          <App />
          <ColorModeScript />
        </ChakraProvider>
      </UserLoggedProvider>
    </UserPermitionProvider>
  </AuthProvider>
);

export default App