import { TableDynamicsHeader } from "../shared-component/Table/Table";

type IndexHeaders = {
    [key: string]: TableDynamicsHeader
}

type OrganizedItem = {
    [key: string]: any
}

export default function organizeData(data: any[], headers: TableDynamicsHeader[]):
 [OrganizedItem[], IndexHeaders] {
    const indexHeaders: IndexHeaders = {};

    // Cria um mapeamento de cabeçalhos com base nas chaves fornecidas
    headers.forEach(header => {
        indexHeaders[header.key] = header;
    });

    // Obtém as chaves dos cabeçalhos na ordem especificada
    const headerKeysInOrder = Object.keys(indexHeaders);

    // Organiza os dados conforme os cabeçalhos especificados
    const organizedData = data.map(i => {
        const organizedItem: OrganizedItem = {};
        
        // Associa cada chave do cabeçalho aos valores do item atual
        headerKeysInOrder.forEach(key => {
            // Verifique se `$original` existe e use-o se necessário
            organizedItem[key] = i[key] || i.$original?.[key.toLowerCase()] || null;
        });
        organizedItem.$original = i // Onde tem o objeto completo passado.
        return organizedItem;
    });

    return [organizedData, indexHeaders];
}