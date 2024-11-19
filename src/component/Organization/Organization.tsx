import React, { useState } from "react";
import Form from "../../shared-component/Form/Form";
import Input from "../../shared-component/Input/Input";
import Conteudo from "../../shared-component/Conteudo/Conteudo";
import Button from "../../shared-component/Button/Button";
import './Organization.css'
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { registry } from "./Service/Service";
import Grid from "../../shared-component/Grid/Grid";
import Autocomplete from "../../shared-component/Autocomplete/Autocomplete";

export class OrganizationModel {
    orgao?: string
    nome?: string
}

function Organization() {
    const navigate = useNavigate();
    const options = ['Apple', 'Banana', 'Cherry', 'Date', 'Fig', 'Grape'];
    const org = new OrganizationModel()
    const [ orgao] = useState('');
    const [ nome, setNome ] = useState('');

    const handleOptionSelect = (value: string) => {
        console.log('Selected:', value);
    };

    const handleRedirectHome = () => {
        navigate('/home-orgao')
    };

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
            title={"Cadastro de Órgão"}
            onSubmit={ enviarFormulario } >
            <Grid columns={2} gap="24px">
                <Autocomplete 
                    label="Cidades" 
                    options={options} 
                    onOptionSelect={handleOptionSelect} // Alterado para onOptionSelect
                />
                <Input label="Nome" />
            </Grid>
            <div className="MaxSizeButton">
                <Grid columns={2} gap="5px">
                    <Button>Cadastrar</Button>
                    <Button 
                        onClick={handleRedirectHome}
                        color="grey">Cancelar</Button>
                </Grid>
            </div>
        </Form>
    </Conteudo>
}

export default Organization