import React, { useState } from 'react';
import { Dialog, DialogTitle, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import Button from '../../../shared-component/Button/Button';
import './Signature.css'
import IconAssinar from "./Files/icon-assinar.png"
import AssinarComCertificadoDigital from './Certificate/AssinarComCertificadoDigital';
import Login from '../../User/Login/Login';

export interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
    tituloHeader?: string,
    titulo?: string
    radius?: boolean
    codigoDocumento: any
}
  
function Signature(props: SimpleDialogProps) {

    const [opcaoAssinatura, setOpcaoAssinatura] = useState('senha')

    const { onClose, selectedValue, open, titulo, codigoDocumento, tituloHeader, radius } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
    };

    const [openCertificado, setOpenCertificado] = React.useState(false);
    const [openSenha ,setOpenSenha] = React.useState(false);

    const handleCloseCertificado = (value: string) => {
        setOpenCertificado(false);
    };

    const handleClickOpenCertificado = () => {
        if(opcaoAssinatura === 'certificado') {
          onClose(selectedValue);
          setOpenCertificado(true);
        } else if(opcaoAssinatura === 'senha') {
          onClose(selectedValue);
          setOpenSenha(true)
        }
    };

    const selecionaOpcaoAssinatura = (value: string) => {
      setOpcaoAssinatura(value);
    };
  
    return (<>
      <Dialog onClose={handleClose} open={open} >
        <DialogTitle>{ tituloHeader } <b>{ codigoDocumento }</b></DialogTitle>
        <div className='AppModal'>
        
        <div className='AppIcon'>
            <img src={ IconAssinar } alt='Ícone De Assinar'/>
        </div>
        
        <h2>{ titulo }</h2>
  
        { radius && 
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="senha"
              name="radio-buttons-group" 
            >
              <FormControlLabel  onClick={() => selecionaOpcaoAssinatura('senha')} value="senha" control={<Radio />} label="Senha" />
              <FormControlLabel onClick={() => selecionaOpcaoAssinatura('certificado')} value="certificado" control={<Radio />} label="Certificado digital" />
            </RadioGroup>
        </FormControl>
        }
  
        <Button onClick={handleClickOpenCertificado}>Selecionar</Button>
        
        </div>
      </Dialog>

        
      <AssinarComCertificadoDigital
        selectedValue={'selectedValue'}
        open={openCertificado}
        onClose={handleCloseCertificado}
      />

</>

    );
}

export default Signature