import httpDocument from "../../../utils/http-document";
import http from "../../../utils/http-document"; 
import { Cossignatario } from "../Cossignatario/Incluir";
import { DocumentoModel } from "../Document";
import { TramitarModel } from "../Process/Process";

const baseURLModel = '/v1/model'
const baseURLMobil = '/v1/mobil'
const baseURLMovement = '/v1/movimentacao';

export const listarModelos = (name?: string) => {
    return http
        .get(`${baseURLModel}/listar`)
        .then(response => response.data); 
}

// Mobils

export const buscarMobilPorSigla = (sigla?: string) => {
  return http
      .get(`${baseURLMobil}/buscar/${sigla}/sigla`)
      .then(response => response.data); 
}

export const buscarDocumento = (sigla:string) => {
  return http
      .get(`${baseURLMobil}/buscar/${sigla}/sigla`)
      .then(response => response.data); 
}

export const buscarMovimentosPorTipo = (subscritorId?: string, pessoaRecebedoraId?: string, typeMovement?: string, page?: any, size?: any) => {
  let queryParams = '';
  if (page !== undefined && size !== undefined) {
      queryParams += `page=${page}&size=${size}`;
  }
  if (typeMovement !== undefined) {
      queryParams += `${queryParams.length > 0 ? '&' : ''}typeMovement=${typeMovement}`;
  }
  if (pessoaRecebedoraId !== undefined) {
      queryParams += `${queryParams.length > 0 ? '&' : ''}pessoaRecebedoraId=${pessoaRecebedoraId}`;
  }
  if (subscritorId !== undefined) {
      queryParams += `${queryParams.length > 0 ? '&' : ''}subscritorId=${subscritorId}`;
  }

  const url = `${baseURLMobil}/filtro${queryParams.length > 0 ? '?' + queryParams : ''}`;

  return http.get(url)
      .then(response => response.data);
}

// Movements

export const listarCossignatario = (mobilId?: string, typeMovement?: string, page?: any, size?: any) => {
  return http
      .get(`${baseURLMovement}/filtro?page=${page}&size=${size}&mobilId=${mobilId}&typeMovement=${typeMovement}`)
      .then(response => response.data); 
}

export const excluirCossignatario = (siglaDocumento: string, movimentacaoId: string) => {
  return http
      .delete(`${baseURLMovement}/excluir-movimentacao/${siglaDocumento}/${movimentacaoId}`)
      .then(response => response.data); 
}

export const filtro = (mobilId: string, typeMovement:string) => {
  return http
  .get(`${baseURLMovement}/filtro`, {
      params: {
          mobilId,
          typeMovement
      }
  })
  .then(response => response.data);
}

export const filtroBoolean = (mobilId: string, typeMovement: string) => {
  return http
   .get(`${baseURLMovement}/filtro-boolean`, {
      params: {
        mobilId,
        typeMovement
      }
    })
   .then(response => response.data.isFinalized);
}

export const finalizarDocumento = (sigla: string, subscritorId: string) => {
  return http
   .post(`${baseURLMovement}/finalizacao-documento/${sigla}`, { subscritorId })
   .then(response => response.data)
}

export const cadastrarDocumento = (documento: DocumentoModel) => {
  http.post('/documento/cadastro', documento)
}

export const excluirDocumento = async (sigla: string, subscritorId: string) => {
const response = await http.post(`${baseURLMovement}/excluir-documento/${sigla}`, { subscritorId });
return response.data;
};

export const recebimentoDocumento = (sigla: string, subscritorId: string, pessoaRecebedoraId: string) => {
return http
 .post(`${baseURLMovement}/recebimento-documento/${sigla}`, { subscritorId, pessoaRecebedoraId })
 .then(response => response.data)
}

export const tramitarDocumento = (tramitar: TramitarModel, siglaDocumento: string) => {
  return httpDocument
    .post(`${baseURLMovement}/tramitar-documento/${siglaDocumento}`, tramitar)
    .then(response => response.data)
};

export const incluircossignatario = async (cossignatario: Cossignatario, siglaDocumento: string) => {
  const response = await http.post(`${baseURLMovement}/incluir-cossignatario/${siglaDocumento}`, cossignatario);
  return response.data;
}