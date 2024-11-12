import React from 'react';
import './App.css';
import {} from 'react-router'
import { Route, Routes } from 'react-router-dom';
import Documento from '../Document/Document';
import Login from '../User/Login/Login';
import Mesa from '../VirtualTable/VirtualTable';
import Visualizar from '../Document/View/View';
import TabelaUsuario from '../User/List/UserList';
import FormularioUsuario from '../User/User';
import UsuarioHome from '../User/UsuarioHome';
import FormularioSetor from '../Department/Department';
import PaginaNaoEncontrada from '../../cross-cutting/PaginaNaoEncontrada/PaginaNaoEncontrada';
import TramitarDoc from '../Document/Process/Process';
import CadastrarSetor from '../Department/Department';

import PermissoesUsuario from '../User/Auth/TelaDePermissoes';

import CadastrarOrgao from '../Organization/List/OrganizationList';
import FormularioOrgao from '../Organization/Organization';
import NaoAutorizado from '../../cross-cutting/NaoAutorizado/NaoAutorizado';
import Incluir from '../Document/Cossignatario/Incluir';

function App() { 
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Mesa />} ></Route>
          <Route path="/mesa-virtual" element={<Mesa />} ></Route>
          <Route path="/documento/:sigla" element={<Documento />} ></Route> 
          <Route path="/documento" element={<Documento />} ></Route> 
          <Route path="/formulario-usuario" element={<FormularioUsuario />} ></Route>
          <Route path="/formulario-usuario/:id" element={<FormularioUsuario />} ></Route>
          <Route path="/login" element={<Login />} ></Route>
          <Route path="/visualizar-documento" element={<Visualizar />} ></Route>
          <Route path="/listarusuario" element={<TabelaUsuario />} ></Route>
          <Route path="/visualizar-documento/:codigo" element={<Visualizar />} ></Route>
          <Route path="/listar-usuario" element={<UsuarioHome />} ></Route>
          <Route path="/FormularioSetor" element={<FormularioSetor />} ></Route>
          <Route path="/FormularioSetor/:id" element={<FormularioSetor />} ></Route>
          <Route path="/FormularioOrgao" element={<FormularioOrgao />} ></Route>
          <Route path="*" element={<PaginaNaoEncontrada/>} ></Route>
          <Route path="/Tramitar-documento" element={<TramitarDoc />} ></Route>
          <Route path="/cadastro-setor" element={<CadastrarSetor />} ></Route>
          <Route path='/permissoes-usuario' element={<PermissoesUsuario />}></Route>
          <Route path="/cadastro-orgao" element={<CadastrarOrgao />} ></Route>
          <Route path='/nao-autorizado' element={<NaoAutorizado />}></Route>
          <Route path='/Incluir-Consignatario' element={<Incluir />}></Route>
        </Routes>
    </div>
    
  );
}

export default App;