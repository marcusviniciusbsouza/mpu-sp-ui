import React, { useEffect, useState } from 'react';
import { Modal, Box, Grid, Pagination } from '@mui/material';
import './modalTramitar.css';
import { listarUsuario } from '../../component/User/Servico/Service';
import Swal from 'sweetalert2';
import { buscarUser } from '../SharedInput/Service/BuscarService';
import Conteudo from '../Conteudo/Conteudo';
import Form from '../Form/Form';
import Input from '../Input/Input';
import SharedInput from '../SharedInput/SharedInput';
import Button from '../Button/Button';

interface ModProps {
  open: boolean;
  handleClose: () => void;
  setMatricula: (value: string) => void;
  setNome: (value: string) => void;
  setDepartmentId: (value: string) => void;
  setPessoaRecebedoraId: (value: string) => void;
}

const ModalTramitar: React.FC<ModProps> = ({ open, handleClose, setMatricula, setNome, setDepartmentId, setPessoaRecebedoraId }) => {
  const SIZE_LIST = 2;
  const [usuarios, setUsuarios] = useState([]);
  const [matricula, setMatriculaL] = useState('');
  const [nome, setNomeL] = useState('');
  const [departmentId, setDepartmentIdL] = useState('');
  const [orgao, setOrgao] = useState('');

  const [totalPage, setTotalPage] = useState(0);
  const [pageActual, setPageActual] = useState(0);
  const [numberPage, setNumberPage] = useState(0);

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setPageActual(page - 1);
  };

  async function listar() {
    try {  
      const _usuarios = await listarUsuario('', departmentId, pageActual, SIZE_LIST);
      setUsuarios(_usuarios.content);
      setNumberPage(_usuarios.number);
      setTotalPage(_usuarios.totalPages);
    } catch(err) {
      if (err instanceof Error)
        Swal.fire('Oops!', 'Erro ao se conectar com o servidor!', 'error');
    }
  }

  async function buscar() {
    try {  
      const _usuarios = await buscarUser(
        nome,
        departmentId, 
        matricula, 
        '', //Incluir o page.
        SIZE_LIST
      );
      setUsuarios(_usuarios.content);
      setNumberPage(_usuarios.number);
      setTotalPage(_usuarios.totalPages);
    } catch (err) {
      if (err instanceof Error)
        Swal.fire('Oops!', 'Erro ao se conectar com o servidor!', 'error');
    }
  }

  useEffect(() => {
    listar();
  }, [pageActual]);

  const handleRowClick = (user: any) => {

    setMatricula(user.userModel.matricula);
    setNome(user.userModel.nome);
    setDepartmentId(user.departmentId);
    setPessoaRecebedoraId(user.userModel.userId);
    handleClose(); 
  };
  

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="modal-box">
        <Conteudo>
          <Form titulo={"Dados do Usuário"}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Input
                  label="Nome ou Matrícula" 
                  onChange={(e) => setMatriculaL(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <SharedInput 
                  label="Lotação"  
                  onChange={(e) => setDepartmentIdL(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <Input
                  label="Órgão" 
                  onChange={(e) => setOrgao(e.target.value)} />
              </Grid>
            </Grid>
            <br></br>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Button onClick={buscar}>Pesquisar</Button>
              </Grid>
            </Grid>

            <table className="AppTable">
              <thead>
                <tr>
                  <th>Matrícula</th>
                  <th>Nome</th>
                  <th>Lotação</th>
                  <th>Função</th>
                  <th>Fim de Vigência</th>
                </tr>
              </thead>
              <tbody>
                {
                  usuarios.map((listValue: any, index: any) => {
                    return (
                      <tr key={index} onClick={() => handleRowClick(listValue)}>
                        <td>{listValue.userModel.matricula}</td>
                        <td>{listValue.userModel.nome}</td>
                        <td>{listValue.department.nome}</td>
                        <td>{listValue.userModel.telefone}</td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
            <div className="pagination-container">
              <Pagination
                count={totalPage}
                page={numberPage + 1}
                onChange={handleChange}
                variant="outlined"
                shape="rounded"
                color='primary' />
            </div>
          </Form>
        </Conteudo>
      </Box>
    </Modal>
  );
};

export default ModalTramitar;
