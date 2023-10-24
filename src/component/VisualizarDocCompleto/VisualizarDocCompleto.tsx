import React from "react";
import { Grid } from "@mui/material";
import Box from "../../compenentes-compartilhados/Box/Box";
import './VisualizarDocCompleto.css'
import Conteudo from "../../compenentes-compartilhados/Conteudo/Conteudo";

function VisualizarDocCompleto () {

    var listaDeDocumentos = ['doc1.pdf', 'doc2.pdf', 'doc3.pdf']

    return <Conteudo> 
        <Grid container spacing={2.0}>

            <Grid item xs={3}>
                <Box titulo="Titulo" array={listaDeDocumentos}/>
            </Grid>

            <Grid item xs={9}>
            // eslint-disable-next-line
                <object 
                    width="100%" 
                    height="400" 
                    data="http://www.africau.edu/images/default/sample.pdf" 
                    type="application/pdf" 
                    
                />
            </Grid>
        </Grid>

        </Conteudo> 
}
export default VisualizarDocCompleto