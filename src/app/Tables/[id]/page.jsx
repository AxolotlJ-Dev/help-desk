"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Page = ({ params }) => {
    const [postData, setPostData] = useState({}); // Cambiando a objeto vacío

    const url = "https://localhost:7093/api/clientes";

    const requestData = {
        "id_empresa": "",
        "modulo": "",
        "tipo": "",
        "estatus": "",
        "solicitud_id_usuario": "",
        "fecha_inicio": "1900-01-01",
        "fecha_fin": "2026-01-31",
        "tipo_fecha": "SOLICITUD"
      };

    useEffect(() => {
        axios.post(url, requestData)
            .then((response) => {
                setPostData(response.data[params.id]); 
                console.log(response.data[params.id])
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div>
            <p>ID: {postData.id_empresa}</p>
            <p>Nombre: {postData.asunto}</p>
        </div>
    );
};

export default Page;
