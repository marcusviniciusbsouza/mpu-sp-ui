import React, { useState } from "react";
import Form from "../../compenentes-compartilhados/Form/Form";
import Input from "../../compenentes-compartilhados/Input/Input";
import Conteudo from "../../compenentes-compartilhados/Conteudo/Conteudo";
import { Grid } from "@mui/material";
import Button from "../../compenentes-compartilhados/Button/Button";
import './FormularioUsuario.css'
import { cadastrarUsuario } from "./Servico/usuario.service";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export class Usuario {
    id?: string
    nome?: string
    rg?: string 
    cpf?: string
    setor?: string
    nascimento?: string
    endereco?: string
    email?: string
    telefone?: string
}

function FormularioUsuario() {

    const usuario = new Usuario()

    const [ id ] = useState('');
    const [ nome, setNome ] = useState('');
    const [ rg, setRg ] = useState('');
    const [ cpf, setCpf ] = useState(''); 
    const [ setor, setSetor ] = useState('');
    const [ nascimento, setNascimento ] = useState('');
    const [ endereco, setEndereco ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ telefone ] = useState('');

    function enviarFormulario(e:any) {
        e.preventDefault();

        if(nome === '' && rg === '') {
            alert('É obrigatório preencher todos os campos!')
            return;
        }

        usuario.nome = nome
        usuario.cpf = cpf
        usuario.email = email
        usuario.endereco = endereco
        usuario.id = id
        usuario.nascimento = nascimento
        usuario.rg = rg
        usuario.setor = setor
        usuario.telefone = telefone

        try {
            cadastrarUsuario(usuario)
            Swal.fire('Usuário', `O Usuário ${ nome } foi cadastrado com sucesso`, 'success')
        } catch(err) {
            if (err instanceof Error) 
              Swal.fire('Oops!', err.message, 'error')
        }

    }

    return <Conteudo >
        
        <Form 
            titulo={"Cadastro de Usuário"}
            onSubmit={ enviarFormulario } 
        >
        <Input 
            label="Nome Completo" 
            onChange={ (e) => setNome(e.target.value) }
            value={ nome }
        />
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Input 
                        label="CPF" 
                        onChange={ (e) => setCpf(e.target.value) }
                        value={ cpf }
                    />
                </Grid>
                <Grid item xs={4}>
                    <Input 
                        label="RG"
                        onChange={ (e) => setRg(e.target.value) }
                        value={ rg }
                    />
                </Grid>

                <Grid item xs={4}>
                    <Input 
                        label="Setor" 
                        onChange={ (e) => setSetor(e.target.value) }
                        value={ setor }
                    />
                </Grid>
                <Grid item xs={3}>
                    <Input 
                        label="Dados de Nascimento"
                        onChange={ (e) => setNascimento(e.target.value) }
                        value={ nascimento }
                    />
                </Grid>
                <Grid item xs={7}>
                    <Input 
                        label="Endereço"
                        onChange={ (e) => setEndereco(e.target.value) }
                        value={ endereco }
                    />
                </Grid>
            </Grid>
            <Input 
                label="E-mail"
                onChange={ (e) => setEmail(e.target.value) }
                value={ email }
            />
      
            <div className="AppButtons">
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                        <Button>
                            Cadastrar  
                        </Button> 
                    </Grid>
                    <Grid item xs={3}>
                        <Link className='BtnCriarDocumento AppCriarDocumento' to="/listar-usuario"><Button value="Cancelar" color="grey" /></Link>
                    </Grid>
                </Grid>
            </div>

        </Form>
    </Conteudo>

}

export default FormularioUsuario