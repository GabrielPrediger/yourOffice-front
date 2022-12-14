export interface IProduct {
    id: number;
    nome: string;
    descricao: string;
    tipo: string; //alugar ou vender
    foto: string;
    preco: number;
    quantidade: number;
    quantidadeSelecionada: number;
    quantidadeVenda: number;
}

export interface IProductsIdAndQuantity {
    id: number;
    quantidade: number;
}
