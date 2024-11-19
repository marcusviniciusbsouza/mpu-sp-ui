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
            address_cep: item.adress?.cep || '',
            city_name: item.address?.city?.name || '',
            state_name: item.address?.city?.state?.name || '',
        };
    });
}