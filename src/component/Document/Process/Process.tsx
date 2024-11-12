import React, { useEffect, useState } from "react";
import Button from "../../../shared-component/Button/Button";
import Conteudo from "../../../shared-component/Conteudo/Conteudo";
import './Process.css';
import { Autocomplete, Grid, TextField } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import SharedInput from "../../../shared-component/SharedInput/SharedInput";
import Form from "../../../shared-component/Form/Form";
import Swal from "sweetalert2";
import Input from "../../../shared-component/Input/Input";
import { listarSetores } from "../../Department/Service/Service";
import { tramitarDocumento } from "../Service/Service";
import Cookies from "universal-cookie";
import { buscarUsuarioPorSetor } from "../../User/Servico/Service";
import ModalTramitar from "../../../shared-component/modalTramitar/modalTramitar";

interface Setor {
  id: string;
  nome: string;
}

interface User {
  id: string;
  nome: string;
}

export class TramitarModel {
  subscritorId?: string;
  pessoaRecebedoraId?: string;
}

function TramitarDoc() {
  const [subscritorId, setSubscritorId] = useState('');
  const [pessoaRecebedoraId, setPessoaRecebedoraId] = useState('');
  const [setores, setSetores] = useState<Setor[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [matricula, setMatricula] = useState('');
  const [nome, setNome] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const location = useLocation();
  const { siglaDocumento } = location.state || {};
  const cookies = new Cookies();
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState<User[]>([]);

  

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  async function listar() {
    try {
      const _cadastros = await listarSetores('', '');
      setSetores(_cadastros.content);
    } catch (err) {
      if (err instanceof Error)
        Swal.fire('Oops!', 'Erro ao se conectar com o servidor!', 'error');
    }
  }

  async function listarUsuarios(setorId: string) {
    try {
      const _usuarios = await buscarUsuarioPorSetor(setorId);
      console.log(_usuarios)
      setUsuarios(_usuarios);
    } catch (err) {
      if (err instanceof Error)
        Swal.fire('Oops!', 'Erro ao se conectar com o servidor!', 'error');
    }
  }


  useEffect(() => {
    listar();
  }, []);

  useEffect(() => {
    const token = cookies.get('Token');
    if (!token) {
        return 
    }
    const object = JSON.parse(atob(token.split('.')[1]))
    setSubscritorId (object['sub']);
}, [cookies]);

  const tramitar = async () => {
    console.log("pessoaRecebedoraId before tramitar:", pessoaRecebedoraId);
    const tramitarModel = new TramitarModel();
    tramitarModel.subscritorId = subscritorId;
    tramitarModel.pessoaRecebedoraId = pessoaRecebedoraId;
    try {
      await tramitarDocumento(tramitarModel, siglaDocumento);
      Swal.fire('Sucesso!', 'Documento tramitado com sucesso!', 'success');
    } catch (err) {
      if (err instanceof Error)
        Swal.fire('Oops!', 'Erro ao tramitar documento!', 'error');
    }
  };
 

  return (
    <Conteudo>
      <Form titulo={'Tramitar Documento'}>
        <Grid item xs={7.8}>
          <p>Escolha para quem será tramitado esse documento</p>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={6} sm={3}>
            <Input label="Sigla do Documento" disabled value={siglaDocumento} />
          </Grid>
          <Grid item xs={6} sm={6}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={setores}
              getOptionLabel={(option) => option.nome}
              onChange={(event, newValue) => {
                if (newValue) {
                  listarUsuarios(newValue.id);
                }
              }}

              sx={{
                '& .MuiAutocomplete-inputRoot': {
                  borderRadius: '2px',
                  marginTop: '35px',
                  alignItems: 'center',
                  height: '45px',
                  width: {
                    xs: '100%', // Para telas menores que 600px, o width será 100%
                    md: '300px' // Para telas maiores que 600px, o width será 300px
                  }
                }
              }}
              renderInput={(params) => (
                <TextField {...params} label="Destinatário"
                  sx={{
                    '& label': {
                      marginTop: '35px',
                    },
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={7}>
            <SharedInput 
              label="" 
              placeholder="Matrícula"
              onButtonClick={handleOpenModal}
              value={matricula}
              disabledValue={nome}
            />
          </Grid>
        </Grid>
        <br />
        <br />
        <br />
        <Grid container spacing={0.5}>
          <Grid item xs={4} sm={2}>
            <Button color="primary" onClick={tramitar}>Tramitar</Button>
          </Grid>
          <Grid item xs={4} sm={2}>
            <Link to={`/visualizar-documento/${siglaDocumento}`}>
              <Button value="Cancelar" color="danger"></Button>
            </Link>
          </Grid>
        </Grid>
      </Form>
      <ModalTramitar 
        open={modalOpen} 
        handleClose={handleCloseModal} 
        setMatricula={setMatricula}
        setNome={setNome}
        setDepartmentId={setDepartmentId}
        setPessoaRecebedoraId={setPessoaRecebedoraId}
      />
    </Conteudo>
  );
}

export default TramitarDoc;
