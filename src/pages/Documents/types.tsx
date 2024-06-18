export type DocumentType = {
  descricao: string;
  url: string;
}

export type AddressDocumentsType = {
  endereco: string;
  arquivos: DocumentType[];
}