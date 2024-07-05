export type AddressType = {
  codigoPesquisaImovel: string;
  codigoPesquisaLocatario: number;
  endereco: string;
  idImovel: number;
  nome: string;
  status: string;
}

export type ReceiptType = {
  idrecibo: number;
  codigopesquisa: string;
  datavencimento: string;
  valorvencimento: string;
  mesreferencia: string;
  datapagamento: string;
  valorpagamento: string;
  status: string;
  codigodebarras: string;
  linhadigitavel: string;
  codigopix: string;
}

export type ReceiptHistoryItemType = {
  ano: string;
  recibos: ReceiptType[]
}