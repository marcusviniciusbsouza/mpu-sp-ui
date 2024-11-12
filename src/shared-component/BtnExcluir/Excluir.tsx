import React, { useEffect, useState, useRef } from "react";
import { buscarDocumento, filtroBoolean, excluirDocumento } from "../../../src/component/Document/Service/Service";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";
import Button from "../Button/Button";

interface ExcluirProps {
  codigoDocumento?: string;
}

const Excluir: React.FC<ExcluirProps> = (props) => {
  const [typeMovement, setTypeMovement] = useState('');
  const [showExcluir, setShowExcluir] = useState(true);
  const [mobilId, setMobilId] = useState<string>(""); 
  const { sigla } = useParams<{ sigla: string }>();
  const [documentoData, setDocumentoData] = useState<any>({});
  const codigoDocumento = sigla || "";
  const buttonRef = useRef<HTMLButtonElement>(null);

  const navigate = useNavigate();

  const handleExcluir = async () => {
    Swal.fire({
      title: 'Você tem certeza?',
      text: "Você não vai poder reverter essa ação!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, Excluir!',
      cancelButtonText: 'Cancelar!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (props.codigoDocumento && documentoData.subscritorId) {
          try {
             await excluirDocumento(props.codigoDocumento, documentoData.subscritorId);
             Swal.fire('Excluído!', 'O documento foi excluído com sucesso.', 'success').then(() => {
              navigate('/mesa-virtual');
            });
          } catch (error:any) {
            console.error('Erro ao excluir documento:', error);
            console.error('Erro detalhes:', error.response ? error.response.data : error.message);
            Swal.fire('Erro', 'Erro ao excluir documento', 'error');
          }
        }
      }
    });
  };

  useEffect(() => {
    if (props.codigoDocumento) {
      fetchDocumento(props.codigoDocumento);
    }
  }, [props.codigoDocumento]);

  const fetchDocumento = async (codigoDocumento: string) => {
    try {
      const documento = await buscarDocumento(codigoDocumento);
      setDocumentoData({ ...documento, subscritorId: documento.subscritorId });
    } catch (error) {
      console.error('Erro ao buscar documento:', error);
    }
  };

  useEffect(() => {
    if (mobilId && typeMovement) {
      filtroBoolean(mobilId, typeMovement)
        .then(isFinalized => setShowExcluir(!isFinalized))
        .catch(error => console.error('Erro ao buscar dados ou tipo de movimentação diferente:', typeMovement, error));
    }
  }, [mobilId, typeMovement]);

  return (
    showExcluir ? (
      <Button
        className="AppButton AppButtonPrimary"
        onClick={handleExcluir}
        style={{ marginRight: '5px' }}
      >
        Excluir
      </Button>
    ) : null
  );
}

export default Excluir;