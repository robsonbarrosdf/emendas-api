import { buscarProposicao } from './proposicoesService';
import Axios from 'axios';
import AdmZip from 'adm-zip';
// import 'jsonix-lexml-teste21';
// import jsonixLexml from './jsonix-lexml.es';
import jsonixLexml from 'jsonix-lexml-teste22/dist/bundle/jsonix-lexml.es';


const baseURL = process.env.BASE_URL_API || 'https://legis.senado.gov.br';
const http = Axios.create({
    baseURL,
});

const extractLexmlFromZip = (zip: AdmZip): string | null => {
    const zipEntries = zip.getEntries();
    const zipEntry = zipEntries.find(ze => ze.name === 'texto.xml');
    return zipEntry ? zip.readAsText(zipEntry) : null;
};

const buscarLexmlZip = async (idSdlegDocumentoItemDigital: string): Promise<string> => {
    const url = baseURL + "/sdleg-getter/documento/download/" + idSdlegDocumentoItemDigital;
    const res = await http.get(url, {
        responseType: "arraybuffer"
    });
    return extractLexmlFromZip(new AdmZip(res.data));
};

const converterXml2Jsonix = (xml: string) => jsonixLexml.toJSON(xml);

export const buscarTextoLexmlAsJsonix = async (sigla: string, numero: string, ano: number): Promise<any> => {
    const proposicao = await buscarProposicao(sigla, numero, ano);
    if (proposicao?.idSdlegDocumentoItemDigital) {
        const xml = await buscarLexmlZip(proposicao.idSdlegDocumentoItemDigital);
        return converterXml2Jsonix(xml);
    }
}


