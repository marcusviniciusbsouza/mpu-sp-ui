export class Estado {
    estadoId!: string;
    nome!: string;
}
  
export class Cidade {
    cidadeId!: string;
    nome!: string;
    estado!: Estado;
}
  
export class Endereco {
    cep!: string;
    cidade!: Cidade;
}
  
export class Organization {
    orgaoId!: string;
    nome!: string;
    active!: boolean;
    endereco!: Endereco;
}  

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