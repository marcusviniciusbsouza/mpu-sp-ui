import React from 'react'
import './AssinarComCertificadoDigital.css'
import { Dialog, DialogTitle} from '@mui/material'
import CircularProgressWithLabel from '../../compenentes-compartilhados/CircularProgressWithLabel/CircularProgressWithLabel';
import './AssinarComCertificadoDigital.css';

import Conteudo from '../../compenentes-compartilhados/Conteudo/Conteudo';

export interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
   
}
  
function AssinarComCertificadoDigital(props: SimpleDialogProps) {
    const { onClose, selectedValue, open } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    return (<Dialog onClose={handleClose} open={open} >
          <Conteudo>
            <DialogTitle>Assinando com certificado digital</DialogTitle>
            <CircularProgressWithLabel   />
          </Conteudo>
        </Dialog>

    );
}

export default AssinarComCertificadoDigital