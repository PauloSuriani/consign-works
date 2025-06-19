export default interface Product {
  
  id?: number;

  codigo?: string;

  nomeProduto?: string;

  tipoProduto?: string;

  valorSugerido?: number | string;

  idSeller?: number;

  dataInserção?: Date;

}