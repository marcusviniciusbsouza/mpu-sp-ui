import { Active } from "../../../utils/active-object";
import http from "../../../utils/http-organization"; 
import { OrganizationModel } from "../Organization";

const baseURLOrganization = '/v1';

export const registry = (obj: OrganizationModel) => {
    http.post(`${baseURLOrganization}/registry`, obj)
} 

export const list = (name?: string, page?: number, size?: number) => {
    return http
        .get(`${baseURLOrganization}/filter?page=${page}&size=${size}&name=${name}`)
        .then(response => response.data); 
}

export const search = (nome?:string) => {
    return http
        .get(`/buscar?Orgao=${nome}`)
        .then(response => response.data); 
} 

export const activeOrDesactivate = (id: String, activeOrDesactivate: Active) => {
    return http
        .patch(`${baseURLOrganization}/activate-deactivate/${id}`, activeOrDesactivate)
        .then(response => response.data); 
}

export const buscarIdentificador = (id:string) => {
    return http
        .get(`/cadastro-orgao/buscar?id=${id}`)
        .then(response => response.data); 
}   
