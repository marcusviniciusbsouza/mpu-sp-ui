import './OrganizationList.scss'
import React, { useEffect, useState } from 'react';
import Conteudo from '../../../shared-component/Conteudo/Conteudo';
import InputGroup from '../../../shared-component/InputGroup/InputGroup';
import { Link } from 'react-router-dom';
import Button from '../../../shared-component/Button/Button';
import { list, search } from './../Service/Service'; 
import Swal from 'sweetalert2';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Table, { TableDynamicsHeader } from '../../../shared-component/Table/Table';
import Pagination from '../../../shared-component/Pagination/Pagination';
import { useQueryParam } from '../../../utils/query-param';
import { PageSize } from '../../../utils/page-size';
import { formattedData } from '../OrgaoModel';
import { useData } from '../../../utils/useData';
 
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

function CadastrarOrgao() {
    const { page, pageForFilter } = useQueryParam('page');
    const { data, setListData } = useData(PageSize.Organization);
    const [ search, setSearch ] = useState([])

    async function fetchData() {
        try {
            const _data = await list('', pageForFilter, data.size);
            const listNew = formattedData(_data.content);
            setListData(listNew, _data.totalElements);
        } catch (err) {
            if (err instanceof Error) {
                Swal.fire('Oops!', 'Erro ao se conectar com o servidor!', 'error');
            }
        }
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line
    }, [page, data.size])

    return <Conteudo >
        <div className='HeaderUsuario'>
            <h2>Lista de Órgãos <AccountBalanceIcon /></h2>
            <div className='left'>
                <InputGroup 
                    
                    onClick={ fetchData } placeholder='pesquisar órgãos...' />
            </div>
            <Link className='BtnCriarDocumento AppCriarDocumento right' to="/FormularioOrgao"><Button value='Novo Órgão' color='create'></Button></Link>
            <div className="clear"></div>
        </div>
    
        <Table 
            data={data.list}
            header={headers}
        />
        <Pagination size={data.size} totalElements={data.totalElements} />

    </Conteudo>
}

export default CadastrarOrgao