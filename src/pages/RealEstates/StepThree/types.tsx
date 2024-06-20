export type StepThreeProps = {
  next: () => void;
  saveProperties: React.Dispatch<React.SetStateAction<number[]>>
}

export type Realty = {
  imovel: {
    idtbbobjetoimovel: number;
    imovelcodigopesquisa: string;
    endereco: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  }
}

export type RealtyItem = {
  idtbbobjetoimovel: number;
  imovelcodigopesquisa: string;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

export type RealtyGroup = {
  condominiocodigopesquisa: string;
  idCorrentistaCondominio: string;
  nomeCondominio: string;
  imoveis: RealtyItem[];
}  