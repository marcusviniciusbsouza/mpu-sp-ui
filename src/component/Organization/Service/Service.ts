import { Active } from "../../../utils/active-object";
import http from "../../../utils/http-organization"; 

const baseURLOrganization = '/v1';

export const registry = (obj: any) => {
    http.post(`${baseURLOrganization}/registry`, obj)
} 

export const list = (name?: string, page?: number, size?: number) => {
    return http
        .get(`${baseURLOrganization}/filter?page=${page}&size=${size}&name=${name}`)
        .then(response => response.data); 
}

export const search = (id?:string) => {
    return http
        .get(`${baseURLOrganization}/search-for-id/${id}`)
        .then(response => response.data); 
} 

export const activeOrDesactivate = (id: String, activeOrDesactivate: Active) => {
    return http
        .patch(`${baseURLOrganization}/activate-desactivate/${id}`, activeOrDesactivate)
        .then(response => response.data); 
}

export const buscarIdentificador = (id:string) => {
    return http
        .get(`/cadastro-orgao/buscar?id=${id}`)
        .then(response => response.data); 
}   

export const listCity = () => {
    return http
        .get(`${baseURLOrganization}/city/list`)
        .then(response => response.data); 
}