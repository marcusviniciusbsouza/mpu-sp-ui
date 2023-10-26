import React from 'react'
import Form from '../../compenentes-compartilhados/Form/Form'
import Input from '../../compenentes-compartilhados/Input/Input';
import Conteudo from '../../compenentes-compartilhados/Conteudo/Conteudo';
import Button from '../../compenentes-compartilhados/Button/Button';
import './Login.css'
import { Grid } from '@mui/material';

declare interface LoginProps {
    titulo?: string
    txtBotao?: String
    hidden?: boolean 
}

function Login(props: LoginProps) {
    return <Conteudo>
        
        <div className="box" hidden={ props.titulo ? props.hidden : false }>
           
                <Form titulo={ props.titulo ? props.titulo : "Login"  }>
                    <div className="InputeButton">
                <Grid container spacing={1}>
                <Grid item xs={9}>
                    <Input label='Login:'/>
                    </Grid>
                    <Grid item xs={9}>
                    <Input label='Senha:'/>
                    </Grid>
                    <Grid item xs={5}>
                       <div className="buttons">
                    <Button >{ props.txtBotao ? props.txtBotao : "Logar" }</Button>
                    </div>
                    </Grid>
                    </Grid>
                    </div>
                    
                </Form>
           
               
        </div>
        
    </Conteudo>
}

export default Login