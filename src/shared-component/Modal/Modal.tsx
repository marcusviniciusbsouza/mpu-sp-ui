import React from 'react';
import { Dialog, DialogTitle, LinearProgress } from '@mui/material';
import './Modal.css';

interface ModalProps {
  open: boolean;
  handleClose?: () => void;
  descricao?: string
}

const ModalComponent: React.FC<ModalProps> = ({ open, handleClose, descricao }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <div className="modal-carregamento ">
        <DialogTitle className="modal-title">{ descricao }</DialogTitle>
        <div className="modal-content">
          <LinearProgress />
        </div>
      </div>
    </Dialog>
  );
};

export default ModalComponent;