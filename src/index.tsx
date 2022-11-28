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
import { SaidaPage } from './components/pages/Saida';
import { EntradaPage } from './components/pages/Entrada';
import { ProdutoPage } from './components/pages/Produto';
import CreateClienteComponent from './components/Cliente/CreateCliente';
import EditarClienteComponent from './components/Cliente/EditCliente';
import CreateProdutoComponent from './components/Produto/CreateProduto';
import ListProduto from './components/Produto/ListProduto';
import EditarProdutoComponent from './components/Produto/EditProduto';
import CreateEntradaComponent from './components/Entrada/CreateEntrada';
import ListEntrada from './components/Entrada/ListEntrada';
import EditarEntradaComponent from './components/Entrada/EditEntrada';
import CreateSaidaComponent from './components/Saida/CreateSaida';
import EditarSaidaComponent from './components/Saida/EditSaida';
import ListSaida from './components/Saida/ListSaida';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/inicio" element={<MainMenuComponent />} />

        <Route path="/usuarios" element={<UserPage />} />
        <Route path="/listar-usuario" element={<ListUser />} />
        <Route path="/criar-usuario" element={<CreateUserComponent />} />
        <Route path="/editar-usuario/:id" element={<EditUserComponent />} />

        <Route path="/clientes" element={<ClientePage />} />
        <Route path="/listar-cliente" element={<ListCliente />} />
        <Route path="/criar-cliente" element={<CreateClienteComponent />} />
        <Route path="/editar-cliente/:id" element={<EditarClienteComponent />} />

        <Route path="/saidas" element={<SaidaPage />} />
        <Route path="/criar-saida" element={<CreateSaidaComponent />} />
        <Route path="/editar-saida/:id" element={<EditarSaidaComponent />} />
        <Route path="/listar-saidas" element={<ListSaida />} />

        <Route path="/entradas" element={<EntradaPage />} />
        <Route path="/criar-entrada" element={<CreateEntradaComponent />} />
        <Route path="/editar-entrada" element={<EditarEntradaComponent />} />
        <Route path="/listar-entradas" element={<ListEntrada />} />

        <Route path="/produtos" element={<ProdutoPage />} />
        <Route path="/criar-produto" element={<CreateProdutoComponent />} />
        <Route path="/listar-produtos" element={<ListProduto />} />
        <Route path="/editar-produto/:id" element={<EditarProdutoComponent />} />

      </Routes>
    </BrowserRouter>
    <ColorModeScript />
  </ChakraProvider>
);

