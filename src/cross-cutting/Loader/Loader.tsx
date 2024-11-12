import React from "react";
import "../Loader/Loader.css";

function Loader() {
    return (
        <div className="loader-overlay">
            <div className="spinner"></div>
            <div className="texto"><p>Carregando...</p></div>
        </div>
    );
}

export default Loader;
