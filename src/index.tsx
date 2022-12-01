import ReactDOM from 'react-dom/client';
import './index.css';
import { ColorModeScript } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react'
import './styles/scrollbar.css'
import App from './app';
import { AuthProvider } from './context/auth';
import { UserLoggedProvider } from './context/userLogged';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <AuthProvider>
    <UserLoggedProvider>
      <ChakraProvider>
        <App />
        <ColorModeScript />
      </ChakraProvider>
    </UserLoggedProvider>
  </AuthProvider>
);

export default App