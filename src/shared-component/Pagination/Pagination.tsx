import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import './Pagination.scss'

declare interface PaginationProps { 
    totalElements: number
    size : number
}

const Pagination: React.FC<PaginationProps> = (props) => {

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get("page") ?? "1");
    const totalPages = Math.ceil(props.totalElements / props.size);

    return <>
        <div className="TPagination">
        {
            Array(totalPages)
            .fill('')
            .map((_, i) => {
                return <NavLink
                    key={i} 
                    to={`/home-orgao?page=${ i + 1 }`}
                    className={() => page === i + 1 ? "selected" : ""} >
                        
                    { i + 1 }
                </NavLink>
            })
        }
    </div>

    </>

}

export default Pagination