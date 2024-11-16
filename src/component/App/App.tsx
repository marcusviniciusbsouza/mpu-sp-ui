import React from 'react';
import './App.css';
import {} from 'react-router'
import { Route, Routes } from 'react-router-dom';
import Document from '../Document/Document';
import Login from '../User/Login/Login';
import VirtualTable from '../VirtualTable/VirtualTable';
import View from '../Document/View/View';
import UserList from '../User/List/UserList';
import User from '../User/User';
import UsuarioHome from '../User/UsuarioHome'; // Remover!
import Department from '../Department/Department';
import PaginaNaoEncontrada from '../../cross-cutting/PaginaNaoEncontrada/PaginaNaoEncontrada';
import Process from '../Document/Process/Process';
import PermissoesUsuario from '../User/Auth/TelaDePermissoes';

import OrganizationList from '../Organization/List/OrganizationList';
import FormularioOrgao from '../Organization/Organization';
import NaoAutorizado from '../../cross-cutting/NaoAutorizado/NaoAutorizado';
import Incluir from '../Document/Cossignatario/Incluir';

function App() { 
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<VirtualTable />} ></Route>
          <Route path="/mesa-virtual" element={<VirtualTable />} ></Route>
          <Route path="/documento/:sigla" element={<Document />} ></Route> 
          <Route path="/documento" element={<Document />} ></Route> 
          <Route path="/formulario-usuario" element={<User />} ></Route>
          <Route path="/formulario-usuario/:id" element={<User />} ></Route>
          <Route path="/login" element={<Login />} ></Route>
          <Route path="/visualizar-documento" element={<View />} ></Route>
          <Route path="/visualizar-documento/:codigo" element={<View />} ></Route>
          <Route path="/listarusuario" element={<UserList />} ></Route>
          <Route path="/listar-usuario" element={<UsuarioHome />} ></Route>
          <Route path="*" element={<PaginaNaoEncontrada/>} ></Route>
          <Route path="/Tramitar-documento" element={<Process />} ></Route>
          <Route path="/cadastro-departamento" element={<Department />} ></Route>
          <Route path="/cadastro-departamento/:id" element={<Department />} ></Route>
          <Route path='/permissoes-usuario' element={<PermissoesUsuario />}></Route>
          <Route path="/home-orgao" element={<OrganizationList />} ></Route>
          <Route path='/nao-autorizado' element={<NaoAutorizado />}></Route>
          <Route path='/Incluir-Consignatario' element={<Incluir />}></Route>
        </Routes>
    </div>
    
  );
}

export default App;