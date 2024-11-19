import React, { useEffect, useState } from "react";
import Form from "../../shared-component/Form/Form";
import Input from "../../shared-component/Input/Input";
import Conteudo from "../../shared-component/Conteudo/Conteudo";
import { Grid } from "@mui/material";
import Button from "../../shared-component/Button/Button";
import './Department.css'
import Swal from "sweetalert2";
import { Link, useParams } from "react-router-dom";
import { cadastrarSetor, editarSetor, buscarSetorPorId } from "./Service/Service";

export class DepartmentModel {
    orgao?: string
    nome?: string
    sigla?: string 
    unidadePai?: string
    localidade?: string
}

function Department() {
    const { id } = useParams();
    const setor = new DepartmentModel()
    const [ orgao, setOrgao] = useState('');
    const [ nome, setNome ] = useState('');
    const [ sigla, setSigla ] = useState('');
    const [ unidadepai, setUnidadePai ] = useState(''); 
    const [ localidade, setLocalidade ] = useState('');

    function enviarFormulario(e:any) {
        e.preventDefault();

        if(orgao === '' && sigla === '') {
            alert('É obrigatório preencher todos os campos!')
            return;
        }

        setor.orgao = orgao
        setor.nome = nome
        setor.sigla = sigla
        setor.unidadePai = unidadepai
        setor.localidade = localidade
      
        try {
            if(id == null) {
                cadastrarSetor(setor)
            } else {
                editarSetor(setor, id)
            }

            Swal.fire('Setor', `O setor ${ orgao } foi cadastrado com sucesso`, 'success')
        } catch(err) {
            if (err instanceof Error) 
              Swal.fire('Oops!', err.message, 'error')
        }

    }

    useEffect(() => {
      if(id) {
        const _setor =  buscarSetorPorId(id)
        _setor.then(data => {
            setNome(data.nome)
            setLocalidade(data.localidade)
            setOrgao(data.orgao)
            setUnidadePai(data.unidadePai)
            setSigla(data.sigla)
        }).catch(error =>{
            console.error('Erro ao fazer login', error);
            Swal.fire("Oops!", error.message, "error")
        });
      }  
    },[]);

    return <Conteudo >
        
        <Form 
            title={!id ? "Cadastro de Setor" : "Edição de Setor"}
            onSubmit={ enviarFormulario } 
        >
            <Grid container spacing={2}>
                <Grid item xs={12}sm={4}>
                    <Input 
                        label="Nome" 
                        onChange={ (e) => setNome(e.target.value) }
                        value={ nome }
                        validation={(value) => value.length > 0}
                        errorMessage="O nome é obrigatório!"
                    />
                </Grid>
                <Grid item xs={6}sm={4}>
                    <Input 
                        label="Órgão" 
                        onChange={ (e) => setOrgao(e.target.value) }
                        value={ orgao }
                        validation={(value) => value.length > 0}
                        errorMessage="O órgão é obrigatório!"
                    /> 
                    </Grid>
                <Grid item xs={6}sm={4}>
                    <Input 
                        label="Sigla"
                        onChange={ (e) => setSigla(e.target.value) }
                        value={ sigla }
                        validation={(value) => value.length > 0}
                        errorMessage="A sigla é obrigatória!"
                    />
                </Grid>

                <Grid item xs={6}sm={4}>
                    <Input 
                        label="Unidade Pai" 
                        onChange={ (e) => setUnidadePai(e.target.value) }
                        value={ unidadepai }
                        validation={(value) => value.length > 0}
                        errorMessage="A unidade pai é obrigatória!"
                    />
                </Grid>
                <Grid item xs={6}sm={4}>
                    <Input 
                        label="Localidade"
                        onChange={ (e) => setLocalidade(e.target.value) }
                        value={ localidade}
                        validation={(value) => value.length > 0}
                        errorMessage="A localidade é obrigatória!"
                    />
                </Grid>
            </Grid>
                <br></br>
                <Grid container spacing={1}>
                    <Grid item xs={4}sm={3}>
                        <Button>
                            Cadastrar  
                        </Button> 
                    </Grid>
                    <Grid item xs={4}sm={3}>
                        <Link className='BtnCriarDocumento AppCriarDocumento' to="/cadastro-setor"><Button value="Voltar" color="grey" /></Link>
                    </Grid>
                </Grid>
        </Form>
    </Conteudo>
}

export default Department