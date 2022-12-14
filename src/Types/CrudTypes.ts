export interface ICreateUser {
    usuario: string;
    senha: string;
    email: string;
    permissao: string;
}

export interface ICreateSaidas {
    id: number
    valor: number;
    data: number;
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
    id?: number;
    tipoVenda: string;
    data: number;
    descricao: string;
    valor: number;
    clienteId: any;
    produtos: [];
    data_inicio_aluguel?: number; 
    data_fim_aluguel?: number;
    isAtrasado?: boolean;
}

export interface ICreateCliente {
    id?: number;
    nome?: string;
    data_nascimento: string;
    cpf_cnpj?: string;
    rg?: string;
    endereco?: string;
}