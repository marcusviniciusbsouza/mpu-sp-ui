import { useLocation } from "react-router-dom";

export function useQueryParam(key: string): { page: any, pageForFilter: number } {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const value = searchParams.get(key);
    const isValid = value !== null && !isNaN(parseInt(value));
    const pageForFilter = isValid ? (parseInt(value) === 0 ? 0 : parseInt(value) - 1) : 0;

    return {
        page: isValid ? (isNaN(parseInt(value)) ? value : parseInt(value)) : 0,
        pageForFilter: pageForFilter
    };
}
