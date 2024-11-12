
import http from "../../../utils/http"; 
import { Setor } from "../Organization";

export const cadastrarOrgao = (usu: Setor) => {
    http.post('/orgao/cadastro', usu)
}