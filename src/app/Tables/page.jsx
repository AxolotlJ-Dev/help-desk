"use client"
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [postData, setPostData] = useState([]); // Declare state variable for posts

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
        setPostData(response.data);
        // console.log(response.data)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  return (
    <div>
      <section className="container mx-auto p-6 font-mono">
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="text-center px-4 py-3">Compañia </th>
                  <th className="text-center px-4 py-3">Asunto</th>
                  <th className="text-center px-4 py-3">Estatus</th>
                  <th className="text-center px-4 py-3">Fecha</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {postData.map((response) => (
                  <tr key={response.id_helpdesk}>
                    <td className="text-center px-4 py-3">{response.id_empresa}</td>
                    <td className="text-center px-4 py-3">
                      <Link href={`/Tables/${response.id_helpdesk}`}>
                        {response.asunto}
                      </Link>
                    </td>
                    <td className="text-center px-4 py-3">{response.estatus}</td>
                    <td className="text-center px-4 py-3">{response.solicitud_fecha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;