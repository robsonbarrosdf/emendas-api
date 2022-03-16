import Axios from "axios";
import { Proposicao } from "./types";

const baseURL = process.env.BASE_URL_API || "https://legis.senado.gov.br";
const http = Axios.create({
  baseURL,
});

export const buscarProposicoes = async (
  sigla: string,
  numero: string | undefined | null,
  ano: number
): Promise<Proposicao[]> => {
  const url =
    `legis/resources/lex/proposicoes/${sigla}/${ano}` +
    (numero ? "?numero=" + numero : "");
  const res = await http.get<Array<Proposicao>>(url, {
    params: { sigla, numero, ano },
  });
  return res.data;
};

export const buscarProposicao = async (
  sigla: string,
  numero: string,
  ano: number
): Promise<Proposicao | null> => {
  const proposicoes = await buscarProposicoes(sigla, numero, ano);
  if (proposicoes.length) {
    return proposicoes[0];
  } else {
    return null;
  }
};
