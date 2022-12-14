import {IProduct} from './IProduct' 
import React from "react";

export interface IEntradaProducts {
  id: number;
  quantidade: number;
  clienteId: number;
  created_at?: string;
  data: string;
  data_fim_aluguel?: string;
  data_inicio_aluguel?: string;
  descricao: string;
  isAtrasado: boolean;
  produtos: IProduct[];
  tipoVenda: string;
  updated_at?: string | null;
  valor: number
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
}
