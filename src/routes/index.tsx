import CreateClienteComponent from '../components/Cliente/CreateCliente'
import EditarClienteComponent from '../components/Cliente/EditCliente'
import ListCliente from '../components/Cliente/ListCliente'
import CreateEntradaComponent from '../components/Entrada/CreateEntrada'
import EditarEntradaComponent from '../components/Entrada/EditEntrada'
import ListEntrada from '../components/Entrada/ListEntrada'
import { ClientePage } from '../components/pages/Cliente'
import { EntradaPage } from '../components/pages/Entrada'
import { Landing } from '../components/pages/Landing'
import { LoginComponent } from '../components/pages/Login'
import { MainMenuComponent } from '../components/pages/MainMenu'
import { PageNotFound } from '../components/pages/PageNotFound'
import { ProdutoPage } from '../components/pages/Produto'
import { SaidaPage } from '../components/pages/Saida'
import { UserPage } from '../components/pages/User'
import CreateProdutoComponent from '../components/Produto/CreateProduto'
import EditarProdutoComponent from '../components/Produto/EditProduto'
import ListProduto from '../components/Produto/ListProduto'
import CreateSaidaComponent from '../components/Saida/CreateSaida'
import EditarSaidaComponent from '../components/Saida/EditSaida'
import ListSaida from '../components/Saida/ListSaida'
import CreateUserComponent from '../components/User/CreateUser'
import EditUserComponent from '../components/User/EditUser'
import ListUser from '../components/User/ListUser'
import { IRoute } from '../Types/RouterTypes'

export const authRoutes: IRoute[] = [
    {
        path: '/inicio',
        element: <MainMenuComponent />
    },
    {
        path: '/usuarios',
        element: <UserPage />
    },
    {
        path: '/listar-usuario',
        element: <ListUser />
    },
    {
        path: '/criar-usuario',
        element: <CreateUserComponent />
    },
    {
        path: '/editar-usuario/:id',
        element: <EditUserComponent />
    },
    {
        path: '/clientes',
        element: <ClientePage />
    },
    {
        path: '/listar-cliente',
        element: <ListCliente />
    },
    {
        path: '/criar-cliente',
        element: <CreateClienteComponent />
    },
    {
        path: '/editar-cliente/:id',
        element: <EditarClienteComponent />
    },
    {
        path: '/saidas',
        element: <SaidaPage />
    },
    {
        path: '/criar-saida',
        element: <CreateSaidaComponent />
    },
    {
        path: '/editar-saida/:id',
        element: <EditarSaidaComponent />
    },
    {
        path: '/listar-saidas',
        element: <ListSaida />
    },
    {
        path: '/entradas',
        element: <EntradaPage />
    },
    {
        path: '/criar-entrada',
        element: <CreateEntradaComponent />
    },
    {
        path: '/editar-entrada',
        element: <EditarEntradaComponent />
    },
    {
        path: '/listar-entradas',
        element: <ListEntrada />
    },
    {
        path: '/produtos',
        element: <ProdutoPage />
    },
    {
        path: '/criar-produto',
        element: <CreateProdutoComponent />
    },
    {
        path: '/listar-produtos',
        element: <ListProduto />
    },
    {
        path: '/editar-produto/:id',
        element: <EditarProdutoComponent />
    },

]

export const notAuthErrorRoute: IRoute[] = [
    {
        path: '/error',
        element: <PageNotFound />
    },


]

export const notAuthRoutes: IRoute[] = [
    {
        path: '/entrar',
        element: <LoginComponent />
    },
    {
        path: '/',
        element: <Landing />
    },
]