import React, { useEffect, useState } from "react";
import Form from "../../shared-component/Form/Form";
import Input from "../../shared-component/Input/Input";
import Conteudo from "../../shared-component/Conteudo/Conteudo";
import Button from "../../shared-component/Button/Button";
import './Organization.css'
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { registry, listCity } from "./Service/Service";
import Grid from "../../shared-component/Grid/Grid";
import Autocomplete from "../../shared-component/Autocomplete/Autocomplete";

const initialFormState = {
    name: '',
    cep: '',
    city: ''
}

function Organization() {
    const navigate = useNavigate()
    const [form, setForm] = useState(initialFormState)
    const [ citys, setCitys ] = useState([]);
    const [ orgao] = useState('');
    const [ nome, setNome ] = useState('');

    const handleOptionSelect = (option: any) => {
        console.log('Opção selecionada:', option.id);
    };

    const handleRedirectHome = () => {
        navigate('/home-orgao')
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setForm({
            ...form,
            [name]: value
        })
    }

    function sendForm(e: any) {
        e.preventDefault();
        console.log(e)
        // if(orgao === '' && nome === '') {
        //     alert('É obrigatório preencher todos os campos!')
        //     return;
        // }

        // org.orgao = orgao
        // org.nome = nome

        // try {
        //     registry(org)
        //     Swal.fire('Setor', `O Órgão ${ orgao } foi cadastrado com sucesso`, 'success')
        // } catch(err) {
        //     if (err instanceof Error) 
        //         Swal.fire('Oops!', err.message, 'error')
        // }

    }

    async function fetchData() {
        try {
            const _data = await listCity();
            setCitys(_data)
        } catch (err) {
            if (err instanceof Error) {
                Swal.fire('Erro!', 'Erro ao se conectar com o servidor!', 'error');
            }
        }
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line
    }, [])

    return <Conteudo >
        <Form 
            title={"Cadastro de Órgão"}
            onSubmit={ () => console.log(form) } >
            <Grid columns={2} gap="24px">
                <Autocomplete
                    label="CIDADE"
                    options={citys}
                    onOptionSelect={handleOptionSelect} />
                <Input 
                    name="cep"
                    onChange={handleInputChange} 
                    label="CEP" />
            </Grid>
            <Input 
                name="name"
                onChange={handleInputChange}
                label="NOME" />
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