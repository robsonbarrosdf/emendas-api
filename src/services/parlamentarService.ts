import Axios from "axios";
import { Parlamentar } from "./types";

const baseURL = "https://legis.senado.gov.br/lexeditweb/resources/shared/parlamentares";
const http = Axios.create({
  baseURL,
});

const _buscarParlamentares = async (siglaCasa: string): Promise<Parlamentar[]> => {
    const res = await http.get(siglaCasa.toUpperCase(), { headers: { "Accept": "application/json" }});
    const parlamentares = res.data.parlamentares;

    return parlamentares.map((obj: any) => ({
        id: obj.codigoDeputado || obj.codigoParlamentar,
        nome: obj.nome,
        siglaPartido: obj.siglaPartido,
        siglaUF: obj.siglaUf,
        sexo: obj.sexo,
        siglaCasa: obj.siglaCasa,
    }));
};
  
export const buscarDeputados = async (): Promise<Parlamentar[]> => _buscarParlamentares('CD');

export const buscarSenadores = async (): Promise<Parlamentar[]> => _buscarParlamentares('SF');

export const buscarParlamentares = async (): Promise<Parlamentar[]> => _buscarParlamentares('/');
