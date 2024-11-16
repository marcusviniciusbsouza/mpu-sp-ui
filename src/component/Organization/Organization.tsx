import React, { useState } from "react";
import Form from "../../shared-component/Form/Form";
import Input from "../../shared-component/Input/Input";
import Conteudo from "../../shared-component/Conteudo/Conteudo";
import { Grid } from "@mui/material";
import Button from "../../shared-component/Button/Button";
import './Organization.css'
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { registry } from "./Service/Service";

export class OrganizationModel {
    orgao?: string
    nome?: string
}

function Organization() {

    const org = new OrganizationModel()
    const [ orgao] = useState('');
    const [ nome, setNome ] = useState('');

    function enviarFormulario(e:any) {
        e.preventDefault();

        if(orgao === '' && nome === '') {
            alert('É obrigatório preencher todos os campos!')
            return;
        }

        org.orgao = orgao
        org.nome = nome

        try {
            registry(org)
            Swal.fire('Setor', `O Órgão ${ orgao } foi cadastrado com sucesso`, 'success')
        } catch(err) {
            if (err instanceof Error) 
                Swal.fire('Oops!', err.message, 'error')
        }

    }

    return <Conteudo >
        
        <Form 
            titulo={"Cadastro de Órgão"}
            onSubmit={ enviarFormulario } >
        
            <Grid container spacing={1}> 
                <Grid item xs={12}>
                    <Input 
                        label="Nome:" 
                        onChange={ (e) => setNome(e.target.value) }
                        value={ nome }
                    />
                </Grid>
            
            </Grid>
            <div className="btnComando">
                <Grid container spacing={2}>
                    <Grid item xs={4}sm={2}>
                        <div className="btnCadastrar">
                            <Button>
                                Cadastrar  
                            </Button> 
                        </div>
                    </Grid>

                    <Grid item xs={4}sm={2}>
                        <div className="btnCancelar">
                            <Link className='BtnCriarDocumento AppCriarDocumento' to="/cadastro-orgao"><Button value="Cancelar" color="grey" /></Link>
                        </div>                    
                    </Grid>
                </Grid>
            </div>
        </Form>
    </Conteudo>
}

export default Organization