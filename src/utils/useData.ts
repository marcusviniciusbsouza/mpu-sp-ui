import { useState } from 'react';
import { PageSize } from './page-size';

export interface DataState {
    list: any[];
    totalElements: number;
    size: PageSize;
}

export function useData(initialSize: PageSize) {
    const [data, setData] = useState<DataState>({
        list: [],
        totalElements: 0,
        size: initialSize
    });

    const setListData = (newData: any[], totalElements: number) => {
        setData((prevState) => ({
            ...prevState,
            list: newData,
            totalElements: totalElements
        }));
    };

    const setSize = (newSize: PageSize) => {
        setData((prevState) => ({
            ...prevState,
            size: newSize
        }));
    };

    return {
        data,
        setListData
    };
    
}