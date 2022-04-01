export interface Proposicao {
  idIdentificacao: number;
  descricaoIdentificacao: string;
  descricaoIdentificacaoExtensa: string;
  sigla: string;
  numero: string;
  ano: number;
  ementa: string;
  idSdlegDocumentoItemDigital: string;
  urlDownloadItemDigitalZip: string;
}

export interface Parlamentar {
    id: string;
    nome: string;
    siglaPartido?: string;
    siglaUF: string;
    sexo: string;
    siglaCasa: string;
}