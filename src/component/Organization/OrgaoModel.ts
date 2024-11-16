

export function formattedData(data: any[]): any[] {
    return data.map(item => {
        return {
            ...item,
            endereco_cep: item.endereco?.cep || '',
            cidade_nome: item.endereco?.cidade?.nome || '',
            estado_nome: item.endereco?.cidade?.estado?.nome || '',
        };
    });
}