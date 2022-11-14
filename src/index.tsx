import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './index.css';
import { LoginComponent } from './components/pages/Login';
import { ColorModeScript } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react'
import { MainMenuComponent } from './components/pages/MainMenu';
import { PageNotFound } from './components/pages/PageNotFound';
import './styles/scrollbar.css'
import { UserPage } from './components/pages/User';
import CreateUserComponent from './components/User/CreateUser';
import EditUserComponent from './components/User/EditUser';
import ListUser from './components/User/ListUser';
import { ClientePage } from './components/pages/Cliente';
import ListCliente from './components/Cliente/ListCliente';
import CreateClienteComponent from './components/Cliente/CreateCliente';
import EditarClienteComponent from './components/Cliente/EditCliente';
import { SaidaPage } from './components/pages/Saida';
import { EntradaPage } from './components/pages/Entrada';
import { ProdutoPage } from './components/pages/Produto';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/inicio" element={<MainMenuComponent />} />

        <Route path="/usuarios" element={<UserPage />} />
        <Route path="/listar-usuario" element={<ListUser />} />
        <Route path="/criar-usuario" element={<CreateUserComponent />} />
        <Route path="/editar-usuario" element={<EditUserComponent />} />

        <Route path="/clientes" element={<ClientePage />} />
        <Route path="/listar-cliente" element={<ListCliente />} />
        <Route path="/criar-cliente" element={<CreateClienteComponent />} />
        <Route path="/editar-cliente" element={<EditarClienteComponent />} />

        <Route path="/saidas" element={<SaidaPage />} />

        <Route path="/entradas" element={<EntradaPage />} />

        <Route path="/produtos" element={<ProdutoPage />} />


      </Routes>
    </BrowserRouter>
    <ColorModeScript />
  </ChakraProvider>
);

