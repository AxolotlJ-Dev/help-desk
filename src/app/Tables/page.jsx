"use client"
import Card from "@/components/Card";
import Table from "@/components/Table";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {

 
  const [list, setList] = useState([]);
  //aqui va a ir la API 
  useEffect(() => {
    axios({
      header: 'Content-Type: application/json',
      url: "https://localhost:7093/api/clientes",
    })
      .then((response) => {
        setList(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setList]);

  return (
    <div>
      <section className="container mx-auto p-6 font-mono">
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="text-center px-4 py-3">Compañia</th>
                  <th className="text-center px-4 py-3">Asunto</th>
                  <th className="text-center px-4 py-3">Estatus</th>
                  <th className="text-center px-4 py-3">Fecha</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {list.map((item) => (
                  <Table key={item.id_helpdesk}
                  name={item.solicitud_id_usuario}
                  empresa={item.id_empresa}
                  asunto={item.asunto}
                  estatus={item.estatus}
                  fecha={item.solicitud_fecha}
                   />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
