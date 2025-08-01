export default interface Custommer {
  id: number;

  contato?: string;

  razaoSocial?: string;

  nomeFantasia?: string;

  rua?: string;

  nro?: string;

  bairro?: string;

  telefone?: string;

  cnpj?: string;

  email?: string; 

  cidade?: string;

  uf?: string;

  role: string;

  idSeller?: number;

  inDebt: boolean;

  notes?: string;

  createdAt?: Date;

  updatedAt?: Date;

};
