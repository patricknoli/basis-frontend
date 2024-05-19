export type StepThreeProps = {
  next: () => void;
  initialDate: string;
  finalDate: string;
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