import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import './Pagination.scss'

declare interface PaginationProps { 
    totalElements: number;
    size: number;
}

const Pagination: React.FC<PaginationProps> = (props) => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get("page") ?? "1");
    const totalPages = Math.ceil(props.totalElements / props.size);

    // Definir quantas páginas mostrar ao mesmo tempo
    const maxPagesToShow = 2;
    const startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    return (
        <div className="TPagination">
            {/* Botão de "Anterior" */}
            <NavLink
                to={`/home-orgao?page=${page - 1}`}
                className={`page-button ${page === 1 ? 'disabled' : ''}`}
                aria-disabled={page === 1}
            >
                &lt;&lt;
            </NavLink>

            {/* Páginas visíveis */}
            {Array(endPage - startPage + 1)
                .fill('')
                .map((_, i) => {
                    const currentPage = startPage + i;
                    return (
                        <NavLink
                            key={currentPage}
                            to={`/home-orgao?page=${currentPage}`}
                            className={() => page === currentPage ? "selected" : ""}
                        >
                            {currentPage}
                        </NavLink>
                    );
                })}

            {/* Botão de "Próximo" */}
            <NavLink
                to={`/home-orgao?page=${page + 1}`}
                className={`page-button ${page === totalPages ? 'disabled' : ''}`}
                aria-disabled={page === totalPages}
            >
                &gt;&gt;
            </NavLink>
        </div>
    );
};

export default Pagination;
