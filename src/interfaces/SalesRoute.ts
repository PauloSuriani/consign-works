export default interface SalesRoutes {

  id?: number;

  idSeller?: number;

  idFieldSeller: number;

  nomeRota: string;

  dataInicial: Date;

  dataFinal?: Date;
  
  valorTotal?: number | string;

};
