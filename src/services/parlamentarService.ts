import Axios from "axios";
import { Parlamentar } from "./types";

const xml2js = require('xml2js');

const baseURL = "https://legis.senado.gov.br/lexeditweb/resources/shared/parlamentares";
const http = Axios.create({
  baseURL,
});

const _buscarParlamentares = async (siglaCasa: string): Promise<Parlamentar[]> => {
    const res = await http.get<string>(siglaCasa.toUpperCase());
    const objeto = await xml2js.parseStringPromise(res.data);
    const parlamentares = objeto.parlamentares.parlamentar;

    return parlamentares.map((obj: any) => ({
        id: obj.codigoDeputado[0] || obj.codigoParlamentar[0],
        nome: obj.nome[0],
        siglaPartido: obj.siglaPartido[0],
        siglaUF: obj.siglaUf[0],
        sexo: obj.sexo[0],
        siglaCasa: obj.siglaCasa[0],
    }));
};
  
export const buscarDeputados = async (): Promise<Parlamentar[]> => _buscarParlamentares('CD');

export const buscarSenadores = async (): Promise<Parlamentar[]> => _buscarParlamentares('SF');

export const buscarParlamentares = async (siglaCasa?: string): Promise<Parlamentar[]> => {
    const responses = await Promise.all([buscarDeputados(), buscarSenadores()]);
    return [...responses[0], ...responses[1]];
};
