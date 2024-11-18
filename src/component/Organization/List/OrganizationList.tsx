import './OrganizationList.scss'
import React, { useEffect, useState } from 'react';
import Conteudo from '../../../shared-component/Conteudo/Conteudo';
import InputGroup from '../../../shared-component/InputGroup/InputGroup';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../shared-component/Button/Button';
import { list, activeOrDesactivate } from './../Service/Service'; 
import Swal from 'sweetalert2';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Table, { TableDynamicsHeader } from '../../../shared-component/Table/Table';
import Pagination from '../../../shared-component/Pagination/Pagination';
import { useQueryParam } from '../../../utils/query-param';
import { PageSize } from '../../../utils/page-size';
import { formattedData } from '../OrgaoModel';
import { useData } from '../../../utils/useData';
import { Active } from '../../../utils/active-object';
 
const headers: TableDynamicsHeader[] = [
    { key: 'nome', value: 'Nome' },
    { key: 'estado_nome', value: 'Estado' },
    { key: 'cidade_nome', value: 'Cidade' }
]

export class OrgaoSearch {
    id?: string
    nome?: string
    email?: string
}

function OrganizationList() {
    const navigate = useNavigate();
    const { page, pageForFilter } = useQueryParam('page');
    const { data, setListData } = useData(PageSize.Organization);
    const [ search, setSearch ] = useState('')

    async function fetchData() {
        try {
            const _data = await list(search, pageForFilter, data.size);
            const listNew = formattedData(_data.content);
            setListData(listNew, _data.totalElements);
        } catch (err) {
            if (err instanceof Error) {
                Swal.fire('Erro!', 'Erro ao se conectar com o servidor!', 'error');
            }
        }
    }

    const handleRedirectForPageEdit = (row: any) => {
        const id = row.$original?.orgaoId;
        navigate(`/orgao/${id}`);
    };

    const handleActiveOrDeactivate = async (row: any) => {
        const id = row.$original?.orgaoId;
        const active = row.$original?.active;
        const obj = new Active();
        obj.active = !active;
        try {
            await activeOrDesactivate(id, obj);
            fetchData();
        } catch (error) {
            console.error('Erro ao ativar/desativar:', error);
            Swal.fire('Erro!', 'Erro ao ativar/desativar órgão!', 'error');
        } finally {
            
        }
    };

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line
    }, [page, data.size])

    return <Conteudo >
        <div className='HeaderUsuario'>
            <h2>Lista de Órgãos <AccountBalanceIcon /></h2>
            <div className='left'>
                <InputGroup 
                    onChange={ (e) => setSearch(e.target.value) }
                    onClickButton={ fetchData } 
                    placeholder='Buscar...' />
            </div>
            <Link className='BtnCriarDocumento AppCriarDocumento right' to="/FormularioOrgao"><Button value='Novo Órgão' color='create'></Button></Link>
            <div className="clear"></div>
        </div>
        <Table 
            data={data.list}
            header={headers}
            enableActions
            onActive={handleActiveOrDeactivate}
            onEdit={handleRedirectForPageEdit}
        />
        <Pagination size={data.size} totalElements={data.totalElements} />
    </Conteudo>
}

export default OrganizationList