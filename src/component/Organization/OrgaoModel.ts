import Swal from "sweetalert2";

export interface City {
    id: string;
    name: string;
}

interface Form {
    id: string;
    name: string;
    address: AddressModel
}

interface CityModel {
    id: string;
}

interface AddressModel {
    cep: string;
    city: CityModel;
}

interface OrganizationModel {
    id: string;
    name: string;
    address: AddressModel;
}

export const preparedObject = (form: Form, citySelected: string, citys: City[]): OrganizationModel | null => {
    // const isSelectCity = false
    // citys.forEach(city => {
    //     if(parseInt(citySelected) == city.id)
    //         isSelectCity = true
    // });
    
    if (!citySelected) {
        Swal.fire('Erro', 'A cidade não foi selecionada.', 'error');
        return null;
    }

    const cityModel: CityModel = {
        id: citySelected
    };

    const adressModel: AddressModel = {
        cep: form.address.cep,
        city: cityModel
    };

    const organizationModel: OrganizationModel = {
        id: form.id,
        name: String(form.name),
        address: adressModel
    };

    return organizationModel; 
};


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