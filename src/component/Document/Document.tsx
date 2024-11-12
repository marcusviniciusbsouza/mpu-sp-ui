import React, { useEffect, useState } from "react";
import { listarModelos } from './Service/Service';
import './Document.css';
import Form from "../../shared-component/Form/Form";
import Conteudo from "../../shared-component/Conteudo/Conteudo";
import { Grid, TextField } from "@mui/material";
import { Link, useNavigate, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import Autocomplete from '@mui/material/Autocomplete';
import Swal from "sweetalert2";
import ModalComponent from "../../shared-component/Modal/Modal";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Button from "../../shared-component/Button/Button";

export class DocumentoModel {
  sigla?: string;
  siglaResponsavelAssinatura?: string;
  modelo?: string;
  tempo?: string;
}

interface Modelo {
  modelId: string;
  htmlForm: string;
  label: string;
  descricaoCompleta: string;
  active: boolean;
  siglaModel: string;
}

function Document() {
  const navigate = useNavigate();
  const [modelos, setModelos] = useState<Modelo[]>([]);
  const [modelo, setModelo] = useState<Modelo | null>(null);
  const { sigla } = useParams();
  const [descricaoDetalhadaModelo, setDescricaoDetalhadaModelo] = useState('');
  const [label, setLabel] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const [html, setHtml] = useState("");
  const [text, setText] = useState('');
  const [editorOpen, setEditorOpen] = useState(false);

  const handleChange = (content: string, delta: any, source: string, editor: any) => {
    setText(content);
  };

  const [siglaDocumento, setSiglaDocumento] = useState(localStorage.getItem('SIGLA_DOCUMENTO'));

  useEffect(() => {
    if (modelo) {
      setHtml(modelo.htmlForm);
    }
  }, [modelo]);

  useEffect(() => {
    const textarea = document.querySelector('textarea');
    const label = document.querySelector(`label[for='DescricaoLabel']`) as HTMLLabelElement;

    if (label) {
      label.style.display = 'none';
    }

    if (textarea) {
      textarea.style.display = 'none';
      textarea.value = text;
      setEditorOpen(true);
    } else {
      setEditorOpen(false);
    }
  }, [html]);

  useEffect(() => {
    const scriptCadastroDocumento = async () => {
      try {
        const scriptCadastroDocumento = await require('../../scriptCadastroDocumento');
      } catch (error) {
        console.error("Erro ao importar script:", error);
      }
    };
    scriptCadastroDocumento();
    listar();
  }, []);

  async function listar() {
    try {
      const _cadastros = await listarModelos();
      setModelos(_cadastros);
    } catch (err) {
      if (err instanceof Error)
        Swal.fire('Oops!', 'Erro ao se conectar com o servidor!', 'error');
    }
  }

  async function foiSelecionadoUmModelo(value: any) {
    setModelo(value);
  }

  // Function to update localStorage and trigger a custom event
  const updateLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value);
    window.dispatchEvent(new Event('storageChange'));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentSiglaDocumento = localStorage.getItem('SIGLA_DOCUMENTO');
      if (currentSiglaDocumento) {
        navigate(`/visualizar-documento/${currentSiglaDocumento}`);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Conteudo>
      <Form titulo={!sigla ? 'Criar documento' : 'Editar documento'}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={modelos}
              sx={{ width: 250 }}
              renderInput={(params) => <TextField {...params} label="Selecione um modelo..." />}
              onChange={(event, value) => {
                foiSelecionadoUmModelo(value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <p className="descricao-completa-modelo">{descricaoDetalhadaModelo}</p>
          </Grid>
        </Grid>
        <div>
          {parse(
            `<input type="hidden" class="Modelo" id="Modelo" value="${modelo?.modelId}">` +
            `<form class="documentoForm"  id="documentoForm">` +
            `<div class="container-box">
              <div class="item-box-1">
                <label>Matrícula</label>
                <div class="input-group">
                  <input type="text" class="MatriculaUsuario" id="MatriculaUsuario" placeholder="Matrícula">
                  <button type="button" class="BtnModalListarPessoas" id="BtnModalListarPessoas">...</button>
                </div>
              </div>
              <div class="item-box-2">
                <label>Nome completo</label>
                <input type="text" class="NomeClompletoUsuario" id="NomeClompletoUsuario" placeholder="Nome">
              </div>
            </div>` +
            `<div class="item-gerais">` +
            html +
            `</div>
            </form>`
          )}
        </div>
        <div>
          {editorOpen ? (
            <ReactQuill
              value={text}
              onChange={handleChange}
              style={{ height: '200px' }}
            />
          ) : null}
        </div>

        <div className="BtnContainer">
          {parse(`
             ${sigla ? '' : '<button type="submit" class="BtnCriar">Criar</button>'}
          `)}
          {sigla && (
            <Link className='BtnCriarDocumento AppCriarDocumento' to={`/visualizar-documento/${sigla}`}>
              <Button value="Editar" color="grey" className="BtnCriarEditar" />
            </Link>
          )}
        </div>
      </Form>
      <ModalComponent descricao="O modelo do documento está sendo carregado..." open={modalOpen} />
    </Conteudo>
  );
}

export default Document;
