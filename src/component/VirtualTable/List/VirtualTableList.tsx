import React, { useEffect, useState } from "react";
import './VirtualTableList.scss';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { buscarMovimentosPorTipo } from "../../Document/Service/Service";
import Cookies from "universal-cookie";
import { Pagination } from '@mui/material';
import Conteudo from "../../../shared-component/Conteudo/Conteudo";
import moment from 'moment';
import { recebimentoDocumento } from "../../Document/Service/Service";
import Loader from "../../../cross-cutting/Loader/Loader";

interface TableMesaProps {
    tipoDocumento: string;
    pessoaRecebedoraId?: string;
    subscritorId?: string;
}

const VirtualTable: React.FC<TableMesaProps> = ({ tipoDocumento, pessoaRecebedoraId, subscritorId }) => {
    const SIZE_LIST = 5;
    const [documentos, setDocumentos] = useState<any[]>([]);
    const [totalPage, setTotalPage] = useState(0);
    const [pageActual, setPageActual] = useState(0);
    const [numberPage, setNumberPage] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setPageActual(page - 1);
    };

    async function fetchData() {
        setLoading(true);
        try {
            if (!subscritorId) return;
            const _documentos = await buscarMovimentosPorTipo(subscritorId, pessoaRecebedoraId, tipoDocumento, pageActual, SIZE_LIST);

            // Filtrar documentos com base na última movimentação
            const filteredDocumentos = _documentos.content.filter((documento: { movimentacoes: { typeMovement: string }[] }) => {
                const lastMovement = documento.movimentacoes[documento.movimentacoes.length - 1];
                return lastMovement.typeMovement === tipoDocumento;
            });

            setDocumentos(filteredDocumentos);
            setNumberPage(_documentos.number);
            setTotalPage(_documentos.totalPages);

            setTimeout(() => {
                setLoading(false);
            }, 2000);

        } catch (err) {
            if (err instanceof Error) {
                Swal.fire('Oops!', 'Erro ao se conectar com o servidor!', 'error');
            }
        }
    }

    useEffect(() => {
        fetchData();
    }, [subscritorId, pageActual, tipoDocumento]);

    function calculaData(date: Date): string {
        const dia = date.getDate().toString().padStart(2, '0');
        const mes = (date.getMonth() + 1).toString().padStart(2, '0');
        const ano = date.getFullYear();
        const hora = date.getUTCHours().toString().padStart(2, '0');
        const minuto = date.getUTCMinutes().toString().padStart(2, '0');
        const segundo = date.getUTCSeconds().toString().padStart(2, '0');
        return `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;
    }

    function calculaDiferenca(date: Date): string {
        const criacaoDoDocumento = moment(date);
        const agora = moment();

        const diffMinutes = agora.diff(criacaoDoDocumento, 'minutes');
        const diffHours = agora.diff(criacaoDoDocumento, 'hours');
        const diffDays = agora.diff(criacaoDoDocumento, 'days');

        if (diffDays > 3) {
            return calculaData(date);
        } else if (diffHours > 0) {
            return `Há ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
        } else if (diffMinutes > 0) {
            return `Há ${diffMinutes} minuto${diffMinutes > 1 ? 's' : ''}`;
        } else {
            return 'Agora mesmo';
        }
    }

    async function handleRecebimentoDocumentClick(sigla: string, tipoMovimento: string) {
        if (tipoMovimento !== 'TRAMITAR') {
            // Se o tipo do documento não corresponde ao tipo esperado, não faça nada.
            return;
        }

        try {
            if (!subscritorId) return;
            const result = await recebimentoDocumento(sigla, subscritorId, pessoaRecebedoraId || '0');
            console.log('Documento recebido:', result);
        } catch (error) {
            Swal.fire('Erro!', 'Erro ao receber o documento', 'error');
        }
    }

    return (
        <Conteudo>
            {loading && <Loader />}
            <table className="AppTable">
                <thead>
                    <tr>
                        <th>Tempo</th>
                        <th>Código do documento</th>
                        <th>Modelo</th>
                    </tr>
                </thead>
                <tbody>
                    {documentos.map((documento: any, index: number) => (
                        <tr key={index}>
                            <td>{calculaDiferenca(new Date(documento.dateCreate))}</td>
                            <td>
                                <Link
                                    to={{ pathname: `/visualizar-documento/${documento.siglaMobil}` }}
                                    onClick={(e) => {
                                        // Impede a navegação padrão se o documento não for do tipo correto
                                        if (documento.movimentacoes[documento.movimentacoes.length - 1].typeMovement !== tipoDocumento) {
                                            e.preventDefault();
                                        }
                                        handleRecebimentoDocumentClick(documento.siglaMobil, documento.movimentacoes[documento.movimentacoes.length - 1].typeMovement);
                                    }}
                                >
                                    {documento.siglaMobil}
                                </Link>
                            </td>
                            <td>{documento.documento.model.label}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination-container">
                <Pagination count={totalPage} page={numberPage + 1} onChange={handleChange} variant="outlined" shape="rounded" color="primary" />
            </div>
        </Conteudo>
    );
};

export default VirtualTable;