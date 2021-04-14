export interface Ug {
  id: number;
  code: string;
  short_name: string;
  name: string;
}

export interface User {
  id: number;
  name: string;
  nickname: string;
  email: string;
  type: 'ADMINISTRATOR' | 'ACCOUNTANT' | 'OPERATOR';
  ugs: Ug[];
}

export interface File {
  id: number;
  name: string;
  original_name: string;
  content_type: string;
  size: number;
  from: string;
  url: string;
}

export interface UgRegistration {
  id: number;
  type: string;
  code: string;
  short_name: string;
  name: string;
  cnpj: string;
  fantasy_name: string;
  open_date: string;
  legal_nature_code: string;
  address: string;
  number: string;
  complement: string;
  district: string;
  cep: string;
  email: string;
  phone: string;
  site: string;
  obs: string;
  expense_ordinator_cpf: string;
  expense_ordinator_name: string;
  expense_ordinator_email: string;
  status: 'ANALISE' | 'RECUSADO' | 'APROVADO';
  status_justification: string;
  created_at: string;
  updated_at: string;
  ug: Ug;
  user: User;
  files: File[];
}
