export interface ICreateUser {
    usuario: string;
    senha: string;
    email: string;
    permissao: string;
}

export interface ICreateSaidas {
    valor: number;
    data: Date;
    descricao: string;
}

export interface ISaidas {
    id: number;
    valor: number;
    data: number;
    descricao: string;
}

export interface ICreateProduct {
    id?: number;
    nome: string;
    descricao: string;
    quantidade: number;
    tipo: string; //alugar ou vender
    foto: string;
    preco: number;
}

export interface ICreateEntrada {
    id?: any;
    tipoVenda: string;
    data: string;
    descricao: string;
    valor: number;
    clienteId: any;
    produtoId: any;
}

export interface ICreateCliente {
    id?: number;
    nome?: string;
    data_nascimento: string;
    cpf_cnpj?: string;
    rg?: string;
    endereco?: string;
}